import React from "react";

export default function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleLinkChange(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ name, link });
    props.onClose();
  }

  return (
    <div className={`popup ${props.isOpen && 'popup_opened'} popup_add-card`}>
      <div className="popup__container">
        <form
          className="edit-form"
          name='add-card'
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h2 className="edit-form__title">Новое место</h2>
          <input
            className="edit-form__text edit-form__text_input_image-name"
            type="text"
            placeholder="Название"
            name="image-name"
            required
            minLength="2"
            maxLength="30"
            value={name}
            onChange={handleNameChange}
          />
          <span className="edit-form__input-error-msg" id="image-name-error"></span>
          <input
            className="edit-form__text edit-form__text_input_image-link"
            type="url"
            placeholder="Ссылка на картинку"
            name="image-link"
            required
            value={link}
            onChange={handleLinkChange}
          />
          <span className="edit-form__input-error-msg" id="image-link-error"></span>
          <button className="edit-form__submit" type="submit" aria-label='Новое место'>Новое место</button>
        </form>
        <button
          className="popup__close"
          type="button"
          aria-label="закрыть"
          onClick={props.onClose}></button>
      </div>
    </div>
  )
}

