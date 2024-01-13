import React, {useState} from "react";
import {Link} from "react-router-dom";

function Register({onRegister}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <section className="authorization">
      <form
        className="authorization__form"
        onSubmit={handleSubmit}
        name="register"
      >
        <h2 className="authorization__title">Регистрация</h2>
        <div className="authorization__inputs">
          <input
            className="authorization__input"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />

          <input
            className="authorization__input"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <button type="submit" className="authorization__submit-button">
          Зарегистрироваться
        </button>
        <div className="authorization__to-sign-in">Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="authorization__sign-in-link">
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Register;
