import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PopUpMessage() {
  return (
    <>
      {/* your routes/components */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default PopUpMessage;
