import React, { useState, useEffect } from 'react';
import orderBy from 'lodash/orderBy';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

import { FaPencilAlt, FaShareAlt, FaTrash, FaCaretDown } from 'react-icons/fa';

import './styles.css';

export default function MyTeams(props) {
    const { squads, deleteSquad, createMode } = props;
    const [ sortBy, setOrderBy ] = useState('asc');
    const [ rows, setRows ] = useState(squads);
    
    const IconDelete = React.forwardRef((props, ref) => <div {...props} ref={ref} className="cursor-pointer"><FaTrash /></div>);
    const IconShare = React.forwardRef((props, ref) => <div {...props} ref={ref} className="cursor-pointer"><FaShareAlt /></div>);
    const IconEdit = React.forwardRef((props, ref) => <div {...props} ref={ref} className="cursor-pointer"><FaPencilAlt /></div>);

    function sort(column) {
        const order = sortBy === 'desc' ? 'asc' : 'desc';
        setRows(orderBy(rows, [column], [order]));
        setOrderBy(order);
    }

    useEffect( () => {
        setRows(props.squads)
    }, [props.squads])

    return (
        <>
            <Card className="card-app myTeams">
                <div className="myTeams__header card-app__container-header">
                    <p className="titles myTeams__content-title" >My teams</p>
                    <button className="btn-default  myTeams__content-btn" onClick={() => createMode(true)}>+</button>
                </div>
                <Divider />
                <CardContent className="card-app__container">
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="no-border-bottom">
                                    Name
                                    <TableSortLabel
                                        direction={sortBy === 'desc' ? 'desc' : 'asc'}
                                        onClick={() => sort('name')}
                                        IconComponent={FaCaretDown}
                                        >
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell className="no-border-bottom">
                                    Description
                                    <TableSortLabel
                                        direction={sortBy === 'desc' ? 'desc' : 'asc'}
                                        onClick={() => sort('description')}
                                        IconComponent={FaCaretDown}>
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id} hover >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell className="row">
                                        {row.description}
                                        <div className="style-row-icons">
                                            <Tooltip arrow title="Delete" placement="top">
                                                <IconDelete onClick={()=> deleteSquad(row.id)}/>
                                            </Tooltip>

                                            <Tooltip arrow title="Share" placement="top">
                                                <IconShare />
                                            </Tooltip>
                                            
                                            <Tooltip arrow title="Edit" placement="top">
                                                <IconEdit  onClick={() => createMode(true)}/>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}
