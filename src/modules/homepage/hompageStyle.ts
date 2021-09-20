import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        marginTop: 40, marginBottom: 5, marginRight: "7%", marginLeft: "7%"
    },
    map: {
        maxWidth: 400,
        maxHeight: 400,
        minWidth: 250,
        minHeight: 250,
    },
    homepage: {
        flex: 1,
    },
    title: {
        fontSize: 30,
        textAlign: "center"
    },
    tinyLogo: {
        height: 300,
        width: 200,
    },
    stepLogo: {
        borderRadius: 24,
        padding: 10,
        backgroundColor: "#eff9fc",
    },
    textLink: {
        color: "#584cd9",
        fontSize: 20
    },
    text: {
        fontSize: 20
    },
    textCenter: {
        textAlign: "center"
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    active: {
        backgroundColor: '#ffffff',
    },
    inactive: {
        backgroundColor: '#2d353c',
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 24
    },
    headerText: {
        color: "#584cd9",
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    headerTextInactive: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        backgroundColor: "transparent"
    },
    cardWrapper: {},
    cardTitle: {
        color: "#ff2d76",
        textAlign: 'center',
        fontSize: 30,
        fontWeight: "700",
        textTransform: "uppercase"
    },
    cardDetail: {
        textAlign: 'center',
        fontSize: 20,
        paddingBottom: 10
    },
    cardDue: {
        color: "#a2b1b7",
        textAlign: 'center',
        fontSize: 16,
    },
    cardCurrencies: {
        textAlign: 'center',
        fontSize: 20,
        paddingRight: 20
    },
    cardAmount: {
        flexShrink: 1,
        textAlign: 'center',
        fontSize: 50,
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginVertical: 30,
        borderRadius: 10,
    },
    searchIcon: {
        padding: 10,
        borderRadius: 18,
        color: "#757575"
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
        paddingHorizontal: 10,
        fontSize: 18,
        borderRadius: 10,
    },
    phone: {
        color: "#584cd9"
    }
});
