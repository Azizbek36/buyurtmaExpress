import { useState, useEffect, useRef } from "react";
import InputState from 'react-input-mask';
import { NavLink } from 'react-router-dom';
import "./registration.css";

function Registration() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };


  const handleSubmit = () => {

    // Проверяем, что номер телефона не пустой и содержит все необходимые символы
    if (phoneNumber.trim() === '' || phoneNumber.replace(/[^\d]/g, '').length < 12) {
      setError('Пожалуйста, введите корректный номер телефона');
      return;
    }
    // Здесь можно добавить логику отправки запроса или выполнения других действий
   return// Сбрасываем ошибку, если все в порядке
  };

  return (
    <div className="contayner">
      <div className="all-from-container">
        <form className="form-container">
          <h2>Войти или создать профиль</h2>
          <InputState
            mask="+\9\98 (99) 999-99-99"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="phone-input"
            placeholder="+998 (__) ___-__-__"
          />
          {error && <p className="error-message">{error}</p>}
          <button onClick={() => handleSubmit()} type="submit" className="submit-button">Получить код</button>
          <p className="sign-in-page__public">Соглашаюсь <NavLink>с правилами пользования торговой площадкой и возврата</NavLink></p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
