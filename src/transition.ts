import {State} from "./state";

export interface StateTransitionArgs {
    parent: State | null,
    child: State,
    shouldTransition: () => boolean,
    onTransition?: () => void;
}

export class StateTransition {
    parent: State | null;
    child: State;
    shouldTransition: () => boolean;
    triggerState: boolean = false;
    onTransition: () => void;

    constructor({
                    parent,
                    child,
                    shouldTransition,
                    onTransition = () => {
                    }
                }: StateTransitionArgs) {
        this.parent = parent;
        this.child = child;
        this.shouldTransition = shouldTransition;
        this.onTransition = onTransition;

    }

    trigger(): void {
        this.triggerState = true;
    }

    isTriggered(): boolean {
        return this.triggerState;
    }

    resetTrigger(): void {
        this.triggerState = false;
    }
}
