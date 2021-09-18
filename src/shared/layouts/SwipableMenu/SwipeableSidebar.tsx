import React, {useState, FC, useEffect, useRef, useContext} from 'react';
import {ScrollView, Text} from 'react-native';
import {List, Button} from '@ant-design/react-native';
import {FontAwesome} from '@expo/vector-icons';
import {DrawContext} from "./SwipeableMenu";

interface IDrawerSidebar {}


const SwipeableSidebar = ({}: IDrawerSidebar) => {
    const {onDrawerClose} = useContext(DrawContext);
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
    return(
        <ScrollView>
            <Button onPress={onDrawerClose}>
                <FontAwesome
                    name="long-arrow-left"
                    size={25}
                    style={{marginRight: 5}}
                />
            </Button>
            <List>{itemArr}</List>
        </ScrollView>
    );
};

export default SwipeableSidebar;