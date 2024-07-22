import React from 'react';
import "./footer.css"

export default function App() {
  return (
  <footer class="footer">
     <div class="container">
      <div class="row">
        <div class="footer-col">
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
            <li><a href="#">Проверка совместимости</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Партнерам</h4>
          <ul>
            <li><a href="#">Продавайте на Wildberries</a></li>
            <li><a href="#">Водителям</a></li>
            <li><a href="#">Курьерам</a></li>
            <li><a href="#">Перевозчикам</a></li>
            <li><a href="#">Партнерский пункт выдачи</a></li>
            <li><a href="#">Франшизный пункт выдачи</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Компания</h4>
          <ul>
            <li><a href="#">О нас</a></li>
            <li><a href="#">Реквизиты</a></li>
            <li><a href="#">Пресс-служба</a></li>
            <li><a href="#">Контакты</a></li>
            <li><a href="#">Bug Bounty</a></li>
            <li><a href="#">Горячая линия</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>follow us</h4>
          <div class="social-links">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
     </div>
  </footer>
  );
}