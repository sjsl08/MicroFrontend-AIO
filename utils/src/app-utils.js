// Anything exported from this file is importable by other in-browser modules.


import { BehaviorSubject, Observable, Subject } from "rxjs"


export const pubSub = {
    angular : [],
    react:[],
    commonData: {
        commonData: new Subject(),
        subCommonData() {
            return this.commonData.asObservable();
        },
        pubCommonData(value,to) {
            console.log(value);
            to === "react" ? pubSub.react.push({value,fn:this.commonData.next(value)}) : pubSub.angular.push({value,fn:this.commonData.next(value)})
            // this.commonData.next(value);
        }
    }
}

export const obj = {
    name: "",
    token: ""
}


// Create a BehaviorSubject to hold the global state
const initialState = { name: "", token: "" };
export const globalState = new BehaviorSubject(initialState);

// Get the current value of the global state
export const currentState = globalState.getValue();



export function publicApiFunction(data) {
    console.log(data);
}


