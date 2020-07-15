
import React from 'react';

import logoImg from '../../assets/logo-venturus.png';

import './styles.css';

export default function Header() {

    return (
        <header className="header">
            <div className="container">
                <h1 className="content-logo">
                    <img src={logoImg} className="logo-img" alt="venturus" />
                    <p>Squad Management Tool</p>
                </h1>

                <div className="content-avatar">
                    <span className="user-name">Thiago Nunes</span>
                    <span className="avatar">TN</span>
                </div>
            </div>
        </header>
    )
}