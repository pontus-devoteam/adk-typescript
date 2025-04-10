import { BaseMemoryService, SearchMemoryOptions, SearchMemoryResponse } from '../../models/memory/MemoryService';
import { Session } from '../../models/memory/Session';
import { Message } from '../../models/request/LLMRequest';

/**
 * An in-memory memory service for development and testing
 * Stores sessions and conversations in memory without persistence
 */
export class InMemoryMemoryService implements BaseMemoryService {
  /**
   * Map of sessions by ID
   */
  private sessions: Map<string, Session>;
  
  /**
   * Constructor for InMemoryMemoryService
   */
  constructor() {
    this.sessions = new Map<string, Session>();
  }
  
  /**
   * Adds a session to the memory service
   * @param session The session to add
   */
  async addSessionToMemory(session: Session): Promise<void> {
    this.sessions.set(session.id, { ...session });
  }
  
  /**
   * Searches memory for relevant information
   * @param query The search query
   * @param options Search options
   * @returns Search results
   */
  async searchMemory(query: string, options?: SearchMemoryOptions): Promise<SearchMemoryResponse> {
    const response: SearchMemoryResponse = {
      memories: []
    };
    
    // Normalize query for search
    const normalizedQuery = query.toLowerCase().trim();
    const queryTerms = normalizedQuery.split(/\s+/);
    
    // Filter by session ID if provided
    const sessionsToSearch = options?.sessionId
      ? (this.sessions.has(options.sessionId) ? [this.sessions.get(options.sessionId)!] : [])
      : Array.from(this.sessions.values());
    
    // Search each session
    for (const session of sessionsToSearch) {
      const matchedEvents: Message[] = [];
      const scores: number[] = [];
      
      // Check each message in the session
      for (const message of session.messages) {
        // Skip non-text content for now
        let content = '';
        if (typeof message.content === 'string') {
          content = message.content;
        } else if (Array.isArray(message.content)) {
          // Extract text from content array
          for (const part of message.content) {
            if (part.type === 'text') {
              content += part.text + ' ';
            }
          }
        } else if (message.content && message.content.type === 'text') {
          content = message.content.text;
        }
        
        // Skip empty content
        if (!content) continue;
        
        // Calculate relevance score based on term matches
        const normalizedContent = content.toLowerCase();
        let termMatches = 0;
        
        for (const term of queryTerms) {
          if (normalizedContent.includes(term)) {
            termMatches++;
          }
        }
        
        const score = queryTerms.length > 0 ? termMatches / queryTerms.length : 0;
        
        // Apply threshold if provided
        if (options?.threshold !== undefined && score < options.threshold) {
          continue;
        }
        
        // If the message is relevant, add it to matched events
        if (score > 0) {
          matchedEvents.push(message);
          scores.push(score);
        }
      }
      
      // If there are matched events, add to results
      if (matchedEvents.length > 0) {
        // Calculate average relevance score
        const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        
        response.memories.push({
          sessionId: session.id,
          events: matchedEvents,
          relevanceScore: avgScore
        });
      }
    }
    
    // Sort by relevance score (highest first)
    response.memories.sort((a, b) => 
      (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0)
    );
    
    // Apply limit if provided
    if (options?.limit !== undefined && options.limit > 0) {
      response.memories = response.memories.slice(0, options.limit);
    }
    
    return response;
  }
  
  /**
   * Gets all sessions in the memory service
   * @returns All sessions
   */
  getAllSessions(): Session[] {
    return Array.from(this.sessions.values());
  }
  
  /**
   * Gets a session by ID
   * @param sessionId The session ID
   * @returns The session or undefined if not found
   */
  getSession(sessionId: string): Session | undefined {
    return this.sessions.get(sessionId);
  }
  
  /**
   * Clears all sessions from memory
   */
  clear(): void {
    this.sessions.clear();
  }
} 