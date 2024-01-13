import React from "react";

function ImagePopup({card, onClose, isOpened}) {
  const handleClose = () => {
    onClose();
  };

  return (
    <section
      className={`popup popup_type_image ${isOpened && "popup_opened"}`}
      aria-label="увеличенные картинки"
    >
      {card && (
        <figure className="popup__image-container">
          <button
            className="popup__close"
            type="button"
            aria-label="кнопка закрыть попап"
            onClick={handleClose}
          ></button>
          <img className="popup__image" src={`${card.link}`} alt={card.name}/>
          <figcaption className="popup__image-label">{card.name}</figcaption>
        </figure>
      )}
    </section>
  );
}

export default ImagePopup;
