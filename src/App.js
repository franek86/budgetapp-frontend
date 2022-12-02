import "./App.scss";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home/Home";
import Transactions from "./pages/Transactions/Transactions";
import CreateTransactions from "./pages/Transactions/CreateTransaction/CreateTransaction";
import EditTransactions from "./pages/Transactions/EditTransaction/EditTransaction";
import Wallet from "./pages/Wallet/Wallet";
import Categories from "./pages/Categories/Categories";
import Profile from "./pages/Profile/Profile";
import Auth from "./pages/Auth/Auth";
import NotFound from "./pages/NotFound/NotFound";

import Header from "./components/Header/Header";
import NavBar from "./components/Navbar/NavBar";

import { useThemeContext } from "./context/ThemeContext";

function App() {
  const { darkMode, toggleMenu } = useThemeContext();

  return (
    <div className='App' id={darkMode}>
      <div className={`grid ${toggleMenu === true ? "column-1" : "app_column"} column-gap`}>
        <NavBar />

        <main className='main'>
          <Header />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/transactions/create' element={<CreateTransactions />} />
            <Route path='/transactions/edit/:id' element={<EditTransactions />} />
            <Route path='/wallet' element={<Wallet />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
