import React, {useContext, useState} from "react";
import PopupWithForm from "./PopupWithForm";

import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  React.useEffect(() => {
    if (!isOpen) {
      setName(currentUser.name || "");
      setDescription(currentUser.about || "");
    }
  }, [isOpen, currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <div className="popup__inputs">
        <div>
          <input
            className="popup__input popup__input_type_name"
            type="text"
            placeholder="Введите Ваше ФИО"
            name="profile-name"
            id="profile-name"
            value={name || ''}
            onChange={handleNameChange}
            required
            minLength="2"
            maxLength="40"
          />
          <span id="profile-name-error" className="popup__error"></span>
        </div>
        <div>
          <input
            className="popup__input popup__input_type_bio"
            type="text"
            placeholder="Введите Ваше Хобби"
            name="profile-bio"
            id="profile-bio"
            value={description || ''}
            onChange={handleDescriptionChange}
          />
          <span id="profile-bio-error" className="popup__error"></span>
        </div>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
