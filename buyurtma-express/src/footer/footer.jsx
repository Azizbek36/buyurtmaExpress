import React from 'react';
import "./footer.css"

export default function App() {
  return (
  <footer className="footer">
     <div className="container">
      <div className="row">
        <div className="footer-col">
          <h4>Покупателям</h4>
          <ul>
            <li><a href="#">Как сделать заказ</a></li>
            <li><a href="#">Способы оплаты</a></li>
            <li><a href="#">Доставка</a></li>
            <li><a href="#">Возврат товара</a></li>
            <li><a href="#">Возврат денежных средств</a></li>
            <li><a href="#">Правила продажи</a></li>
            <li><a href="#">Правила пользования торговой площадкой</a></li>
            <li><a href="#">Политика обработки персональных данных</a></li>
            <li><a href="#">Вопросы и ответы</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Партнерам</h4>
          <ul>
            <li><a href="#">Продавайте на BuyurtmaExpress</a></li>
            <li><a href="#">Партнерский пункт выдачи</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Компания</h4>
          <ul>
            <li><a href="#">О нас</a></li>
            <li><a href="#">Реквизиты</a></li>
            <li><a href="#">Пресс-служба</a></li>
            <li><a href="#">Контакты</a></li>
            <li><a href="#">Горячая линия</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>follow us</h4>
          <div className="social-links">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-telegram"></i></a>
          </div>
        </div>
      </div>
     </div>
  </footer>
  );
}