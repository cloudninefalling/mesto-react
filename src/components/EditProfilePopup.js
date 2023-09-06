import React from "react"
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser])

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });

    props.onClose()
  }

  return (
    <div className={`popup ${props.isOpen && 'popup_opened'} popup_edit-profile`}>
      <div className="popup__container">
        <form
          className="edit-form"
          name='edit-profile'
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h2 className="edit-form__title">Редактировать профиль</h2>
          <input
            className="edit-form__text edit-form__text_input_profile-name"
            type="text"
            placeholder="Имя"
            name="name"
            required minLength="2"
            maxLength="40"
            value={name}
            onChange={handleNameChange}
          />
          <span className="edit-form__input-error-msg" id="name-error"></span>
          <input
            className="edit-form__text edit-form__text_input_profile-occupation"
            type="text"
            placeholder="О себе"
            name="about"
            minLength="2"
            maxLength="200"
            value={description}
            onChange={handleDescriptionChange}
          />
          <span className="edit-form__input-error-msg" id="about-error"></span>
          <button
            className="edit-form__submit"
            type="submit"
            aria-label='Сохранить'
          >
            Сохранить
          </button>
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