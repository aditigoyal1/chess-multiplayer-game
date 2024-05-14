import { Game } from "./Game";
import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./message";

export class GameManager {
  private games: Game[];
  private pendingGameUser: WebSocket | null;
  private users: WebSocket[];

  constructor() {
    this.games = [];
    this.users = [];
    this.pendingGameUser = null;
  }

  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandler(socket);
  }

  removeUser(socket: WebSocket) {
    this.users = this.users.filter((user) => user != socket);
    // TODO stop the game here as the user left.
  }

  private addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());
      console.log("message received", message);

      if (message.type == INIT_GAME) {
        if (this.pendingGameUser) {
          // start a game directly as we have two players
          const game = new Game(this.pendingGameUser, socket);
          this.games.push(game);
          this.pendingGameUser = null;
          console.log("Game started");
        } else {
          console.log("Waiting for another user");
          this.pendingGameUser = socket;
        }
      }

      if (message.type == MOVE) {
        console.log("message received type move", message);
        const game = this.games.find(
          (game) => game.player1 == socket || game.player2 == socket
        );
        if (game) {
          console.log("calling make move");
          game.makeMove(socket, message?.payload.move);
        }
      }
    });
  }
}
