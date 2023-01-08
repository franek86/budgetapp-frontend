import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Transactions from "./pages/Transactions/Transactions";
import CreateTransactions from "./pages/Transactions/CreateTransaction/CreateTransaction";
import EditTransactions from "./pages/Transactions/EditTransaction/EditTransaction";
import Wallet from "./pages/Wallet/Wallet";
import Categories from "./pages/Categories/Categories";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";

import DashboardLayout from "./components/Templates/DashboardLayout.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Protected from "./components/Templates/Protected.jsx";
import Layout from "./components/Templates/Layout.jsx";
import { useAuthContext } from "./context/AuthContext.jsx";

function App() {
  const { user } = useAuthContext();
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={!user ? <Login /> : <Navigate to='/dashboard' />} />
        <Route path='/auth/register' element={<Register />} />
        <Route element={<Protected />}>
          <Route path='/dashboard' element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path='transactions' element={<Transactions />} />
            <Route path='transactions/create' element={<CreateTransactions />} />
            <Route path='transactions/edit/:id' element={<EditTransactions />} />
            <Route path='wallet' element={<Wallet />} />
            <Route path='categories' element={<Categories />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
