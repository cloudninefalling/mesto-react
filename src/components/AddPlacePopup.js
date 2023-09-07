import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [values, setValues] = React.useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(values);
  }

  React.useEffect(() => {
    if (!props.isOpen) {
      setValues({});
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={"add-card"}
      title={"Новое место"}
      submitBtnText={"Новое место"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="edit-form__text edit-form__text_input_image-name"
        type="text"
        placeholder="Название"
        name="image-name"
        required
        minLength="2"
        maxLength="30"
        value={values["image-name"] || ""}
        onChange={handleChange}
      />
      <span className="edit-form__input-error-msg" id="image-name-error"></span>
      <input
        className="edit-form__text edit-form__text_input_image-link"
        type="url"
        placeholder="Ссылка на картинку"
        name="image-link"
        required
        value={values["image-link"] || ""}
        onChange={handleChange}
      />
      <span className="edit-form__input-error-msg" id="image-link-error"></span>
    </PopupWithForm>
  );
}
