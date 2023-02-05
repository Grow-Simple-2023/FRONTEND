import React, { Fragment, useEffect, useState } from "react";
import classes from "./Overview.module.css";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { apiendpoint } from "../../constants/constans";

const OverView = (props) => {
  const [username, setUsername] = useState("Samy");
  const [percentage, setPerc] = useState(0);

  const [item, setItem] = useState("obj_demo");
  const [address, setAddress] = useState("address_demo");
  const [edd, setEdd] = useState("edd_demo");
  const [rider, setRider] = useState(0);

  console.log("data is ");
  console.log({ username, percentage, item, address, edd, rider });

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    var jwt = await localStorage.getItem("@jwtauth");
    var user = await localStorage.getItem("userid");
    if (!user) user = "Samy";
    if (!jwt) jwt = "";
    console.log(jwt);
    console.log(user);
    setUsername(user);
    fetch(`${apiendpoint}/manager/OTD-percentage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Credentials: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        console.log(res.status);
        if (res.ok == true) return res.json();
        else throw new Error("Unauthorized");
      })
      .then((json) => {
        setPerc(json.percentage);
        // const saveData = async () => {
        //   await AsyncStorage.setItem("@jwtauth", json.auth.access_token);
        //   await AsyncStorage.setItem("@role", json.user.role);
        // }
        //saveData();
      })
      .catch(console.log);
    fetch(`${apiendpoint}/manager/items/object1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Credentials: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        console.log(res.status);
        if (res.ok == true) return res.json();
        else throw new Error("Unauthorized");
      })
      .then((json) => {
        console.log(JSON.stringify(json, null, 2));
        setItem(json.item.title);
        setAddress(json.item.address);
        setEdd(json.item.EDD);
        setRider(json.item.phone_number);
        // const saveData = async () => {
        //   await AsyncStorage.setItem("@jwtauth", json.auth.access_token);
        //   await AsyncStorage.setItem("@role", json.user.role);
        // }
        //saveData();
      })
      .catch(console.log);
  };

  const tableData = [
    {
      item: "item A",
      address:
        "Address A, 123 Street Address A, 123 Street Address A, 123 Street",
      edd: "tomorrow",
      rider: "Shyam Charan",
    },
    {
      item: "item A",
      address:
        "Address A, 123 Street Address A, 123 Street Address A, 123 Street",
      edd: "tomorrow",
      rider: "Shyam Charan",
    },
    {
      item: "item A",
      address: "Address A, 123 Street",
      edd: "today",
      rider: "Shyam Charan",
    },
    {
      item: "item A",
      address: "Address A, 123 Street",
      edd: "today",
      rider: "Shyam Charan",
    },
    {
      item: "item A",
      address: "Address A, 123 Street",
      edd: "today",
      rider: "Shyam Charan",
    },
  ];
  return (
    <div className={classes.overveiw}>
      <div className={classes.welcome} style={{ margin: "2rem" }}>
        <p style={{ fontSize: "1.5rem" }}>Welcome, {username}</p>
        <p style={{ padding: "1rem 2rem" }}>Get a look at the deliveries</p>
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
              <h1>X km Distance Travelled</h1>
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
              <h1>X% delivered on Time</h1>
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
                <TableCell className={classes.headCell}>EDD&nbsp;(g)</TableCell>
                <TableCell className={classes.headCell}>
                  Rider&nbsp;(g)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow
                  style={{ borderBottom: "1.5px solid black" }}
                  key={index}
                >
                  <TableCell className={classes.bodyCell}>{row.item}</TableCell>
                  <TableCell className={classes.bodyCell}>
                    {row.address}
                  </TableCell>
                  <TableCell className={classes.bodyCell}>{row.edd}</TableCell>
                  <TableCell className={classes.bodyCell}>
                    {row.rider}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
      <div className={classes.btn}>
        <span>Distribute Orders to Riders</span>
      </div>
    </div>
  );
};

export default OverView;
