/**
 * Authentication scheme types
 */
export enum AuthSchemeType {
  APIKEY = 'apiKey',
  HTTP = 'http',
  OAUTH2 = 'oauth2',
  OPENID_CONNECT = 'openIdConnect'
}

/**
 * Base class for authentication schemes
 */
export abstract class AuthScheme {
  /**
   * The type of authentication scheme
   */
  type: AuthSchemeType;
  
  constructor(type: AuthSchemeType) {
    this.type = type;
  }
}

/**
 * API Key authentication scheme
 */
export class ApiKeyScheme extends AuthScheme {
  /**
   * Where the API key is sent
   */
  in: 'query' | 'header' | 'cookie';
  
  /**
   * Name of the parameter
   */
  name: string;
  
  /**
   * Description of the API key
   */
  description?: string;
  
  /**
   * Constructor for ApiKeyScheme
   */
  constructor(config: {
    in: 'query' | 'header' | 'cookie';
    name: string;
    description?: string;
  }) {
    super(AuthSchemeType.APIKEY);
    this.in = config.in;
    this.name = config.name;
    this.description = config.description;
  }
}

/**
 * HTTP authentication scheme
 */
export class HttpScheme extends AuthScheme {
  /**
   * The HTTP authentication scheme
   */
  scheme: 'basic' | 'bearer' | 'digest' | 'other';
  
  /**
   * Bearer format when scheme is 'bearer'
   */
  bearerFormat?: string;
  
  /**
   * Description of the scheme
   */
  description?: string;
  
  /**
   * Constructor for HttpScheme
   */
  constructor(config: {
    scheme: 'basic' | 'bearer' | 'digest' | 'other';
    bearerFormat?: string;
    description?: string;
  }) {
    super(AuthSchemeType.HTTP);
    this.scheme = config.scheme;
    this.bearerFormat = config.bearerFormat;
    this.description = config.description;
  }
}

/**
 * OAuth flow configuration
 */
export interface OAuthFlow {
  authorizationUrl?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  scopes: Record<string, string>;
}

/**
 * OAuth flows configuration
 */
export interface OAuthFlows {
  implicit?: OAuthFlow;
  password?: OAuthFlow;
  clientCredentials?: OAuthFlow;
  authorizationCode?: OAuthFlow;
}

/**
 * OAuth2 authentication scheme
 */
export class OAuth2Scheme extends AuthScheme {
  /**
   * OAuth flows
   */
  flows: OAuthFlows;
  
  /**
   * Description of the scheme
   */
  description?: string;
  
  /**
   * Constructor for OAuth2Scheme
   */
  constructor(config: {
    flows: OAuthFlows;
    description?: string;
  }) {
    super(AuthSchemeType.OAUTH2);
    this.flows = config.flows;
    this.description = config.description;
  }
}

/**
 * OpenID Connect authentication scheme
 */
export class OpenIdConnectScheme extends AuthScheme {
  /**
   * OpenID Connect URL
   */
  openIdConnectUrl: string;
  
  /**
   * Description of the scheme
   */
  description?: string;
  
  /**
   * Constructor for OpenIdConnectScheme
   */
  constructor(config: {
    openIdConnectUrl: string;
    description?: string;
  }) {
    super(AuthSchemeType.OPENID_CONNECT);
    this.openIdConnectUrl = config.openIdConnectUrl;
    this.description = config.description;
  }
} 