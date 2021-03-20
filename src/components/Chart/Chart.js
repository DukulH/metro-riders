import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faDollarSign, faMotorcycle, faCar, faBus, faSubway } from "@fortawesome/free-solid-svg-icons";

const Chart = (props) => {
  const { name, passenger, fare } = props.fareChart;

  return (
    <>
      <div className="">
        <p className=' p-4 pl-3 pr-3 m-2' style={{backgroundColor:'white' , borderRadius:'10px'}}>
          {name === "BIKE" && <FontAwesomeIcon className='mr-5 text-info' icon={faMotorcycle} />}
          {name ==="CAR" && <FontAwesomeIcon className='mr-5 text-info' icon={faCar} />}
          {name ==="BUS" && <FontAwesomeIcon className='mr-5 text-info' icon={faBus} />}
          {name ==="TRAIN" && <FontAwesomeIcon className='mr-5 text-info' icon={faSubway} />}
          {name} <FontAwesomeIcon className='ml-5 text-dark' icon={faUsers} /> {passenger}{" "}
          <FontAwesomeIcon className='ml-5 text-info' icon={faDollarSign} /> {fare}
        </p>
      </div>
    </>
  );
};

export default Chart;
