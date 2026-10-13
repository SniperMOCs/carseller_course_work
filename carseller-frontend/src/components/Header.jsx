import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import authActions from "../actions/auth";
import { Link } from 'react-router-dom';

function Header({user}){
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (user) {
            setCurrentUser(user.user);
        }
    }, [user])

    const logOut = () => {
        dispatch(authActions.logout());
        window.location.reload();
    }

    const changeColorTheme = () => {
        const theme = document.documentElement.getAttribute("data-bs-theme");
        if (theme === "dark"){
            document.documentElement.setAttribute('data-bs-theme', 'light');
            document.getElementById("icon").classList.replace('bi-moon-stars', 'bi-brightness-high-fill');
            document.getElementById("iconBtn").classList.replace('btn-outline-light', 'btn-outline-dark');
        }
        else{
            document.documentElement.setAttribute('data-bs-theme', 'dark');
            document.getElementById("icon").classList.replace('bi-brightness-high-fill', 'bi-moon-stars');
            document.getElementById("iconBtn").classList.replace('btn-outline-dark', 'btn-outline-light');
        }
       
    }

    return (
        <nav className="navbar fixed-top bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand mb-0 h1 text-body-emphasis">CARbon</Link>
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/countries">Страны</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/brands">Марки</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/cars">Модели</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Объявления</Link>
                    </li>
                </ul>
                <div className="nav">
                    <button className="btn btn-outline-light mx-2" id="iconBtn" data-bs-theme-dependant onClick={changeColorTheme}>
                        <span className="bi bi-moon-stars" id="icon"></span>
                    </button>
                    <Link to="/addAd" className="btn btn-primary mx-2">Подать объявление</Link>
                    {currentUser ? (
                    <div className="dropdown">
                        <button className="btn" data-bs-toggle="dropdown">{currentUser.name}</button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <Link className="btn" to="/profile">Профиль</Link>
                            </li>
                            <li>
                                <Link className="btn" to="/chats">Сообщения</Link>
                            </li>
                            <li>
                                <Link className="btn" to="/favorites">Избранное</Link>
                            </li>
                            <li>
                                <Link className="btn" to="/ads/my">Мои объявления</Link>
                            </li>
                            <li>
                                <button className="btn" onClick={logOut}>Выйти</button>
                            </li>
                        </ul>
                    </div>
            ) : (
                <>
                    <Link to="/login" className="btn">Вход и регистрация</Link>
                </>
            )}
                </div>
                
                
                
            </div>
        </nav>
    )
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps)(Header);