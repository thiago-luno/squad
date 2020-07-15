import React from 'react';

import "./styles.css";

export default function Footer() {

    const date = new Date().getFullYear();
    return (
        <div className="footer">
            {date} - All rights reserved
        </div>
    )
}
