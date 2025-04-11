import { InMemoryMemoryService } from '../../src/memory/services/InMemoryMemoryService';
import { Session, SessionState } from '../../src/models/memory/Session';
import { Message } from '../../src/models/request/LLMRequest';

describe('InMemoryMemoryService', () => {
  let memoryService: InMemoryMemoryService;
  
  beforeEach(() => {
    memoryService = new InMemoryMemoryService();
  });
  
  it('should initialize with empty sessions', () => {
    expect(memoryService.getAllSessions()).toEqual([]);
  });
  
  it('should save and retrieve a session', async () => {
    const session: Session = {
      id: 'test-session-1',
      userId: 'test-user',
      messages: [
        { role: 'user', content: 'Hello' },
        { role: 'assistant', content: 'Hi there!' }
      ],
      metadata: { testKey: 'testValue' },
      createdAt: new Date(),
      updatedAt: new Date(),
      state: new SessionState()
    };
    
    await memoryService.addSessionToMemory(session);
    
    const retrievedSession = memoryService.getSession(session.id);
    expect(retrievedSession).toBeDefined();
    expect(retrievedSession?.id).toEqual(session.id);
    expect(retrievedSession?.userId).toEqual(session.userId);
  });
  
  it('should return undefined for non-existent session', () => {
    const retrievedSession = memoryService.getSession('non-existent-session');
    expect(retrievedSession).toBeUndefined();
  });
  
  it('should update an existing session', async () => {
    const session: Session = {
      id: 'test-session-1',
      userId: 'test-user',
      messages: [],
      metadata: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      state: new SessionState()
    };
    
    await memoryService.addSessionToMemory(session);
    
    const updatedSession: Session = {
      ...session,
      messages: [
        { role: 'user', content: 'New message' }
      ],
      metadata: { updated: true },
      updatedAt: new Date()
    };
    
    await memoryService.addSessionToMemory(updatedSession);
    
    const retrievedSession = memoryService.getSession(session.id);
    expect(retrievedSession).toBeDefined();
    expect(retrievedSession?.messages.length).toBe(1);
    expect(retrievedSession?.metadata.updated).toBe(true);
  });
  
  it('should search for sessions by query', async () => {
    const session1: Session = {
      id: 'test-session-1',
      userId: 'test-user',
      messages: [
        { role: 'user', content: 'Tell me about dogs' },
        { role: 'assistant', content: 'Dogs are loyal animals.' }
      ],
      metadata: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      state: new SessionState()
    };
    
    const session2: Session = {
      id: 'test-session-2',
      userId: 'test-user',
      messages: [
        { role: 'user', content: 'Tell me about cats' },
        { role: 'assistant', content: 'Cats are independent animals.' }
      ],
      metadata: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      state: new SessionState()
    };
    
    await memoryService.addSessionToMemory(session1);
    await memoryService.addSessionToMemory(session2);
    
    const searchResult = await memoryService.searchMemory('dogs', { threshold: 0.5, limit: 5 });
    
    expect(searchResult.memories.length).toBe(1);
    expect(searchResult.memories[0].sessionId).toBe(session1.id);
  });
  
  it('should clear all sessions', async () => {
    const session: Session = {
      id: 'test-session-1',
      userId: 'test-user',
      messages: [],
      metadata: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      state: new SessionState()
    };
    
    await memoryService.addSessionToMemory(session);
    expect(memoryService.getAllSessions().length).toBe(1);
    
    memoryService.clear();
    expect(memoryService.getAllSessions().length).toBe(0);
  });
}); 