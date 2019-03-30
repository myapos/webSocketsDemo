/* eslint camelcase: 1 */
import { call, put, select, takeEvery } from 'redux-saga/effects';

import * as api from '../api';
import * as actions from '../store/actions';

function* initialize () {
  // const initialized = yield call(api.getKinoData);
  console.log('initialized sagas');
}

function* enter (action) {
  console.log('enter', action);

  const { ref, usersRef, newEntry } = yield call(api.enter, action);

  yield put({
    type: actions.REF_DB,
    ref,
    usersRef,
    newEntry,
  });
}

function* exit (action) {
  const state = yield select();

  const { newEntry } = state;
  console.log('exit', action);
  console.log('state', state);

  yield call(api.exit, newEntry);

  yield put({
    type: actions.SAGAS_EXIT,
  });
}

function* rootSaga () {
  yield initialize();
  yield takeEvery(actions.ENTER, enter);
  yield takeEvery(actions.EXIT, exit);
}

export default rootSaga;