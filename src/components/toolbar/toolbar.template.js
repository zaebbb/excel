import {DEFAULT_COLOR} from '@/constants';

function createButton(button){
    const meta = `
        data-type="button"
        data-value='${JSON.stringify(button.value)}'"'
    `

    return `
        <button 
            class="excel__header--button button ${button.isActive ? 'active' : ''}"
            
            ${meta}
            ${button.isColor ? 'data-color="true"' : ''}
           >
             <span 
                class="${button.isClass || button.isSize ? '' : 'material-symbols-outlined'} ${button.isSize ? 'type__size' : ''}"
                ${button.isClass ? 'style="text-decoration: line-through;"' : ''}
                ${meta}
                ${button.isColor ? 'data-color="true"' : ''}
             >
                 ${button.icon}
             </span>
        </button>
        ${button.isSeparator ? '<div class="excel__toolbar--separator"></div>' : ''}
    `
}

function createColorPicker(currentColor){
    return `<input type="color" data-type="color" class="toolbar__input" value="${currentColor || DEFAULT_COLOR}">`
}

function createSizeSelect(state){
    return `
        <select data-sizetext="size" class="toolbar__input toolbar__select--size" data-type="button">
                <option ${state['fontSize'] === '6px' ? 'selected' : ''} value="6px">6</option>
                <option ${state['fontSize'] === '8px' ? 'selected' : ''} value="8px">8</option>
                <option ${state['fontSize'] === '10px' ? 'selected' : ''} value="10px">10</option>
                <option ${state['fontSize'] === '12px' ? 'selected' : ''} value="12px">12</option>
                <option ${state['fontSize'] === '14px' ? 'selected' : ''} value="14px">14</option>
                <option ${state['fontSize'] === '16px' ? 'selected' : ''} value="16px">16</option>
                <option ${state['fontSize'] === '18px' ? 'selected' : ''} value="18px">18</option>
                <option ${state['fontSize'] === '24px' ? 'selected' : ''} value="24px">24</option>
                <option ${state['fontSize'] === '32px' ? 'selected' : ''} value="32px">32</option>
                <option ${state['fontSize'] === '44px' ? 'selected' : ''} value="44px">44</option>
                <option ${state['fontSize'] === '64px' ? 'selected' : ''} value="64px">64</option>
            </select>
    `
}

export function createToolbar(state, currentColor){
    const buttons = [
        // {
        //     icon: 'swipe_left',
        //     isSeparator: false,
        //     isClass: false,
        //     isActive: false,
        //     value: {
        //         textAlign: 'left',
        //     },
        // },
        // {
        //     icon: 'swipe_right',
        //     isSeparator: false,
        //     isClass: false,
        //     isActive: false,
        // },
        {
            icon: 'print',
            isSeparator: false,
            isClass: false,
            isActive: false,
            value: {
                textContent: 'left',
            },
        },
        // {
        //     icon: 'imagesearch_roller',
        //     isSeparator: true,
        //     isClass: false,
        //     isActive: false,
        //     value: {
        //         textContent: 'left',
        //     },
        // },
        {
            icon: createSizeSelect(state),
            isSeparator: false,
            isSize: true,
            isClass: true,
            isActive: false,
            value: {
                fontSize: '16',
            },
        },
        {
            icon: 'format_bold',
            isSeparator: false,
            isActive: state['fontWeight'] === 'bold',
            value: {
                fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold',
            },
        },
        {
            icon: 'format_italic',
            isSeparator: false,
            isClass: false,
            isActive: state['fontStyle'] === 'italic',
            value: {
                fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic',
            },
        },
        {
            icon: 'format_underlined',
            isSeparator: false,
            isClass: false,
            isActive: state['textDecoration'] === 'underline',
            value: {
                textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline',
            },
        },
        {
            icon: 'S',
            isSeparator: true,
            isClass: true,
            isActive: state['textDecoration'] === 'line-through',
            value: {
                textDecoration: state['textDecoration'] === 'line-through' ? 'none' : 'line-through',
            },
        },
        {
            icon: 'format_color_text',
            isSeparator: false,
            isClass: false,
            isActive: false,
            isColor: true,
            value: {
                color: currentColor || '#000',
            },
        },
        {
            icon: 'format_color_fill',
            isSeparator: false,
            isClass: false,
            isActive: false,
            isColor: true,
            value: {
                background: currentColor || '#fff',
            },
        },
        // {
        //     icon: 'grid_view',
        //     isSeparator: true,
        //     isClass: false,
        //     isActive: false,
        //     value: {
        //         textContent: 'left',
        //     },
        // },
        {
            icon: 'format_align_left',
            isSeparator: false,
            isClass: false,
            isActive: state['textAlign'] === 'left',
            value: {
                textAlign: 'left',
            },
        },
        {
            icon: 'format_align_center',
            isSeparator: false,
            isClass: false,
            isActive: state['textAlign'] === 'center',
            value: {
                textAlign: 'center',
            },
        },
        {
            icon: 'format_align_right',
            isSeparator: false,
            isClass: false,
            isActive: state['textAlign'] === 'right',
            value: {
                textAlign: 'right',
            },
        },
        {
            icon: 'format_align_justify',
            isSeparator: false,
            isClass: false,
            isActive: state['textAlign'] === 'justify',
            value: {
                textAlign: 'justify',
            },
        },
    ]

    return new Array(buttons.length).fill('').map((_, i) => createButton(buttons[i])).join('') + createColorPicker(currentColor)
}
