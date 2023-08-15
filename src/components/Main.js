export default function Main(props) {
  return (
    <main className="content">
      <section className="profile">
        <button type="button" className="profile__avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${props.userAvatar})` }}></button>
        <div className="profile-info">
          <h1 className="profile-info__name">{props.userName}</h1>
          <p className="profile-info__occupation">{props.userDescription}</p>
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

