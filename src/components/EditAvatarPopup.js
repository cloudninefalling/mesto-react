import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  React.useEffect(() => {
    if (!props.isOpen) avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={"edit-avatar"}
      title={"Обновить аватар"}
      submitBtnText={"Сохранить"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="edit-form__text edit-form__text_input_image-link"
        type="url"
        placeholder="Ссылка на картинку"
        name="avatar-link"
        required
        ref={avatarRef}
      />
      <span
        className="edit-form__input-error-msg"
        id="avatar-link-error"
      ></span>
    </PopupWithForm>
  );
}
