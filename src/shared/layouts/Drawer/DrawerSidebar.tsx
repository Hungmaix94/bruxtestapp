import React, {useState, FC, useEffect, useRef, useContext} from 'react';
import {ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {List, Button, Flex, WingBlank} from '@ant-design/react-native';
import {FontAwesome} from '@expo/vector-icons';
import {DrawContext} from "./DrawerCustom";
import {useTranslation} from "react-i18next";

interface IDrawerSidebar {
}


const DrawerSidebar = ({}: IDrawerSidebar) => {
    const {onDrawerClose} = useContext(DrawContext);
    const {t} = useTranslation();
    const itemArr = [1, 2, 3, 4]
        .map((_i, index) => {
            return (
                <List.Item
                    key={index}
                    thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                >
                    <Text>Categories - {index}</Text>
                </List.Item>
            );
        });

    return (
        <ScrollView style={{backgroundColor: "#f2f4fb", paddingTop: 20}}>
            <List>
                <List.Item
                    style={styles.listItem}
                    extra={
                        <Text onPress={onDrawerClose}>
                            <FontAwesome
                                name="long-arrow-left"
                                size={25}
                                style={{marginRight: 5, color: "#584cd9"}}
                            />
                        </Text>
                    }
                />
                <List.Item
                    style={styles.listItem}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onDrawerClose}
                    >
                        <Text style={styles.textLink}>{t("global.menu.about")}</Text>
                    </TouchableOpacity>
                </List.Item>
                <List.Item
                    style={styles.listItem}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onDrawerClose}
                    >
                        <Text style={styles.textLink}>{t("global.menu.device")}</Text>
                    </TouchableOpacity>
                </List.Item>
                <List.Item
                    style={styles.listItem}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onDrawerClose}
                    >
                        <Text style={styles.textLink}>{t("global.menu.work")}</Text>
                    </TouchableOpacity>
                </List.Item>
                <List.Item style={styles.listItem}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onDrawerClose}
                    >
                        <Text style={styles.textLink}>{t("global.menu.offer")}</Text>
                    </TouchableOpacity>
                </List.Item>
                <List.Item style={styles.listItem}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onDrawerClose}
                    >
                        <Text style={styles.textLink}>{t("global.menu.contact")}</Text>
                    </TouchableOpacity>
                </List.Item>

            </List>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
    },
    textLink: {
        color: "#584cd9"
    },
    listItem: {
        backgroundColor: "#f2f4fb",
    },
});

export default DrawerSidebar;

