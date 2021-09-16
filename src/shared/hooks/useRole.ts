import { useMemo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import { TRANSLATED_DICTS } from 'app/entities/translate-dict-item/constants';
import { TranslatorContext } from 'react-jhipster';
import { getOptions } from 'app/shared/util/select-utils';
import { getDictEnumsIfNeeded } from 'app/entities/translate-dict-item/translate-dict-item.reducer';

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

export const useRoleOptionTranslate = value => {
  const dispatch = useAppDispatch();

  const roles = useAppSelector(state => state.translateDictItem.dictEnums[TRANSLATED_DICTS.ROLES]);
  const roleOptions = useMemo(() => getOptions(roles, TRANSLATED_DICTS.ROLES), [roles, TranslatorContext.context.locale]);
  const role = roleOptions.find(roleOption => roleOption.enumKey === value);
  useEffect(() => {
    dispatch(getDictEnumsIfNeeded(TRANSLATED_DICTS.ROLES));
  }, []);
  const roleTranslate = `dynamic.${TRANSLATED_DICTS.ROLES}.${role?.enumKey}.itemTranslation`;
  return {
    roleOptions,
    roles,
    roleTranslate,
  };
};
