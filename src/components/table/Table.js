import {ExcelComponent} from '@core/ExcelComponents';
import {createTable} from '@/components/table/table.template';
import resize from '@/components/table/table.resize';
import {isResize} from '@/components/table/table.functions';

export class Table extends ExcelComponent{
    static className = 'excel__table'

    constructor($root, options){
        super($root, {
            listeners: ['mousedown'],
        })
    }

    toHTML(){
        return createTable(20)
    }

    onMousedown(event){
        if (isResize(event)){
            resize(event, this.$root)
        }
    }
}
