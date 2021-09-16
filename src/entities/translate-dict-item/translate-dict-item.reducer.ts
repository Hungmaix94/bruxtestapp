// @ts-nocheck
import axios from 'axios';
import {cleanEntity} from 'src/shared/util/entity-utils';
import {defaultValue, ITranslateDictItem, updatableFields} from 'src/shared/model/translate-dict-item.model';
import {pick} from 'lodash';
import {refreshDynamicTranslation} from 'src/shared/reducers/locale';
import {createEntitySlice, EntityState, serializeAxiosError} from 'src/shared/reducers/reducer.utils';
import {createAsyncThunk, isFulfilled, isPending} from '@reduxjs/toolkit';
import {TRANSLATED_DICTS} from 'src/entities/translate-dict-item/constants';
import {
    deleteEntity,
    getEntities,
    partialUpdateEntity
} from 'src/entities/device-accessory-type/device-accessory-type.reducer';

export const ACTION_TYPES = {
    FETCH_TRANSLATEDICTITEM: 'translateDictItem/fetch_translate_dict_item',
    CREATE_TRANSLATEDICTITEM: 'translateDictItem/CREATE_TRANSLATEDICTITEM',
    UPDATE_TRANSLATEDICTITEM: 'translateDictItem/UPDATE_TRANSLATEDICTITEM',
    FETCH_DICT_ENUMS: 'translateDictItem/FETCH_DICT_ENUMS',
    FETCH_DYNAMIC_TRANSLATION: 'translateDictItem/fetch_dynamic_translation',
    FETCH_ENUM_KEY: 'translateDictItem/FETCH_ENUM_KEY',
    RESET: 'translateDictItem/RESET',
};

const initialState: EntityState<ITranslateDictItem> = {
    loading: false,
    errorMessage: null,
    entities: [] as ReadonlyArray<ITranslateDictItem>,
    entity: defaultValue,
    enumKey: '',
    updating: false,
    totalItems: 0,
    updateSuccess: false,
    dynamicTranslations: {},
    dictEnums: Object.keys(TRANSLATED_DICTS).reduce(
        (result, dictName) => ({
            ...result,
            [TRANSLATED_DICTS[dictName]]: [],
        }),
        {}
    ) as any,
};

const apiUrl = 'api/translations';

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
            thunkAPI.dispatch(refreshDynamicTranslation());
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
        ThunkAPI.dispatch(refreshDynamicTranslation());
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
        ThunkAPI.dispatch(refreshDynamicTranslation());
        return result;
    },
    {serializeError: serializeAxiosError}
);
// @ts-ignore
export const getDict = createAsyncThunk(ACTION_TYPES.FETCH_DICT_ENUMS, (dictType: string) => async (dispatch, getState) => {
    const requestUrl = `${apiUrl}/enum/${dictType}`;
    return Promise.all([new Promise(resolve => resolve(dictType)), axios.get(requestUrl)]);
});

export const getDictEnumsIfNeeded = createAsyncThunk(ACTION_TYPES.FETCH_DICT_ENUMS, async (dictType: string, thunkAPI) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!thunkAPI.getState().translateDictItem.dictEnums[dictType] || !thunkAPI.getState().translateDictItem.dictEnums[dictType].length) {
        const requestUrl = `${apiUrl}/enum/${dictType}`;
        return Promise.all([new Promise(resolve => resolve(dictType)), axios.get(requestUrl)]);
    }
});

export const getDynamicTranslation = createAsyncThunk(ACTION_TYPES.FETCH_DYNAMIC_TRANSLATION, async (locale: any) => {
    const requestUrl = `${apiUrl}/dynamic/${locale}/`;
    return axios.get<ITranslateDictItem[]>(requestUrl);
});

export const reset = () => ({
    type: ACTION_TYPES.RESET,
});

// slice

export const TranslateDictItemSlice = createEntitySlice({
    name: 'translateDictItem',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(getEntity.fulfilled, (state, action) => {
                state.loading = false;
                state.entity = action.payload.data;
            })
            .addMatcher(isFulfilled(getDynamicTranslation), (state, action) => {
                return {
                    ...state,
                    loading: false,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    dynamicTranslations: Object.keys(action.payload.data).reduce(
                        (result, key) => ({
                            ...result,
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            [key]: action.payload.data[key].reduce(
                                // @ts-ignore
                                (sum, translateObject) => ({
                                    ...sum,
                                    ...translateObject,
                                }),
                                {}
                            ),
                        }),
                        {}
                    ),
                };
            })
            .addMatcher(isFulfilled(updateEntity, partialUpdateEntity), (state, action) => {
                return {
                    ...state,
                    updating: false,
                    loading: false,
                    updateSuccess: true,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    entity: {},
                };
            })
            .addMatcher(isFulfilled(createEntity), (state, action) => {
                return {
                    ...state,
                    updating: false,
                    loading: false,
                    updateSuccess: true,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    entity: {},
                };
            })
            .addMatcher(isFulfilled(getDictEnumsIfNeeded), (state, action) => {
                return {
                    ...state,
                    loading: false,
                    dictEnums: {
                        ...state.dictEnums,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        [action.payload[0]]: action.payload[1].data,
                    },
                };
            })
            .addMatcher(isFulfilled(fetchEnumKey), (state, action) => {
                return {
                    ...state,
                    loading: false,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    enumKey: action.payload.data.enumKey,
                };
            })
            .addMatcher(isPending(getDynamicTranslation, getEntity, getDictEnumsIfNeeded), state => {
                state.errorMessage = null;
                state.updateSuccess = false;
                state.loading = true;
                state.entity = {};
            })
            .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity), state => {
                state.errorMessage = null;
                state.updateSuccess = false;
                state.updating = true;
            });
    },
});

// Reducer
export default TranslateDictItemSlice.reducer;
