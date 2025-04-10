import { AuthScheme } from './AuthScheme';

/**
 * Authentication configuration for tools
 */
export class AuthConfig {
  /**
   * The authentication scheme
   */
  authScheme: AuthScheme;
  
  /**
   * Additional context properties
   */
  context?: Record<string, any>;
  
  /**
   * Constructor for AuthConfig
   */
  constructor(config: {
    authScheme: AuthScheme;
    context?: Record<string, any>;
  }) {
    this.authScheme = config.authScheme;
    this.context = config.context;
  }
} 