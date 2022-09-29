import {$dev} from '@core/dom'

export function Loader(){
    return $dev
        .create('div', 'loader')
        .html(`
            <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>`)
}
