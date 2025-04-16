import { makeAutoObservable } from "mobx";

class UIStore {
    theme: "light" | "dark" = this.getInitialTheme();

    constructor() {
        makeAutoObservable(this);
        document.documentElement.setAttribute("data-theme", this.theme);
    }

    private getInitialTheme(): "light" | "dark" {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "light" || storedTheme === "dark") {
            return storedTheme;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    setTheme(newTheme: "light" | "dark") {
        this.theme = newTheme;
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    }

    toggleTheme() {
        this.setTheme(this.theme === "light" ? "dark" : "light");
    }

    get nextTheme(): "light" | "dark" {
        return this.theme === "light" ? "dark" : "light";
    }
}

export const uiStore = new UIStore();
