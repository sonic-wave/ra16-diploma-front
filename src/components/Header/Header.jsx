import React from 'react'
import { Link } from 'react-router-dom';
import { HeaderControls } from './HeaderControls';

export const Header = () => {
    return (
        <header className='container'>
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <Link className="navbar-brand" to="/">
                            <img src={`${import.meta.env.BASE_URL}img/header-logo.png`} alt="Bosa Noga" />
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarMain">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">Главная</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/catalog">Каталог</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about">О магазине</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contacts">Контакты</Link>
                                </li>
                            </ul>
                            <HeaderControls />
                        </div>
                    </nav>
                </div>
            </div>
        </header>


    )
}

