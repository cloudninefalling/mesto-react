import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import api from '../utils/Api'
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [editProfileOpen, setEditProfileOpen] = React.useState(false);
  const [editAvatarOpen, setEditAvatarOpen] = React.useState(false);
  const [addPlaceOpen, setAddPlaceOpen] = React.useState(false);
  const [imagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.getProfileInfo()
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])


  React.useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(res.map(card => {
          return (
            <Card card={card} handleCardClick={handleCardClick} key={card._id} />
          )
        }))
      })
      .catch(err => console.log(err));
  }, [])

  function handleEditProfileClick() {
    setEditProfileOpen(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlaceOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }


  function closeAllPopups() {
    setAddPlaceOpen();
    setImagePopupOpen();
    setEditAvatarOpen();
    setEditProfileOpen();
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          cards={cards}
        />

        <Footer />

        <PopupWithForm
          name={'edit-profile'}
          title={'Редактировать профиль'}
          submitBtnText={'Сохранить'}
          isOpen={editProfileOpen}
          onClose={closeAllPopups}
        >
          <input className="edit-form__text edit-form__text_input_profile-name" type="text" placeholder="Имя" name="name" required minLength="2" maxLength="40" />
          <span className="edit-form__input-error-msg" id="name-error"></span>
          <input className="edit-form__text edit-form__text_input_profile-occupation" type="text" placeholder="О себе" name="about" minLength="2" maxLength="200" />
          <span className="edit-form__input-error-msg" id="about-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name={'add-card'}
          title={'Новое место'}
          isOpen={addPlaceOpen}
          submitBtnText={'Создать'}
          onClose={closeAllPopups}
        >
          <input className="edit-form__text edit-form__text_input_image-name" type="text" placeholder="Название" name="image-name" required minLength="2" maxLength="30" />
          <span className="edit-form__input-error-msg" id="image-name-error"></span>
          <input className="edit-form__text edit-form__text_input_image-link" type="url" placeholder="Ссылка на картинку" name="image-link" required />
          <span className="edit-form__input-error-msg" id="image-link-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name={'edit-avatar'}
          title={'Обновить аватар'}
          isOpen={editAvatarOpen}
          submitBtnText={'Сохранить'}

          onClose={closeAllPopups}
        >
          <input className="edit-form__text edit-form__text_input_image-link" type="url" placeholder="Ссылка на картинку" name="avatar-link" required />
          <span className="edit-form__input-error-msg" id="avatar-link-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name={'confirm-delete'}
          title={'Вы уверены?'}
          submitBtnText={'Да'}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={imagePopupOpen}
          onClose={closeAllPopups} />

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
    </CurrentUserContext.Provider>
  );
}

export default App;
