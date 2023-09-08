import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [editProfileOpen, setEditProfileOpen] = React.useState(false);
  const [editAvatarOpen, setEditAvatarOpen] = React.useState(false);
  const [addPlaceOpen, setAddPlaceOpen] = React.useState(false);
  const [imagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    //set initial profile
    api
      .getProfileInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });

    //set initial cards
    api
      .getInitialCards()
      .then(setCards)
      .catch((err) => console.log(err));
  }, []);

  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceOpen(true);
  }

  function closeAllPopups() {
    setAddPlaceOpen();
    setImagePopupOpen();
    setEditAvatarOpen();
    setEditProfileOpen();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (likedUser) => likedUser._id === currentUser._id
    );

    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((cardInState) => {
            return cardInState._id === newCard._id ? newCard : cardInState;
          })
        );
      })
      .catch(console.log);
  }

  function handleCardDelete(card) {
    api
      .deleteImage(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((cardInState) => {
            return cardInState._id != card._id;
          })
        );
      })
      .catch(console.log);
  }

  function handleUpdateUser({ name, about }) {
    api
      .setProfileInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);
      })
      .then(closeAllPopups)
      .catch(console.log);
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(closeAllPopups)
      .catch(console.log);
  }

  function handleAddPlace({ "image-name": name, "image-link": link }) {
    api
      .uploadImage({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(closeAllPopups)
      .catch(console.log);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />

        <Footer />

        <EditProfilePopup
          isOpen={editProfileOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={addPlaceOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <EditAvatarPopup
          isOpen={editAvatarOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>

        <PopupWithForm
          name={"confirm-delete"}
          title={"Вы уверены?"}
          submitBtnText={"Да"}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={imagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
