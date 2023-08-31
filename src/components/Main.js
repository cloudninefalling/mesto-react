import CurrentUserContext from "../contexts/CurrentUserContext";
import React from 'react';

export default function Main(props) {
  const userContext = React.useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <button type="button" className="profile__avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${userContext.avatar})` }}></button>
        <div className="profile-info">
          <h1 className="profile-info__name">{userContext.name}</h1>
          <p className="profile-info__occupation">{userContext.about}</p>
          <button className="profile-info__edit-button" type="button" aria-label="редактировать" onClick={props.onEditProfile}></button>
        </div>
        <button className="profile__add-button" type="button" aria-label="новый пост" onClick={props.onAddPlace}></button>
      </section>

      <section className="cards">
        <ul className="elements">
          {props.cards}
        </ul>
      </section>
    </main>
  )
}

