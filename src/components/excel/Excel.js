import {$dev} from '@core/dom';
import {Emitter} from '@core/Emitter';

export class Excel{
    constructor(selector, options){
        this.$el = $dev(selector)
        this.components = options.components || []
        this.className = options.className || 'excel'
        this.emitter = new Emitter()
    }

    getRoot(){
        const $root = $dev.create('div', this.className)
        const componentOptions = {
            emitter: this.emitter,
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

        this.components.forEach(component => component.init())
    }

    destroy(){
        this.components.forEach(components => components.destroy())
    }
}

