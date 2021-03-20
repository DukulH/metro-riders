import React from "react";
import { useHistory } from "react-router";

const Vehicle = (props) => {
  const { name, image,id} = props.vehicle;
  const history = useHistory();
  const handleSelection = () => {
    history.push (`/destination/${id}`);
  }

  return (
    <>
      <div className="card" onClick={handleSelection} style={{cursor: 'pointer'}}>
        <img className="card-img-top w-75 h-75 image-fluid mx-auto" src={image} alt="" />
        <div className="card-body">
          <h4 className="card-text">
            {name}
          </h4>
        </div>
      </div>
    </>
  );
};

export default Vehicle;
