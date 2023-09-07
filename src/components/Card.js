import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card(props) {
  const userContext = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === userContext._id;
  const isLiked = props.card.likes.some((card) => card._id === userContext._id);

  return (
    <li className="element">
      <div
        className="element__image"
        style={{ backgroundImage: `url(${props.card.link})` }}
        onClick={() => props.handleCardClick(props.card)}
      />
      <h2 className="element__title">{props.card.name}</h2>
      <div className="element__like-btn-container">
        <button
          type="button"
          className={`element__like ${isLiked && "element__like_active"}`}
          aria-label="лайк"
          onClick={() => props.onCardLike(props.card)}
        ></button>
        <p className="element__like-count">{props.card.likes.length}</p>
      </div>
      {isOwn && (
        <button
          type="button"
          className="element__delete"
          aria-label="удалить"
          onClick={() => props.onCardDelete(props.card)}
        ></button>
      )}
    </li>
  );
}
