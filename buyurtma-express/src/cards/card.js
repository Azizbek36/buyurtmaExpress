import React, { useEffect, useRef } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom';
import './card.css';
import { useSelector } from 'react-redux'
import { useInView } from 'react-intersection-observer';
import { addProduct } from '../redux/shoping/shoping';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';



function Card() {
    const splideRef = useRef(null);
    const allcard = useSelector(state => state.allcard.cardItem);
    // новасть слидер 
    const options = {
        type: 'loop', // Изменяем на loop для бесконечного слайдера
        perPage: 1, 
        autoplay: true,
        interval: 3000, // Интервал в миллисекундах между слайдами
        pauseOnHover: true,
        pagination: false,
        arrows: false, // Убираем стрелки (если не нужны)
    };

    // фнукция для того чтобы не загружать кард которые в не видиости экрана
    const CardItem = ({ el }) => {
        const { ref, inView } = useInView({
            threshold: 0,
            triggerOnce: true,
        });
        return (
            <div className='prend_card'>
                <NavLink to={"/catalog/" + el.id} className="card" >
                    <div ref={ref} className="card__image">
                        {inView ? <img src={"../img/" + el.salesman + "/" + el.category + "/" + el.type + "/" + el.img[0]} alt={el.name} />
                            : <div className='product-card-scleton'></div>}
                    </div>
                    <div className="card__bottom">
                        <div className="card__prices">
                            <div className="card__price card__price--discount">{el.price}</div>
                        </div>
                        <div to="#" className="card__title">
                            {el.name}
                        </div>
                    </div>
                    <button className="card__add">В карзину</button>
                </NavLink >
            </div>
        );
    };
    return (
        <div className='container'>
            <div className='news'>
                <Splide
                    options={options}
                    ref={splideRef}
                >
                    <SplideSlide className='new'>
                    <img src={"../img-reclama/1.jpg"} />
                    </SplideSlide>
                    <SplideSlide className='new'>
                    <img src={"../img-reclama/2.jpg"} />
                    </SplideSlide>
                    <SplideSlide className='new'>
                    <img src={"../img-reclama/3.jpg"} />
                    </SplideSlide>
                    <SplideSlide className='new'>
                    <img src={"../img-reclama/4.jpg"} />
                    </SplideSlide>
                </Splide>
            </div>
            <div className="cards">
                {allcard.map(el => (
                    <CardItem key={el.id} el={el} />
                ))}
            </div>
        </div>
    )
}

export default Card;
