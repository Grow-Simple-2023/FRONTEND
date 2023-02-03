import React, { Fragment } from "react";
import classes from "./Overview.module.css";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const OverView = () => {
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
