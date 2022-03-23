import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getCustomers } from "../../redux/actions/customerActions";

function CustomDialog({
  dialogOpen,
  selectedCustomer,
  closeDialog,
  modalType,
}) {
  console.log(selectedCustomer);
  const dispatch = useDispatch();
  const [email, setEmail] = useState(selectedCustomer?.email || "");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(selectedCustomer?.name || "");
  const [phone, setPhone] = useState(selectedCustomer?.phone || "");

  const addContact = async () => {
    setLoading(true);
    await fetch("https://tester.crs-consulting.com/api/entry", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone }),
    })
      .then((data) => data.json())
      .then((data) => {
        setLoading(false);
        alert("Data Added successfully");
        closeDialog();
        dispatch(getCustomers());
      })
      .catch((err) => {
        setLoading(false);
        alert("Something went wrong while editing users");
      });
  };

  const editContact = async () => {
    setLoading(true);
    await fetch("https://tester.crs-consulting.com/api/entry", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: selectedCustomer.id, name, email, phone }),
    })
      .then((data) => data.json())
      .then((data) => {
        setLoading(false);
        alert("Data updated successfully");
        closeDialog();
        dispatch(getCustomers());
      })
      .catch((err) => {
        setLoading(false);
        alert("Something went wrong while editing users");
      });
  };
  return (
    <Dialog open={dialogOpen} onClose={() => closeDialog()} fullWidth>
      <DialogTitle id="simple-dialog-title">
        {modalType} contact details
      </DialogTitle>
      <DialogContent>
        <Grid container direction="column">
          <TextField
            id="email"
            type="email"
            label="Email"
            disabled={modalType === "View"}
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            style={{ margin: "0.5rem 0" }}
          />
          <TextField
            id="name"
            type="text"
            label="Name"
            disabled={modalType === "View"}
            value={name}
            onChange={(evt) => setName(evt.target.value)}
            style={{ margin: "0.5rem 0" }}
          />
          <TextField
            id="phone"
            label="Phone"
            type="text"
            disabled={modalType === "View"}
            value={phone}
            onChange={(evt) => setPhone(evt.target.value)}
            style={{ margin: "0.5rem 0" }}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={loading || modalType === "View"}
          variant="contained"
          color="primary"
          onClick={() => (selectedCustomer?.id ? editContact() : addContact())}
        >
          {loading ? <CircularProgress size={20} color="#fff" /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;
