import { useMemo, useEffect } from 'react';
import { IRootState, useAppDispatch, useAppSelector } from 'app/config/store';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import { TRANSLATED_DICTS } from 'app/entities/translate-dict-item/constants';
import { TranslatorContext } from 'react-jhipster';
import { getOptions, transformOptions } from 'app/shared/util/select-utils';
import { getDictEnumsIfNeeded } from 'app/entities/translate-dict-item/translate-dict-item.reducer';
import { useSelector } from 'react-redux';
import { camelCase } from 'lodash';

export const useRole = () => {
  const authorities = useAppSelector(state => state.authentication.account.authorities);
  const isSupervisor = useMemo(() => hasAnyAuthority(authorities, [AUTHORITIES.SUPERVISOR.name]), [authorities]);
  const isDirector = useMemo(() => hasAnyAuthority(authorities, [AUTHORITIES.ROLE_MED_CENTER_DIRECTOR.name]), [authorities]);
  const isDoctor = useMemo(() => hasAnyAuthority(authorities, [AUTHORITIES.ROLE_DOCTOR.name]), [authorities]);
  const isSuperAdmin = useMemo(() => hasAnyAuthority(authorities, [AUTHORITIES.SUPER_ADMIN.name]), [authorities]);

  return {
    isSupervisor,
    isDirector,
    isDoctor,
    isSuperAdmin,
  };
};

export const useOptions = key => {
  const keyDict = TRANSLATED_DICTS[key];
  const dispatch = useAppDispatch();

  const dicts = useSelector((state: IRootState) => state?.translateDictItem?.dictEnums[keyDict] || []);
  const options = useMemo(() => getOptions(dicts, keyDict), [dicts, TranslatorContext.context.locale]);
  useEffect(() => {
    dispatch(getDictEnumsIfNeeded(keyDict));
  }, []);

  return {
    [camelCase(key) + 'Dicts']: dicts,
    [camelCase(key) + 'Options']: options,
  };
};
