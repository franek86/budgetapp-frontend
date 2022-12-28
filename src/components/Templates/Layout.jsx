import { Outlet } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext.jsx";

const Layout = () => {
  const { darkMode } = useThemeContext();
  return (
    <main className='App' id={darkMode}>
      <Outlet />
    </main>
  );
};

export default Layout;
