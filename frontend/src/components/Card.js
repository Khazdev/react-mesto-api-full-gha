import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import React, {useContext} from "react";

function Card({card, onCardClick, onDeleteClick, onLikeClick}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like-button ${
    isLiked && "elements__like-button_active"
  }`;

  const handleClick = () => {
    onCardClick(card);
  };
  const handleDeleteClick = () => {
    onDeleteClick(card);
  };
  const handleCardLike = () => {
    onLikeClick(card);
  };

  return (
    <li className="elements__list-item">
      <div className="elements__photo-container" onClick={handleClick}>
        <img
          className="elements__list-item-photo"
          src={card.link}
          alt={card.name}
        />
        <div className="elements__list-item-overlay"></div>
      </div>
      <div className="elements__list-item-description">
        <h2 className="elements__list-item-header">{card.name}</h2>
        <div className="elements__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="сердечко-лайк"
            onClick={handleCardLike}
          ></button>
          <span className="elements__like-counter">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && (
        <button
          className="elements__del-button"
          aria-label="кнопка удаления карточки"
          onClick={handleDeleteClick}
        />
      )}
    </li>
  );
}

export default Card;
