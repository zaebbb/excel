import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}){
        super($root, options.listeners)
        this.name = options.name
        this.emitter = options.emitter
        this.unsubscribers = []

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
