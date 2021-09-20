import {TextInput, View} from "react-native";
import React, {useState} from "react";
import {List} from '@ant-design/react-native';
import styles from "src/modules/homepage/hompageStyle";
import {useTranslation} from "react-i18next";
import {FontAwesome} from "@expo/vector-icons";

const AutoComplete = ({onChange, onSelectedOption, data}: { onChange?: any, onSelectedOption?: any, data?: any }) => {
    const {t} = useTranslation();
    const [value, setValue] = useState("");
    const [menuVisible, setMenuVisible] = useState(false);
    return (
        <View>
            <View style={styles.searchSection}>
                <FontAwesome
                    name="search"
                    size={20}
                    style={styles.searchIcon}
                />
                <TextInput
                    onFocus={() => {
                        if (value.length !== 0) {
                            setMenuVisible(true);
                        }
                    }}
                    style={styles.input}
                    placeholderTextColor={'#666'}
                    placeholder={t("homepage.search")}
                    onChangeText={(searchString) => {
                        if (searchString && searchString.length > 0) {
                            onChange(searchString)
                        }
                        setMenuVisible(true);
                        setValue(searchString);
                    }}
                    value={value}
                />
            </View>

            {menuVisible && data && (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                        borderWidth: 1,
                        flexDirection: 'column',
                        borderColor: '#a2b1b7',
                    }}
                >
                    <List>
                        {/*@ts-ignore*/}
                        {data.map((item, i) => (
                            <List.Item
                                key={i}
                                style={[{width: '100%'}]}
                                onPress={() => {
                                    setValue(item?.place_name);
                                    setMenuVisible(false);
                                    onSelectedOption(item)
                                }}

                            >
                                {item?.place_name}
                            </List.Item>
                        ))}
                    </List>

                </View>
            )}
        </View>
    );
};

export default AutoComplete;
