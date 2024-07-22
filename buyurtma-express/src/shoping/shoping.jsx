import React, { useState, useEffect } from 'react'
import './shoping.css'
import { FaPlus, FaMinus } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, increase, changeValue, decrease } from "../redux/shoping/shoping"


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

  console.log(product);

  // const [havesize, sethavesize] = useState(false)
  // useEffect(()=>{
  //   if (havesize.length === "выберите") {
  //     sethavesize(false)
  //    alert("false")
  //   } else {
  //     sethavesize(true)
  //     alert("true")
  //   }
  // },[product])


  // Инициализация состояния для общей стоимости и количества продуктов
  const priceFormatter = new Intl.NumberFormat();
  // Добавляйем весь массив в redux toolkit

  // промепирование самого продукта который приходит в карзинку
  const products = product.map(el => (
    <div key={el.id} className="product">
      <div className="product__img"><img src={"../img/" + el.salesman + "/" + el.category + "/" + el.type + "/" + el.chousimg} alt={el.name} /></div>
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
  return (
    <div className="container">
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
              <button className="card__add info-button">Оформить заказ</button>
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
