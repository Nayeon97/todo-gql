import { Alert, css, Snackbar } from "@mui/material";
import { useState } from "react";

interface SnackbarProps {
  type?: string;
  text?: string;
  isOpen: boolean;
}

const ErrorSnackbar = ({ type, text, isOpen }: SnackbarProps) => {
  const [open, setOpen] = useState(isOpen);
  const temp = type === "error" ? "error" : "success";

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      css={snackbarStyle}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={temp} onClose={handleClose}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;

const snackbarStyle = css`
  top: 150px;
`;
