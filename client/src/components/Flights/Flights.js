import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Styles/flights.css";
import { AuthLoginInfo } from "./../AuthComponents/AuthLogin";
// import Popup from "../Components/Popup";
import Pagination from "../Components/Pagination";
import ReadMoreRoundedIcon from "@mui/icons-material/ReadMoreRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

function Flights() {
  console.log("in flights again");
  const ctx = useContext(AuthLoginInfo);
  // const [newflightSubmitted, setNewflightSubmitted] = useState(false);
  const [flightsData, setflightsData] = useState([]);
  // const [buttonPopup, setButtonPopup] = useState(false);
  const [filterId, setFilterId] = useState("");

  useEffect(() => {
    console.log("in flights")
    // setNewflightSubmitted(false);
    axios
      .get("http://localhost:5000/flights", { withCredentials: true })
      .then((res) => {
        if (res.data != null) {
          setflightsData(
            res.data[0].map((t1) => ({
              ...t1,
              ...res.data[1].find((t2) => t2.flight_id === t1.flight_id),
            }))
          );
        }
      });
  }, );

  console.log(flightsData);

  const flightsTable = () => {
    // const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;
    const flightsFiltered = flightsData
      ?.filter((val) => {
        if (
          [val.flight.toLowerCase(), val.flight_id + ""].some((r) =>
            r.includes(filterId)
          )
        ) {
          return val;
        }
      })
      .reverse();
    const totalflights = flightsFiltered.length;
    const computedflights = flightsFiltered.slice(
      // (currentPage - 1) * itemsPerPage,
      // (currentPage - 1) * itemsPerPage + itemsPerPage
    );
    const computedflightsLength = computedflights.length;

    return (
      <>
        {" "}
        <div className="tableResultsWrap">
          {" "}
          <div className="resultsSpan">
            Showing
            <font className="resultsBold"> {computedflightsLength} </font>
            of
            <font className="resultsBold"> {totalflights} </font>
            results
          </div>
          <Pagination
            total={totalflights}
            itemsPerPage={itemsPerPage}
            // currentPage={currentPage}
            // onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>flight ID</th>
              <th>flight name</th>
              <th>Phone</th>
              <th>City</th>
              <th>flights count</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {computedflights.map((flight, i) => {
              return (
                <tr key={i}>
                  <td>
                    <font className="maincolor">#</font>
                    {flight.flight_id}
                  </td>
                  <td>{flight.flight}</td>
                  <td>{flight.phone}</td>
                  <td>{flight.city}</td>
                  <td>{flight.flightsCount ? flight.flightsCount : "0"}</td>
                  <td className="maincolor">
                    <Link to={`/flights/${flight.flight_id}`}>
                      <ReadMoreRoundedIcon />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  };

  const Addflights = () => {
    const [flightDetails, setflightDetails] = useState({
      flightName: "",
      flightDetails: "",
      phone: "",
      country: "",
      street: "",
      city: "",
      postalCode: "",
      workerName: ctx.username,
    });

    const addNewflight = () => {
      axios
        .post(
          "http://localhost:5000/newflight",
          {
            flightDetails,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data === "success") {
            setflightDetails({
              flightName: "",
              flightDetails: "",
              phone: "",
              country: "Polska",
              street: "",
              city: "",
              postalCode: "",
              workerName: ctx.username,
            });
          }
        });
    };

    return (

        <div className="popupWrap">
          <div className="productsSummary">
            <h3 className="productSummaryLeft">Add new flight</h3>
          </div>

          <div className="addNewflightWrap">
            <div className="addNewflightForm">
              <div className="flightDetails">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="flight name"
                    className="flightDetailsInput flightDetailsInputHalf"
                    value={flightDetails.flightName}
                    onChange={(e) =>
                      setflightDetails({
                        ...flightDetails,
                        flightName: e.target.value,
                      })
                    }
                    required="required"
                  />
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="flightDetailsInput flightDetailsInputHalf"
                    value={flightDetails.phone}
                    onChange={(e) =>
                      setflightDetails({
                        ...flightDetails,
                        phone: e.target.value,
                      })
                    }
                    required="required"
                  />
                </div>
                <div className="input-group">
                  <input
                    type="textarea"
                    placeholder="flight details"
                    className="flightDetailsInput"
                    value={flightDetails.flightDetails}
                    onChange={(e) =>
                      setflightDetails({
                        ...flightDetails,
                        flightDetails: e.target.value,
                      })
                    }
                    required="required"
                  />
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Country"
                    className="flightDetailsInput flightDetailsInputHalf"
                    value={flightDetails.country}
                    onChange={(e) =>
                      setflightDetails({
                        ...flightDetails,
                        country: e.target.value,
                      })
                    }
                    required="required"
                  />
                  <input
                    type="text"
                    placeholder="Street, home/appartment number"
                    className="flightDetailsInput flightDetailsInputHalf"
                    value={flightDetails.street}
                    onChange={(e) =>
                      setflightDetails({
                        ...flightDetails,
                        street: e.target.value,
                      })
                    }
                    required="required"
                  />
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="City"
                    className="flightDetailsInput flightDetailsInputHalf"
                    value={flightDetails.city}
                    onChange={(e) =>
                      setflightDetails({
                        ...flightDetails,
                        city: e.target.value,
                      })
                    }
                    required="required"
                  />
                  <input
                    type="text"
                    placeholder="Postal code"
                    className="flightDetailsInput flightDetailsInputHalf"
                    value={flightDetails.postalCode}
                    onChange={(e) =>
                      setflightDetails({
                        ...flightDetails,
                        postalCode: e.target.value,
                      })
                    }
                    required="required"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="submitWrap">
            <div className="submitNewflight">
              <button
                className="submitNewflightBtn"
                onClick={() => addNewflight()}
              >
                <AddCircleOutlineRoundedIcon />
                <span className="addflightText">Add</span>
              </button>
            </div>
          </div>
        </div>
      // </Popup>
    );
  };

  return (
    <div className="bodyWrap">
      <div className="contentflightWrap flightsTableWrap">
        <div className="leftSide">
          <h1>flights</h1>
          <div className="flightNavWrap">
            <div className="addflightWrap">
              <input
                type="text"
                placeholder="Search by id"
                onChange={(e) => setFilterId(e.target.value)}
                value={filterId}
              />
              <button
                className="addflight"
                onClick={() => {
                }}
              >
                <AddCircleOutlineRoundedIcon />
                <span className="addflightText">Add</span>
              </button>
            </div>
          </div>
          <div className="flightWrap">
            <flightsTable />
          </div>
        </div>
      </div>

      <Addflights />
    </div>
  );
}
