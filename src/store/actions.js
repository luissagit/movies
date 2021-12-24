import * as types from './types';

export const actionGetIndex = (payload) => {
    return {
        type: types.GET_INDEX,
        payload
    };
};
export const actionSetIndex = (payload) => {
    return {
        type: types.SET_INDEX,
        payload
    };
};

export const actionGetDetail = (payload) => {
    return {
        type: types.GET_DETAIL,
        payload
    };
};
export const actionSetDetail = (payload) => {
    return {
        type: types.SET_DETAIL,
        payload
    };
};

export const actionLoading = (payload) => {
    return {
        type: types.LOADING,
        payload
    };
};

export const actionError = (payload) => {
    return {
        type: types.SET_ERROR,
        payload
    };
};

export const actionSetPage = (payload) => {
    return {
        type: types.SET_PAGE,
        payload
    };
};