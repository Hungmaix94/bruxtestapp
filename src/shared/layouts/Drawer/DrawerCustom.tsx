import React, {useState, FC, useEffect, useRef, createContext} from 'react';

import { Drawer} from '@ant-design/react-native';


interface IDrawer {
    children?: any,
    sidebar?: any,
    position?: "left"| "right"
}

type IDrawerContext = {
    onDrawerOpen?: any,
    onDrawerClose?: any,
    open?: boolean
}
export const DrawContext = createContext<IDrawerContext>({});


const DrawerCustom = ({children, sidebar, position = "left"}: IDrawer) => {
    const [open, setOpen] = useState(false);

    const onDrawerClose = () => {
        console.log('close', open);
        setOpen(false)
    };

    const onDrawerOpen = () => {
        console.log('close', open);
        setOpen(true)
    };

    const onOpenChange = (isOpen: boolean) => {
        console.log('onOpenChange', isOpen);
        setOpen(isOpen)
    };

    const drawValue = {
        onDrawerOpen,
        onDrawerClose,
        open
    };
    return (
        <DrawContext.Provider value={drawValue}>
            <Drawer
                drawerWidth={250}
                sidebar={sidebar}
                position={position}
                open={open}
                drawerBackgroundColor="#ccc"
                onOpenChange={onOpenChange}
                onDrawerClose={onDrawerClose}
                onDrawerOpen={onDrawerOpen}
            >
                {children}
            </Drawer>
        </DrawContext.Provider>


    );
};

export default DrawerCustom;