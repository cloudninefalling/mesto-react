class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,
      {
        headers: this._headers
      })
      .then(this._getResponseData)
  }

  toggleLike(card) {
    card.isLiked = !card.isLiked;
    if (card.isLiked) {
      return this._putLike(card)
    } if (!card.isLiked) {
      return this._deleteLike(card)
    }
  }

  _putLike(card) {
    return fetch(`${this._baseUrl}/cards/${card.id}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(this._getResponseData)
      .then(json => {
        card.likes = json.likes;
        return json;
      })
  }

  _deleteLike(card) {
    return fetch(`${this._baseUrl}/cards/${card.id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._getResponseData)
      .then(json => {
        card.likes = json.likes;
        return json;
      })
  }

  deleteImage(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._getResponseData)
  }

  uploadImage(data) {
    return fetch(`${this._baseUrl}/cards`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(this._getResponseData)
  }

  getProfileInfo() {
    return fetch(
      `${this._baseUrl}/users/me`,
      {
        headers: this._headers
      }
    )
      .then(this._getResponseData)
  }

  setProfileInfo({ name, about }) {
    return fetch(
      `${this._baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then(this._getResponseData)
  }

  setAvatar(avatar) {
    return fetch(
      `${this._baseUrl}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({

          avatar: avatar
        })
      })
      .then(this._getResponseData)
  }
}

export default new Api(
  {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
    headers: {
      authorization: '178d6e26-ec7e-4c5c-a9f5-0ee43a6a7b36',
      'Content-Type': 'application/json'
    }
  }
);