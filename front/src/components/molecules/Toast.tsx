import { forwardRef } from 'react';
import { Snackbar, Alert, AlertProps } from '@mui/material';


const SnackbarAlert =forwardRef<HTMLDivElement, AlertProps>(
  function SnackbarAlert(props, ref) {
    return <Alert ref={ref} elevation={6} {...props} />;
  }
)


interface ToastProps {
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void,
  open: boolean,
  severity: 'success' | 'info' | 'warning' | 'error',
  message: string,
}


const Toast: React.FC<ToastProps> = ({handleClose, open, severity, message}) => {
  // const [open, setOpen] = useState(false);
  // const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setOpen(false);
  // }

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackbarAlert
          onClose={handleClose}
          severity={severity}
        >
          {message}
        </SnackbarAlert>

      </Snackbar>
    </>
  )
}

export default Toast