import { AuthConfig } from './AuthConfig';
import { AuthCredential } from './AuthCredential';

/**
 * Handler for authentication in tools
 */
export class AuthHandler {
  /**
   * The authentication configuration
   */
  authConfig: AuthConfig;
  
  /**
   * The authentication credential
   */
  credential?: AuthCredential;
  
  /**
   * Constructor for AuthHandler
   */
  constructor(config: {
    authConfig: AuthConfig;
    credential?: AuthCredential;
  }) {
    this.authConfig = config.authConfig;
    this.credential = config.credential;
  }
  
  /**
   * Gets the authentication token
   */
  getToken(): string | undefined {
    return this.credential?.getToken();
  }
  
  /**
   * Gets headers for HTTP requests
   */
  getHeaders(): Record<string, string> {
    if (!this.credential) {
      return {};
    }
    
    return this.credential.getHeaders(this.authConfig);
  }
  
  /**
   * Refreshes the token if necessary
   */
  async refreshToken(): Promise<void> {
    if (this.credential?.canRefresh()) {
      await this.credential.refresh();
    }
  }
} 