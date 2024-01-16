class Api {
  constructor(options) {
    // тело конструктора
    this.baseurl = options.baseUrl;
    this.headers = options.headers;
  }

  _request(uri, options) {
    const updatedOptions = {
      ...options,
      headers: {
        ...options.headers
      }
    };

    return fetch(this.baseurl + uri, updatedOptions).then(this._checkResponse);
  }

  getInitialCards() {
    return this._request(`/cards`, {
      headers: this.headers,
      credentials: 'include'
    });
  }

  getUserInfo() {
    return this._request(`/users/me`, {
      headers: this.headers,
      credentials: 'include'
    });
  }

  updateProfile(name, about) {
    return this._request(`/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  addCard(name, link) {
    return this._request(`/cards`, {
      method: "POST",
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(id) {
    return this._request(`/cards/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this.headers,
    });
  }

  _likeCard(id) {
    return this._request(`/cards/${id}/likes`, {
      method: "PUT",
      credentials: 'include',
    });
  }

  _unlikeCard(id) {
    return this._request(`/cards/${id}/likes`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked ? this._unlikeCard(id) : this._likeCard(id);
  }

  updateAvatar(avatarLink) {
    return this._request(`/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}

export const api = new Api({
  baseUrl: "https://api.mesto.khazanov.nomoredomainsmonster.ru",
  headers: {
    "Content-Type": "application/json",
  },
});
