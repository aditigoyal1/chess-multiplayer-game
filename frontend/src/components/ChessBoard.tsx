import { Color, PieceSymbol, Square } from 'chess.js';
import React, { useState } from 'react'
import { MOVE } from './Game';

const ChessBoard = ({ chess, setBoard, board, socket }: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;

  } | null)[][]

  socket: WebSocket | null
  chess: any
  setBoard: any
}
) => {

  const [to, setTo] = useState<Square | null>(null);
  const [from, setFrom] = useState<Square | null>(null);

  return (
    <div className='text-white-200'>
      {board.map((row, i) => {
        return <>
          <div key={i} className='flex'>
            {
              row.map((square, j) => {
                const squareRepresentation = (String.fromCharCode(97 + (j % 8)) + "" + (8 - i)) as Square
                return (<>
                  <div key={j} onClick={() => {
                    console.log("i and j value===>", i, j, squareRepresentation);
                    if (!from) {
                      console.log("setting from")
                      setFrom(squareRepresentation)
                    } else {
                      console.log("inside else")
                      socket?.send(JSON.stringify({
                        type: MOVE,
                        payload: {
                          move: {
                            to: squareRepresentation,
                            from: from
                          }
                        }
                      }))
                      console.log({ from: from, to: squareRepresentation })
                      chess.move({
                        to: squareRepresentation,
                        from: from
                      });
                      setBoard(chess.board())
                      setFrom(null)
                    }

                  }} className={`w-16 h-16 ${(i + j) % 2 === 0 ? 'bg-green-500' : 'bg-white'}`} >
                    <div className='w-full flex justify-center h-full'>
                      <div className='flex flex-col justify-center text-black-400 '>

                        {square ? square.type : ""}
                      </div>

                    </div>

                  </div>
                </>)
              })
            }
          </div>
        </>
      })}
    </div>
  )
}

export default ChessBoard