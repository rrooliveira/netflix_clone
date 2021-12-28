import React from 'react';
import './Header.css'

function Header({black}) {
    return (
        <header className={black ? 'black' : ''}>
            <div className='header--logo'>
                <a href='#'>
                    <img src='/images/logonetflix_128.png' alt='Logo Netflix' />
                </a>
            </div>
            <div className='header--user'>
                <img src='/images/user_400x400.png' alt='Logo User' />
            </div>
        </header>
    )
}

export default Header
