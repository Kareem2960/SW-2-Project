import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useTheme } from "../../Context/DarkModeProvider";

const DarkModeBtn = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontSize: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: isDarkMode ? "#e2e8f0" : "#1e1e2e",
      }}
    >
      {isDarkMode ? (
        <MoonOutlined style={{ color: "#e2e8f0" }} />
      ) : (
        <SunOutlined style={{ color: "#1e1e2e" }} />
      )}
    </button>
  );
};

export default DarkModeBtn;
