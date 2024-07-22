import React, { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setisOpen } from '../redux/search/search';



function SearchCard({ setheandseatrch, setSearchParams }) {
    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch()
    const tooltipRef = useRef(null)
    const suggestions = useSelector(state => state.search.suggestions);

    // при нажатий на кнопу изменяется URL

    const headsearche = (text) => {
        navigate("catalog/1/search")
        setheandseatrch(text)
        if (location.pathname === "/catalog/1/search") {
            // Обновляем параметры запроса
            setSearchParams({ search: text });
        }

        dispatch(setisOpen(false))
    }
    // --------------------------------------//
    return (
            <div ref={tooltipRef} className="subsearch">{suggestions.map(el => (
                <div key={el.id} onClick={() => { headsearche(el.name) }} className='subsearch-item'>{el.name}</div>
            ))}
            </div>
    )
}

export default SearchCard
