import {ExcelComponent} from '@core/ExcelComponents';
import {createTable} from '@/components/table/table.template';
import resize from '@/components/table/table.resize';
import {buttonAction, isResize, isSelect, matrix} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$dev} from '@core/dom';
import * as actions from '@/redux/actions';
import {DEFAULT_STYLES} from '@/constants';
import {parse} from '@core/parse';

export class Table extends ExcelComponent{
    static className = 'excel__table'

    constructor($root, options){
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options,
        })
    }

    toHTML(){
        return createTable(20, this.$getState)
    }

    prepare(){
        this.selection = new TableSelection()
    }

    init(){
        super.init()

        const $cell = this.$root.querySelector('[data-id="0-0"]')
        this.selection.select($cell)
        this.emitSend(this.selection.current)

        this.$on('formula:text', data => {
            this.selection.current.attr('data-value', data)
            this.selection.current.text(parse(data))
            // this.selection.current.text(data)
            this.updateCurrentText(data)
        })

        this.$on('formula:focus', () => {
            this.selection.current.focus
        })

        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.ids,
            }))
        })
    }

    async resizeTable(event){
        try {
            const data = await resize(event, this.$root)
            this.$dispatch(actions.tableResize(data))
        } catch (err) {
            console.error('Error Resize', err.message)
        }
    }

    onMousedown(event){
        if (isResize(event)){
            this.resizeTable(event)
        }

        if (isSelect(event)){
            const $target = $dev(event.target)

            if (event.shiftKey){
                const target = $target.id(true)
                const current = this.selection.current.id(true)

                const ids = matrix(target, current)

                const $cells = ids.map(id => this.$root.querySelector(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.emitSend($target)
                this.selectCell($target)
                this.updateCurrentText($target.dataset.value)
            }
        }
    }

    onKeydown(event){
        const keys = ['ArrowDown', 'Enter', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Tab']
        if (keys.includes(event.key) && !event.shiftKey){
            event.preventDefault()

            const current = this.selection.current.id(true)
            const $cell = this.$root.querySelector(buttonAction(event, current))

            if ($cell.$el) this.selectCell($cell)
            this.emitSend(this.selection.current)
        }
    }

    selectCell($cell){
        this.selection.select($cell)
        const styles = $cell.getStyles(Object.keys(DEFAULT_STYLES))
        this.$dispatch(actions.changeStyles(styles))
    }

    onInput(event){
        if (event.target.dataset.type === 'cell'){
            const $target = $dev(event.target)
            $target.attr('data-value', $target.text())
            $target.text(parse($target.text()))
            this.updateCurrentText(parse($target.dataset.value))
            // this.emitSend($target.text())
        }
    }

    emitSend(content){
        this.$emit('table:input', content)
    }

    updateCurrentText(value){
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value,
        }))
    }
}
