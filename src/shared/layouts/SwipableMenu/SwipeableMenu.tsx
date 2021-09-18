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


const SwipeableMenu = ({children, sidebar, position = "left"}: IDrawer) => {
    const [open, setOpen] = useState(false);

    const onDrawerClose = () => {
        setOpen(false)
    };

    const onDrawerOpen = () => {
        setOpen(true)
    };

    const drawValue = {
        onDrawerOpen,
        onDrawerClose,
        open
    };
    return (
        <DrawContext.Provider value={drawValue}>
            <Drawer
                sidebar={sidebar}
                position={position}
                open={open}
                drawerBackgroundColor="#ccc"
                onDrawerClose={onDrawerClose}
                onDrawerOpen={onDrawerOpen}
            >
                {children}
            </Drawer>
        </DrawContext.Provider>


    );
};

export default SwipeableMenu;