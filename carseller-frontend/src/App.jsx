import React, { useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { connect } from "react-redux";

import ListCountries from './pages/country/ListCountries';
import AddCountry from './pages/country/AddCountry';
import CountryData from './pages/country/CountryData';

import ListBrands from './pages/brand/ListBrands';
import AddBrand from './pages/brand/AddBrand';
import BrandData from './pages/brand/BrandData';

import Header from './components/Header';

import ListCars from './pages/car/ListCars';
import AddCar from './pages/car/AddCar';
import CarData from './pages/car/CarData';

import ListAds from './pages/advertisement/ListAds';
import AdData from './pages/advertisement/AdData';
import UpdateAd from './pages/advertisement/UpdateAd';
import AddAd from './pages/advertisement/AddAd';

import Login from "./pages/authorization/Login";
import Register from "./pages/authorization/Register";
import Profile from "./pages/authorization/Profile";
import Chat from './pages/chat/Chat';
import ListChats from './pages/chat/ListChats';
import ChatById from './pages/chat/ChatById';
import ListFavorites from './pages/favorites/ListFavorites';
import MyAds from './pages/advertisement/MyAds';



class App extends React.Component {
    componentDidMount() {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    }

    render() {
        return (
            <BrowserRouter>
                <Header/>
                <div className='pt-5 vw-100'>
                    <Routes>
                        <Route path='/countries' element={<ListCountries/>} />
                        <Route path='/addCountry' element={<AddCountry/>}/>
                        <Route path='/country/:id' element={<CountryData/>}/>

                        <Route path='/brands' element={<ListBrands/>} />
                        <Route path='/addBrand' element={<AddBrand/>}/>
                        <Route path='/brand/:id' element={<BrandData/>}/>

                        <Route path='/cars' element={<ListCars/>} />
                        <Route path='/addCar' element={<AddCar/>}/>
                        <Route path='/car/:id' element={<CarData/>}/>

                        <Route path='/' element={<ListAds/>}/>
                        <Route path='/addAd' element={<AddAd/>}/>
                        <Route path='/ad/:id' element={<AdData/>}/>
                        <Route path='/ad/update/:id' element={<UpdateAd/>}/>
                        <Route path='/ads/my' element={<MyAds/>}/>
                    
                        <Route path="/login" element={<Login/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/profile" element={<Profile/>} />

                        <Route path="/ad/:id/newChat" element={<Chat/>}/>
                        <Route path="chats" element={<ListChats/>}/>
                        <Route path="/chat/:id" element={<ChatById/>}/>

                        <Route path="/favorites" element={<ListFavorites/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        );
    }
}

// функциональность Redux: позволяет передать на перенаправляемые страницы данные
function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

// передача данных к другим компонентам
export default connect(mapStateToProps)(App);
