class AuthApi {
  constructor(options) {
    // тело конструктора
    this.baseurl = options.baseUrl;
    this.headers = options.headers;
  }

  _request(uri, options) {
    return fetch(this.baseurl + uri, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  signUp(email, password) {
    return this._request(`/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });
  }

  signIn(email, password) {
    return this._request(`/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });
  }

  validToken(jwt) {
    return this._request(`/users/me`, {
      method: "GET",
      headers: {
        ...this.headers,
        "Authorization": `Bearer ${jwt}`
      },
    });
  }
}

export const authApi = new AuthApi({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});
