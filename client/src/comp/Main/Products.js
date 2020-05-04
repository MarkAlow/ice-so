import React from "react";
import Info from "./Info";
import {
  IconButton,
  makeStyles,
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "50%",
    maxWidth: 160,
    left: 0,
  },
}));
export default function Products(props) {
  const {
    iceCreams,
    handleAddToCart,
    cartItem,
    handleSubtractOneFromCart,
    handleChangeAmountInCart,
    handleSortChange,
    sort,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [src, setSrc] = React.useState("");
  const [scale, setScale] = React.useState("scale(1)");
  var cartLocal = JSON.parse(localStorage.getItem("cartItem"));
  const objCount = (id) => {
    var cartObj = cartLocal.map((item) => ({
      id: item.id,
      count: item.count,
    }));
    var obj = cartObj
      .filter((a) => a.id === id)
      .map((obj) =>
        obj.count >= 0 ? (
          <span key={obj.id}>{obj.count}</span>
        ) : (
          <span key={obj.id}>0</span>
        )
      );
    return obj;
  };
  const handleOpen = (pic) => {
    setSrc(pic);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div>
      <Info open={open} handleClose={handleClose} src={src} setSrc={setSrc} />
      <div id='formSort'>
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel id='demo-simple-select-outlined-label'>
            Sort By
          </InputLabel>
          <Select
            labelId='demo-simple-select-outlined-label'
            id='demo-simple-select-outlined'
            value={sort}
            onChange={handleSortChange}
            label='Sort By'
          >
            <MenuItem value={"lowestprice"}>Lowest Price</MenuItem>
            <MenuItem value={"highestprice"}>Highest Price</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button onClick={() => console.log(typeof iceCreams)}>LOG</Button>
      <grid-container id='iceCreamGrid'>
        {/* {iceCreams.map((item) => (
          <grid-item style={{ padding: "1rem" }} key={item.id}>
            <h4 id={item.id} style={{ textAlign: "center", fontWeight: 500 }}>
              <grid-container id='objs'>
                <div id='objCount'>{objCount(item.id)}</div>
                <div></div>
                <div id='objInfo' onClick={() => handleOpen(item.pic)}>
                  <InfoOutlinedIcon color='disabled' />
                </div>
              </grid-container>

              <img
                src={item.pic}
                onClick={(e) => handleAddToCart(e, item)}
                alt={item.name}
                id='productWidth'
                onMouseDown={() => setScale("scale(0.9)")}
                onMouseUp={() => setScale("scale(1)")}
                style={{ transform: scale }}
              ></img>
              <br />
              {item.name}
              <br />
              <span style={{ color: "#aaa" }}>${item.price.toFixed(1)}0</span>
            </h4>
            <div id='iconButtons'>
              <grid-item>
                <IconButton
                  aria-label='Remove'
                  onClick={(e) => handleSubtractOneFromCart(e, item)}
                >
                  <RemoveIcon />
                </IconButton>
              </grid-item>

              <grid-item style={{ justifySelf: "center" }}>
                <TextField
                  type='number'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='outlined'
                  onChange={(e) => handleChangeAmountInCart(e, item)}
                ></TextField>
              </grid-item>

              <grid-item>
                <IconButton
                  aria-label='Add'
                  onClick={(e) => handleAddToCart(e, item)}
                >
                  <AddIcon />
                </IconButton>
              </grid-item>
            </div>
          </grid-item>
        ))} */}
      </grid-container>
    </div>
  );
}
