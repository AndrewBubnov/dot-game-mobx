import { dateTime } from "./utils/utils";
import { observable, action, decorate } from "mobx";
import axios from 'axios';


const presetUrl = 'https://dot-game-api.herokuapp.com/api/presets'
const winnerUrl = 'https://dot-game-api.herokuapp.com/api/winner'
const deleteUrl = 'https://dot-game-api.herokuapp.com/api/delete'
const presetError = `Can not get presets from server. The mock data will be used.`
const leaderBoardError = `Can not get leader board from server. Please try to refresh the page.`
const serverSaveError = `Sorry, something's gone wrong on server. Please try again!`


class Store {
    started = false;
    presets = {};
    nextGame = false;
    leaderBoard = [];
    values = {
        preset: {
            field: 5,
            delay: 2000,
        },
        name: ''
    };
    score = {
        computer: 0,
        user: 0
    };
    modalOpen = false;
    errorMessage = '';
    gameField = [];
    winner = '';
    randomIndex = null;

//**********************
    setStart = () => {
        this.started = true;
        this.setResetGame();
        this.setGameProcess()
    }
//**********************

    setGameProcess = () => {
        const {preset: {field, delay: del}} = this.values;
        const {computer, user} = this.score;
        const size = field * field;
        if (computer <= size / 2 && user <= size / 2) {
            setTimeout(() => {
                const gameField = this.gameField
                const array = [...gameField]
                if (gameField[this.randomIndex] === 'current') {
                    array[this.randomIndex] = 'computer'
                    this.addScore(this.score, 'computer', size)
                }
                let index = null;
                while (computer <= size / 2 || user <= size / 2) {
                    index = Math.floor(Math.random() * size)
                    if (gameField[index] === '') break;
                }
                array[index] = 'current';
                this.randomIndex = index;
                this.gameField = array;
                this.setGameProcess();
            }, del)
        }
    };
//**********************

    addScore = (score, player, size) => {
        const newScore = score[player] + 1;
        this.score[player] = newScore;
        if (newScore > size/2) {
            this.setWinner();
        }
    };
//**********************

    setWinner = async () => {
        const { name } = this.values;
        const { user, computer } = this.score;
        const userName = name ? name : 'User';
        const winner = user > computer ? userName : 'Computer';
        this.winner = winner;
        this.nextGame = true;
        try {
            const response = await axios.post(winnerUrl, {winner, date: dateTime()});
            if (response.data.length > 10) response.data.splice(0, response.data.length - 10);
            this.leaderBoard.push(response.data)
        } catch (err) {
            this.modalOpen = true;
            this.errorMessage = err.message || serverSaveError;
        } finally {
            this.started = false;
        }
    };
//**********************

    getPresetsFromServer = async () => {
        try {
            const response = await axios.get(presetUrl);
            this.presets = response.data;
        } catch (err) {
            const presets = {
                easyMode: {field: 5, delay: 2000},
                hardMode: {field: 15, delay: 900},
                normalMode: {field: 10, delay: 1000},
            };
            this.modalOpen = true;
            this.errorMessage = presetError;
            this.presets = presets;
        }
    };
//**********************

    getLeaderBoard = async () => {
        try {
            const response = await axios.get(winnerUrl);
            if (response.data.length > 10) response.data.splice(0, response.data.length - 10);
            this.leaderBoard = response.data;
        } catch (err) {
            this.modalOpen = true;
            this.errorMessage = err.message || leaderBoardError;
        }
    };
//**********************

    onUserClick = (e) => {
        const id = Number(e.target.id.substring(1));
        const {preset: {field} } = this.values;
        const size = field*field;
        if (id === this.randomIndex && this.gameField[this.randomIndex] !== 'user' && !this.winner){
            let array = [...this.gameField];
            array[this.randomIndex] = 'user';
            this.gameField = array;
            this.addScore(this.score, 'user', size)
        }
    };
//**********************

    setModalClosed = () => {
        this.modalOpen = false;
        this.errorMessage = '';
    };
//**********************

    setResetGame = () => {
        const { field } = this.values.preset;
        this.gameField = (Array.from({length: field*field}, v => ''));
        this.score = {computer: 0, user: 0};
        this.winner = '';
    };
//**********************

    handleChange = (e, name) => this.values[name] = e.target.value;
//**********************

    handleSliderChange = (name, value) => this.values.preset[name] = value;
//**********************

    deleteWinner = async (_id) => {
        try {
            const response = await axios.delete(`${deleteUrl}/${_id}`);
            this.leaderBoard = this.leaderBoard.filter(item => item._id !== response.data._id);
        } catch (err) {
            this.modalOpen = true;
            this.errorMessage = err.message;
        }
    }
}

    decorate(Store, {
        started: observable,
        presets: observable,
        nextGame: observable,
        leaderBoard: observable,
        values: observable,
        score: observable,
        modalOpen: observable,
        errorMessage: observable,
        gameField: observable,
        winner: observable,
        randomIndex: observable,

        setStart: action,
        setGameProcess: action,
        addScore: action,
        setWinner: action,
        getPresetsFromServer: action,
        getLeaderBoard: action,
        onUserClick: action,
        setModalClosed: action,
        setResetGame: action,
        handleChange: action,
        handleSliderChange: action,
        deleteWinner: action
    });

const store = new Store();

export default store;
