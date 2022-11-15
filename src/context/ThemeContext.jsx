import { useState,useEffect, createContext, useContext } from "react";

const ThemeContext = createContext();


const getStorageTheme = () =>{
    let theme = "light_theme";
    if(localStorage.getItem("theme")){
        theme = localStorage.getItem("theme")
    }
    return theme
}

export const ThemeProvider = ({children}) => {


    const [darkMode, setDarkMode] = useState(getStorageTheme());
    const [toggleMenu, setToggleMenu] = useState(false);
    const [dropdown, setDropdown] = useState(false);
   

    const handleTheme = () => {
        setDarkMode((oldValue) => oldValue === "light_theme" ? "dark_theme" : "light_theme")
        localStorage.setItem('theme',darkMode)
    }

    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu)
    }

    const handleCloseMenu = () => {
        setToggleMenu(false)
    }

    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }

    

    useEffect(() => {
        localStorage.setItem('theme',darkMode)
    },[darkMode])

    return<ThemeContext.Provider value={{darkMode, setDarkMode, handleTheme, toggleMenu,handleToggleMenu, handleCloseMenu, dropdown, toggleDropdown}}>
        {children}
    </ThemeContext.Provider>
}

export const useThemeContext = () => {
    return useContext(ThemeContext)
}

