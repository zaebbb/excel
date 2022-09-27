import {DEFAULT_COLOR, DEFAULT_STYLES, DEFAULT_TITLE} from '@/constants';
import {clone} from '@core/utils';

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: DEFAULT_STYLES,
    currentColor: DEFAULT_COLOR,
    title: DEFAULT_TITLE,
    date: new Date().toJSON(),
}

const normalize = state => ({
    ...state,
    currentStyles: DEFAULT_STYLES,
    currentText: '',
})

export const normalizeInitialState = state => {
    return state ? normalize(state) : clone(defaultState)
}
