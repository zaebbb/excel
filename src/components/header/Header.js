import {ExcelComponent} from '@core/ExcelComponents';

export class Header extends ExcelComponent{
    static className = 'excel__header'

    constructor($root, options){
        super($root, {
            name: 'Header',
            ...options,
        })
    }

    toHTML(){
        return `<input type="text" class="excel__header--input" value="Новая таблица">

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
}
