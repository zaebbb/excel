import {Router} from "./Router";
import {Page} from "../page/Page";

class DashboardPage extends Page{
    getRoot(){
        const root = document.createElement('div')
        root.innerHTML = 'Dashboard'
        return root
    }
}
class ExcelPage extends Page{}

describe('Router', () => {
    let router
    let $root

    beforeEach(() => {
        $root = document.createElement('div')
        router = new Router($root, {
            dashboard: DashboardPage,
            excel: ExcelPage
        })
    })

    test('should be defined', () => {
        expect(router).toBeDefined()
    })

    test('should render Dashboards Page', () => {
        router.changePageHandler()
        expect($root.innerHTML).toBe('<div>Dashboard</div>')
    })
})