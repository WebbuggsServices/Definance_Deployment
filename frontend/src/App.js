import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import './App.css';
import currentYear from './utilities/currentYear';

const App = () => {
  return (
    <div class="root-container">
    <Header/>
    <Outlet />
    {/* <footer className='footer'> Copyright ©{currentYear()}. All rights reserved.</footer> */}
  </div>
  );
};

export default App;
