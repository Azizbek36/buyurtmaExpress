import { useState, } from "react";
import { motion } from "framer-motion";
import { GoArrowLeft } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import item from "./itms.json"
import { submenu } from "../redux/submenu/submenu";
import { clousmenu } from '../redux/openmenuburger/openburger';
import { cloussubmenu } from "../redux/submenu/submenu";
import { breadcrumbs, subbreadcrumbs } from "../redux/breadcrumbs/breadcrumbs"
import { Icon } from "./icons";


function NavigationDesktop() {
  const dispatch = useDispatch()
  const submenus = useSelector(el => el.opensubmenu.item)

  const allsubmenus = useSelector(el => el.opensubmenu.allitem)
  const rimend = useSelector(el => el.opensubmenu.rimend)
  const openburger = useSelector(state => state.openburger.menu);
  const openClouseMenu = () => {
    dispatch(cloussubmenu())
  }

  // влключить активный класс при навидений
  const [activeCatigory, setActiveCatigory] = useState()
  const ChengingCatigory = (children, category, index) => {
    dispatch(submenu({ children: children, subcotegoty: category }))
    setActiveCatigory(index)
    dispatch(breadcrumbs({ cotegoty: category }))
  }
  const addBredSubCotegory = (subcotegoty) => {
    dispatch(clousmenu(!openburger))
    dispatch(subbreadcrumbs(subcotegoty))
  }

  return (
    <div className="allsubmenu">
      <div className="all-category">
        {item.map((el, index) => (
          <div className={`link-Catalog ${activeCatigory === index ? 'activeCatigory' : ''}`} key={index} onMouseEnter={() => { ChengingCatigory(el.children, el, index) }}>
            <Icon name={el.id} size={"22px"} />
            <div className="type-ctegort" >{el.name}</div>
          </div>
        ))}
      </div>
      {rimend &&
        <div className={`submenu sub-opened`}>
          <h3><GoArrowLeft onClick={() => openClouseMenu()} className="baсkInCatalog" /> <div className="name-catalog">{allsubmenus.name} </div></h3>
          {submenus && submenus.length > 0 && (
            submenus.map((el, index) => (
              <div className="category-submenu" key={index}>
                <NavLink onClick={() => { addBredSubCotegory(el) }} to={"/catalog/" + allsubmenus.id + "/" + el.id}>{el.name}</NavLink>
              </div>
            ))
          )}
        </div>
      }
    </div>
  );
}
export default NavigationDesktop;
