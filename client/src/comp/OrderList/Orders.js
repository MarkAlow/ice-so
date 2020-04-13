import React, { useState, useEffect } from "react";
import Map from "./Map";
import Top from "./Top";
import Analytics from "./Analytics";
import axios from "axios";
import moment from "moment";
import {
  Button,
  Backdrop,
  Modal,
  Fade,
  makeStyles,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Typography,
  Popper,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import PhoneIcon from "@material-ui/icons/Phone";
import DoneIcon from "@material-ui/icons/Done";
import PlaylistAddCheckOutlinedIcon from "@material-ui/icons/PlaylistAddCheckOutlined";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    backgroundColor: "#fff",
    boxShadow: theme.shadows[1],
    padding: theme.spacing(5, 5, 5),
  },
  popup: {
    backgroundColor: "rgba(133, 133, 133, 0.5)",
    borderRadius: "0.3rem",
    color: "white",
    padding: theme.spacing(2, 2, 2),
  },
  margin: {
    margin: theme.spacing(1),
    padding: "1rem 2rem",
    color: "black",
  },
}));

export default function Orders() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [time, setTime] = useState(moment().format("MMMM Do YYYY, h:mm:ss A"));
  const paid = false;
  const [processingModal, setProcessingModal] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [wrongAddress, setWrongAddress] = useState(false);
  const [noPayment, setNoPayment] = useState(false);
  const [otherReport, setOtherReport] = useState(false);
  const [reportId, setReportId] = useState("");
  const [reportOrderId, setReportOrderId] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderIds, setOrderIds] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setOrderIds(orders.map((order) => order.orderId));
  };

  useEffect(() => {
    getOrders();
    setInterval(getOrders, 50);
    setInterval(() => tick(), 1000);
  }, []);

  const tick = () => {
    setTime(moment().format("MMMM Do YYYY, h:mm:ss A"));
  };
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const getOrders = () => {
    axios
      .get("http://localhost:5000/api/customer")
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.log(`Error! : ${err}`);
      });
  };

  const closeOrder = (id, closed, wrongAddress, noPayment, otherReport) => {
    axios
      .patch("http://localhost:5000/api/customer/" + id, {
        closed: !closed,
        wrongAddress,
        noPayment,
        otherReport,
      })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(`Error! : ${err}`);
      });
  };

  const reportOrder = (id, wrongAddress, noPayment, otherReport) => {
    axios
      .patch("http://localhost:5000/api/customer/" + id, {
        wrongAddress,
        noPayment,
        otherReport,
      })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(`Error! : ${err}`);
      });
    console.log("Report Submitted");
    setWrongAddress(false);
    setNoPayment(false);
    setOtherReport(false);
  };

  const deleteOrder = (id) => {
    setProcessingModal(true);
    setTimeout(() => {
      axios
        .delete("http://localhost:5000/api/customer/" + id)
        .then((res) => console.log(res.data))
        .catch((err) => {
          console.log(`Error! : ${err}`);
        });
      setProcessingModal(false);
      setOrders(orders.filter((customer) => customer._id !== id));
    }, 500);
  };

  const orderDate = (dateString) => {
    let numDate = Number(dateString);
    let date = moment(numDate).fromNow();
    return date;
  };
  const dateDiff = (date) => {
    let numDate = Number(date);
    let nowDate = Number(Date.now());
    return ((nowDate - numDate) / 60000).toFixed(1);
  };
  const handleReportOpen = (id, orderId) => {
    setReportOpen(true);
    setReportId(id);
    setReportOrderId(orderId);
  };
  const popoverOpen = Boolean(anchorEl);
  var totalArr = [];
  var totalReduced = 0;
  const totalVal = (o) => {
    var total = o.reduce((a, c) => a + c.price * c.count, 0).toFixed(2);
    var totalInt = parseInt(total, 10);
    totalArr.push(totalInt);
    totalReduced = totalArr.reduce((a, c) => a + c);
    return total;
  };
  return (
    <div id='ordersBody'>
      {/*  */}
      {/* Delete Order Modal */}
      <Modal
        aria-labelledby='Cart'
        aria-describedby='Your Order:'
        className={classes.modal}
        open={processingModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={processingModal}>
          <div className={classes.paper}>
            <p style={{ fontWeight: "500" }}>Deleting...</p>
          </div>
        </Fade>
      </Modal>
      {/*  */}
      {/* REPORTING MODAL */}
      <Modal
        aria-labelledby='Cart'
        aria-describedby='Your Order:'
        className={classes.modal}
        open={reportOpen}
        onClose={() => {
          setReportOpen(false);
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={reportOpen}>
          <div className={classes.paper}>
            <p id='transition-modal-title'>
              Report order: <b>{reportOrderId}</b>
            </p>
            <FormGroup column='true'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={wrongAddress}
                    onChange={() => setWrongAddress(!wrongAddress)}
                  />
                }
                label='Wrong Address'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={noPayment}
                    onChange={() => setNoPayment(!noPayment)}
                  />
                }
                label='Refused Payment'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={otherReport}
                    onChange={() => setOtherReport(!otherReport)}
                  />
                }
                label='Other'
              />
            </FormGroup>
            <Button
              onClick={() => {
                reportOrder(reportId, wrongAddress, noPayment, otherReport);
              }}
            >
              {wrongAddress || noPayment || otherReport
                ? "Submit Report"
                : "Clear all reports"}
            </Button>
          </div>
        </Fade>
      </Modal>
      <Top
        handleChange={handleChange}
        searchTerm={searchTerm}
        orderIds={orderIds}
        setSearchResults={setSearchResults}
        orders={orders}
        dateDiff={dateDiff}
      />
      <br />
      {/* Initiate Total Order Value */}
      <div style={{ display: "none" }}>
        {orders.map((order) => totalVal(order.iceCreams))}
      </div>
      {/* Initiate Total Order Value */}
      <Analytics time={time} orders={orders} totalReduced={totalReduced} />
      <div id='ui'>
        <grid-container id='orders'>
          {orders
            .sort((a, b) => Number(b.date) - Number(a.date))
            .filter((order) =>
              order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((order) => (
              <grid-item
                id='order'
                style={
                  order.wrongAddress === false &&
                  order.noPayment === false &&
                  order.otherReport === false
                    ? { background: "#fff" }
                    : { background: "#ffd9d6" }
                }
                key={order._id}
              >
                <Button
                  aria-owns={popoverOpen ? "mouse-over-popover" : undefined}
                  aria-haspopup='true'
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  variant='contained'
                  style={{ float: "right", backgroundColor: "#fff" }}
                  onClick={() => deleteOrder(order._id)}
                >
                  <ClearIcon />
                  <Popper
                    open={popoverOpen}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    className={classes.popup}
                  >
                    <Typography>
                      Delete the order (CANNOT BE UNDONE!)
                    </Typography>
                  </Popper>
                </Button>
                <div
                  style={order.closed ? { opacity: "0.2" } : { opacity: "1" }}
                >
                  <p>
                    <span>
                      {!order.closed ? (
                        dateDiff(order.date) < 90 ? (
                          <span>
                            <FiberManualRecordIcon
                              style={{
                                color: "#fcba03",
                                position: "relative",
                                top: "0.3rem",
                              }}
                            />
                            <b>New&nbsp;&nbsp;&nbsp;</b>
                          </span>
                        ) : (
                          <span>
                            <FiberManualRecordIcon
                              style={{
                                color: "#cf1524",
                                position: "relative",
                                top: "0.3rem",
                              }}
                            />
                            <b>Overdue&nbsp;&nbsp;&nbsp;</b>
                          </span>
                        )
                      ) : null}
                    </span>
                    {orderDate(order.date)}
                  </p>
                  <h4>{order.orderId}</h4>
                  <h1 style={{ float: "right", fontWeight: "300" }}>
                    {paid ? (
                      <AttachMoneyIcon
                        style={{ cursor: "pointer", color: "#6abe83" }}
                      />
                    ) : (
                      <MoneyOffIcon
                        style={{ cursor: "pointer", color: "#ca3e47" }}
                      />
                    )}
                    {/* Order Total */}
                    {totalVal(order.iceCreams)}
                  </h1>
                  <h5 style={{ color: "#ca3e47" }}>
                    {order.noPayment ? "NO PAYMENT MADE" : null}
                  </h5>
                  <h5 style={{ color: "#ca3e47" }}>
                    {order.wrongAddress ? "WRONG ADDRESS" : null}
                  </h5>
                  <h5 style={{ color: "#ca3e47" }}>
                    {order.otherReport ? "OTHER ISSUE" : null}
                  </h5>
                  <h2>
                    <span style={{ color: "#ccc" }}>Order for </span>
                    {order.name}
                  </h2>

                  <h2>
                    <PhoneIcon style={{ color: "#eaeaea" }} />
                    <div
                      style={{
                        display: "inline",
                        position: "relative",
                        top: "-0.3rem",
                        fontWeight: 400,
                      }}
                    >
                      {order.phone}
                    </div>
                  </h2>
                  <div id='productGridBg'>
                    {order.iceCreams.map((ice) => (
                      <grid-container className={ice.id} id='productGrid'>
                        <grid-item>
                          <img
                            src={ice.pic}
                            alt={ice.name}
                            style={{ width: "3rem", marginRight: "1rem" }}
                          ></img>
                        </grid-item>
                        <grid-item>
                          {ice.count} &nbsp;&nbsp;&nbsp; x &nbsp;&nbsp;&nbsp;
                          <b>{ice.name}</b>
                        </grid-item>
                        <grid-item>
                          <i>${(ice.price * ice.count).toFixed(2)}</i>
                        </grid-item>
                        <br />
                      </grid-container>
                    ))}
                  </div>
                  <br />
                  <div id='orderLocation'>
                    <LocationSearchingIcon id='locIcon' />
                    {order.address}

                    <br />
                  </div>
                  <Map lat={order.lat} lng={order.lng} />
                </div>
                <br />
                <Button
                  variant='contained'
                  style={
                    !order.closed
                      ? order.wrongAddress ||
                        order.noPayment ||
                        order.otherReport
                        ? { backgroundColor: "#fff" }
                        : { backgroundColor: "#6abe83" }
                      : { backgroundColor: "#eee" }
                  }
                  onClick={() =>
                    closeOrder(
                      order._id,
                      order.closed,
                      order.wrongAddress,
                      order.noPayment,
                      order.otherReport
                    )
                  }
                  startIcon={
                    !order.closed ? (
                      <PlaylistAddCheckOutlinedIcon />
                    ) : (
                      <DoneIcon />
                    )
                  }
                >
                  <span> {!order.closed ? "Close Order" : "Order Closed"}</span>
                </Button>
                <Button
                  variant='contained'
                  style={{ float: "right", backgroundColor: "#fff" }}
                  startIcon={<ErrorOutlineOutlinedIcon />}
                  onClick={() => handleReportOpen(order._id, order.orderId)}
                >
                  <span>REPORT</span>
                </Button>
              </grid-item>
            ))}
        </grid-container>
      </div>
    </div>
  );
}
