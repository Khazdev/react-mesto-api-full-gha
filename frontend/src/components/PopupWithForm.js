import React from "react";

function PopupWithForm({name, isOpen, onClose, title, buttonText, children, onSubmit}) {

  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="кнопка закрыть попап"
          onClick={onClose}
        ></button>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={name}
          method="get"
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            type="submit"
            // className={`popup__save-button popup__save-button_${name} popup__save-button_disabled`}
            className={`popup__save-button popup__save-button_${name}`}
            // disabled
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
