import { configure } from "mobx";

configure({
    useProxies: "ifavailable",
    computedRequiresReaction: false,
    reactionRequiresObservable: false,
    observableRequiresReaction: false,
});