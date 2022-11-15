import React, { useState } from "react";
import './addschedule.css';
import Axios from 'axios'; 
//import '../../App.js'



function Addschedule  ()  {
    const [arlnname, setAirlineName]= useState("");
    const [arptcode, setAirportCode]= useState("");
    const [arrtime, setArrivaltime]= useState("");
    const [gate, setGate]= useState("");
    const [terminal, setTerminal]= useState("");
    const [fltnum, setFlightnumber]= useState("");
    const [source, setSource]= useState("");
    const [destination, setDestination]= useState("");
   

const addscheduleDetails = () =>{
    alert("in addscheduleDetails method")

    Axios.post("http://localhost:8000/addschedule", {
      airlineName: arlnname ,
      airportCode: arptcode, 
      arrivaltime: arrtime,
      gate_num: gate,
      terminal_id: terminal, 
      flight_number_fk: fltnum,
      source: source,
      destination: destination
    }).then((res)=>{
        console.log(res)
      alert("successfully added")
    });
}
    return (
        
        <div class="flex-container">
         <form>
            <label for="arlnname">Airline name:</label>
            <input type="text" id="arlnname" name="arlnname" value={arlnname} onChange={(e)=>{setAirlineName(e.target.value);}}/>
            <br></br>
            <label for="arptcode">Airport code:</label>
            <input type="text" id="arptcode" name="arptcode" value={arptcode} onChange={(e)=>{setAirportCode(e.target.value);}}/>
            <br></br>
            <label for="arrtime">Arrival time:</label>
            <input type="datetime-local" id="arrtime" name="arrtime" value={arrtime} onChange={(e)=>{setArrivaltime(e.target.value);}}/>
            <br></br>
            <label for="gate">Gate:</label>
            <input type="text" id="gate" name="gate" value={gate} onChange={(e)=>{setGate(e.target.value);}}/>
            <br></br>
            <label for="terminal">Terminal:</label>
            <input type="text" id="terminal" name="terminal" value={terminal} onChange={(e)=>{setTerminal(e.target.value);}}/>
            <br></br>
            <label for="fltnum">Flight number:</label>
            <input type="text" id="fltnum" name="fltnum" value={fltnum} onChange={(e)=>{setFlightnumber(e.target.value);}}/>
            <br></br>
            <label for="source">Source:</label>
            <input type="text" id="source" name="source" value={source} onChange={(e)=>{setSource(e.target.value);}}/>
            <br></br>
            <label for="destination">Destination:</label>
            <input type="text" id="destination" name="destination" value={destination}  onChange={(e)=>{setDestination(e.target.value);}}/>
            <br></br>   
            <button onClick={addscheduleDetails}>Add schedule</button>
        </form>
        </div>
    )
  }

  export default Addschedule 
