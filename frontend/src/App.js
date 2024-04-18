import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "./App.css";
// import currentYear from "./utilities/currentYear";

const App = () => {
  return (
    <>
      <ToastContainer />
      <div className="root-container">
        <Header />
        <Outlet />
        {/* <footer className='footer'> Copyright ©{currentYear()}. All rights reserved.</footer> */}
      </div>
    </>
  );
};

export default App;
