import React, {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarLinkRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarLinkRef.current.value,
    });
    e.target.reset()
  };

  useEffect(() => {
    if (!isOpen) {
      avatarLinkRef.current.value = "";
    }
  }, [isOpen]);
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <div className="popup__inputs">
        <input
          ref={avatarLinkRef}
          className="popup__input popup__input_type_avatar-link"
          type="url"
          placeholder="Ссылка на картинку"
          name="avatar-link"
          id="avatar-link"
          required
        />
        <span id="avatar-link-error" className="popup__error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
