import React, { useEffect } from 'react'
import * as PropTypes from 'prop-types';
import Modal from "../Modal/Modal";
import {inject, observer} from "mobx-react";
import './LeaderBoard.css'

const LeaderBoard = inject('store')(observer((props) => {
    const { leaderBoard, modalOpen, errorMessage,getLeaderBoard, deleteWinner } = props.store;

    useEffect(() => {
        getLeaderBoard()
    }, [getLeaderBoard]);

    const leaderList = leaderBoard.map(item =>
        <div key={item._id} className='leader-board-item' onClick={() => deleteWinner(item._id)}>
            <div className='record'>Winner: {item.winner}</div>
            <div className='record'>Date: {item.date}</div>
        </div>)
    return (
        <>
            <div className='leader-board'>
                {leaderList}
            </div>
            <Modal
                errorMessage={errorMessage}
                modalOpen={modalOpen}
            />
        </>
    )
}))

LeaderBoard.propTypes = {
    getLeaderBoard: PropTypes.func,
    leaderBoard: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        winner: PropTypes.string,
        date: PropTypes.string,
    })),
}

export default LeaderBoard
