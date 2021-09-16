import React from 'react';
import {
  faHome,
  faUsers,
  faShoppingCart,
  faBook,
  faGift,
  faUser,
  faFileAlt,
  faTable,
  faTachometerAlt,
  faHeartbeat,
  faUserMd,
  faUserPlus,
  faFirstAid,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { useRole } from 'src//shared/hooks/useRole';

export const generateMenuStructure = ({ isDashboard }: {isDashboard: boolean}) => {
  const { isDirector, isDoctor, isSupervisor, isSuperAdmin } = useRole();
  if (isDoctor) {
    return [
      {
        id: 'home',
        isVisible: !isDashboard,
        path: '/dashboard',
        iconFontAwesome: faHome,
        title: 'global.menu.account.dashboard',
      },
      {
        id: 'patients',
        isVisible: isDoctor,
        path: '/patients/',
        iconFontAwesome: faHeartbeat,
        title: 'global.menu.entities.patients',
      },
    ].filter(item => item.isVisible);
  }

  if (isDirector) {
    return [
      {
        id: 'home',
        isVisible: !isDashboard,
        path: '/dashboard',
        iconFontAwesome: faHome,
        title: 'global.menu.account.dashboard',
      },
      {
        id: 'myhospital',
        isVisible: isDirector,
        path: '/my-hospital/',
        iconFontAwesome: faFirstAid,
        title: 'global.menu.entities.myHospital',
      },
      {
        id: 'administrator',
        isVisible: isDirector,
        path: '/administrators/',
        iconFontAwesome: faUserPlus,
        title: 'global.menu.entities.administrators',
      },
      {
        id: 'doctor',
        isVisible: isDirector,
        path: '/doctors/',
        iconFontAwesome: faUserMd,
        title: 'global.menu.entities.doctors',
      },
      {
        id: 'patients',
        isVisible: isDirector,
        path: '/patients/',
        iconFontAwesome: faHeartbeat,
        title: 'global.menu.entities.patients',
      },
      {
        id: 'order',
        isVisible: isDirector,
        path: '/orders/',
        iconFontAwesome: faShoppingCart,
        title: 'global.menu.entities.order',
      },
      {
        id: 'finances',
        isVisible: isDirector,
        path: '/finances/',
        iconFontAwesome: faDollarSign,
        title: 'global.menu.entities.finances',
      },
      {
        id: 'deviceclient',
        isVisible: isDirector,
        path: '/device-client/',
        iconFontAwesome: faTachometerAlt,
        title: 'global.menu.entities.measuringDevices',
      },
      {
        id: 'accessoriesclient',
        isVisible: isDirector,
        path: '/device-accessory-client/',
        iconFontAwesome: faGift,
        title: 'global.menu.entities.deviceAccessory',
      },
    ].filter(item => item.isVisible);
  }

  return [
    {
      id: 'home',
      isVisible: !isDashboard,
      path: '/dashboard',
      iconFontAwesome: faHome,
      title: 'global.menu.account.dashboard',
    },
    {
      id: 'system-owners',
      isVisible: isSuperAdmin,
      path: '/system-owners',
      iconFontAwesome: faUsers,
      title: 'global.menu.admin.systemOwners',
    },
    {
      id: 'users',
      isVisible: isSupervisor,
      path: '/users',
      iconFontAwesome: faUser,
      title: 'global.menu.admin.users',
    },
    {
      id: 'system-offers',
      isVisible: isSupervisor,
      path: '/system-offers',
      iconFontAwesome: faTable,
      title: 'global.menu.admin.systemOffers',
    },
    {
      id: 'survey',
      isVisible: isSupervisor,
      path: '/questionnaire',
      iconFontAwesome: faFileAlt,
      title: 'global.menu.admin.survey',
    },
    {
      id: 'administrator',
      isVisible: isDirector,
      path: '/administrators/',
      iconFontAwesome: faUserPlus,
      title: 'global.menu.entities.administrators',
    },
    {
      id: 'measuringdevices',
      isVisible: isSupervisor,
      path: '/measuring-devices/',
      iconFontAwesome: faTachometerAlt,
      title: 'global.menu.entities.measuringDevices',
    },
    {
      id: 'accessories',
      isVisible: isSupervisor,
      path: '/device-accessory/',
      iconFontAwesome: faGift,
      title: 'global.menu.entities.deviceAccessory',
    },
    {
      id: 'order',
      isVisible: isSupervisor,
      path: '/orders/',
      iconFontAwesome: faShoppingCart,
      title: 'global.menu.entities.order',
    },
    {
      id: 'finances',
      isVisible: isSupervisor,
      path: '/finances/',
      iconFontAwesome: faDollarSign,
      title: 'global.menu.entities.finances',
    },
    {
      id: 'dictionaries',
      isVisible: !isDashboard && (isSuperAdmin || isSupervisor),
      path: '/dict/',
      iconFontAwesome: faBook,
      title: 'global.menu.entities.dictionaries',
      submenus: [
        {
          id: 'questionnaire',
          isVisible: isSupervisor || isSuperAdmin,
          path: '/questionnaire',
          title: 'global.menu.entities.questionnaire',
        },
        {
          id: 'questionnaire-type',
          isVisible: isSupervisor || isSuperAdmin,
          path: '/dict/questionnaire-type',
          title: 'global.menu.entities.questionnaireTypes',
        },
        {
          id: 'question-section',
          isVisible: isSupervisor || isSuperAdmin,
          path: '/dict/question-section',
          title: 'global.menu.entities.questionSections',
        },
      ].filter(item => item.isVisible),
    },
  ].filter(item => item.isVisible);
};
