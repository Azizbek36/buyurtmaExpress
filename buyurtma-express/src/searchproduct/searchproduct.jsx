import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import '../cards/card.css'
import { useDispatch, useSelector } from 'react-redux'
import { useInView } from 'react-intersection-observer';
import { HiArrowLeft } from "react-icons/hi";
import { addProduct } from '../redux/shoping/shoping';




function SearchProduct() {
    const dispatch = useDispatch()
    const allcard = useSelector(state => state.allcard.cardItem);
    const postQuerty = useSelector(state => state.search.postQuerty)



    const CardItem = ({ el }) => {
        const { ref, inView } = useInView({
            threshold: 0,
            triggerOnce: true,
        });
        return (
            <div className='prend_card'>
                <NavLink to={"/catalog/" + el.id} className="card" >
                    <div ref={ref} className="card__image">
                        {inView ? <img src={"/img/" + el.salesman + "/" + el.category + "/" + el.type + "/" + el.img[0]} alt={el.name} />
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
                    <button className="card__add">Посмотреть</button>
                </NavLink >
            </div>
        );
    };
    return (
        <div className='container'>
            {/* {[...new Set(allcard
                .filter(e => e.name.toLowerCase().startsWith(postQuerty.toLowerCase()))
                .map(el => el.name.toLowerCase()))]
                .map((name, index) => (
                    <div key={index} className='back-history'>
                        <HiArrowLeft />
                        <NavLink to={"/"}>Главная</NavLink> /
                        <NavLink>{name}</NavLink>
                    </div>
                ))
            } */}
            <div className="cards">
                {allcard.filter(e => e.name.toLowerCase().startsWith(postQuerty.toLowerCase())).map(el => (
                    <CardItem key={el.id} el={el} />
                ))}
            </div>
        </div>
    )
}

export default SearchProduct;
