const CODES = {
    A: 65,
    Z: 90,
}

function createCell(content){
    return `
        <div class="cell" contentEditable>
            ${content ? content : ''}
        </div>
    `
}

function createCol(content){
    return `
         <div class="row-column">
             ${content ? content : ''}
         </div>
    `
}

function createRow(content, number = false){
    return `
        <div class="row">
                <div class="row-info">
                    ${number ? number : ''}
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

    for (let i = 1; i <= rowsCount; i++){
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell)
            .join('')

        rows.push(createRow(cells, i))
    }

    return rows.join('')
}
