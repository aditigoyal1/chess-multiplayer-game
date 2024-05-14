import React from "react";
import ChessBoard from "./ChessBoard";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="pt-8 w-full">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-4 bg-red-200 w-full">
            <ChessBoard />
          </div>
          <div className="col-span-2 bg-green-200 w-full">
            <Button
              onClick={() => {
                navigate("/game");
              }}
            >
              Play
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
