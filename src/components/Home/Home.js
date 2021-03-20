import React from "react";
import Header from "../Header/Header";
import "./Home.css";
import data from "../../fakeData/data.json";
import { useState } from "react";
import { useEffect } from "react";
import Vehicle from "../Vehicle/Vehicle";

const Home = () => {
  const [vehicles, setVehicle] = useState([]);
  useEffect(() => {
    setVehicle(data);
  }, []);
  return (
    <div style={{background:"linear-gradient(#87DDF4, white)"}}>
      <Header></Header>
      <div className="container vehicleDisplay text-center">
        {vehicles.map((vehicle) => (
          <Vehicle vehicle={vehicle} key={vehicle.id}></Vehicle>
        ))}
      </div>
      <div className="text-center">
        <img
          className="image fluid w-100"
          src="https://www.pngkey.com/png/full/217-2172851_cartoon-city-png-svg-download-cartoon-cities.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Home;
