const getStorageTheme = () => {
  let theme = "light_theme";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

export { getStorageTheme };
