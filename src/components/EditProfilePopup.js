import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

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

    props.onClose();
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={"edit-profile"}
      title={"Редактировать профиль"}
      submitBtnText={"Сохранить"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="edit-form__text edit-form__text_input_profile-name"
        type="text"
        placeholder="Имя"
        name="name"
        required
        minLength="2"
        maxLength="40"
        value={name || ""}
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
        value={description || ""}
        onChange={handleDescriptionChange}
        required
      />
      <span className="edit-form__input-error-msg" id="about-error"></span>
    </PopupWithForm>
  );
}
