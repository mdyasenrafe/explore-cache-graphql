import React, { useState, useEffect } from "react";
import "./App.css";
import { useLazyQuery } from "@apollo/client";
import { GET_VEHICLE_LIST } from "./query/query";

function App() {
  const [vehicleList, setVehicleList] = useState([]);
  const [isFirstFetch, setIsFirstFetch] = useState(true);
  const [fetchVehicles, { loading, data }] = useLazyQuery(GET_VEHICLE_LIST);

  useEffect(() => {
    if (data) {
      setVehicleList(data.vehicleList);
    }
  }, [data]);

  const handleFetch = () => {
    fetchVehicles({
      fetchPolicy: isFirstFetch ? "network-only" : "cache-first",
    });
    if (isFirstFetch) {
      setIsFirstFetch(false);
    }
  };
  const handleFetchFromServer = () => {
    fetchVehicles({
      fetchPolicy: "network-only", // Always fetch from server
    });
  };

  if (loading) return <p>Loading.....</p>;

  return (
    <div>
      <div className="m-auto">
        <button className="button button-primary" onClick={handleFetch}>
          Fetch
        </button>
        <button
          className="button button-secondary"
          onClick={handleFetchFromServer}
        >
          Fetch From Server
        </button>
      </div>

      <div className="card_container">
        {vehicleList.map((vehicle: any) => (
          <div key={vehicle.id} className="card_item">
            <img
              src={vehicle.media?.image?.thumbnail_url || "default_image_url"}
              alt="vehicle"
            />
            <p>
              {vehicle.naming?.make || "Unknown Make"}{" "}
              {vehicle.naming?.model || "Unknown Model"}
            </p>
            <p>Version: {vehicle.naming?.chargetrip_version || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
