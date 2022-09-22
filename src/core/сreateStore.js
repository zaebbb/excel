export function createStore(rootReducer, initialState = {}){
    let state = rootReducer({...initialState}, {type: '__INIT__'})
    let listeners = []

    return {
        subscribe: (fn) => {
            listeners.push(fn)
            return {
                unsubscribe: () => {
                    listeners = listeners.filter(l => l !== fn)
                },
            }
        },
        dispatch: (action) => {
            state = rootReducer(state, action)
            listeners.forEach(listener => listener(state))
        },
        getState: () => JSON.parse(JSON.stringify(state)),
    }
}

// store Class
/* export class CreateStore{
    constructor(rootReducer, initialState = {}){
        this.rootReducer = rootReducer
        this.initialState = initialState

        this.state = rootReducer({...initialState}, {type: '__INIT__'})
        this.listeners = []
    }

    subscribe(fn){
        this.listeners.push(fn)
        return {
            unsubscribe: () => {
                this.listeners = this.listeners.filter(l => l !== fn)
            },
        }
    }

    dispatch(action){
        this.state = this.rootReducer(this.state, action)
        this.listeners.forEach(listener => listener(this.state))
    }

    get getState(){
        return this.state
    }
}*/
