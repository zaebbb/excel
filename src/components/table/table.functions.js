import {range} from '@core/utils';

export function isResize(event) {
    return event.target.dataset.resize
}

export function isSelect(event){
    return event.target.dataset.type === 'cell'
}

export function matrix(target, current){
    const cols = range(target.col, current.col)
    const rows = range(target.row, current.row)

    return cols
        .reduce((acc, col) => {
            rows.forEach(row => acc.push(`${col}-${row}`))
            return acc
        }, [])
}

export function buttonAction(event, {col, row}){
    switch (event.key){
        case 'ArrowDown':
        case 'Enter':
            col++
            break
        case 'ArrowUp':
            col--
            break
        case 'ArrowLeft':
            row--
            break
        case 'ArrowRight':
        case 'Tab':
            row++
            break
    }

    return `[data-id="${col}-${row}"]`
}
