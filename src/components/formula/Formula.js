import {ExcelComponent} from '@core/ExcelComponents';

export class Formula extends ExcelComponent{
    static className = 'excel__formula'

    constructor($root){
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click'],
        })
    }

    toHTML(){
        return `
            <div class="excel__formula-info"><span class="material-symbols-outlined">function</span></div>
            <div class="excel__formula-input" contentEditable spallCheck="false"></div>
        `
    }

    onInput(e){
        console.log(this.$root)
        console.log('fx oninput', e.target.textContent.trim())
    }

    onClick(){

    }
}
