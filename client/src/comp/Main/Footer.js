import React from "react";

export default function Footer() {
  const year = () => {
    var d = new Date();
    return d.getFullYear();
  };
  return (
    <grid-container id='footerMenu'>
      HM Frozen Food, LLC. {year()}
    </grid-container>
  );
}
