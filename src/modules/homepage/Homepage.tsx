import React, {useState, FC, useEffect} from 'react';

import {ScrollView, Text, Image, Dimensions, StyleSheet} from 'react-native';
import {Button, Flex, WingBlank,} from '@ant-design/react-native';
import styles from "src/modules/homepage/hompageStyle";
import appMobile from "src/resources/images/home/app-mobile.png";
import measureDesign from "src/resources/images/home/measure-design.png";
import {FontAwesome} from "@expo/vector-icons";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import register from "src/resources/images/home/register.png";
import specialist from "src/resources/images/home/specialist.png";
import pickup from "src/resources/images/home/pickup.png";
import measurement from "src/resources/images/home/measurement.png";
import result from "src/resources/images/home/result.png";
import treatment from "src/resources/images/home/treatment.png";
import {t} from "src/shared/util/i18n";
import {useOptions} from "src/shared/hooks/useOptions";
import {useLocale} from "../../shared/hooks/useLocale";

const Homepage: FC<any> = () => {
    const locale = useLocale();
   const { deviceAccessoryTypesOptions } = useOptions('DEVICE_ACCESSORY_TYPES');
    const stepList = [
        {
            id: 1,
            title: 'Register',
            text: 'DirectorRegister in our application and arrange a consultation',
            imgUrl: register,
        },
        {
            id: 2,
            title: 'Talk to a specialist',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
            imgUrl: specialist,
        },
        {
            id: 3,
            title: 'Pick-up your device',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
            imgUrl: pickup,
        },
        {
            id: 4,
            title: 'Take measurements',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
            imgUrl: measurement,
        },
        {
            id: 5,
            title: 'Check results',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
            imgUrl: result,
        },
        {
            id: 6,
            title: 'Learn about treatment',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
            imgUrl: treatment,
        },
    ];

    return (
        <ScrollView
            style={styles.homepage}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            <WingBlank style={{marginTop: 40, marginBottom: 5}}>

                <Flex align="end" justify={"between"} style={{height: 30}}>
                    <Text
                        style={styles.title}
                    >
                        Bruxtest
                    </Text>
                    <Button>
                        <FontAwesome
                            name="bars"
                            size={25}
                            style={{marginRight: 5}}
                        />
                    </Button>
                </Flex>
            </WingBlank>
            <Flex style={{padding: 15}}>
                <WingBlank style={{marginTop: 20, marginBottom: 5}}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center"
                        }}
                    >
                        {t("homepage:headerDescription")}
                    </Text>
                </WingBlank>
            </Flex>
            <Flex style={{padding: 15}}>
                <WingBlank style={{marginTop: 20, marginBottom: 5}}>
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: "center"
                        }}
                    >
                        {t("homepage:titleDescription")}

                    </Text>
                </WingBlank>
            </Flex>
            {/*<Flex direction={"column"}>*/}
                {/*<WingBlank style={{marginTop: 20, marginBottom: 5}}>*/}
                    {/*<Button type={"primary"} style={{borderRadius: 24, height: 49}}>*/}
                        {/*<Flex align={"center"}>*/}
                            {/*<IconFill*/}
                                {/*name="apple"*/}
                                {/*size={25}*/}
                                {/*style={{marginRight: 5, color: "#ffffff"}}*/}
                            {/*/>*/}

                            {/*<Text style={{*/}
                                {/*fontSize: 20,*/}
                                {/*color: "#ffffff"*/}
                            {/*}}>*/}
                                {/*Ios download*/}
                            {/*</Text>*/}
                        {/*</Flex>*/}
                    {/*</Button>*/}
                {/*</WingBlank>*/}
                {/*<WingBlank style={{marginTop: 20, marginBottom: 5}}>*/}
                    {/*<Button type={"warning"} style={{borderRadius: 24}}>*/}
                        {/*<Flex>*/}
                            {/*<IconFill*/}
                                {/*name="android"*/}
                                {/*size={25}*/}
                                {/*style={{marginRight: 5, color: "#ffffff"}}*/}
                            {/*/>*/}
                            {/*<Text style={{*/}
                                {/*fontSize: 20,*/}
                                {/*color: "#ffffff"*/}
                            {/*}}>*/}
                                {/*Android download*/}
                            {/*</Text>*/}
                        {/*</Flex>*/}
                    {/*</Button>*/}
                {/*</WingBlank>*/}
            {/*</Flex>*/}
            <WingBlank style={{marginTop: 20, marginBottom: 5,}}>
                <Flex align="end" justify={"center"}>
                    <Image
                        style={styles.tinyLogo}
                        source={appMobile}
                    />
                </Flex>
            </WingBlank>

            <WingBlank style={{marginTop: 20, marginBottom: 5}}>
                <Flex align="end" justify={"center"}>
                    <Text
                        style={styles.title}
                    >
                        About us
                    </Text>
                </Flex>
            </WingBlank>
            <Flex style={{padding: 15}}>
                <WingBlank style={{marginTop: 20, marginBottom: 5}}>
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: "center"
                        }}
                    >
                        {t("homepage:aboutUsDescription")}
                    </Text>
                </WingBlank>
            </Flex>

            <Flex style={{padding: 15}}>
                <WingBlank style={{marginTop: 20, marginBottom: 5}}>
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: "center"
                        }}
                    >
                        {t("homepage:aboutUsDescriptionMore")}

                    </Text>
                </WingBlank>
            </Flex>

            <WingBlank style={{marginTop: 20, marginBottom: 5}}>
                <Flex align="end" justify={"center"}>
                    <Text
                        style={styles.title}
                    >
                        Measuring device
                    </Text>
                </Flex>
            </WingBlank>
            <WingBlank style={{marginTop: 20, marginBottom: 5,}}>
                <Flex align="end" justify={"center"}>
                    <Image
                        style={styles.tinyLogo}
                        source={measureDesign}
                    />
                </Flex>
            </WingBlank>
            <Flex style={{padding: 15}}>
                <WingBlank style={{marginTop: 20, marginBottom: 5}}>
                    <Flex align="end" justify={"center"}>
                        <WingBlank>
                            <Text
                                style={{
                                    fontSize: 20,
                                    textAlign: "center"
                                }}
                            >
                                {t("homepage:measuringDeviceDescriptionMore")}
                            </Text>
                        </WingBlank>
                    </Flex>
                </WingBlank>
            </Flex>
            <WingBlank style={{marginTop: 20, marginBottom: 5}}>
                <Flex align="end" justify={"center"}>
                    <Text
                        style={styles.title}
                    >
                        How it works
                    </Text>
                </Flex>
            </WingBlank>


            {
                stepList.map((step, index) => {
                    return (
                        <WingBlank style={{marginTop: 20, marginBottom: 5}} key={index}>
                            <Flex align="center" justify={"start"} direction={"column"}>
                                <Flex.Item
                                    style={styles.stepLogo}
                                >
                                    <Image
                                        style={{
                                            width: 200,
                                            height: undefined,
                                            aspectRatio: 1,
                                        }}
                                        resizeMode='contain'
                                        source={step.imgUrl}
                                    />
                                </Flex.Item>
                                <Flex.Item>
                                    <Text
                                        style={styles.title}
                                    >
                                        {step.id}.{" "}{step.title}
                                    </Text>
                                </Flex.Item>
                                <Flex.Item>
                                    <Text style={{
                                        fontSize: 20,
                                        textAlign: "center"
                                    }}>
                                        {step.text}
                                    </Text>
                                </Flex.Item>
                            </Flex>
                        </WingBlank>
                    )
                })
            }

            <Flex direction={"column"} style={{padding: 15, backgroundColor: "rgba(50, 60, 70, 0.9)", }}>
                <WingBlank style={{marginTop: 20, marginBottom: 5}}>
                    <Flex align="end" justify={"center"}>
                        <WingBlank>
                            <Text
                                style={{
                                    fontSize: 20,
                                    textAlign: "center",
                                    color: "#ffffff"
                                }}
                            >
                                System offer
                            </Text>
                        </WingBlank>
                    </Flex>
                </WingBlank>
                <WingBlank style={{marginTop: 20, marginBottom: 5}}>
                    <Flex align="end" justify={"center"}>
                        {/*{*/}
                            {/*deviceAccessoryTypesOptions.map((deviceAccessoryTypesOption: any ) => {*/}

                                {/*return(*/}
                                    {/*<WingBlank>*/}
                                        {/*<Text*/}
                                            {/*style={{*/}
                                                {/*fontSize: 20,*/}
                                                {/*textAlign: "center",*/}
                                                {/*color: "#ffffff"*/}
                                            {/*}}*/}
                                        {/*>*/}
                                            {/*{*/}
                                                {/*deviceAccessoryTypesOption?.label*/}
                                            {/*}*/}
                                        {/*</Text>*/}
                                    {/*</WingBlank>*/}
                                {/*)*/}
                            {/*})*/}
                        {/*}*/}

                    </Flex>
                </WingBlank>
            </Flex>


            <WingBlank style={{marginTop: 20, marginBottom: 5}}>
                <MapView
                    style={styleSheet.map}
                    region={{
                        latitude: 51.107883,
                        longitude: 17.038538,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }} provider={PROVIDER_GOOGLE}
                    customMapStyle={[
                        {
                            "featureType": "administrative.country",
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "color": "#ffeb3b"
                                },
                                {
                                    "weight": 1
                                }
                            ]
                        },
                        {
                            "featureType": "administrative.locality",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#ffeb3b"
                                },
                                {
                                    "weight": 1
                                }
                            ]
                        }
                    ]}
                >
                    <Marker
                        coordinate={{
                            latitude: 51.10564437824248,
                            longitude: 17.03056289505437
                        }}
                    />
                </MapView>
            </WingBlank>

        </ScrollView>
);
};

const styleSheet = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
    map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
},
});

export default Homepage;