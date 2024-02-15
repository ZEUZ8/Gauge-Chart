import { useState } from "react";
import "./App.css";
import Chart from "./Components/Chart";


function App() {
  return (
    <div className=" flex  flex-col items-center gap-4">
      <div className="">
        <div>
          <Chart />
        </div>
        <div>
          <p className="font-light text-teal-400">Today Wage : 780.00 INR</p>
        </div>
      </div>
      <div className=" flex justify-evenly gap-5  w-[300px] cursor-pointer " >
        <div onClick={()=>console.log("clicked Employee Wage Details")} className= "p-4   rounded-xl w-[50%] bg-gradient-to-r from-blue-400 to-green-400 text-xs text-white font-bold flex items-center justify-center">
          Employee Wage Details
        </div>
        <div onClick={()=>console.log("clicked Sitewise Wages")} className="p-4    rounded-xl w-[50%] bg-gradient-to-l from-blue-400 to-green-400 text-xs text-white font-bold flex items-center justify-center">
          Sitewise Wages
        </div>
      </div>
    </div>
  );
}

export default App;
