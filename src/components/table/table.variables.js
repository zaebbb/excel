import {$dev} from '@core/dom'

const params = (event) => {
    const $target = $dev(event.target)
    const $parent = $target.closest('[data-resize="parent"]')
    const coords = $parent.getCoords()
    const row = $dev(`[data-resize="row-line"]`)
    const col = $dev(`[data-resize="col-line"]`)
    const resizeData = $target.dataset.resize

    return {
        $target,
        $parent,
        coords,
        row,
        col,
        resizeData,
    }
}

export default params
