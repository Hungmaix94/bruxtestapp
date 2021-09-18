import {useMemo, useEffect} from 'react';
import {IRootState} from 'src/app/config/store';
import {AUTHORITIES} from 'src/app/config/constants';
import {ITRANSLATED_DICTS, TRANSLATED_DICTS} from 'src/entities/translate-dict-item/constants';
import {getOptions} from 'src/shared/util/select-utils';
import {getDictEnumsIfNeeded} from 'src/entities/translate-dict-item/translate-dict-item.reducer';
import {useSelector} from 'react-redux';
import {camelCase} from 'lodash';
import {useAppDispatch, useAppSelector} from "src/app/config/store";
export const useRole = () => {
    const authorities = useAppSelector(state => state.authentication.account.authorities);
    const isSupervisor = useMemo(() => hasAnyAuthority(authorities, [AUTHORITIES.SUPERVISOR.name]), [authorities]);
    const isDirector = useMemo(() => hasAnyAuthority(authorities, [AUTHORITIES.ROLE_MED_CENTER_DIRECTOR.name]), [authorities]);
    const isDoctor = useMemo(() => hasAnyAuthority(authorities, [AUTHORITIES.ROLE_DOCTOR.name]), [authorities]);
    const isSuperAdmin = useMemo(() => hasAnyAuthority(authorities, [AUTHORITIES.SUPER_ADMIN.name]), [authorities]);
    const hasAnyAuthority = (authorities: string[], hasAnyAuthorities: string[]) => {
        if (authorities && authorities.length !== 0) {
            if (hasAnyAuthorities.length === 0) {
                return true;
            }
            return hasAnyAuthorities.some(auth => authorities.includes(auth));
        }
        return false;
    };

    return {
        isSupervisor,
        isDirector,
        isDoctor,
        isSuperAdmin,
        hasAnyAuthority
    };
};

export const useOptions = (key: keyof ITRANSLATED_DICTS) => {
    const keyDict = TRANSLATED_DICTS[key]||"";
    const dispatch = useAppDispatch();
    const dicts = useSelector((state: IRootState) => state?.translateDictItem?.dictEnums[keyDict] || []);
    const options = getOptions(dicts, keyDict);
    useEffect(() => {
        dispatch(getDictEnumsIfNeeded(keyDict));
    }, []);

    return {
        [camelCase(key) + 'Dicts']: dicts,
        [camelCase(key) + 'Options']: options,
    };
};
