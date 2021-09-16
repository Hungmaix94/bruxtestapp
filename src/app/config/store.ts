import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';

import reducer from 'src/shared/reducers';
import errorMiddleware from './error-middleware';
import loggerMiddleware from './logger-middleware';

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.data', 'payload.config', 'payload.request', 'error', 'meta.arg'],
        ignoreState: true,
      },
    }).concat(errorMiddleware, loggerMiddleware),
});

const getStore = () => {
  return store;
};

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, AnyAction>;

export default getStore;
