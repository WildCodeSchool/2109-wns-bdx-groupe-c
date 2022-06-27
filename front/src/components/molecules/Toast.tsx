import { forwardRef } from 'react';
import { Snackbar, Alert, AlertProps } from '@mui/material';
import useToast from '../../contexts/useToast';


const SnackbarAlert =forwardRef<HTMLDivElement, AlertProps>(
  function SnackbarAlert(props, ref) {
    return <Alert ref={ref} elevation={6} {...props} />;
  }
)

const Toast: React.FC = () => {
  const { toastConfig, hideToast } = useToast();

  if (!toastConfig) return null;

  return (
    <>
      <Snackbar
        open={true}
        autoHideDuration={6000}
        onClose={hideToast}
      >
        <SnackbarAlert
          onClose={hideToast}
          severity={toastConfig.severity}
        >
          { toastConfig.message }
        </SnackbarAlert>

      </Snackbar>
    </>
  )
}

export default Toast