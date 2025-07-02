import { Bounce, ToastContainer } from "react-toastify";
import SwapForm from "./components/swap/SwapForm";

function App() {
  return (
    <>
      <SwapForm />
      <ToastContainer
        position="top-right"
        role="alert"
        autoClose={5000}
        newestOnTop={true}
        closeOnClick={true}
        pauseOnFocusLoss
        pauseOnHover
        transition={Bounce}
        theme="dark"
      />
    </>
  );
}

export default App;
