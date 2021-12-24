import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import * as request from '../core/helpers/request';

function* setError({ type, message }) {
    yield put(actions.actionError({ type, message }));
}

function* getIndex({ payload }) {
    try {
        yield put(actions.actionLoading({ type: 'index', status: true }));

        let params = request.makeGetParam({
            ...payload
        });
        const req = yield call(() =>
            request.handleRequest({
                body: () => request.reqGet(`${request.API_HOST}${payload ? params : ''}`)
            })
        );

        if (req?.status && req?.data?.Search) {
            yield put(actions.actionSetIndex({ data: req?.data?.Search, page: payload?.page, totalResult: req?.data?.totalResults }));
            return;
        }

        throw new Error(req?.data?.Error ?? 'Something went wrong !');
    } catch ({ message }) {
        yield setError({
            type: 'table',
            message
        });
    }
}

function* getDetail(payload) {
    try {
        yield put(actions.actionLoading({ type: 'detail', status: true }));

        const req = yield call(() =>
            request.handleRequest({
                body: () => request.reqGet(`${request.API_HOST}&i=${payload?.payload}`)
            })
        );

        if (req?.status && req?.data) {
            yield put(actions.actionSetDetail(req?.data));
            return;
        }

        throw new Error(req?.data?.Error ?? 'Something went wrong !');
    } catch ({ message }) {
        yield setError({
            type: 'table',
            message
        });
    }
}

export default function* Saga() {
    yield takeEvery(types.GET_INDEX, getIndex);
    yield takeEvery(types.GET_DETAIL, getDetail);
}
