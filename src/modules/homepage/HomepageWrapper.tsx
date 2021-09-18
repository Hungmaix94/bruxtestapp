import React, {useState, FC, useEffect, useRef} from 'react';
import DrawerCustom from "../../shared/layouts/Drawer/DrawerCustom";
import Homepage from "./Homepage";
import DrawerSidebar from "../../shared/layouts/Drawer/DrawerSidebar";
import {useLocale} from "../../shared/hooks/useLocale";

import {getEntities as getOfferTypeList} from 'src/entities/offer-type/offer-type.reducer';
import {getEntities as getOfferList} from 'src/entities/offer/offer.reducer';
import {getEntities as getVatTypes} from 'src/entities/vat-type/vat-type.reducer';
import {defaultPagination} from 'src/shared/util/pagination.constants';
import {getEntities as getAccessoryTypeList} from 'src/entities/device-accessory-type/device-accessory-type.reducer';
import {getEntities as getCurrencyList} from 'src/entities/currency/currency.reducer';
import {getDictEnumsIfNeeded} from 'src/entities/translate-dict-item/translate-dict-item.reducer';
import {TRANSLATED_DICTS} from "src/entities/translate-dict-item/constants";
import {useAppDispatch} from "../../app/config/store";

const HomepageWrapper: FC<any> = () => {
    useLocale();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getOfferTypeList(defaultPagination));
        dispatch(getOfferList(defaultPagination));
        dispatch(getVatTypes(defaultPagination));
        dispatch(getAccessoryTypeList(defaultPagination));
        dispatch(getCurrencyList(defaultPagination));
        dispatch(getDictEnumsIfNeeded(TRANSLATED_DICTS.DEVICE_ACCESSORY_TYPES || ""));
        dispatch(getDictEnumsIfNeeded(TRANSLATED_DICTS.OFFER_TYPES || ""));
        dispatch(getDictEnumsIfNeeded(TRANSLATED_DICTS.VAT_TYPES || ""));
        dispatch(getDictEnumsIfNeeded(TRANSLATED_DICTS.CURRENCIES || ""));
    }, []);

    return (
        <DrawerCustom
            sidebar={<DrawerSidebar/>}
        >
            <Homepage/>
        </DrawerCustom>
    );
};

export default HomepageWrapper;