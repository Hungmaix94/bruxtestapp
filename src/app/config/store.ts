import {AnyAction, configureStore, ThunkAction} from '@reduxjs/toolkit';

import reducer from 'src/shared/reducers/index';
import errorMiddleware from './error-middleware';
import loggerMiddleware from './logger-middleware';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["translateDictItem/FETCH_DICT_ENUMS/fulfilled", "translateDictItem/fetch_translation/fulfilled"],
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
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, AnyAction>;

export default getStore;
