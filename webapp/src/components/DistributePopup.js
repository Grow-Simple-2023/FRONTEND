import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";

import { Colors } from "../ref/colors.ts";
import { apiendpoint } from "../constants/constans.js";

const DistributeDialog = ({ onClose, open, items, data }) => {
  const [riders, setRiders] = useState([]);

  useEffect(() => {
    setRiders(data);
  }, [data]);

  const handleClose = () => {
    onClose(false);
  };

  const onSubmit = () => {
    var jwt = localStorage.getItem("@jwtauth");
    if (!jwt) jwt = "";
    const body = {
      item_ids: items.map((item) => item.id),
      rider_phone_nos: riders.map((item) => item.phone_no)
    };
    fetch(`${apiendpoint}/manager/distribute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Credentials: `Bearer ${jwt}`
      },
      body: JSON.stringify(body)
    })
      .then((res) => {
        console.log(res.status);
        if (res.ok) return res.json();
        else throw new Error("Unauthorized");
      })
      .then((json) => {
        console.log(json);
        onClose(false);
      })
      .catch((err) => console.log(err));
  };

  const handleItemClick = (value) => {
    var temp = riders;
    temp = riders.filter((item) => item.phone_no !== value.phone_no);
    setRiders(temp);
  };

  return (
    <Dialog onClose={handleClose} open={open > 0}>
      <DialogContent>
        {!data && <>Loading....</>}
        {data && (
          <>
            <DialogTitle>Whom to assign ?</DialogTitle>
            <List>
              {data
                .filter((item) => riders.includes(item))
                .map((item, id) => (
                  <ListItem
                    button
                    style={{
                      backgroundColor: Colors.Theme
                    }}
                    onClick={() => handleItemClick(item)}
                    key={id}
                  >
                    <ListItemText>
                      {item.name.first} {item.name.last} - {item.phone_no}
                    </ListItemText>
                  </ListItem>
                ))}
              {data
                .filter((item) => !riders.includes(item))
                .map((item, id) => (
                  <ListItem
                    button
                    onClick={() => handleItemClick(item)}
                    key={id}
                  >
                    <ListItemText>
                      {item.name.first} {item.name.last} - {item.phone_no}
                    </ListItemText>
                  </ListItem>
                ))}
            </List>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit}>
          <Typography>Assign</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DistributeDialog;
