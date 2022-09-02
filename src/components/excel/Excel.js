import {$dev} from '@core/dom';

export class Excel{
    constructor(selector, options){
        this.$el = $dev(selector)
        this.components = options.components || []
        this.className = options.className || 'excel'
    }

    getRoot(){
        const $root = $dev.create('div', this.className)

        this.components = this.components.map(Component => {
            const $el = $dev.create('div', Component.className)

            const component = new Component($el)

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
}

