import React, { useEffect, useRef } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom';
import './card.css';
import { useSelector } from 'react-redux'
import { useInView } from 'react-intersection-observer';
import { addProduct } from '../redux/shoping/shoping';
import { Splide, SplideSlide } from '@splidejs/react-splide';




function Card() {
    const splideRef = useRef(null);
    const allcard = useSelector(state => state.allcard.cardItem);
    // новасть слидер 
    const options = {
        type: 'fade',
        perPage: 1,
        autoplay: true,
        pauseOnHover: true,
        pagination: false,
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
                    <div className="splide__arrows">
                        <button className="splide__arrow splide__arrow--prev">
                            Prev
                        </button>
                        <button className="splide__arrow splide__arrow--next">
                            Next
                        </button>
                    </div>
                    <SplideSlide className='new'>
                        1
                    </SplideSlide>
                    <SplideSlide className='new'>
                        2
                    </SplideSlide>
                    <SplideSlide className='new'>
                        3
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
