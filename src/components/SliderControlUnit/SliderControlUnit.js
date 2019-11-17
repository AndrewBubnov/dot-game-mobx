import React from 'react'
import * as PropTypes from 'prop-types';
import {controlStyles as useStyles, theme} from '../../styles/styles'
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import {inject, observer} from "mobx-react";

const side = window.innerWidth <= 380 ? window.innerWidth *.95 : 700

const SliderControlUnit = inject('store')(observer((props) => {
    const {values: {preset: {field, delay}}, handleSliderChange} = props.store;

    const classes = useStyles();

    const handleSlider = name => (e, value) => {
        handleSliderChange(name, value)
    };

    return (
        <div style={{width: side}}>
            <MuiThemeProvider theme={theme}>
                <Typography gutterBottom className={classes.slider}>
                    Field size
                </Typography>
                <Slider
                    onChange={handleSlider('field')}
                    value={field}
                    valueLabelDisplay="auto"
                    step={1}
                    min={5}
                    max={20}
                />
                <Typography gutterBottom className={classes.slider}>
                    Delay
                </Typography>
                <Slider
                    onChange={handleSlider('delay')}
                    value={delay}
                    valueLabelDisplay="auto"
                    step={100}
                    min={700}
                    max={2000}
                />
            </MuiThemeProvider>
        </div>
    )
}));



SliderControlUnit.propTypes = {
    handleSliderChange: PropTypes.func,
    values: PropTypes.shape({
        preset: PropTypes.shape({
            field: PropTypes.number,
            delay: PropTypes.number,
        }),
        name: PropTypes.string,
    }),
}

export default SliderControlUnit
