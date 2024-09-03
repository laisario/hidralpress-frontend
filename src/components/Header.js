import React from 'react'
import image from '../logo-hidralpress.png'

function Header() {
    return (
        <div style={{ backgroundColor: "#757575", width: "100%" }}>
            <img src={image} style={{ backgroundColor: "#757575", width: "100%" }} alt="Logo Hidralpress" />
        </div>
    )
}

export default Header