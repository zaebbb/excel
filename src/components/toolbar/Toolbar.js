import {ExcelComponent} from '@core/ExcelComponents';

export class Toolbar extends ExcelComponent{
    static className = 'excel__toolbar'

    constructor($root, $options){
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
        })
    }

    toHTML(){
        return `
            <button class="excel__header--button button">
                        <span class="material-symbols-outlined">
                            swipe_left
                        </span>
            </button>
            <button class="excel__header--button button">
                        <span class="material-symbols-outlined">
                            swipe_right
                        </span>
            </button>
            <button class="excel__header--button button">
                        <span class="material-symbols-outlined">
                            print
                        </span>
            </button>
            <button class="excel__header--button button">
                        <span class="material-symbols-outlined">
                            imagesearch_roller
                        </span>
            </button>
            <div class="excel__toolbar--separator"></div>
            <button class="excel__header--button button">
                        <span class="material-symbols-outlined">
                            format_bold
                        </span>
            </button>
            <button class="excel__header--button button">
                        <span class="material-symbols-outlined">
                            format_italic
                        </span>
            </button>
            <button class="excel__header--button button">
                        <span class="material-symbols-outlined">
                            format_underlined
                        </span>
            </button>
            <button class="excel__header--button button">
                        <span class="material-symbols-outlined">
                            format_color_text
                        </span>
            </button>
            <div class="excel__toolbar--separator"></div>
            <button class="excel__header--button button">
                        <span class="material-symbols-outlined">
                            format_color_fill
                        </span>
            </button>
            <button class="excel__header--button button">
                        <span class="material-symbols-outlined">
                            grid_view
                        </span>
            </button>
            <div class="excel__toolbar--separator"></div>
            <button class="excel__header--button button">
                        <span class="material-symbols-outlined">
                            format_align_left
                        </span>
            </button>
            <button class="excel__header--button button">
                        <span class="material-symbols-outlined">
                            format_align_center
                        </span>
            </button>
            <button class="excel__header--button button">
                        <span class="material-symbols-outlined">
                            format_align_right
                        </span>
            </button>
            <button class="excel__header--button button">
                        <span class="material-symbols-outlined">
                            format_align_justify
                        </span>
            </button>
        `
    }

    onClick(e){
        console.log(e.target)
    }
}
