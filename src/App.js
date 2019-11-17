import React from 'react';
import Field from "./components/Field/Field";
import ControlUnit from "./components/ControlUnit/ControlUnit";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
import SliderControlUnit from "./components/SliderControlUnit/SliderControlUnit";
import './App.css';


function App() {
    return (
        <div className="App">
            <SliderControlUnit/>
            <div className='field-container'>
                <ScoreBoard/>
                <ControlUnit/>
                <Field/>
                <LeaderBoard/>
            </div>
        </div>
    )
}


export default App;
