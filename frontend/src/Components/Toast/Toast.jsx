import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToastContainer = ({ status, message }) => {
  const toastOptions = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  };

  useEffect(() => {
    if (status === 'success' && message) {
      toast.success(message, toastOptions);
    } else if (status === 'error' && message) {
      toast.error(message, toastOptions);
    }
  }, [status, message]);

  return <ToastContainer />;
};

export default CustomToastContainer;
