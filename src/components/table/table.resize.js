import params from '@/components/table/table.variables';

const resize = (event, $root) => {
    const {$parent, coords, row, col, resizeData} = params(event)
    const domRows = $root.querySelectorAll(`[data-row="${$parent.dataset.col}"]`)

    let delta = 0
    let value = 0

    if (resizeData === 'col') {
        col.addClass('active')
        col.style.left = event.pageX + 'px'
    } else {
        row.addClass('active')
        row.style.top = (event.pageY - 130) + 'px'
    }

    document.onmousemove = e => {
        if (resizeData === 'col'){
            delta = Math.floor(e.pageX - coords.right)
            value = coords.width + delta

            col.css({
                left: e.pageX + 'px',
            })
        } else if (resizeData === 'row'){
            delta = Math.floor(e.pageY - coords.bottom)
            value = coords.height + delta

            row.css({
                top: (e.pageY - 130) + 'px',
            })
        }
    }

    document.onmouseup = () => {
        if (resizeData === 'col'){
            $parent.style.width = value + 'px'
            domRows.forEach(row => row.style.width = value + 'px')
        } else if (resizeData === 'row'){
            $parent.style.height = value + 'px'
        }

        row.removeClass('active')
        col.removeClass('active')

        document.onmousemove = null
        document.onmouseup = null
    }
}

export default resize
