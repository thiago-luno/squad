import React from 'react';
import { useDrag } from 'react-dnd';

import './styles.css';

export default function LabelPlayer(props) {

    const { player } = props;

    const [{ isDragging }, drag] = useDrag({
        item: {player, type: 'ITEM' },
        end: (item, monitor) => {
            // console.log('item :>> ', item);
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                // alert(`You dropped ${item} into ${dropResult.name}!`)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const css = isDragging ? {"border": "2px solid red", "cursor": "grabbing", "background": "#fff", "color": "#fff", "opacity": "1"} : {"opacity": "1"}
    return (
        <div className="list-players__item" ref={drag} style={css}>
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
