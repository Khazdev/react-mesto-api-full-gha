class Api {
  constructor(options) {
    // тело конструктора
    this.baseurl = options.baseUrl;
    this.headers = options.headers;
  }

  _request(uri, options) {
    return fetch(this.baseurl + uri, options).then(this._checkResponse);
  }

  getInitialCards() {
    return this._request(`/cards`, {
      headers: this.headers,
    });
  }

  getUserInfo() {
    return this._request(`/users/me`, {
      headers: this.headers,
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
      headers: this.headers,
    });
  }

  _likeCard(id) {
    return this._request(`/cards/${id}/likes`, {
      method: "PUT",
      headers: this.headers,
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
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-76",
  headers: {
    authorization: "beb01290-b862-4e63-9356-a8cedbbf4df4",
    "Content-Type": "application/json",
  },
});
