import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
   const navigate = useNavigate()
  return (
    <div className="flex justify-center">
        <div className="pt-10 ">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* image of chess board */}
        <div className="flex justify-center">
          <img src={"/ChessBoard.png"} className="max-w-96"></img>
        </div>

        {/* Text on right side */}
        
          <div className="pt-15">
            <div className="flex justify-center ">
                <h1 className="pl-2 text-4xl text-white"> Play Chess Online Game !!!</h1>
            </div>
            <div className="mt-4 flex justify-center ">
                <button onClick={()=>{
                    navigate("/game")
                }} className=" bg-green-600 text-white py-4 px-8 rounded font-bold hover:bg-green-900" >Play Online</button>
            </div>
          </div>


        </div>
      
    </div>

    </div>
    
  );
};

export default Landing;
