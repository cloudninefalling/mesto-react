export default function Card(props) {
  return (
    <li className="element" >
      <div className="element__image" style={{ backgroundImage: `url(${props.card.link})` }} onClick={() => props.handleCardClick(props.card)} />
      <h2 className="element__title">{props.card.name}</h2>
      <div className="element__like-btn-container">
        <button type="button" className="element__like" aria-label="лайк"></button>
        <p className="element__like-count">{props.card.likes.length}</p>
      </div>
      <button type="button" className="element__delete" aria-label="удалить"></button>
    </li>
  )
}