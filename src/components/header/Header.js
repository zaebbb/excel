import {ExcelComponent} from '@core/ExcelComponents';
import {$dev} from '@core/dom';
import * as actions from '@/redux/actions';
import {DEFAULT_TITLE} from '@/constants';
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/router/ActiveRoute';

export class Header extends ExcelComponent{
    static className = 'excel__header'

    constructor($root, options){
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options,
        })
    }

    prepare(){
        this.onInput = debounce(this.onInput, 300)
    }

    toHTML(){
        const title = this.store.getState().title || DEFAULT_TITLE
        return `<input type="text" id="title_table" class="excel__header--input" value="${title}">

            <div class="excel__header--buttons">
                <button class="excel__header--button button" data-type="logout">
                        <span class="material-symbols-outlined" data-type="logout">
                            logout
                        </span>
                </button> 

                <button class="excel__header--button button" data-type="remove">
                        <span class="material-symbols-outlined" data-type="remove">
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

    onClick(event){
        const $target = $dev(event.target);
        if ($target.dataset.type === 'logout'){
            ActiveRoute.navigate('')
        } else if ($target.dataset.type === 'remove'){
            localStorage.removeItem(`excel:${ActiveRoute.param}`)
            ActiveRoute.navigate('')
        }
    }
}
