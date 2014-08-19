/// <reference path="./oauth2-server.d.ts" />
/// <reference path="../express/express.d.ts" />

import express = require('express');
var bodyParser = require('body-parser');
import oauthserver = require('oauth2-server');

var app = express();

app.use(bodyParser()); // REQUIRED

var oauth = oauthserver({
  model: {
    getClient: function (id: string, secret: string, callback: (err: any, res: any) => void): void {
      callback(false, { clientId: 'thom' });
    },
    grantTypeAllowed: function (clientId: string, grantType: string, callback: (err: any, res: boolean) => void): void {
      callback(false, true);
    },
    getUser: function (username: string, password: string, callback: (err: any, res: any) => void): void {
      callback(false, { id: 1 });
    },
    extendedGrant: function (grantType: string, req: express.Request, callback: (err: any, supported: boolean, res: any) => void): void {
      callback(false, true, { id: 2 });
    },
    getRefreshToken: function (data: any, callback: (err: any, res: any) => void): void {
      callback(false, {
        clientId: 'thom',
        expires: null,
        userId: '123'
      });
    },
    getAccessToken: function (bearerToken: string, callback: (err: any, accessToken: { expires: Date; userId: number; }) => void): void {
      callback(false, { expires: null, userId: 2 });
    },
    saveAccessToken: function (token: string, clientId: string, expires: Date, user: any, cb: (err?: any) => void): void {
      cb();
    },
    saveRefreshToken: function (token: string, clientId: string, expires: Date, user: any, cb: (err?: any) => void): void {
      cb();
    },
    expireRefreshToken: function (refreshToken: string, cb: (err?: any) => void): void {
      cb();
    }
  },
  grants: ['password'],
  debug: true
});

app.all('/oauth/token', oauth.grant());

app.get('/', oauth.authorise(), function (req, res) {
  res.send('Secret area');
});

app.use(oauth.errorHandler());

