// CODE from https://auth0.com/blog/testing-react-applications-with-jest/
import React from 'react';
import Auth0Lock from 'auth0-lock';
import decode from 'jwt-decode';

export default class AuthService {
  constructor() {
    this.cliendId = '';
    this.domain = '';

    this.lock = newAuth0Lock(this.cliendId, this.domain, {});

    this.lock.on('authenticated', this._doAuthentication.bind(this));

    this.login = this.login.bind(this);
  }

  // STEP 1: To get authResult.idtoken??!?!?!?!
  _doAuthentication(authResult) {
    // Save User Token
    this.setToken(authResult.idToken);
  }

  getLock() {
    // An instance of Lock
    return new Auth0Lock(this.cliendId, this.domain, {});
  }

  login() {
    // Calls show method to display the widget.
    this.lock.show();
  }

  // STEP 2: MAKING SURE THERE'S A SAVED TOKEN AND STILL VALID FOR US YUHHH!
  loggedIn() {
    // checks if there is a saved token and it's still valid
    const idToken = this.getToken();
    return idToken && !this.isTokenExpired(idToken);
  }


  // STEP 3: RETRIEVE OUR PRECIOUS USER TOKEN & HOPE IT'S DECODED
  getToken() {
    // Retrieves user token from localStorage
    return localStorage.getItem('id_token');
  }

  logout() {
    // Clear user token and profile data from localStorage
    local.Storage.removeItem('id_token');
  }

  getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken);
    if(!token.exp) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
  }

  isTokenExpired(token) {
    const expirationDate = this.getTokenExpirationDate(token);
    return expirationDate < new Date();
  }

}