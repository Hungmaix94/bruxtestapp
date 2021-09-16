import React, { FC, useMemo } from 'react';
import { get } from 'lodash';
import { useAppSelector } from 'src/app/config/hooks';
import {generateMenuStructure} from "src/shared/hooks/menu-structure";

const useAccountHook = ({ isDashboard = false }: { isDashboard?: boolean }) => {
  const menus = generateMenuStructure({ isDashboard });
  const account = useAppSelector(state => state.authentication.account);
  const currentLocale = useAppSelector(state => state.locale.currentLocale);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const ribbonEnv = useAppSelector(state => state.applicationProfile.ribbonEnv);
  const username = useMemo(
    () => (isAuthenticated ? get(account, 'firstName') + get(account, 'lastName') : 'Guest'),
    [isAuthenticated, account]
  );

  return { account, currentLocale, username, isAuthenticated, ribbonEnv, menus };
};

export default useAccountHook;
