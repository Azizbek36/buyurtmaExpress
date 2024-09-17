import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHouse, faCartShopping, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import './header.css';
import React, { useState, useEffect } from 'react';
import { NavLink, useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import NavigationDesktop from "./NavigationDesktop"
import { cloussubmenu } from "../redux/submenu/submenu";
import { useDispatch, useSelector } from 'react-redux'
import { setopenburger } from '../redux/openmenuburger/openburger';
import { nameSearchURL, addSearchCards, setisOpen } from '../redux/search/search';
import { useMatchMedia } from '../myhook/use-match-media';
import SearchCard from './searchcard';


function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  const dispatch = useDispatch()
  const product = useSelector(state => state.shoping.product)
  const openburger = useSelector(state => state.openburger.menu);
  const openClouseMenu = (item) => {
    dispatch(cloussubmenu(false))
    dispatch(setopenburger(item))
  }
  //поисковик
  const allcard = useSelector(state => state.allcard.cardItem);
  const isOpen = useSelector(state => state.search.isOpen)
  const handleSearchInputChange = (value) => {
    setheandseatrch(value)

    // фильтрирует имена трваров который похожн на ведеоный текст в input
    const search = allcard.filter((el) => {
      return value && el && el.name && el.name.toLowerCase().startsWith(value.toLowerCase())
    })
    dispatch(addSearchCards(search))
  }

  //Поисковик товаров по URL
  const [SearchParams, setSearchParams] = useSearchParams()
  const postQuery = SearchParams.get("search") || "";
  useEffect(() => {
    dispatch(nameSearchURL(postQuery));
  }, [dispatch, postQuery]);

  const [hendsearch, setheandseatrch] = useState(postQuery)

  // при нажатий на кнопу изменяется URL
  const headsearch = () => {
    navigate("catalog/1/search")
    if (location.pathname === "/catalog/1/search") {
      // Обновляем параметры запроса
      setSearchParams({ search: hendsearch });
    }
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Вызываем вашу определенную функцию
      headsearch();
    }
  };
  //при переходе в новую странитцу сразу добавить в URL текст ведеонный в URL для поиска товаров
  useEffect(() => {
    // Проверяем текущий путь
    if (location.pathname === "/catalog/1/search") {
      // Обновляем параметры запроса
      setSearchParams({ search: hendsearch });
    }
  }, [location.pathname]);

  // Иконка актив в мобильном версий //

  const [menuIconseMobile, setmenuIconseMobile] = useState("house")
  const handleItemClick = (boolen, itemName) => {
    setmenuIconseMobile(itemName);
    openClouseMenu(boolen)
  };

  const { isMobile } = useMatchMedia()
  // -------------------------------------------------- //

  return (
    <div>
      {isOpen && isMobile ?  <header className={`header-mobile`}>
        <div className="frtend-header">
          <div>
            <h1 onClick={() => { dispatch(setisOpen(false)) }} className="logo"><NavLink to={"/"}>BuyurtmaExpress</NavLink></h1>
          </div>
          <nav>
            <div className={`burger-btn ${openburger ? "active" : ""}`} onClick={() => openClouseMenu(!openburger)}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </nav>
          <div className="search-container">
            <input
              type="search"
              className="search-text"
              name='search'
              id="searchInput"
              placeholder="Найти на BuyurtmaExpress"
              value={hendsearch}
              onChange={el => { handleSearchInputChange(el.target.value) }}
              onClick={() => { dispatch(setisOpen(true)) }}
              onKeyDown={handleKeyDown}
            />
            {isOpen &&
              <SearchCard setheandseatrch={setheandseatrch} setSearchParams={setSearchParams} />
            }

            <div onClick={() => { headsearch() }} className="btn btn_common"  >
              <FontAwesomeIcon icon={faSearch} className="fas fa-search" />
            </div>
          </div>
          <div className="icon-links">
            <NavLink to="/shoping" className="user-actions">
              <FontAwesomeIcon icon={faCartShopping} className="fa-thin fa-cart-shopping" />
              <span>{product.length}</span>
              <div>Корзина</div>
            </NavLink>
            <NavLink to="/registration" className="user-actions">
              <FontAwesomeIcon icon={faUser} style={{ color: '#FFF', height: '24px', width: "24px" }} className="fa-solid fa-user" />
              <div>Вход</div>
            </NavLink>
          </div>
        </div>
      </header> : <header className={`header`}>
        <div className="frtend-header">
          <div>
            <h1 onClick={() => { dispatch(setisOpen(false)) }} className="logo"><NavLink to={"/"}>BuyurtmaExpress</NavLink></h1>
          </div>
          <nav>
            <div className={`burger-btn ${openburger ? "active" : ""}`} onClick={() => openClouseMenu(!openburger)}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </nav>
          <div className="search-container">
            <input
              type="search"
              className="search-text"
              name='search'
              id="searchInput"
              placeholder="Найти на BuyurtmaExpress"
              value={hendsearch}
              onChange={el => { handleSearchInputChange(el.target.value) }}
              onClick={() => { dispatch(setisOpen(true)) }}
              onKeyDown={handleKeyDown}
            />
            {isOpen &&
              <SearchCard setheandseatrch={setheandseatrch} setSearchParams={setSearchParams} />
            }

            <div onClick={() => { headsearch() }} className="btn btn_common"  >
              <FontAwesomeIcon icon={faSearch} className="fas fa-search" />
            </div>
          </div>
          <div className="icon-links">
            <NavLink to="/shoping" className="user-actions">
              <FontAwesomeIcon icon={faCartShopping} className="fa-thin fa-cart-shopping" />
              <span>{product.length}</span>
              <div>Корзина</div>
            </NavLink>
            <NavLink to="/registration" className="user-actions">
              <FontAwesomeIcon icon={faUser} style={{ color: '#FFF', height: '24px', width: "24px" }} className="fa-solid fa-user" />
              <div>Вход</div>
            </NavLink>
          </div>
        </div>
      </header>}
      
      {/* тень для посиковика */}
      {isMobile ? <div onClick={() => { dispatch(setisOpen(false)) }} className={`${isOpen ? "overlay-mobil" : ""}`}></div>
       : 
       <div onClick={() => { dispatch(setisOpen(false)) }} className={`${isOpen ? "overlay" : ""}`}></div>}
      {/* ---------------------------------------------- */}
      {/*тень для меню бургера*/}
      <div onClick={() => openClouseMenu()} className={`background ${openburger ? "active" : ""}`}></div>
      { /* ---------------------------------------------------*/}

      <div className={`burger-menu ${openburger ? "menu-opened openSubmit" : ""}`}>
        <NavigationDesktop />
      </div>
      <div className="navbar-mobile">
        <div onClick={() => handleItemClick(false, "house")}>
          <NavLink to="/"><FontAwesomeIcon icon={faHouse} className={`fa-light fa-house icon-mobile-menu ${menuIconseMobile === "house" ? "icon-mobile-menu-active" : ""}`} /></NavLink>
        </div>
        <div onClick={() => handleItemClick(!openburger, "bars")}>
          <FontAwesomeIcon icon={faBars} className={`fa-solid fa-bars icon-mobile-menu  ${menuIconseMobile === "bars" ? "icon-mobile-menu-active" : ""}`} />
        </div>
        <div onClick={() => handleItemClick(false, "shopping")}>
          <NavLink to="/shoping"><FontAwesomeIcon icon={faCartShopping} className={`fa-thin fa-cart-shopping icon-mobile-menu ${menuIconseMobile === "shopping" ? "icon-mobile-menu-active" : ""}`} /></NavLink>
        </div>
        <div onClick={() => handleItemClick(false, "user")}>
          <NavLink to="/registration"><FontAwesomeIcon icon={faUser} className={`fa-solid fa-user icon-mobile-menu ${menuIconseMobile === "user" ? "icon-mobile-menu-active" : ""}`} /></NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header