import React from 'react';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import { useDrop } from 'react-dnd';
import { itemTypes } from '../itemTypes';

export default function Field() {
    const [{ canDrop, isOver, teste }, drop] = useDrop({
        accept: 'ITEM',
        drop: (item, monitor) => ({ name: 'Field' , item, monitor}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })
    
    console.log('isOver', isOver)
    console.log('canDrop', canDrop)
    console.log('isDragging'. teste)
    const isActive = canDrop && isOver
    let backgroundColor = '#222'

    if (isActive) {
        backgroundColor = 'darkgreen'
    } else if (canDrop) {
        backgroundColor = 'darkkhaki'
    }

    return (
        <div>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                className="select-formation">

                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value={10}>3-2-2-3</MenuItem>
                <MenuItem value={30}>3-4-3</MenuItem>
                <MenuItem value={30}>3-5-2</MenuItem>
                <MenuItem value={30}>4-2-3-1</MenuItem>
                <MenuItem value={30}>4-3-1-2</MenuItem>
                <MenuItem value={30}>4-4-2</MenuItem>
                <MenuItem value={30}>4-5-2</MenuItem>
                <MenuItem value={30}>5-4-1</MenuItem>
            </Select>

            <div className="field-large f4-4-2 mt-20">
                
                {isActive ? 'Release to drop' : 'Drag a box here'}
                <div className="player player1"  ref={drop}>+</div>
                <div className="player player2"  ref={drop}>+</div>
                <div className="player player3" ref={drop}>+</div>
                <div className="player player4" ref={drop}>+</div>
                <div className="player player5" ref={drop}>+</div>
                <div className="player player6" ref={drop}>+</div>
                <div className="player player7" ref={drop}>+</div>
                <div className="player player8" ref={drop}>+</div>
                <div className="player player9" ref={drop}>+</div>
                <div className="player player10" ref={drop}>+</div>
                <div className="player player11" ref={drop}>+</div>

                <div className="field__marks-large">
                    <div className="field__line-large"></div>
                    <div className="field__circle-large"></div>
                </div>
            </div>
        </div>
    )
}
