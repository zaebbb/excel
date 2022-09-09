export class TableSelection{
    static className = 'selected'
    static classNameCurrent = 'selectedCurrent'

    constructor(){
        this.group = []
        this.current = null
    }

    select($el){
        this.clearSelectAll()
        this.group.push($el)
        $el.focus.addClass(TableSelection.className).addClass(TableSelection.classNameCurrent)
        this.current = $el
    }

    selectGroup($cells){
        this.clearSelectAll()
        this.group = $cells

        this.group.forEach($cell => {
            $cell.addClass(TableSelection.className)
        })
    }

    clearSelectAll(){
        this.group.forEach($elem => {
            $elem.removeClass(TableSelection.className).removeClass(TableSelection.classNameCurrent)
        })
        this.group = []
    }
}
