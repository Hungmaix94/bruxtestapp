// @ts-nocheck
import axios from 'axios';
import {cleanEntity} from 'src/shared/util/entity-utils';
import {defaultValue, ITranslateDictItem, updatableFields} from 'src/shared/model/translate-dict-item.model';
import {pick} from 'lodash';
// import {refreshDynamicTranslation} from 'src/shared/reducers/locale';
import {createEntitySlice, EntityState, serializeAxiosError} from 'src/shared/reducers/reducer.utils';
import {createAsyncThunk, createSlice, isFulfilled, isPending} from '@reduxjs/toolkit';
import {TRANSLATED_DICTS} from 'src/entities/translate-dict-item/constants';
import {
    deleteEntity,
    getEntities,
    partialUpdateEntity
} from 'src/entities/device-accessory-type/device-accessory-type.reducer';
import {isRejectedAction} from "../../shared/reducers/reducer.utils";
import {REACT_APP_API_URL} from '@env';


export const ACTION_TYPES = {
    FETCH_TRANSLATEDICTITEM: 'translateDictItem/fetch_translate_dict_item',
    CREATE_TRANSLATEDICTITEM: 'translateDictItem/CREATE_TRANSLATEDICTITEM',
    UPDATE_TRANSLATEDICTITEM: 'translateDictItem/UPDATE_TRANSLATEDICTITEM',
    FETCH_DICT_ENUMS: 'translateDictItem/FETCH_DICT_ENUMS',
    FETCH_DYNAMIC_TRANSLATION: 'translateDictItem/fetch_dynamic_translation',
    FETCH_TRANSLATION: 'translateDictItem/fetch_translation',
    FETCH_ENUM_KEY: 'translateDictItem/FETCH_ENUM_KEY',
    RESET: 'translateDictItem/RESET',
};

interface ITranslation extends EntityState<ITranslateDictItem> {
    translations?: any;
}

const initialState: ITranslation = {
    loading: false,
    errorMessage: null,
    entities: [] as ReadonlyArray<ITranslateDictItem>,
    entity: defaultValue,
    enumKey: '',
    updating: false,
    totalItems: 0,
    updateSuccess: false,
    dynamicTranslations: {},
    translations: {},
    dictEnums: Object.keys(TRANSLATED_DICTS).reduce(
        (result, dictName) => ({
            ...result,
            [TRANSLATED_DICTS[dictName]]: [],
        }),
        {}
    ) as any,
};
const apiUrl = `/api/translations`;
const apiBaseUrl = ``;
// const {manifest} = Constants;
// const apiUrl = `http://${manifest.debuggerHost.split(':').shift()}:8080/api/translations`;
// const apiBaseUrl = `http://${manifest.debuggerHost.split(':').shift()}:8080`;

// Actions

interface IInfo {
    dictType: string;
    id: string | number;
}

export const getEntity = createAsyncThunk(
    ACTION_TYPES.FETCH_TRANSLATEDICTITEM,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    async (entity: IInfo) => {
        const requestUrl = `${apiUrl}/${entity.dictType}/${entity.id}`;
        return axios.get<ITranslateDictItem>(requestUrl);
    },
    {serializeError: serializeAxiosError}
);

export const fetchEnumKey = createAsyncThunk(
    ACTION_TYPES.FETCH_ENUM_KEY,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async (entity: IInfo) => {
        const requestUrl = `api/${entity.dictType}/${entity.id}`;
        return axios.get(requestUrl);
    },
    {serializeError: serializeAxiosError}
);

export const createOrUpdateEntity = createAsyncThunk(
    ACTION_TYPES.CREATE_TRANSLATEDICTITEM,
    async (entities: any, thunkAPI) => {
        // eslint-disable-next-line no-prototype-builtins
        // @ts-ignore
        const newEntities = entities.filter(translation => !translation.hasOwnProperty('id'));
        // eslint-disable-next-line no-prototype-builtins
        // @ts-ignore
        const updateEntities = entities.filter(translation => translation.hasOwnProperty('id'));
        if (newEntities.length > 0 && updateEntities.length > 0) {
            // eslint-disable-next-line @typescript-eslint/await-thenable
            const result = await thunkAPI.dispatch({
                type: ACTION_TYPES.CREATE_TRANSLATEDICTITEM,
                payload: Promise.all([
                    axios.post(
                        apiUrl,


                        newEntities.map(entity => cleanEntity(entity))
                    ),
                    axios.put(
                        apiUrl,


                        updateEntities.map(entity => pick(entity, updatableFields))
                    ),
                ]),
            });
            // thunkAPI.dispatch(refreshDynamicTranslation());
            return result;
        } else if (newEntities.length > 0) thunkAPI.dispatch(createEntity(newEntities));
        else if (updateEntities.length > 0) thunkAPI.dispatch(updateEntity(updateEntities));
    },
    {serializeError: serializeAxiosError}
);

export const createEntity = createAsyncThunk(
    ACTION_TYPES.CREATE_TRANSLATEDICTITEM,
    async (entities: any, ThunkAPI) => {
        const result = await axios.post(
            apiUrl,
            entities.map(entity => entity)
        );
        // ThunkAPI.dispatch(refreshDynamicTranslation());
        return result;
    },
    {serializeError: serializeAxiosError}
);

export const updateEntity = createAsyncThunk(
    ACTION_TYPES.UPDATE_TRANSLATEDICTITEM,
    async (entities: any, ThunkAPI) => {
        const result = await axios.put(
            apiUrl,

            entities.map(entity => pick(entity, updatableFields))
        );
        // ThunkAPI.dispatch(refreshDynamicTranslation());
        return result;
    },
    {serializeError: serializeAxiosError}
);

export const getDict = createAsyncThunk(ACTION_TYPES.FETCH_DICT_ENUMS, (dictType: string) => async (dispatch, getState) => {
    const requestUrl = `${apiUrl}/enum/${dictType}`;
    return Promise.all([new Promise(resolve => resolve(dictType)), axios.get(requestUrl)]);
});

export const getDictEnumsIfNeeded = createAsyncThunk(ACTION_TYPES.FETCH_DICT_ENUMS, async (dictType: string, thunkAPI) => {
    console.log(REACT_APP_API_URL, 'REACT_APP_API_URLREACT_APP_API_URL');
    if (!thunkAPI.getState().translateDictItem.dictEnums[dictType] || !thunkAPI.getState().translateDictItem.dictEnums[dictType].length) {
        const requestUrl = `${apiUrl}/enum/${dictType}`;

        return Promise.all([new Promise(resolve => resolve(dictType)),
            axios.get(requestUrl)
        ]);
    }
});

export const getDynamicTranslation = createAsyncThunk(ACTION_TYPES.FETCH_DYNAMIC_TRANSLATION, async (locale: any) => {
    const requestUrl = `${apiUrl}/dynamic/${locale}/`;

    try {
        const result = await axios.get<ITranslateDictItem[]>(requestUrl);

        return result;
    } catch (err) {
        throw err;
    }
});

export const getTranslation = createAsyncThunk(ACTION_TYPES.FETCH_TRANSLATION, async (locale: any) => {
    return axios.get(`${apiBaseUrl}/i18n/${locale}.json?buildTimestamp=${process.env.BUILD_TIMESTAMP}`);
});

export const reset = () => ({
    type: ACTION_TYPES.RESET,
});

// slice
export type TranslateDictItemState = Readonly<typeof initialState>;

export const TranslateDictItemSlice = createSlice({
    name: 'translateDictItem',
    initialState: initialState as TranslateDictItemState,
    reducers: {
        reset() {
            return initialState;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getEntity.fulfilled, (state, action) => {
                state.loading = false;
                state.entity = action.payload.data;
            })
            .addMatcher(isFulfilled(getDynamicTranslation), (state, action) => {
                state.loading = false;
                state.dynamicTranslations = Object.keys(action.payload.data).reduce(
                    (result, key) => ({
                        ...result,

                        [key]: action.payload.data[key].reduce(
                            (sum, translateObject) => ({
                                ...sum,
                                ...translateObject,
                            }),
                            {}
                        ),
                    }),
                    {}
                );
            })
            .addMatcher(isFulfilled(getTranslation), (state, action) => {
                state.loading = false;
                state.translations = action.payload.data
            })
            .addMatcher(isFulfilled(updateEntity, partialUpdateEntity), (state, action) => {
                state.updating = false;
                state.loading = false;
                state.updateSuccess = true;
                state.entity = {};
            })
            .addMatcher(isFulfilled(createEntity), (state, action) => {
                state.loading = false;
                state.updating = false;
                state.updateSuccess = true;
                state.entity = {};
            })
            .addMatcher(isFulfilled(getDictEnumsIfNeeded), (state, action) => {
                return {
                    ...state,
                    loading: false,
                    dictEnums: {
                        ...state.dictEnums,
                        [action?.payload?.[0]]: action?.payload?.[1]?.data,
                    },
                };
            })
            .addMatcher(isFulfilled(fetchEnumKey), (state, action) => {
                return {
                    ...state,
                    loading: false,
                    enumKey: action.payload.data.enumKey,
                };
            })
            .addMatcher(isPending(getDynamicTranslation, getTranslation, getEntity, getDictEnumsIfNeeded), state => {
                state.errorMessage = null;
                state.updateSuccess = false;
                state.loading = true;
                state.entity = {};
            })
            .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity), state => {
                state.errorMessage = null;
                state.updateSuccess = false;
                state.updating = true;
            })
            .addMatcher(isRejectedAction, (state, action) => {
                state.loading = false;
                state.updating = false;
                state.updateSuccess = false;
                state.errorMessage = action.error.message;
            });
    },
});

// Reducer
export default TranslateDictItemSlice.reducer;
