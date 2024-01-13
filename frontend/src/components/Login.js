import React, {useState} from "react";

function Login({onLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange({target}) {
    setEmail(target.value);
  }

  function handlePasswordChange({target}) {
    setPassword(target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <section className="authorization">
      <form
        className="authorization__form"
        onSubmit={handleSubmit}
        name="register"
      >
        <h2 className="authorization__title">Вход</h2>
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

        <button type="submit"
                className="authorization__submit-button"
        >
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
