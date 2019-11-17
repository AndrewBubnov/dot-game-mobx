import React from 'react'
import ScoreItem from "./ScoreItem/ScoreItem";
import * as PropTypes from "prop-types";
import {inject, observer} from "mobx-react";
import './ScoreBoard.css'


const ScoreBoard = inject('store')(observer((props) => {
    const {score: {computer, user}, winner, name} = props.store;
    const userName = name ? name : 'User'
    const scoreString = (
        <div style={{display: 'flex'}}>
            <ScoreItem number={computer}/>
            <span>&nbsp;  :  &nbsp;</span>
            <ScoreItem number={user}/>
        </div>
    )

    const winnerString = winner !== 'Computer' ? <div className='success rotated-winner'>{userName} won</div>
        : <div className='danger rotated-winner'>computer won</div>

    return (
            <div className='score'>
                <div>Computer : {userName}</div>
                { winner ? winnerString : scoreString }
            </div>
    )
}))

ScoreBoard.propTypes = {
    score: PropTypes.shape({
        user: PropTypes.number,
        computer: PropTypes.number,
    }),
    winner: PropTypes.string,
    name: PropTypes.string,
}


export default ScoreBoard
