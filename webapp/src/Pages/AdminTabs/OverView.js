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

  const [items, setItems] = useState([]);

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
        Credentials: `Bearer ${jwt}`,
      },
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

  return (
    <div className={classes.overveiw}>
      <div className={classes.welcome} style={{ margin: "2rem" }}>
        <p style={{ fontSize: "1.5rem" }}>Welcome, {username}</p>
        <p style={{ padding: "1rem 2rem" }}>Get a look at the deliveries</p>
      </div>

      <main className={classes.distTime}>
        <Grid
          container
          // direction="row"
          // justifyContent="center"
          // alignItems="center"
          // spacing={3}
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
                <TableCell className={classes.headCell}>
                  Rider
                </TableCell>
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
                  <TableCell className={classes.bodyCell}>{row.EDD}</TableCell>
                  <TableCell className={classes.bodyCell}>
                    {row.phone_number}
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
