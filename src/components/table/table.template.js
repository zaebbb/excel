import {toInlineStyles} from '@core/utils';
import {DEFAULT_STYLES} from '@/constants';
import {parse} from '@core/parse';

const CODES = {
    A: 65,
    Z: 90,
}
const DEFAULT_WIDTH = 100
const DEFAULT_HEIGHT = 24
const DEFAULT_STATE = {
    colState: {},
    rowState: {},
}

function toChar(_, index){
    return String.fromCharCode(CODES.A + index)
}

function getWidth(state, index){
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function withWidthFrom(state){
    return function(content, i){
        return {
            content, i, width: getWidth(state.colState, i),
        }
    }
}

function getHeight(state, index){
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function createCell(row, state){
    return function(_, i){
        const id = `${row}-${i}`
        const data = state.dataState[id]
        const width = getWidth(state.colState, i)
        const styles = toInlineStyles({
            ...DEFAULT_STYLES,
            ...state.stylesState[id],
        })

        return `
        <div 
            class="cell" 
            contentEditable 
            data-id="${id}" 
            data-row="${i}"
            data-type="cell"
            data-value="${data || ''}"
            style="${styles}; width: ${width};"
        >
            ${parse(data) || ''}
        </div>
    `
    }
}

function createCol({content, i, width}){
    return `
         <div 
            style="width: ${width};" 
            class="row-column" 
            data-resize="parent" 
            data-col="${i}"
         >
             ${content ? content : ''}
             <div class="col-resize" data-resize="col"></div>
         </div>
    `
}

function createRow(content, number = false, state){
    const height = getHeight(state.rowState, number)
    return `
        <div 
            class="row" 
            data-resize="parent" 
            data-rowfirst="${number}"
            style="height: ${height};"
        >
                <div class="row-info">
                    ${number ? number : ''}
                    ${!number ? '' : '<div class="row-resize" data-resize="row"></div>'}
                </div>

                <div class="row-data">
                    ${content}
                </div>
            </div>
    `
}

export function createTable(rowsCount = 15, state = DEFAULT_STATE){
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(createCol)
        .join('')

    rows.push(createRow(cols, null, state))

    for (let row = 0; row < rowsCount; row++){
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell(row, state))
            .join('')

        rows.push(createRow(cells, row + 1, state))
    }

    return rows.join('') + `
            <br>
            <span class="row-line" data-resize="row-line"></span>
            <span class="col-line" data-resize="col-line"></span>
        `
}
