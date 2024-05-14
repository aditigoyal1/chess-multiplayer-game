import { WebSocket } from "ws";
import { Chess } from "chess.js";
import {
  GAME_OVER,
  INIT_GAME,
  MOVE,
  WRONG_PLAYER_MOVE,
  INVALID_MOVE,
} from "./message";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private board: Chess;
  private startTime: Date;
  private moveCount;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();
    this.moveCount = 0;

    // whenever the game start, we need to let them know tht the game has started with their color.

    try {
      this.player1.send(
        JSON.stringify({
          type: INIT_GAME,
          payload: {
            color: "white",
          },
        })
      );

      this.player2.send(
        JSON.stringify({
          type: INIT_GAME,
          payload: {
            color: "black",
          },
        })
      );
    } catch (error) {
      console.log("Errooor==>", error);
      return;
    }
  }

  makeMove(
    socket: WebSocket,
    move: {
      from: string;
      to: string;
    }
  ) {
    console.log("Moved Received", move);
    // validation here whether the correct player moving or not.
    if (this.moveCount % 2 === 0 && this.player1 != socket) {
      console.log("Wrong player Moved", "player1");
      this.player2.send(
        JSON.stringify({
          type: WRONG_PLAYER_MOVE,
          message: "It's not your turn!!",
        })
      );
      return;
    }

    if (this.moveCount % 2 === 1 && this.player2 != socket) {
      console.log("Wrong player Moved", "player2");

      this.player1.send(
        JSON.stringify({
          type: WRONG_PLAYER_MOVE,
          message: "It's not your turn!!",
        })
      );
      return;
    }

    // Is this users move valid or not
    ////Update the board
    try {
      this.board.move(move);
      this.moveCount++;
    } catch (error) {
      console.error(error);
      socket.send(
        JSON.stringify({
          type: INVALID_MOVE,
          message: "Wrong move",
        })
      );
      return;
    }
    console.log("updated the board");

    // check if the game is over or not
    if (this.board.isGameOver()) {
      this.player1.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );

      this.player2.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );
      // return;
    }

    //emit the move and moveCount already increased
    if (this.moveCount % 2 === 0) {
      this.player1.send(
        JSON.stringify({
          type: MOVE,
          payload: {
            move: move,
          },
        })
      );
      return;
    } else {
      this.player2.send(
        JSON.stringify({
          type: MOVE,
          payload: {
            move: move,
          },
        })
      );
      return;
    }
  }
}
