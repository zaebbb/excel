import {ExcelComponent} from '@core/ExcelComponents';
import {createTable} from '@/components/table/table.template';
import resize from '@/components/table/table.resize';
import {buttonAction, isResize, isSelect, matrix} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$dev} from '@core/dom';

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
        return createTable(20)
    }

    prepare(){
        this.selection = new TableSelection()
    }

    init(){
        super.init()

        const $cell = this.$root.querySelector('[data-id="0-0"]')
        this.selection.select($cell)
        this.emitSend(this.selection.current.text())

        this.$on('formula:text', data => {
            this.selection.current.text(data)
        })

        this.$on('formula:focus', () => {
            this.selection.current.focus
        })
    }

    onMousedown(event){
        if (isResize(event)){
            resize(event, this.$root)
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
                this.emitSend($target.text())
                this.selection.select($target)
            }
        }
    }

    onKeydown(event){
        const keys = ['ArrowDown', 'Enter', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Tab']
        if (keys.includes(event.key) && !event.shiftKey){
            event.preventDefault()

            const current = this.selection.current.id(true)
            const $cell = this.$root.querySelector(buttonAction(event, current))

            if ($cell.$el) this.selection.select($cell)
            this.emitSend(this.selection.current.text())
        }
    }

    onInput(event){
        if (event.target.dataset.type === 'cell'){
            const $target = $dev(event.target)
            this.emitSend($target.text())
        }
    }

    emitSend(content){
        this.$emit('table:input', content)
    }
}
