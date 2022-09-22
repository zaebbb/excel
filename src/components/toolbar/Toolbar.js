import {createToolbar} from '@/components/toolbar/toolbar.template';
import {$dev} from '@core/dom';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {DEFAULT_STYLES} from '@/constants';
import * as actions from '@/redux/actions';

export class Toolbar extends ExcelStateComponent{
    static className = 'excel__toolbar'

    constructor($root, options){
        super($root, {
            name: 'Toolbar',
            listeners: ['click', 'change'],
            subscribe: ['currentStyles'],
            ...options,
        })
    }

    prepare(){
        this.initState(DEFAULT_STYLES)
    }

    toHTML(){
        return this.template
    }

    get template(){
        return createToolbar(this.state, this.$getState.currentColor)
    }

    storeChange(changes){
        this.setState(changes.currentStyles)
    }

    onClick(e){
        const $target = $dev(e.target)
        if ($target.dataset.type === 'button' && !$target.dataset.sizetext){
            const value = JSON.parse($target.dataset.value)

            this.$emit('toolbar:applyStyle', value)

            // const key = Object.keys(value).at(0)
            // this.setState({[key]: value[key]})
        }
    }

    onChange(event){
        const $select = $dev(event.target)
        if ($select.dataset.sizetext === 'size'){
            const value = $select.value()
            const fontSize = {fontSize: value}

            this.$emit('toolbar:applyStyle', fontSize)
        } else if ($select.dataset.type === 'color'){
            const value = $select.value()
            $dev('body').querySelectorAll('[data-color="true"]').forEach($elem => {
                const valueElem = JSON.parse($elem.dataset.value)
                Object.keys(valueElem).forEach(key => {
                    valueElem[key] = value
                })
                $elem.dataset.value = JSON.stringify(valueElem)
            })
            this.$dispatch(actions.changeColor(value))
        }
    }
}
