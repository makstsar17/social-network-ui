import { Switch } from "@heroui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useTheme } from "../ThemeProvider";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Switch
            checked={theme === "dark"}
            onChange={toggleTheme}
            color="secondary"
            size="lg"
            startContent={<LuSun />}
            endContent={<LuMoon />}
        />
    );
}

export default ThemeToggle;