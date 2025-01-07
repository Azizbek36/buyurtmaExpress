import React, { useState, useEffect } from 'react'
import './shoping.css'
import { FaPlus, FaMinus } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, increase, changeValue, decrease } from "../redux/shoping/shoping"
import { useMatchMedia } from '../myhook/use-match-media';
import { NavLink } from 'react-router-dom';
import Select from "react-select"
import axios from "axios";
import Swal from "sweetalert2";



function Shoping() {
  const dispatch = useDispatch()
  // Инициализация состояния продуктов в корзине
  const product = useSelector(state => state.shoping.product)
  const total = {
    price: product.reduce((prev, curr) => prev + curr.priceTotal, 0),
    count: product.reduce((prev, curr) => prev + curr.count, 0)
  };

  const [haveShoping, setHaveShoping] = useState(false)
  useEffect(() => {
    // Проверяем, есть ли продукты в корзине
    if (product.length === 0) {
      setHaveShoping(false);
    } else {
      setHaveShoping(true);
    }
  }, [product]);

  // выбор раена
  const options = [
    { value: "Яшнабатский район", label: "Яшнабатский район" },
    { value: "Мирабатский район", label: "Мирабатский район" }
  ]

  // Инициализация состояния для общей стоимости и количества продуктов
  const priceFormatter = new Intl.NumberFormat();
  // Добавляйем весь массив в redux toolkit

  // 
  // промепирование самого продукта который приходит в карзинку
  const products = product.map(el => (
    <div key={el.id} className="product">
      <NavLink to={"/catalog/" + el.id} className="product__img"><img src={"../img/" + el.salesman + "/" + el.category + "/" + el.type + "/" + el.chousimg} alt={el.name} /></NavLink>
      <div className='product-info'>
        <div className="product__title">
          <div className='product_Name'>{el.name}</div>
          <div className="color-size-product">Цветь:{el.color[0].color}</div>
          {el.size !== 'Выберите' ? (
            <div className="color-size-product">Размер: {el.size}</div>
          ) : null}
        </div>
        <div className="count__box">
          <div className="count__controls">
            <FaMinus className="count__down" alt="Decrease" onClick={() => { dispatch(decrease(el.id)) }} />
          </div>
          <input type="number" className="count__input" min="1" max="100"
            value={el.count} onChange={(e) => { dispatch(changeValue({ value: +e.target.value, id: el.id })) }} />
          <div className="count__controls">
            <FaPlus className="count__up" onClick={() => { dispatch(increase(el.id)) }} alt="Increase" />
          </div>
        </div>
        <div className="product__price">{priceFormatter.format(el.priceTotal)}$</div>
        <div className="product__controls">
          <div onClick={() => { dispatch(deleteProduct(el.id)) }}>
            <HiOutlineTrash className='remuve' width="4em" />
          </div>
        </div>
      </div>
    </div>
  ))
  const id_card = product.map((e) => e.id)
  const color_card = product.map((e) => e.color[0].color)
  const size_card = product.map((e) => e.size)
  //открытия и закрытия формления
  const [registration, setRegistration] = useState(false)
  if (registration) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    id: id_card,
    color: color_card,
    size: size_card,
  });

  const [errors, setErrors] = useState({ name: false, phone: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Обновление состояния
    setErrors({ ...errors, [name]: false }); // Убираем ошибку при заполнении поля
  };
  // Обработка нажатия на кнопку
  const handleSubmit = async (e) => {
    const newErrors = {
      name: !formData.name.trim(),
      phone: !formData.phone.trim(),
    };
    setErrors(newErrors);
    if (!newErrors.name && !newErrors.phone) {
      e.preventDefault();
      console.log(e);
      try {
        const response = await axios.post('https://buyurtmaexpress.uz/send-message', formData);
        setErrors(response.data.message);
        setRegistration(false)
        Swal.fire({
          title: "Успех!",
          text: "Ваше сообщение успешно оформлено.",
          icon: "success", // Галочка (иконка успеха)
          background: "#fff",
          width: "300px", // Уменьшенный размер окна
          showConfirmButton: false, // Убираем кнопку OK
          timer: 1000, // Окно автоматически закроется через 0,5 секунды
          customClass: {
            popup: "custom-popup", // Привязываем кастомные стили
          },
        });
      } catch (error) {
        setErrors('Ошибка при отправке сообщения.');
        Swal.fire({
          title: "Ошибка!",
          text: "Ошыбка ваше сообщение не оформлено.",
          icon: "error", // Галочка (иконка успеха)
          background: "#fff",
          width: "300px", // Уменьшенный размер окна
          showConfirmButton: false, // Убираем кнопку OK
          timer: 1000, // Окно автоматически закроется через 0,5 секунды
          customClass: {
            popup: "custom-popup", // Привязываем кастомные стили
          },
        });
        setRegistration(false)
      }
    }
  };


  // мобильная весия офрмления 

  const { isMobile } = useMatchMedia()
  return (
    <div className="container">
      {registration && (
        <div onClick={() => setRegistration(false)} className="onen-shadow-regestreyshen">
          <div onClick={(e) => e.stopPropagation()} className="open-window-registration">
            {isMobile ? (
              <div className="mobile-order-form-container">
                <span className="close" onClick={() => setRegistration(false)}>&times;</span>
                <h2>Оформление заказа (Мобильная версия)</h2>
                <div className="form-group">
                  <label style={{ color: errors.name ? 'red' : 'black' }}>
                    Имя:
                  </label>
                  <input
                    id='name'
                    type="text"
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: errors.phone ? 'red' : 'black' }}>
                    Номер телефона которвй подключен Телеграм:
                  </label>
                  <input
                    id='phone'
                    type="number"
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button onClick={handleSubmit} type="submit" className="submit-button">Оформить заказ</button>
              </div>
            ) : (
              <div className="desktop-order-form-container">
                <span className="close" onClick={() => setRegistration(false)}>&times;</span>
                <h2>Оформление заказа</h2>
                <div className="form-group">
                  <label>Имя:</label>
                  <input
                    id='name'
                    type="text"
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Номер телефона подключонный на Телеграм:</label>
                  <input
                    id='phone'
                    type="number"
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button onClick={handleSubmit} type="submit" className="submit-button">Оформить заказ</button>
              </div>
            )}
          </div>
        </div>
      )
      }
      {haveShoping ? (<section className="section-cart">
        <section className="shoping-cart">
          <div className='added-product'>
            <h1>Корзинка</h1>
            {products}
          </div>
          <div>
            <div className="cart-footer">
              <div className="cart-footer__price"><h1>Общая цена {total.price} $.</h1></div>
              <div className="cart-footer__count"><h1>Товары {total.count} шт.</h1></div>
              <button onClick={() => (setRegistration(true))} className="card__add info-button">Оформить заказ</button>
            </div>
          </div>
        </section>
      </section >)
        :
        (<section className="section-cart-noting">
          <h1 className='shoping-noting'>В корзине пока пусто</h1>
          <p>Загляните на главную, чтобы выбрать товары или найдите нужное в поиске</p>
        </section>)}

    </div>
  )
}
export default Shoping
