import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToastContainer = ({ status, message, isError }) => {
  const toastOptions = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  };

  React.useEffect(() => {
    if (status && message) {
      if (isError) {
        toast.error(message, toastOptions);
      } else {
        toast.success(message, toastOptions);
      }
    }
  }, [status, message, isError]);

  return <ToastContainer />;
};

export default CustomToastContainer;
