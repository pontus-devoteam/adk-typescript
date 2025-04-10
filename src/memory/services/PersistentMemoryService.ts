import fs from 'fs';
import path from 'path';
import { BaseMemoryService, SearchMemoryOptions, SearchMemoryResponse } from '../../models/memory/MemoryService';
import { Session } from '../../models/memory/Session';
import { InMemoryMemoryService } from './InMemoryMemoryService';

/**
 * Configuration for PersistentMemoryService
 */
export interface PersistentMemoryServiceConfig {
  /**
   * Directory where memory files will be stored
   */
  storageDir: string;
  
  /**
   * Whether to create the storage directory if it doesn't exist
   */
  createDir?: boolean;
  
  /**
   * File prefix for memory files
   */
  filePrefix?: string;
}

/**
 * A file-based implementation of memory service that persists data to disk
 * This provides durability across application restarts
 */
export class PersistentMemoryService implements BaseMemoryService {
  /**
   * In-memory service used for search operations
   */
  private inMemoryService: InMemoryMemoryService;
  
  /**
   * Directory where memory files will be stored
   */
  private storageDir: string;
  
  /**
   * File prefix for memory files
   */
  private filePrefix: string;
  
  /**
   * Constructor for PersistentMemoryService
   */
  constructor(config: PersistentMemoryServiceConfig) {
    this.inMemoryService = new InMemoryMemoryService();
    this.storageDir = config.storageDir;
    this.filePrefix = config.filePrefix || 'memory';
    
    // Create directory if it doesn't exist and createDir is true
    if (config.createDir && !fs.existsSync(this.storageDir)) {
      fs.mkdirSync(this.storageDir, { recursive: true });
    }
    
    // Load existing memory files
    this.loadMemoryFiles();
  }
  
  /**
   * Adds a session to memory and persists to disk
   * @param session The session to add
   */
  async addSessionToMemory(session: Session): Promise<void> {
    // First add to in-memory service
    await this.inMemoryService.addSessionToMemory(session);
    
    // Then persist to disk
    await this.saveSessionToDisk(session);
  }
  
  /**
   * Searches memory for relevant information
   * @param query The search query
   * @param options Search options
   * @returns Search results
   */
  async searchMemory(query: string, options?: SearchMemoryOptions): Promise<SearchMemoryResponse> {
    // Use in-memory service for search operations
    return this.inMemoryService.searchMemory(query, options);
  }
  
  /**
   * Persists a session to disk
   * @param session The session to save
   */
  private async saveSessionToDisk(session: Session): Promise<void> {
    const filePath = this.getSessionFilePath(session.id);
    
    try {
      // Create the session data with metadata
      const sessionData = {
        ...session,
        updatedAt: new Date(), // Ensure date is fresh
        _meta: {
          version: 1,
          persistedAt: new Date()
        }
      };
      
      // Write to file (prettified JSON for easier debugging)
      await fs.promises.writeFile(
        filePath,
        JSON.stringify(sessionData, null, 2),
        'utf-8'
      );
    } catch (error) {
      console.error(`Error saving session ${session.id} to disk:`, error);
      throw new Error(`Failed to persist memory: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Gets the file path for a session
   * @param sessionId The session ID
   * @returns The file path
   */
  private getSessionFilePath(sessionId: string): string {
    return path.join(this.storageDir, `${this.filePrefix}-${sessionId}.json`);
  }
  
  /**
   * Loads all memory files from disk
   */
  private loadMemoryFiles(): void {
    try {
      // Ensure directory exists
      if (!fs.existsSync(this.storageDir)) {
        return;
      }
      
      // Read all files in the directory
      const files = fs.readdirSync(this.storageDir);
      
      // Load each memory file
      for (const file of files) {
        if (file.startsWith(this.filePrefix) && file.endsWith('.json')) {
          try {
            const filePath = path.join(this.storageDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            const session = JSON.parse(content) as Session;
            
            // Convert date strings back to Date objects
            session.createdAt = new Date(session.createdAt);
            session.updatedAt = new Date(session.updatedAt);
            
            // Add to in-memory service
            this.inMemoryService.addSessionToMemory(session);
          } catch (fileError) {
            console.error(`Error loading memory file ${file}:`, fileError);
          }
        }
      }
      
      console.log(`Loaded ${this.inMemoryService.getAllSessions().length} sessions from persistent storage`);
    } catch (error) {
      console.error('Error loading memory files:', error);
    }
  }
  
  /**
   * Gets all sessions in memory
   * @returns Array of sessions
   */
  getAllSessions(): Session[] {
    return this.inMemoryService.getAllSessions();
  }
  
  /**
   * Gets a session by ID
   * @param sessionId Session ID
   * @returns The session or undefined if not found
   */
  getSession(sessionId: string): Session | undefined {
    return this.inMemoryService.getSession(sessionId);
  }
  
  /**
   * Deletes a session from memory and disk
   * @param sessionId Session ID to delete
   */
  async deleteSession(sessionId: string): Promise<void> {
    const filePath = this.getSessionFilePath(sessionId);
    
    try {
      // Delete from disk if exists
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }
      
      // Remove from in-memory service
      this.inMemoryService.getSession(sessionId);
    } catch (error) {
      console.error(`Error deleting session ${sessionId}:`, error);
      throw new Error(`Failed to delete session: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Clears all sessions from memory and disk
   */
  async clear(): Promise<void> {
    try {
      // Get all sessions
      const sessions = this.inMemoryService.getAllSessions();
      
      // Delete each session file
      for (const session of sessions) {
        await this.deleteSession(session.id);
      }
      
      // Clear in-memory service
      this.inMemoryService.clear();
    } catch (error) {
      console.error('Error clearing persistent memory:', error);
      throw new Error(`Failed to clear memory: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
} 