import React, {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

function Main({
                cards,
                onEditAvatar,
                onEditProfile,
                onAddPlace,
                onCardClick,
                onDeleteClick,
                onLikeClick,
              }) {
  const currentUser = useContext(CurrentUserContext);

  const {avatar, name, about} = currentUser;
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img
            className="profile__avatar"
            src={avatar}
            alt="Фотография-аватар"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="редактировать профиль"
            onClick={onEditProfile}
          ></button>
          <p className="profile__bio">{about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить фото-карточку"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements" aria-label="карточки">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onDeleteClick={onDeleteClick}
              onLikeClick={onLikeClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
