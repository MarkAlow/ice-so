import React from "react";

export default function Footer() {
  const year = () => {
    var d = new Date();
    return d.getFullYear();
  };
  return (
    <span
      style={{
        display: "grid",
        justifyContent: "center",
        marginBottom: "1rem",
        marginTop: "1rem",
      }}
    >
      HM Frozen Food, LLC. {year()}
    </span>
  );
}
