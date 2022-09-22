import {CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLES, CHANGE_TITLE, CURRENT_COLOR} from '@/redux/types';

// Action Creator
export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data,
    }
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data,
    }
}

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data,
    }
}

// value, ids
export function applyStyle(data){
    return {
        type: APPLY_STYLES,
        data,
    }
}

export function changeTitle(data){
    return {
        type: CHANGE_TITLE,
        data,
    }
}

export function changeColor(data){
    return {
        type: CURRENT_COLOR,
        data,
    }
}
