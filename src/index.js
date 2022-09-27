import './scss/index.scss'
import {Router} from '@core/router/Router';
import {DashboardPage} from '@/pages/Dashboard/Dashboard.page';
import {ExcelPage} from '@/pages/Excel/Excel.page';

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage,
})
