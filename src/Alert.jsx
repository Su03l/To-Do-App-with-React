import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const AlertComponent = ({ open, handleClose, message, type }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert
        onClose={handleClose}
        severity={type} // success, info, warning, error
        sx={{ width: "100%" }}
        variant="filled"
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default AlertComponent;
