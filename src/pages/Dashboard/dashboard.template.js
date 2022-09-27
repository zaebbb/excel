import {storage} from '@core/utils';

export function createDashboard(){
    const nowId = Date.now().toString()

    return createHeader() + createNewTable(nowId) + createBlockInfoTables(nowId)
}

function createHeader(){
    return `
    <div class="db__header">
        <h1>Dev Excel Dashboard</h1>
    </div>
    `
}

function createNewTable(nowId){
    return `
        <div class="db__new">

            <div class="db__view">
                <a href="#excel/${nowId}" class="db__create">
                    Новая <br> Таблица
                </a>
            </div>

        </div>
    `
}

function getItemTable(tableName = ''){
    const state = storage(tableName)
    const link = tableName.split(':').join('/')
    const date = new Date(state.date).toLocaleDateString()
    const time = new Date(state.date).toLocaleTimeString()

    return `
        <li class="db__record">
            <a href="#${link}">${state.title}</a>
            <strong>${date} | ${time}</strong>
        </li>
    `
}

function getAllKeys(){
    const keys = []

    for (let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i)
        if (!key.includes('excel')){
            continue
        }
        keys.push(key)
    }

    return keys
}

function createListTables(nowId){
    // eslint-disable-next-line no-unused-vars
    const keys = getAllKeys()

    if (!keys.length){
        return `<p>На данный момент у вас нет существующих таблиц. Вы можете <a href="#excel/${nowId}">создать таблицу</a>!</p>`
    }

    return `
        <div class="db__table db__view">

            <div class="db__list--header">
                <span>Название</span>
                <span>Дата открытия</span>
            </div>

            <ul class="db__list">
                ${keys.map(getItemTable).join('')}
            </ul>
        </div>
    `
}

function createBlockInfoTables(nowId){
    return `
        <div class="db__table db__view">
            ${createListTables(nowId)}
        </div>
    `
}
