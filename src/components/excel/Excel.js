import {$dev} from '@core/dom';
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/StoreSubscriber';

export class Excel{
    constructor(selector, options){
        this.$el = $dev(selector)
        this.components = options.components || []
        this.className = options.className || 'excel'
        this.emitter = new Emitter()
        this.store = options.store
        this.subscriber = new StoreSubscriber(this.store)
    }

    getRoot(){
        const $root = $dev.create('div', this.className)
        const componentOptions = {
            emitter: this.emitter,
            store: this.store,
        }

        this.components = this.components.map(Component => {
            const $el = $dev.create('div', Component.className)

            const component = new Component($el, componentOptions)

            $el.html(component.toHTML())
            $root.append($el)

            return component
        })

        return $root
    }

    render(){
        this.$el.append(this.getRoot())

        this.subscriber.subscribeComponents(this.components)
        this.components.forEach(component => component.init())
    }

    destroy(){
        this.subscriber.unsubscribeFromStore()
        this.components.forEach(components => components.destroy())
    }
}

