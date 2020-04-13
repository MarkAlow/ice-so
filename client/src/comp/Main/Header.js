import React from "react";
import SVG from "./SVGMainLogo";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <grid-container id='headerMenu'>
        <SVG style={{ cursor: "pointer" }} />
        <Link to='/orders'>
          <grid-item style={{ color: "#f2e477" }}>Order</grid-item>
        </Link>
      </grid-container>
      <br />
    </div>
  );
}
