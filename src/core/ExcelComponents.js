import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}){
        super($root, options.listeners)
        this.name = options.name
        this.emitter = options.emitter
        this.unsubscribers = []
        this.store = options.store
        this.subscribe = options.subscribe || []
        this.storeSub = null

        this.prepare()
    }

    // setting component before init
    prepare(){

    }

    // return layout component
    toHTML(){
        return ''
    }

    // listen
    $emit(event, ...args){
        this.emitter.emit(event, ...args)
    }

    $on(event, fn){
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    $dispatch(action){
        this.store.dispatch(action)
    }

    storeChange(){}

    isWatching(key){
        return this.subscribe.includes(key)
    }

    get $getState(){
        return this.store.getState()
    }

    // init component
    // add DOM listeners
    init(){
        this.initDOMListeners()
    }

    // destroy component
    // clear DOM listeners
    destroy(){
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsubscribe => unsubscribe())
    }
}
