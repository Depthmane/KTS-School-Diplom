import {makeAutoObservable} from "mobx";

class UIStore {
    theme: "light"| "dark" = this.getInitialTheme();

    constructor() {
        makeAutoObservable(this);
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
        localStorage.setItem("theme", newTheme)
    }
}

export const uiStore = new UIStore();
