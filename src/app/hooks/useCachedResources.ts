import {FontAwesome} from '@expo/vector-icons';
import {useFonts} from "expo-font";

export default function useCachedResources() {
    let [fontsLoaded] = useFonts({
        ...FontAwesome.font,
        'Inter-Black': require('../../../assets/fonts/SpaceMono-Regular.ttf'),
        'antoutline': require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
        'antfill': require('@ant-design/icons-react-native/fonts/antfill.ttf'),
    });

    return fontsLoaded;
}
