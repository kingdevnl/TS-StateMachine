import {State} from "./state";
import {StateTransition} from "./transition";


export class StateMachine {
    currentState: State;
    transitions: Array<StateTransition> = []


    constructor(transitions: Array<StateTransition>, defaultState: State) {
        this.transitions = transitions;
        this.currentState = defaultState;
    }

    update(): void {
        this.currentState.onUpdate();

        for (let i = 0; i < this.transitions.length; i++) {
            const transition = this.transitions[i];

            if (transition.parent == this.currentState) {
                if (transition.isTriggered() || transition.shouldTransition()) {
                    transition.resetTrigger();

                    this.currentState.isActive  = false;
                    this.currentState.onEnd();

                    transition.onTransition();
                    this.currentState = transition.child;
                    this.currentState.isActive = true;

                    this.currentState.onEnter();

                }
            }
        }
    }
}
