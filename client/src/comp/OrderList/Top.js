import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  Menu,
  MenuItem,
  IconButton,
  Typography,
  InputBase,
  Badge,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import SVGLogo from "./SVGLogo";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import WarningIcon from "@material-ui/icons/Warning";
import MoreIcon from "@material-ui/icons/MoreVert";
// import SortIcon from "@material-ui/icons/Sort";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: theme.spacing(21, 21),
    color: "inherit",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const { handleChange, searchTerm, orders, dateDiff } = props;
  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  // const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  //   handleMobileMenuClose();
  // };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // NEW ORDERS

  const countNew = () => {
    const newarr = [];
    orders.map((order) =>
      dateDiff(order.date) < 90
        ? !order.closed
          ? newarr.push(order.id)
          : null
        : null
    );
    return newarr.length;
  };
  // EXPIRED ORDERS
  const countExpired = () => {
    const newarr = [];
    orders.map((order) =>
      dateDiff(order.date) > 90
        ? !order.closed
          ? newarr.push(order.id)
          : null
        : null
    );
    return newarr.length;
  };
  // const menuId = "order-menu";
  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{ vertical: "top", horizontal: "right" }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{ vertical: "top", horizontal: "right" }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem onClick={handleMenuClose}>All</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>Blocked </MenuItem>
  //     <MenuItem onClick={handleMenuClose}>Closed </MenuItem>
  //   </Menu>
  // );

  const mobileMenuId = "order-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton aria-label='Sort Orders' color='inherit'>
          <Badge color='secondary'>
            <SortIcon />
          </Badge>
        </IconButton>
        <p>Sort Orders</p>
      </MenuItem> */}
      <MenuItem>
        <IconButton aria-label='See New Orders' color='inherit'>
          <Badge badgeContent={countNew()} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>New Orders</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label='See New Orders' color='inherit'>
          <Badge badgeContent={countExpired()} color='secondary'>
            <WarningIcon />
          </Badge>
        </IconButton>
        <p>Expired Orders</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='fixed' style={{ background: "#4f434f" }}>
        <Toolbar>
          <Link to='/' exact>
            <IconButton
              edge='start'
              className={classes.menuButton}
              aria-label='open drawer'
            >
              <SVGLogo />
            </IconButton>{" "}
          </Link>
          <Typography className={classes.title} variant='h6' noWrap>
            Orders
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search by id...'
              value={searchTerm}
              onChange={handleChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton
              onClick={handleProfileMenuOpen}
              aria-label='Sort Orders'
              color='inherit'
            >
              <Badge color='secondary' aria-haspopup='true'>
                <SortIcon />
              </Badge>
            </IconButton> */}
            <IconButton aria-label='new orders notifications' color='inherit'>
              <Badge badgeContent={countNew() / 2} color='secondary'>
                <NotificationsIcon />
              </Badge>{" "}
            </IconButton>
            <IconButton
              aria-label='expired orders notifications'
              color='inherit'
            >
              <Badge badgeContent={countExpired()} color='secondary'>
                <WarningIcon />
              </Badge>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
    </div>
  );
}
