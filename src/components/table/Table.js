import {ExcelComponent} from '@core/ExcelComponents';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent{
    static className = 'excel__table'

    toHTML(){
        return createTable(20)
    }
}
