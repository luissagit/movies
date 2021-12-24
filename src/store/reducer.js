import * as types from './types';

const initialState = {
    data: null,
    loading: false,
    error: null,
    detail: null,
    page: 1,
    totalResult: 0,
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.SET_INDEX:
            return {
                ...state,
                loading: false,
                data: payload?.page > 1 ? [...(state?.data ?? []), ...payload.data] : payload.data,
                totalResult: payload?.totalResult
            };
        case types.SET_DETAIL: 
            return {
                ...state,
                loading: false,
                detail: payload
            }
        case types.LOADING:
            return {
                ...state,
                error: null,
                loading: payload
            };
        case types.SET_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case types.SET_PAGE:
            return {
                ...state,
                page: payload
            };
        default:
            return state;
    }
};

export default reducer;
