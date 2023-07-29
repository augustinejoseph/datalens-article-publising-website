import { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ToastContext.css";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const showToast = (message, statusCode) => {
    if (statusCode >= 200 && statusCode < 300) {
      toast.success(message, {
        className: "toast-success",
      });
    } else {
      toast.error(message, {
        className: "toast-error",
      });
    }
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
