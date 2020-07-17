
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

export default function Player(props) {
    const { player, onDrop, teste } = props;
    const [ showInfo, setShowInfo] = useState(false);

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'ITEM',
        drop(props, monitor, component) {
            onDrop(props, player)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    function nameInitials(name) {
        let str = name.split(" ")

        if(str.length === 1) {
            let initital = str[0][0];

            if(str[0][1])
                initital += str[0][1]
            if(str[0][2])
                initital += str[0][2]

            return  initital

        } else {
            return `${str[0][0].toUpperCase()} ${str[str.length-1][0].toUpperCase()}`
        }
    }


    return (

        <div 
            id={"player" + player.id} 
            className={"player player" + player.id} 
            ref={drop} 
            onMouseLeave={() => setShowInfo(false)} 
            onMouseOver={() => setShowInfo(true)}>

                {(showInfo && player.value) && 
                <div className="info-player">
                    Name: {player.value} <br/>
                    Born: {player.born}<br/>
                    Nationality: {player.nationality}<br/>
                    Weight: {player.weight}
                </div>}
                { player.value ? nameInitials(player.value) : "+" }
        </div>
    )
}