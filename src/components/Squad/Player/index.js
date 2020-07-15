
import React from 'react';
import { useDrop } from 'react-dnd';

export default function Player(props) {
    
    const { player, onDrop } = props;

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

    return (
        <div id={"player" + player.id} className={"player player" + player.id} ref={drop}>
            { player.value ? player.value : "+" }
        </div>
    )
}