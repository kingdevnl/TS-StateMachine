import {StateMachine} from "./machine";
import {StateTransition} from "./transition";
import {State} from "./state";

let counter = 0;


class IdleState extends State {
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    onEnter() {
        console.log(`IDLE: ${this.name} onEnter`);
    }

    onEnd() {
        console.log(`IDLE: ${this.name} onEnd`);
    }
}


class CounterState extends State {

    onEnter() {
        counter = 0;
        console.log('CounterState onEnter')
    }

    onUpdate() {
        counter++;
        console.log('CounterState onUpdate ', counter)
    }

    onEnd() {
        console.log('CounterState onEnd')
    }
}


const startState = new IdleState("START");
const counterState = new CounterState();




const transitions: Array<StateTransition> = [
    new StateTransition({
        parent: startState,
        child:  counterState,
        shouldTransition: ()=> true
    }),

    new StateTransition({
        parent: counterState,
        child: counterState,
        shouldTransition: () => counter >= 10

    })
]

const stateMachine = new StateMachine(transitions, startState);


for (let i = 0; i < 100; i++) {
    stateMachine.update();
}
