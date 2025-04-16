import { makeAutoObservable } from "mobx";

type Theme = "light" | "dark";

class UIStore {
    theme: Theme = this.getInitialTheme();

    constructor() {
        makeAutoObservable(this);
        document.documentElement.setAttribute("data-theme", this.theme);
    }

    private getInitialTheme(): Theme {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "light" || storedTheme === "dark") {
            return storedTheme;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    setTheme(newTheme: Theme) {
        this.theme = newTheme;
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    }

    toggleTheme() {
        this.setTheme(this.theme === "light" ? "dark" : "light");
    }

    get nextTheme(): Theme {
        return this.theme === "light" ? "dark" : "light";
    }
}

export const uiStore = new UIStore();
