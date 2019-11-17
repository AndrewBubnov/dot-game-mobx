import React from 'react'
import * as PropTypes from "prop-types";
import './ScoreItem.css'

const ScoreItem = ({ number }) => {
    return <span className='rotated-score' key={number}>{number}</span>
}

ScoreItem.propTypes = {
    number: PropTypes.number,
}

export default ScoreItem