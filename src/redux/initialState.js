import {storage} from '@core/utils';
import {DEFAULT_COLOR, DEFAULT_STYLES, DEFAULT_TITLE} from '@/constants';

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: DEFAULT_STYLES,
    currentColor: DEFAULT_COLOR,
    title: DEFAULT_TITLE,
}

const normalize = state => ({
    ...state,
    currentStyles: DEFAULT_STYLES,
    currentText: '',
})

export const initialState = storage('excel-state') ? normalize(storage('excel-state')) : defaultState
