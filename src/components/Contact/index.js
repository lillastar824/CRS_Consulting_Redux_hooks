import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../redux/actions/customerActions";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
import {
  Grid,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import CustomDialog from "../Dialog";

export default function Contact() {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const { customerDetails, error } = useSelector((state) => state.contacts);
  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);
  const onAdd = () => {
    setModalType("Add");
    setDialogOpen(true);
  };
  const onView = async (id) => {
    setModalType("View");
    await fetch(`https://tester.crs-consulting.com/api/entry?id=${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setSelectedCustomer([data]);
        setDialogOpen(true);
      })
      .catch((err) => {
        alert("Something went wrong while fetching user details");
      });
  };
  const onEdit = (id) => {
    setModalType("Edit");
    setSelectedCustomer(
      customerDetails.filter((customer) => customer.id === id)
    );
    setDialogOpen(true);
  };
  const closeDialog = async () => {
    setDialogOpen(false);
    setSelectedCustomer({});
    setModalType("");
  };
  const onDelete = async (id) => {
    await fetch(`https://tester.crs-consulting.com/api/entry?id=${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        alert("Contact deleted successfully");
        dispatch(getCustomers());
      })
      .catch((err) => {
        alert("Something went wrong while deleting contact");
      });
  };
  return (
    <div
      style={{
        padding: "2rem",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            margin: "1rem",
            justifyContent: "space-between",
          }}
        >
          <h1>Contact app</h1>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => onAdd()}
          >
            Add
          </Button>
        </div>
        {customerDetails.length > 0 && (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customerDetails.length > 0 &&
                  customerDetails.map((row) => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>
                          <RemoveRedEye
                            style={{ cursor: "pointer" }}
                            onClick={() => onView(row.id)}
                          />
                          <Edit
                            style={{ cursor: "pointer" }}
                            onClick={() => onEdit(row.id)}
                          />
                          <Delete
                            style={{ cursor: "pointer" }}
                            onClick={() => onDelete(row.id)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Paper>
        )}
        {customerDetails.length === 0 && !error && (
          <Grid container justify="center">
            <CircularProgress size={50} />
          </Grid>
        )}
        {error && <h4>Something went wrong please try again later</h4>}
      </div>
      {dialogOpen && (
        <CustomDialog
          setDialogOpen={setDialogOpen}
          dialogOpen={dialogOpen}
          selectedCustomer={selectedCustomer[0]}
          closeDialog={closeDialog}
          modalType={modalType}
        />
      )}
    </div>
  );
}
