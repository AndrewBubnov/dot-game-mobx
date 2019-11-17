import React, { memo } from 'react'
import * as PropTypes from 'prop-types';
import './Cell.css'

const Cell = ({ width, height, number, value }) => {
    let background = ''
    if (value === 'current') background = '#6495ED'
    else if (value === 'computer') background = '#FF6040'
    else if (value === 'user') background = '#459945'
    return (
        <div id={'_' + number} className='cell' style={{width, height, background}}>
        </div>
    )
}

Cell.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    number: PropTypes.number,
    value: PropTypes.string,
}

export default memo(Cell)