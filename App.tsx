import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';

import 'src/app/config/dayjs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import getStore from 'src/app/config/store';

import useCachedResources from 'src/app/hooks/useCachedResources';
import useColorScheme from 'src/app/hooks/useColorScheme';
import Navigation from './navigation';
import { registerLocale } from 'src/app/config/translation';

const store = getStore();
registerLocale(store);

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return <AppLoading/>;
    }

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <Navigation colorScheme={colorScheme}/>
                <StatusBar/>
            </SafeAreaProvider>
        </Provider>
    );
}
