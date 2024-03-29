import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SVG from "./SVGMainLogo";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import Menu from "./Menu";
function ElevationScroll(props) {
  const { children } = props;

  return React.cloneElement(children, {
    elevation: 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function ElevateAppBar(props) {
  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar style={{ background: "#2e2a2e" }}>
          <Toolbar>
            <a href='https://ice-so.herokuapp.com/'>
              <IconButton edge='start' aria-label='open drawer'>
                <SVG style={{ cursor: "pointer" }} />
              </IconButton>
            </a>
            <Menu />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
}
