import React, { useState, useEffect } from "react";

export default function Analytics(props) {
  const [completed, setCompleted] = useState(0);
  const [reported, setReported] = useState(0);
  const { orders, totalReduced } = props;
  var completedArr = [];
  var reportedArr = [];
  const completedCount = (order) => {
    (order.wrongAddress || order.noPayment || order.otherReport) &&
      reportedArr.push(order.id);
    setReported(reportedArr.length);
  };
  const reportedCount = (order) => {
    order.closed && completedArr.push(order.id);
    setCompleted(completedArr.length);
  };
  useEffect(() => {
    orders.map((order) => completedCount(order));
    orders.map((order) => reportedCount(order));
  });
  return (
    <div>
      <grid-container id='analytics'>
        <grid-item id='date'>{props.time}</grid-item>
        <grid-item>
          <h2 style={{ fontWeight: "100" }}>Total Order Value</h2>
          <p
            style={{
              fontWeight: "100",
              fontSize: "5rem",
              display: "flex",
              justifyContent: "center",
              margin: 0,
            }}
          >
            ${totalReduced}
          </p>
        </grid-item>
        <grid-item id='analyticsInfo'>
          <grid-container id='analyticsMisc'>
            <grid-item>
              <h5 style={{ fontWeight: "100" }}>Total Orders</h5>
              <h2
                style={{
                  fontWeight: "200",
                  display: "flex",
                  justifyContent: "center",
                  margin: 0,
                }}
              >
                {orders.length}
              </h2>
            </grid-item>
            <grid-item>
              <hr
                style={{
                  width: "1px",
                  height: "6rem",
                  border: "none",
                  background: "#333",
                }}
              ></hr>
            </grid-item>
            <grid-item>
              <h5 style={{ fontWeight: "100" }}>Completed</h5>
              <h2
                style={{
                  fontWeight: "200",
                  display: "flex",
                  justifyContent: "center",
                  color: "#6abe83",
                  margin: 0,
                }}
              >
                {completed}
              </h2>
            </grid-item>
            <grid-item>
              <h5 style={{ fontWeight: "100" }}>Reported</h5>
              <h2
                style={{
                  fontWeight: "200",
                  display: "flex",
                  justifyContent: "center",
                  margin: 0,
                  color: "#ba3333",
                }}
              >
                {reported}
              </h2>
            </grid-item>
          </grid-container>
        </grid-item>
      </grid-container>
    </div>
  );
}
