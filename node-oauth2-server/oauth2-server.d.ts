// Type definitions for node-oauth2-server.js
// Project: https://github.com/thomseddon/node-oauth2-server
// Definitions by: Hiroki Horiuchi <https://github.com/horiuchi>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../node/node.d.ts" />
/// <reference path="../express/express.d.ts" />


interface IOAuth2ServerOptions<T> {
  model: IOAuth2ServerModel<T>;
  grants?: string[];
  debug?: boolean;
  accessTokenLifetime?: number;
  refreshTokenLifetime?: number;
  authCodeLifetime?: number;
  clientIdRegex?: RegExp;
  passthroughErrors?: boolean;
  continueAfterResponse?: boolean;
}

// type of T is userId's type (expected number or string).
interface IOAuth2ServerModel<T> {
  // Always Required
  getAccessToken: (bearerToken: string, callback: (err: any, accessToken: { expires: Date; userId: T; }) => void) => void;
  getClient: (clientId: string, clientSecret: string, callback: (err: any, client: { clientId: string; }) => void) => void;
  grantTypeAllowed: (clientId: string, grantType: string, callback: (err: any, allowed: boolean) => void) => void;
  saveAccessToken: (accessToken: string, clientId: string, expires: Date, user: any, callback: (err: any) => void) => void;

  // Required for `authorization_code` grant type
  getAuthCode?: (authCode: string, callback: (err: any, authCode: { clientId: string; expires: Date; userId: T; }) => void) => void;
  saveAuthCode?: (authCode: string, clientId: string, expires: Date, user: any, callback: (err: any) => void) => void;

  // Required for `password` grant type
  getUser?: (username: string, password: string, callback: (err: any, user: { id: T; }) => void) => void;

  // Required for `refresh_token` grant type
  saveRefreshToken?: (refreshToken: string, clientId: string, expires: Date, user: any, callback: (err: any) => void) => void;
  getRefreshToken?: (refreshToken: string, callback: (err: any, accessToken: { clientId: string; expires: Date; userId: T; }) => void) => void;
  // Optional for `refresh_token` grant type
  revokeRefreshToken?: (refreshToken: string, callback: (err: any) => void) => void;

  // Required for *extension grant* grant type
  extendedGrant?: (grantType: string, req: any, callback: (err: any, supported: boolean, user: { id: T; }) => void) => void;

  // Required for `client_credentials` grant type
  getUserFromClient?: (clientId: string, clientSecret: string, callback: (err: any, user: { id: T; }) => void) => void;

  // Optional
  generateToken?: (type: string, req: any, callback: (err: any, token: string) => void) => void;
}

declare module "oauth2-server" {
  import express = require('express');

  interface oauthserver {
    grant(): express.Handler;
    authorise(): express.Handler;
    authCodeGrant(): express.Handler;
    errorHandler(): express.ErrorRequestHandler;
    lockdown(app: express.Application): void;
    bypass(): void;
  }
  function oauthserver<T>(options: IOAuth2ServerOptions<T>): oauthserver;

  export = oauthserver;
}

