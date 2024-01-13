import React from "react";
import success from "../images/success.svg";
import fail from "../images/refuse.svg";

function InfoTooltip({isOpen, onClose, isConfirmStatus, message}) {
  return (
    <section className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        <img
          className="popup__status-image"
          src={isConfirmStatus ? success : fail}
          alt={`Статус регистрации`}
        />
        <h3 className="popup__status-title">
          {message}
        </h3>
      </div>
    </section>
  );
}

export default InfoTooltip;
