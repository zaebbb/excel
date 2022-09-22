import {ExcelComponent} from '@core/ExcelComponents';
import {$dev} from '@core/dom';
import * as actions from '@/redux/actions';
import {DEFAULT_TITLE} from '@/constants';
import {debounce} from '@core/utils';

export class Header extends ExcelComponent{
    static className = 'excel__header'

    constructor($root, options){
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options,
        })
    }

    prepare(){
        this.onInput = debounce(this.onInput, 300)
    }

    toHTML(){
        const title = this.store.getState().title || DEFAULT_TITLE
        console.log(this.store.getState())
        return `<input type="text" id="title_table" class="excel__header--input" value="${title}">

            <div class="excel__header--buttons">
                <button class="excel__header--button button">
                        <span class="material-symbols-outlined">
                            logout
                        </span>
                </button> 

                <button class="excel__header--button button">
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                </button>
            </div>
        `
    }

    onInput(event){
        const $target = $dev(event.target)
        this.$dispatch(actions.changeTitle($target.text()))
    }
}
