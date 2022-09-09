import {ExcelComponent} from '@core/ExcelComponents';
import {$dev} from '@core/dom';

export class Formula extends ExcelComponent{
    static className = 'excel__formula'

    constructor($root, options){
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options,
        })
    }

    init(){
        super.init()

        this.$formula = this.$root.querySelector(`[data-type="formula"]`)

        this.$on('table:input', data => {
            this.$formula.text(data)
        })
    }

    toHTML(){
        return `
            <div class="excel__formula-info"><span class="material-symbols-outlined">function</span></div>
            <div class="excel__formula-input" data-type="formula" contentEditable spallCheck="false"> </div>
        `
    }

    onInput(e){
        this.$emit('formula:text', $dev(e.target).text())
    }

    onKeydown(event){
        if (event.key === 'Enter'){
            event.preventDefault()
            this.$emit('formula:focus', null)
        } else if (event.key === 'Tab'){
            event.preventDefault()
        }
    }
}
