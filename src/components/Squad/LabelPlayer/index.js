import React from 'react';
import { useDrag } from 'react-dnd'
import { itemTypes }
    from '../itemTypes';

export default function LabelPlayer(props) {

    const { player } = props;

    const [{ isDragging }, drag] = useDrag({
        item: {player, type: 'ITEM' },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                console.log('dropResult', dropResult)
                console.log("utem", item)
                alert(`You dropped ${item} into ${dropResult.name}!`)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const border = isDragging ? {"border": "2px solid red", "cursor": "pointer", "background": "#fff", "color": "#fff", "opacity": "0"} : {"opacity": "1"}
    return (
        <div className="list-players__item" ref={drag} style={border}>
            <div className="d-flex flex-direction-column">
                <span><strong>Name:</strong>{player.strPlayer}</span>
                <span><strong>Nacionality:</strong>{player.strNationality}</span>
            </div>
            <div className="d-flex">
                <span><strong>Age:</strong>{player.dateSigned}</span>
            </div>
        </div>
    )
}
