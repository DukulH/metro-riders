import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../Header/Header";
import "./Destination.css";
import data from "../../fakeData/fareChart.json";
import Chart from "../Chart/Chart";
import ReactMapGL from "react-map-gl";

const Destination = () => {
  const [viewport, setViewport] = useState({
    width: 500,
    height: 500,
    latitude: 23.8103,
    longitude: 90.4125,
    zoom: 8,
  });
  const { id } = useParams();
  const [selectedVehicle, setSelectedVehicle] = useState({});
  useEffect(() => {
    const vehicle = data.filter((element) => element.id === parseInt(id));
    setSelectedVehicle(vehicle);
  }, [id]);
  const [location, setLocation] = useState({
    isSet: false,
    from: "",
    to: "",
  });
  let getValue = false;
  const handleBlur = (event) => {
    if (event.target.name === "from") {
      getValue = true;
    }
    if (event.target.name === "to") {
      getValue = true;
    }

    if (getValue) {
      const locationInfo = { ...location };
      locationInfo[event.target.name] = event.target.value;
      setLocation(locationInfo);
      if (location.from && location.to) {
      }
    }
  };
  const handleToggle = () => {
    if (location.from && location.to) {
      const locationInfo = { ...location };
      locationInfo.isSet = true;
      setLocation(locationInfo);
    }
  };

  return (
    <>
      <Header></Header>
      <div className="container d-flex searchArea mt-5 text-center">
        <div className="left-item">
          {!location.isSet && (
            <>
              <div>
                <h5 className="mt-3 p-3 text-secondary text-left">Pick From</h5>
                <input
                  type="text"
                  className="rounded p-2 pl-4 pr-5 border-0"
                  placeholder="From"
                  name="from"
                  onBlur={handleBlur}
                  required
                />
              </div>
              <div>
                <h5 className="mt-2 p-3 text-secondary text-left">Drop Off</h5>
                <input
                  type="text"
                  className="rounded  p-2 pl-4 pr-5 border-0 mb-4"
                  placeholder="To"
                  name="to"
                  onBlur={handleBlur}
                  required
                />
              </div>
              <div className="text-center">
                <button
                  className="border-0 w-75 mb-3 p-3"
                  onClick={handleToggle}
                  style={{
                    backgroundColor: "#FF6E40",
                    borderRadius: "10px",
                    color: "white",
                  }}
                >
                  SEARCH
                </button>
              </div>
            </>
          )}
          {location.isSet && (
            <>
              <div
                className="border m-2"
                style={{
                  backgroundColor: "#FF6E40",
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                <h4 className="mt-3 mb-4">{location.from}</h4>
                <h4 className="mb-3">{location.to}</h4>
              </div>

              {selectedVehicle.map((fareChart) => (
                <Chart key={fareChart.value} fareChart={fareChart}></Chart>
              ))}
            </>
          )}
        </div>

        <div className="ml-5 right-item">
        <ReactMapGL
            {...viewport}
            mapStyle='mapbox://styles/dukulh/ckmhrlukf0gs117o2ve30zfol'
            mapboxApiAccessToken ='pk.eyJ1IjoiZHVrdWxoIiwiYSI6ImNrbWhuZGc2cDA4d3cyb3FvNmQ3dGRvdGoifQ.U0mRZN7iLxHk8CelIlWZTA'
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
          />
        </div>
      </div>
    </>
  );
};

export default Destination;
