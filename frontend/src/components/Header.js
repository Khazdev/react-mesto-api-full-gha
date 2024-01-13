import logo from "../images/logo.svg";
import React from "react";
import {Link, Route, Routes} from "react-router-dom";

function Header({email, signOut}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого"/>
      <div className="header__container">
        {email && <p className="header__email">{email}</p>}
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className={`header__link`}>
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className={`header__link`}>
                Регистрация
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <Link to="/sign-in" className={`header__link`} onClick={signOut}>
                Выйти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
