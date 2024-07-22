import Header from './header/header';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import './stiyle.css';
import Card from './cards/card';
import Shoping from './shoping/shoping'
import Registration from './registration/registration';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSecond } from "./redux/card/card"
import Catalog from './catalog/catalog';
import SearchProduct from './searchproduct/searchproduct';
import Infoproduct from './Infoproduct/infoproduct';
import Footer from "./footer/footer"



function App() {
  const dispatch = useDispatch()
    dispatch(fetchSecond())
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Card />} />
        <Route path='/catalog/:category/:type' element={<Catalog />} />
        <Route path='/catalog/1/search' element={<SearchProduct />} />
        <Route path='/catalog/:id' element={<Infoproduct />} />
        <Route path='/shoping' element={<Shoping />} />
        <Route path='/registration' element={<Registration />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}


export default App;
