const CODES = {
    A: 65,
    Z: 90,
}
function createCell(row){
    return function(content, i){
        return `
        <div 
            class="cell" 
            contentEditable 
            data-id="${row}-${i}" 
            data-row="${i}"
            data-type="cell"
        >
            ${content ? content : ''}
        </div>
    `
    }
}

function createCol(content, i){
    return `
         <div class="row-column" data-resize="parent" data-col="${i}">
             ${content ? content : ''}
             <div class="col-resize" data-resize="col"></div>
         </div>
    `
}

function createRow(content, number = false){
    return `
        <div class="row" data-resize="parent">
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

function toChar(_, index){
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15){
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createCol)
        .join('')

    rows.push(createRow(cols))

    for (let row = 0; row < rowsCount; row++){
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell(row))
            .join('')

        rows.push(createRow(cells, row + 1))
    }

    return rows.join('') + `
            <br>
            <span class="row-line" data-resize="row-line"></span>
            <span class="col-line" data-resize="col-line"></span>
        `
}
