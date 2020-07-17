import React, {useState, useEffect}  from 'react'

import './styles.css';
import  Api  from '../../services/api'; 




export default function Picked() {
    const [ mostPicked, setMostPicked ] = useState();
    
    useEffect(() => {
        setMostPicked(Api.getMostPickedPlayers());
    }) 
    
    return (
        <div className="field mt-20">
            <div className="field__marks">
                <div className="field__line"></div>
                <div className="field__circle"></div>
            </div>

            <div className="picked left-side">
                <p className="picked__title">Most picked play</p>

                <div className="picked__content-avatar">
                    <span className="picked__avatar">{mostPicked}</span>
                    {/* <span className="picked__average">75%</span> */}
                </div>
            </div>

            {/* <div className="picked right-side">
                <p className="picked__title">Less picked play</p>

                <div className="picked__content-avatar">
                    <div className="picked__avatar">ZZ</div>
                    <div className="picked__average">25%</div>
                </div>
            </div> */}
        </div>
    )
}
