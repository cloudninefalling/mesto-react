import CurrentUserContext from "../contexts/CurrentUserContext";
import React from "react";
import Card from "./Card";

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          type="button"
          className="profile__avatar"
          onClick={props.onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        ></button>
        <div className="profile-info">
          <h1 className="profile-info__name">{currentUser.name}</h1>
          <p className="profile-info__occupation">{currentUser.about}</p>
          <button
            className="profile-info__edit-button"
            type="button"
            aria-label="редактировать"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="новый пост"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="cards">
        <ul className="elements">
          {props.cards.map((card) => {
            return (
              <Card
                card={card}
                handleCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
                key={card._id}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
