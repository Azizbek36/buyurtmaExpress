import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import './catalog.css';
import { HiArrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../redux/shoping/shoping';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';



function Catalog() {
    const dispatch = useDispatch()
    const { category, type } = useParams()
    const allcard = useSelector(state => state.allcard.cardItem);
    const filteredCards = allcard.filter(card => card.category === category && card.type === type);

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

    // сылки
    const cotegoty = useSelector(state => state.breadcrumbs.cotegoty)
    const subcotegoty = useSelector(state => state.breadcrumbs.subcotegoty)

    return (
        <div className='container'>
            <div className='back-history'><HiArrowLeft /> <NavLink to={"/"}>Главная</NavLink> / <NavLink>{cotegoty.name}</NavLink> / <NavLink>{subcotegoty.name}</NavLink></div>
            <div className="cards">
                {filteredCards.map(el => (
                    <CardItem key={el.id} el={el} />
                ))}
            </div>
        </div>
    )
}

export default Catalog;
