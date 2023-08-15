export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name}`}>
      <div className="popup__container">
        <form className="edit-form" name={props.name} noValidate autoComplete="off">
          <h2 className="edit-form__title">{props.title}</h2>
          {props.children}
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


// <div className="popup popup_edit-avatar">
//         <div className="popup__container">
//           <form className="edit-form" name="edit-avatar" noValidate autoComplete="off">
//             <h2 className="edit-form__title">Обновить аватар</h2>
//             <input className="edit-form__text edit-form__text_input_image-link" type="url" placeholder="Ссылка на картинку" name="avatar-link" required />
//             <span className="edit-form__input-error-msg" id="avatar-link-error"></span>
//             <button className="edit-form__submit" type="submit" aria-label="сохранить">Сохранить</button>
//           </form>
//           <button className="popup__close" type="button" aria-label="закрыть"></button>
//         </div>
//       </div>