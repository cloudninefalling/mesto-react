import React from "react";

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({ avatar: avatarRef.current.value });
    avatarRef.current.value = '';
    props.onClose()
  }

  return (
    <div className={`popup ${props.isOpen && 'popup_opened'} popup_edit-avatar`}>
      <div className="popup__container">
        <form
          className="edit-form"
          name='edit-avatar'
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h2 className="edit-form__title">Обновить аватар</h2>
          <input
            className="edit-form__text edit-form__text_input_image-link"
            type="url"
            placeholder="Ссылка на картинку"
            name="avatar-link"
            required
            ref={avatarRef}
          />
          <span className="edit-form__input-error-msg" id="avatar-link-error"></span>
          <button className="edit-form__submit" type="submit" aria-label='Сохранить'>Сохранить</button>
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