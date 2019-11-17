User sets game difficulty and name,
presses PLAY, button gets disabled and changes the caption to PLAYING.
Game difficulty presets are downloaded from API.
Also user is able to select presets manualy, including during the game, which will automatically be displayed.
At a specified in preset time interval a random square on the field is highlighted in blue.
If the user managed to click on the square during this time - it turns green, the player gets a point.
If not, the field turns red and the point goes to the computer.
When a player or computer paints >50% of all possible squares in his color - he becomes the winner.
An inscription appears between the control buttons and the playing field that the player (the name he entered) / computer won.
Button PLAY changes the caption to PLAY AGAIN.
Result of the game are send to API and results in table are auto update. In case of server/internet error a modal popup informs user offering him to try again.
Used React, mobX.
