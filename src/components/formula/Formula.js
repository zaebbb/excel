import {ExcelComponent} from '@core/ExcelComponents';
import {$dev} from '@core/dom';

export class Formula extends ExcelComponent{
    static className = 'excel__formula'

    constructor($root, options){
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options,
        })
    }

    init(){
        super.init()

        this.$formula = this.$root.querySelector(`[data-type="formula"]`)

        this.$on('table:input', $cell => {
            // console.log($cell)
            this.$formula.text($cell.dataset.value)
        })
    }

    toHTML(){
        return `
            <div class="excel__formula-info"><span class="material-symbols-outlined">function</span></div>
            <div class="excel__formula-input" data-type="formula" contentEditable spallCheck="false"> </div>
        `
    }

    onInput(e){
        const text = $dev(e.target).text()
        this.$emit('formula:text', text)
    }

    onKeydown(event){
        if (event.key === 'Enter'){
            event.preventDefault()
            this.$emit('formula:focus', null)
        } else if (event.key === 'Tab'){
            event.preventDefault()
        }
    }

    storeChange({currentText}){
        this.$formula.text(currentText)
    }
}
