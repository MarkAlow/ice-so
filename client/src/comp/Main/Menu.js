import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PinDropIcon from "@material-ui/icons/PinDrop";
import MenuIcon from "@material-ui/icons/Menu";
import RoomServiceIcon from "@material-ui/icons/RoomService";
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button key='Make an Order'>
          <ListItemIcon>
            <PinDropIcon />
          </ListItemIcon>
          <ListItemText primary='Make an Order' />
        </ListItem>
        <ListItem button key='Business Inquiries'>
          <ListItemIcon>
            <RoomServiceIcon />
          </ListItemIcon>
          <ListItemText primary='Business Inquiries' />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <React.Fragment>
      <MenuIcon
        style={{ cursor: "pointer", paddingLeft: "1rem" }}
        onClick={toggleDrawer(["left"], true)}
      />
      <Drawer
        anchor='left'
        open={state["left"]}
        onClose={toggleDrawer(["left"], false)}
      >
        {list("left")}
      </Drawer>
    </React.Fragment>
  );
}
