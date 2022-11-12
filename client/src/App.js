import { BrowserRouter, Routes, Route} from "react-router-dom";
import React, { useState,useContext } from "react";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import About from './components/About/About';
import PrivateRoute from './components/AuthComponents/PrivateRoute';
import { AuthLoginInfo }  from './components/AuthComponents/AuthLogin';
import AdminRoute from './components/AuthComponents/AdminRoute';
import LoginRoute from './components/AuthComponents/LoginRoute';
import Login from './components/Login/Login';
import Flights from './components/Flights/Flights';
import AirlineEmpRoute from './components/AuthComponents/AirlineEmpRoute';
import AirportEmpRoute from './components/AuthComponents/AirportEmpRoute';
import GateControl from './components/GateControl/GateConrol';
import AssignBaggage from './components/AssignBaggage/AssignBaggage';
import FlightSchedules from './components/FlightSchedules/FlightSchedules';
import Addschedule from './components/Addschedule/addschedule';

function App() {
  const ctx = useContext(AuthLoginInfo);
  console.log(ctx);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="Content">
          <Routes>
            <Route path="/login" element={
              <LoginRoute>
                <Login />
              </LoginRoute>
            } />
            <Route path='/flights' exact element={
              <PrivateRoute>
                <Flights />
              </PrivateRoute>
            } />
            <Route path='/assignbaggage' element={
              <AirportEmpRoute>
                <AssignBaggage />
              </AirportEmpRoute>
            } />
            <Route path='/gatecontrol' element={
              <AirportEmpRoute>
                <GateControl />
              </AirportEmpRoute>
            } />
            <Route path='/flightschedules' element={
              <AirlineEmpRoute>
                <FlightSchedules />
              </AirlineEmpRoute>
            } />
          </Routes>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
