import React from "react";

export default function Analytics(props) {
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
              margin: 0
            }}
          >
            {props.orders.length}
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
                  margin: 0
                }}
              >
                487
              </h2>
            </grid-item>
            <grid-item>
              <hr
                style={{
                  width: "1px",
                  height: "6rem",
                  border: "none",
                  background: "#333"
                }}
              ></hr>
            </grid-item>
            <grid-item>
              <h5 style={{ fontWeight: "100" }}>Orders</h5>
              <h2
                style={{
                  fontWeight: "200",
                  display: "flex",
                  justifyContent: "center",
                  margin: 0
                }}
              >
                15
              </h2>
            </grid-item>
            <grid-item>
              <h5 style={{ fontWeight: "100" }}>Completed</h5>
              <h2
                style={{
                  fontWeight: "200",
                  display: "flex",
                  justifyContent: "center",
                  margin: 0,
                  color: "#6abe83"
                }}
              >
                12
              </h2>
            </grid-item>
            <grid-item>
              <h5 style={{ fontWeight: "100" }}>Revenue</h5>
              <h2
                style={{
                  fontWeight: "200",
                  display: "flex",
                  justifyContent: "center",
                  margin: 0
                }}
              >
                $233
              </h2>
            </grid-item>
          </grid-container>
        </grid-item>
      </grid-container>
    </div>
  );
}
