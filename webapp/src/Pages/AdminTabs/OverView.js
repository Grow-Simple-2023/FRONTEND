import React, { Fragment, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import DistributeDialog from "../../components/DistributePopup";
import CancelDialog from "../../components/CancelDialog";
import { apiendpoint } from "../../constants/constans";
import AddDialog from "../../components/AddDialog";
import classes from "./Overview.module.css";

const OverView = (props) => {
  const [username, setUsername] = useState("Samy");
  const [percentage, setPerc] = useState(0);

  const [cancelPopup, setCancelPopup] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const [distributePopup, setDistributePopup] = useState(false);

  const [items, setItems] = useState([]);
  const [itemsInDelivery, setItemsInDelivery] = useState([]);
  const [itemsDelivered, setItemsDelivered] = useState([]);
  const [riders, setRiders] = useState([]);

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    var jwt = localStorage.getItem("@jwtauth");
    var user = localStorage.getItem("userid");
    if (!user) user = "Samy";
    if (!jwt) jwt = "";
    console.log(jwt);
    console.log(user);
    setUsername(user);
    fetch(`${apiendpoint}/manager/OTD-percentage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Credentials: `Bearer ${jwt}`
      }
    })
      .then((res) => {
        console.log(res.status);
        if (res.ok) return res.json();
        else throw new Error("Unauthorized");
      })
      .then((json) => {
        setPerc(json.percentage);
      })
      .catch(console.log);
    fetch(`${apiendpoint}/manager/unassigned-items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Credentials: `Bearer ${jwt}`
      }
    })
      .then((res) => {
        console.log(res.status);
        if (res.ok) return res.json();
        else throw new Error("Unauthorized");
      })
      .then((json) => {
        console.log(JSON.stringify(json, null, 2));
        setItems(json.unassigned_items);
      })
      .catch(console.log);
  };

  const cancelOrder = () => {
    var jwt = localStorage.getItem("@jwtauth");
    if (!jwt) jwt = "";
    fetch(`${apiendpoint}/manager/in-pickup`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Credentials: `Bearer ${jwt}`
      }
    })
      .then((res) => {
        console.log(res.status);
        if (res.ok) return res.json();
        else throw new Error("Unauthorized");
      })
      .then((json) => {
        console.log(json);
        setItemsInDelivery(json.items_in_pickup);
        setCancelPopup(true);
      })
      .catch((err) => console.log(err));
  };

  const distribute = () => {
    var jwt = localStorage.getItem("@jwtauth");
    if (!jwt) jwt = "";
    fetch(`${apiendpoint}/manager/unassigned-riders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Credentials: `Bearer ${jwt}`
      }
    })
      .then((res) => {
        console.log(res.status);
        if (res.ok) return res.json();
        else throw new Error("Unauthorized");
      })
      .then((json) => {
        console.log(json);
        setRiders(json.unassigned_riders);
        setDistributePopup(true);
      })
      .catch((err) => console.log(err));
  };

  const addOrder = () => {
    var jwt = localStorage.getItem("@jwtauth");
    if (!jwt) jwt = "";
    fetch(`${apiendpoint}/manager/delivered`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Credentials: `Bearer ${jwt}`
      }
    })
      .then((res) => {
        console.log(res.status);
        if (res.ok) return res.json();
        else throw new Error("Unauthorized");
      })
      .then((json) => {
        console.log(json);
        setItemsDelivered(json.delivered_items);
        setAddPopup(true);
      })
      .catch((err) => console.log(err));
  };

  const computeTime = (time) => {
    var currTime = new Date();
    currTime.setHours(0, 0, 0, 0);
    var diffTime = Math.floor((currTime - time) / 1000 / 60 / 60);
    if (diffTime < 24) return "Today";
    else if (diffTime < 48) return "Tomorrow";
    else return `${diffTime / 24} days to go`;
  };

  return (
    <div className={classes.overveiw}>
      <div className={classes.welcome} style={{ margin: "3rem" }}>
        <p style={{ fontSize: "1.5rem" }}>Welcome, {username}</p>
        <p style={{ padding: "1rem 0rem" }}>Get a look at the deliveries</p>
      </div>

      <main className={classes.distTime}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            item
            sm={12}
            lg={6}
            md={6}
          >
            <div className={classes.dist}>
              <h1>{percentage} % delivered on Time</h1>
            </div>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            item
            sm={12}
            lg={6}
            md={6}
          >
            <div className={classes.time}>
              <h1>{items.length} items in Warehouse</h1>
            </div>
          </Grid>
        </Grid>
      </main>
      <main className={classes.tableDiv}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead style={{ borderBottom: "2px solid black" }}>
              <TableRow>
                <TableCell className={classes.headCell}>Items</TableCell>
                <TableCell className={classes.headCell}>Address</TableCell>
                <TableCell className={classes.headCell}>EDD</TableCell>
                <TableCell className={classes.headCell}>Rider</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row, index) => (
                <TableRow
                  style={{ borderBottom: "1.5px solid black" }}
                  key={index}
                >
                  <TableCell className={classes.bodyCell}>
                    {row.title}
                  </TableCell>
                  <TableCell className={classes.bodyCell}>
                    {row.address}
                  </TableCell>
                  {/* <TableCell className={classes.bodyCell}>{row.EDD}</TableCell> */}
                  <TableCell className={classes.bodyCell}>
                    {computeTime(new Date(row.EDD))}
                  </TableCell>
                  <TableCell className={classes.bodyCell}>
                    {row.phone_number || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
      <main className={classes.btns}>
        <Grid
          container
          // direction="row"
          // justifyContent="center"
          // alignItems="center"
          spacing={3}
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            item
            sm={12}
            lg={4}
            md={6}
          >
            <div onClick={cancelOrder} className={classes.btn}>
              <span>Cancel Order</span>
            </div>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            item
            sm={12}
            lg={4}
            md={6}
          >
            <div onClick={distribute} className={classes.btn}>
              <span>Distribute Orders to Riders</span>
            </div>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            item
            sm={12}
            lg={4}
            md={6}
          >
            <div onClick={addOrder} className={classes.btn}>
              <span>Add Order</span>
            </div>
          </Grid>
        </Grid>
      </main>
      <CancelDialog
        onClose={setCancelPopup}
        open={cancelPopup}
        data={itemsInDelivery}
      />
      <AddDialog onClose={setAddPopup} open={addPopup} data={itemsDelivered} />
      <DistributeDialog
        onClose={setDistributePopup}
        open={distributePopup}
        data={riders}
        items={items}
      />
    </div>
  );
};

export default OverView;
