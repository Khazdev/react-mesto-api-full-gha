import PopupWithForm from "./PopupWithForm";
import React, {useState} from "react";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleCardNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCardLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name,
      link
    });
    e.target.reset()
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="add-card"
      title="Новое место"
      buttonText="Создать"
    >
      <div className="popup__inputs">
        <div>
          <input
            className="popup__input popup__input_type_place-name"
            type="text"
            placeholder="Название"
            name="card-place-name"
            id="card-place-name"
            required
            minLength="2"
            maxLength="30"
            value={name}
            onChange={handleCardNameChange}
          />
          <span id="card-place-name-error" className="popup__error"></span>
        </div>
        <div>
          <input
            className="popup__input popup__input_type_place-image-link"
            type="url"
            placeholder="Ссылка на картинку"
            name="card-image-link"
            id="card-image-link"
            required
            value={link}
            onChange={handleCardLinkChange}
          />
          <span id="card-image-link-error" className="popup__error"></span>
        </div>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup
