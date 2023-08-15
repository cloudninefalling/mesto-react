import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import api from '../utils/Api'
import Card from "./Card";

function App() {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});

  React.useEffect(() => {
    api.getProfileInfo()
      .then(res => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      });
    api.getInitialCards()
      .then(res => {
        setCards(res.map(card => {
          return (
            <Card card={card} handleCardClick={handleCardClick} key={card._id} />
          )
        }))
      });
  }, [])

  function handleEditProfileClick() {
    setEditProfileOpen(true)
  }

  function setEditProfileOpen(isClosed) {
    isClosed ?
      document.querySelector('.popup_edit-profile').classList.add('popup_opened') :
      document.querySelector('.popup_edit-profile').classList.remove('popup_opened');
  }

  function handleEditAvatarClick() {
    setEditAvatarOpen(true)
  }

  function setEditAvatarOpen(isClosed) {
    isClosed ?
      document.querySelector('.popup_edit-avatar').classList.add('popup_opened') :
      document.querySelector('.popup_edit-avatar').classList.remove('popup_opened')

  }

  function handleAddPlaceClick() {
    setAddPlaceOpen(true)
  }


  function setAddPlaceOpen(isClosed) {
    isClosed ?
      document.querySelector('.popup_add-card').classList.add('popup_opened') :
      document.querySelector('.popup_add-card').classList.remove('popup_opened');
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function setImagePopupOpen(isClosed) {
    isClosed ?
      document.querySelector('.popup_image').classList.add('popup_opened') :
      document.querySelector('.popup_image').classList.remove('popup_opened');
  }


  function closeAllPopups() {
    setAddPlaceOpen();
    setImagePopupOpen();
    setEditAvatarOpen();
    setEditProfileOpen();
  }


  return (
    <div className="page">

      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        userName={userName}
        userDescription={userDescription}
        userAvatar={userAvatar}
        cards={cards}
      />

      <Footer />

      <PopupWithForm
        name={'edit-profile'}
        title={'Редактировать профиль'}
        children={
          <>
            <input className="edit-form__text edit-form__text_input_profile-name" type="text" placeholder="Имя" name="name" required minLength="2" maxLength="40" />
            <span className="edit-form__input-error-msg" id="name-error"></span>
            <input className="edit-form__text edit-form__text_input_profile-occupation" type="text" placeholder="О себе" name="about" minLength="2" maxLength="200" />
            <span className="edit-form__input-error-msg" id="about-error"></span>
            <button className="edit-form__submit" type="submit" aria-label="сохранить">Сохранить</button>
          </>
        }
        onClose={closeAllPopups}
      />

      <PopupWithForm
        name={'add-card'}
        title={'Новое место'}
        children={
          <>
            <input className="edit-form__text edit-form__text_input_image-name" type="text" placeholder="Название" name="image-name" required minLength="2" maxLength="30" />
            <span className="edit-form__input-error-msg" id="image-name-error"></span>
            <input className="edit-form__text edit-form__text_input_image-link" type="url" placeholder="Ссылка на картинку" name="image-link" required />
            <span className="edit-form__input-error-msg" id="image-link-error"></span>
            <button className="edit-form__submit" type="submit" aria-label="создать">Создать</button>
          </>
        }
        onClose={closeAllPopups}
      />

      <PopupWithForm
        name={'edit-avatar'}
        title={'Обновить аватар'}
        children={
          <>
            <input className="edit-form__text edit-form__text_input_image-link" type="url" placeholder="Ссылка на картинку" name="avatar-link" required />
            <span className="edit-form__input-error-msg" id="avatar-link-error"></span>
            <button className="edit-form__submit" type="submit" aria-label="сохранить">Сохранить</button>
          </>
        }
        onClose={closeAllPopups}
      />

      <PopupWithForm
        name={'confirm-delete'}
        title={'Вы уверены?'}
        children={
          <>
            <button className="edit-form__submit" type="submit" aria-label="создать">Да</button>
          </>
        }
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <template id="element-template">
        <li className="element">
          <img className="element__image" />
          <h2 className="element__title"></h2>
          <div className="element__like-btn-container">
            <button type="button" className="element__like" aria-label="лайк"></button>
            <p className="element__like-count">0</p>
          </div>
          <button type="button" className="element__delete" aria-label="удалить"></button>
        </li>
      </template>
    </div>
  );
}

export default App;
