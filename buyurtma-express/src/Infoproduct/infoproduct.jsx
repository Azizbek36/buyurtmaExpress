import React, { useEffect, useState, useRef } from 'react';
import { FaShoppingCart, FaCheckCircle } from 'react-icons/fa';
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/shoping/shoping';
import { changeSize, changeImg, changTextColor, searchCard, chengStock, setActiveImg } from '../redux/infoproduct/infoproduct';
import { useMatchMedia } from '../myhook/use-match-media';
import { Splide, SplideSlide } from '@splidejs/react-splide';


// css для слайда
import "./infoproduct.css"

function Infoproduct() {
    const dispatch = useDispatch()
    // код для получения url//
    const { id } = useParams();
    //фильтратция товаров и получения похожего id с card//
    useEffect(() => {
        dispatch(searchCard(id))
    }, [id])
    //фильтратция товаров и получения похожего id с card//

    const filteredCards = useSelector(state => state.infoproduct.selectedCard)

    // изменения количество выбор размера //
    // предаеом для фильтратций  чтобы в неом найти одинаковый размер

    // // изменение числа в "наличий"
    const numberStock = useSelector(state => state.infoproduct.numberSocke)
    // // передаеом началное значение для Infoproduct
    // --------------------------------------------------------------------//
    // Изменения числов оставшихся товаров
    // ----------------------------------------------------------------//
    // // иззменоный цвет товара фото 
    const [isActiveColorImg, setIsActiveSizeColorImg] = useState(0);
    const selseColor = (imgPrdouct, color, index) => {
        dispatch(changeSize(color))
        setIsActiveSizeColorImg(index)
        dispatch(changeImg(imgPrdouct))
        dispatch(changTextColor({ color: color.id, allColor: filteredCards[0].color }))
        dispatch(setActiveImg(imgPrdouct[0]))
    }
    // размер и в наличий
    const objektSize = useSelector(state => state.infoproduct.objektsize)
    const [isActiveSize, setIsActiveSize] = useState(null);
    const changavAilability = (item, index) => {
        dispatch(chengStock({ number: item.size, index: index }))
        setIsActiveSize(index)
    }
    // ------------------------------------//

    // Изменения главно и то что внизу фото //


    const changeImgs = useSelector(state => state.infoproduct.imgProduct)

    // const changeSelectImg = (elm) => {
    //     setActivimg(elm)
    // }
    // ---------------------------------------//
    // Изменения текст цвета 
    const TextColor = useSelector(state => state.infoproduct.textcolor)
    // размер товара
    const nameSize = useSelector(state => state.infoproduct.sizeName)
    const indexSize = useSelector(state => state.infoproduct.index)
    const activimg = useSelector(state => state.infoproduct.activeImg)
    // Изменоеоный обект товара чтобы при выбре всео так как он выбрал
    const chengetProduct = filteredCards.map(item => {
        const id = item.id + isActiveColorImg + indexSize
        return {
            ...item,
            color: TextColor,
            size: nameSize,
            chousimg: activimg,
            id: id
        }
    })

    // --------------------------------------------//

    // Отпровляем в корзину через прверкой выбрал ли человек размер
    const [showModal, setShowModal] = useState();
    const sellInShoping = (card) => {
        if (objektSize.length <= 1) {
            dispatch(addProduct(card))
        }
        else if (isActiveSize === null) {
            setShowModal(true);
        } else {
            dispatch(addProduct(card))
        }
    }
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Надо исправить чтобы при нажатий один раз добвилься в корзину !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! // 
    // const choosetSize = (item, index, card) => {
    //     return (dispatch) => {
    //         dispatch(chengStock({ number: item, index: index }))
    //         setIsActiveSize(index)
    //         setShowModal(false);
    //         dispatch(addProduct(card))
    //     }
    // }

    // ----------------------------------------------------------//
    // Все описвания товара
    const [showDescriptions, setshowDescriptions] = useState(false)
    // отключаем скрол странитцы
    if (showDescriptions) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
    // ----------------------------------------------------------//
    // удаляем слайд при изменения рсширения экрана и добавляем другой
    const { isMobile } = useMatchMedia()
    // ----------------------------------------------------------------//
    // При нажатий на катинку картина сановится на весь экран 
    const primaryCarouselRef = useRef(null);
    const secondaryCarouselRef = useRef(null);

    useEffect(() => {
        // Sync the carousels when they are initialized
        if (primaryCarouselRef.current && secondaryCarouselRef.current) {
            primaryCarouselRef.current.sync(secondaryCarouselRef.current.splide);
            secondaryCarouselRef.current.sync(primaryCarouselRef.current.splide);
        }
    }, []);

    const CustomPrevArrow = ({ onClick }) => (
        <div onClick={onClick} className='nextFotoLeft'><HiArrowLeft style={{ fontSize: "20px", color: 'green' }} /></div>
    );

    const CustomNextArrow = ({ onClick }) => (
        <div onClick={onClick} className='nextFotoRight'><HiArrowRight style={{ fontSize: "20px", color: 'green' }} /></div>
    );

    const optionsMobile = {
        perPage: 1,
        gap: '1rem',
        pagination: false,
        arrows: false,
        pagination: true,
        breakpoints: {
            1024: {
                arrows: false
            },
        },

    };
    const options = {
        perPage: 1,
        gap: '1rem',
        pagination: false,
        arrows: false,
        breakpoints: {
            1024: {
                arrows: false
            },
        },

    };
    const optionsForSecondSplide = {
        perPage: 4,
        pagination: false,
        isNavigation: true,
        arrows: true,
        arrowPath: '',
    };
    // -----------------------------------------------------//


    return (
        <div>
            <div className="container">
                {chengetProduct.map((el, index) => (
                    <div  key={index}>
                        <div className='back-history'><HiArrowLeft /> <NavLink to={"/"}>Главная</NavLink> / <NavLink>{el.name}</NavLink> / <NavLink>{el.nameStor}</NavLink></div>
                        <div className="product_info">
                            {isMobile ? (
                                <div className="product-imgs">
                                    <div className="img-showcase" >
                                        <Splide options={optionsMobile} ref={primaryCarouselRef}  >
                                            <div className="splide__arrows">
                                                <button className="splide__arrow splide__arrow--prev">
                                                    Prev
                                                </button>
                                                <button className="splide__arrow splide__arrow--next">
                                                    Next
                                                </button>
                                            </div>
                                            {Object.keys(objektSize).length !== 0 && Array.isArray(objektSize) && changeImgs.map((elm, index) => (
                                                <SplideSlide key={index}> <img src={"../img/" + el.salesman + "/" + el.category + "/" + el.type + "/" + elm} alt="shoe image" /></SplideSlide>
                                            ))}
                                        </Splide>
                                    </div>
                                </div>
                            ) : (
                                <div className="product-imgs">
                                    <div className="img-showcase" >
                                        <Splide options={options} ref={primaryCarouselRef} >
                                            {Object.keys(objektSize).length !== 0 && Array.isArray(objektSize) && changeImgs.map((elm, index) => (
                                                <SplideSlide key={index}> <img src={"../img/" + el.salesman + "/" + el.category + "/" + el.type + "/" + elm} alt="shoe image" /></SplideSlide>
                                            ))}
                                        </Splide>
                                    </div>
                                    <div className="all-img-select splide__track">
                                        <Splide options={optionsForSecondSplide} ref={secondaryCarouselRef} >
                                            {Object.keys(objektSize).length !== 0 && Array.isArray(objektSize) && changeImgs.map((elm, index) => (
                                                <SplideSlide key={index} className={`img-item`}> <img src={"../img/" + el.salesman + "/" + el.category + "/" + el.type + "/" + elm} alt="shoe image" /></SplideSlide>
                                            ))}
                                        </Splide>
                                    </div>

                                </div>
                            )}

                            <div className="product-content">
                                <h2 className="product-title">{el.name}</h2>
                                <div className="name-compony"><span>от: <FaShoppingCart style={{ color: 'green' }} /> inbazar</span></div>
                                <div className='all-color-product'>
                                    <div className="text-color">Цвет: {Object.keys(TextColor).length !== 0 && Array.isArray(TextColor) && TextColor[0].color}</div>
                                    <div className="color-product">
                                        {el.colorPprduct.map((elm, index) => (
                                            <div key={index} className={`color-img-item ${isActiveColorImg === index ? "color-img-item-active " : ""}`}>
                                                <div>
                                                    <img width="70px" height="70px" src={"../img/" + el.salesman + "/" + el.category + "/" + el.type + "/" + elm.colorImg} alt="shoe image" onClick={() => selseColor(elm.img, elm, index)} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                {objektSize.length > 1 && (
                                    <div className="all-product-size">
                                        {showModal ? (
                                            <div style={{ color: "red" }}>Размер: Выберите</div>

                                        ) : (
                                            <div>Размер: {el.size}</div>
                                        )}
                                        <div className='product-size'>
                                            {Object.keys(objektSize).length !== 1 && Array.isArray(objektSize) && objektSize.map((item, index) => (
                                                <div key={index} onClick={() => changavAilability(item, index)} className={`size ${isActiveSize === index ? "activeSize" : ""}`}>{item.size}</div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {isMobile &&
                                    <div className="product-info-prise-mobile">
                                        <div className="prise"><h1>{el.priceTotal}$</h1></div>
                                        <div className="stock-sales-mobile">
                                            <div className="amt stock-mobile"><FaShoppingCart style={{ color: 'green' }} /> <div> Наличий: {numberStock} </div></div>
                                            <div className="amt sales-mobile"><FaCheckCircle style={{ color: 'green' }} /><div> Продано: 357 </div></div>
                                        </div>
                                    </div>
                                }
                                {/* открытыие модалки */}
                                {/* {showModal && (
                                <div onClick={() => setShowModal(false)} className="modal">
                                    <div onClick={(e) => e.stopPropagation()} className="modal-content">
                                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                                        <div className="all-product-size">
                                            <div className="popular-header">Выберите размер</div>
                                            <div className='product-size'>
                                                {Object.keys(objektSize).length !== 1 && Array.isArray(objektSize) && objektSize.map((item, index) => (
                                                    <div key={index} onClick={() => choosetSize(item, index, el)} className={`size ${isActiveSize === index ? "activeSize" : ""}`}>{item.size}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )} */}
                                {/* ------------------------- */}
                                {/* Все описвания товара */}
                                <div className="all-cherectristic">
                                    {el.Information.map((ele, index) => (
                                        <div key={index} className='product_information'>
                                            <div className="params__col">
                                                <span>{ele.question}</span>
                                            </div>
                                            <div className="all-info-s">
                                                <span className='info-s'>{ele.answer}</span>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="all-info-product">
                                        <NavLink onClick={() => setshowDescriptions(true)} >Все характеристики и описание</NavLink>
                                    </div>
                                </div>
                                {showDescriptions && (
                                    <div onClick={() => setshowDescriptions(false)} className="descriptions">
                                        <div onClick={(e) => e.stopPropagation()} className="descriptions-content">

                                            <span className="close" onClick={() => setshowDescriptions(false)}>&times;</span>
                                            <div className="all-informytion">
                                                <h3>Информатция о товаре</h3>
                                                {el.Information.map((ele, index) => (
                                                    <div key={index} className='product_information'>
                                                        <div className="params__col">
                                                            <span>{ele.question}</span>
                                                        </div>
                                                        <div className="all-info-s">
                                                            <span className='info-s'>{ele.answer}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="all-descriptions">
                                                <h3>Описания</h3>
                                                <div className="discriptions">
                                                    {el.descriptions.descriptions}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* ----------------------------------- */}
                            </div>
                            {isMobile ?
                                <div className='all-info-prise-mobil'>
                                    <div className='prise'><h1>{el.priceTotal}$</h1></div>
                                    <div className='card__add_mobile'>
                                        <button onClick={() => sellInShoping(el)} className="card__add ">Добавить в корзину</button>
                                    </div>
                                </div>
                                :
                                <div className="all-info-prise">
                                    <div className='all-product-info-prise'>
                                        <div className="product-info-prise">
                                            <div className="prise"><h1>{el.priceTotal}$</h1></div>
                                            <div className="stock-sales">
                                                <div className="stock"><FaShoppingCart style={{ color: 'green' }} /> Наличий: {numberStock}</div>

                                                <div className="sales"><FaCheckCircle style={{ color: 'green' }} /> Продано: 357</div>
                                            </div>
                                            <div className="delivery-time">
                                                <div className="contry-deliver"><strong>Доставляем:</strong> по всему Узбекистану</div>
                                                <div><strong>Время доставки:</strong> от 4 часов до 3 дней исходя от адреса доставки</div></div>
                                            <button onClick={() => sellInShoping(el)} className="card__add info-button">Добавить в корзину</button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                ))}

                <div className="all-reviews-questions">
                    <div className="reviews-questions">
                        <div className="all-reviews">
                            <h1>Одзывы</h1>
                        </div>
                        <div className="all-questions">
                            <h1>Вапросы</h1>
                        </div>
                    </div>
                </div>

            </div>

        </div >

    );
}
export default Infoproduct;
