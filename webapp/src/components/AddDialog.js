import React from "react";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";

import { apiendpoint } from "../constants/constans.js";

const AddDialog = ({ onClose, open, data }) => {
  const handleClose = () => {
    onClose(false);
  };

  const handleItemClick = (value) => {
    var jwt = localStorage.getItem("@jwtauth");
    if (!jwt) jwt = "";
    fetch(`${apiendpoint}/manager/add-pickup/${value.id}`, {
      method: "PUT",
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
        onClose(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Dialog onClose={handleClose} open={open > 0}>
      {!data && <>Loading....</>}
      {data && (
        <>
          <DialogTitle>Add Pickup ?</DialogTitle>
          <List>
            {data.map((item, id) => (
              <ListItem button onClick={() => handleItemClick(item)} key={id}>
                <ListItemText>{item.title}</ListItemText>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Dialog>
  );
};

export default AddDialog;
