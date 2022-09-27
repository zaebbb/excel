import {Page} from '@core/Page'
import {$dev} from '@core/dom';
import {createDashboard} from '@/pages/Dashboard/dashboard.template';

export class DashboardPage extends Page{
    getRoot() {
        return $dev.create('div', 'db').html(createDashboard())
    }
}
