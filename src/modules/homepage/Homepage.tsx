import React, {useState, FC, useEffect, useRef, useContext, useMemo} from 'react';

import {ScrollView, Text, Image, StyleSheet, View, ImageBackground, TouchableOpacity, TextInput} from 'react-native';
import {Button, Flex, WingBlank, WhiteSpace, Icon} from '@ant-design/react-native';
import appMobile from "src/resources/images/home/app-mobile.png";
import measureDesign from "src/resources/images/home/measure-design.png";
import {FontAwesome} from "@expo/vector-icons";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import ViewMoreText from 'react-native-view-more-text';

import register from "src/resources/images/home/register.png";
import specialist from "src/resources/images/home/specialist.png";
import pickup from "src/resources/images/home/pickup.png";
import measurement from "src/resources/images/home/measurement.png";
import result from "src/resources/images/home/result.png";
import treatment from "src/resources/images/home/treatment.png";
import {useOptions} from "src/shared/hooks/useOptions";
import {useTranslation} from "react-i18next";
import {DrawContext} from "../../shared/layouts/Drawer/DrawerCustom";
import * as Animatable from 'react-native-animatable';
import styles from "src/modules/homepage/hompageStyle";
import Accordion from 'react-native-collapsible/Accordion';
import {useAppDispatch, useAppSelector} from "../../app/config/store";
import {APP_CUSTOM_DATE_FORMAT, OFFER_TYPES, ORDER_TYPES} from "../../app/config/constants";
import moment from "moment";
import {round} from "../../shared/util/entity-utils";
import formatCurrency from "../../shared/util/currency-utils";
import {fetchPlace, placeSelector} from "./homepage.reducer";
import AutoComplete from "../../shared/layouts/AutoComplete";
import {debounce} from "lodash";


const Homepage: FC<any> = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const {onDrawerOpen} = useContext(DrawContext);
    const {offerTypesOptions} = useOptions("OFFER_TYPES");
    const {vatTypesOptions} = useOptions("VAT_TYPES");
    const {currenciesOptions} = useOptions("CURRENCIES");
    const {deviceAccessoryTypesOptions} = useOptions("DEVICE_ACCESSORY_TYPES");
    const placeOptions = useAppSelector(placeSelector);

    const [activeSections, setActiveSections] = useState<number[]>([]);
    const [locate, setLocale] = useState<{latitude: number, longitude: number}>({
        latitude: 51.107883,
        longitude: 17.038538,
    });
    const offerList = useAppSelector(state => state.offer.entities || []);
    const onSearch = (search: string) => {
       debounceSearch(search)
    };
    const debounceSearch = debounce((search: string) => {
        if(search) dispatch(fetchPlace(search));
    }, 1000);

    const onSelectedOption = (option: any) => {
        setLocale({
            longitude: option?.geometry?.coordinates[0],
            latitude: option?.geometry?.coordinates[1],
        });
        };

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

    const renderViewMore = (onPress: any) => {
        return (
            <Flex justify={"end"}>
                <Text style={styles.textLink} onPress={onPress}>{t('homepage.more')}</Text>
            </Flex>
        )
    };

    const renderViewLess = (onPress: any) => {
        return (
            <Flex justify={"end"}>
                <Text style={styles.textLink} onPress={onPress}>{t('homepage.less')}</Text>
            </Flex>
        )
    };
    const setSections = (sections: any) => {
        setActiveSections(sections.includes(undefined) ? [] : sections);
    };
    const CONTENT = offerTypesOptions.map((offerTypeOption: any) => {
        return {
            title: offerTypeOption?.label,
            content: (isActive: boolean) => {
                const offers = offerList.filter(item =>
                    activeSections.includes(item?.offerTypeId || 0) && item.isActive);

                if (offers?.length === 0) {
                    return false
                }
                return (
                    <>
                        {
                            offers.map((offer: any, index: number) => {
                                const currencies = currenciesOptions.find((item: any) => item.id === offer.currencyId);
                                const currenciesEnumKey = currencies?.enumKey;
                                const vatType = vatTypesOptions.find((item: any) => item.id === offer?.vatTypeId)?.label;
                                const vatRate = parseFloat(vatType) / 100;
                                const amountGross = round(offer.amount + offer.amount * vatRate);

                                return (
                                        <View key={index} style={[{
                                            marginVertical: 10,
                                            marginHorizontal: 20,
                                            paddingBottom: 60,
                                            paddingTop: 40,
                                            marginBottom: 40,
                                            borderRadius: 16,
                                            minHeight: 300
                                        }, isActive ? styles.active : styles.inactive]}>
                                            <WingBlank>
                                                <WingBlank style={{marginBottom: 20}}>
                                                    <Text style={styles.cardTitle}>
                                                        {offer?.name}
                                                    </Text>
                                                </WingBlank>
                                                {
                                                    offer.offerTypeId < OFFER_TYPES.ACCESSORIES &&
                                                    <WingBlank>
                                                        <Text style={styles.cardDetail}>
                                                            {t(offer.orderTypeId === ORDER_TYPES.SALE ? "bruxTestApp.offer.card.buy" : "bruxTestApp.offer.card.rent")}
                                                        </Text>
                                                    </WingBlank>
                                                }

                                                {
                                                    offer?.periodEndDate &&
                                                    <WingBlank>
                                                        <Text style={styles.cardDue}>
                                                            {t("homepage.availableTo") + " "}{moment(offer?.periodEndDate).format(APP_CUSTOM_DATE_FORMAT)}
                                                        </Text>
                                                    </WingBlank>
                                                }


                                                <WingBlank style={{marginTop: 20}}>
                                                    <Flex align={"start"}>

                                                        <Text style={styles.cardCurrencies}>
                                                            {currenciesEnumKey}
                                                        </Text>
                                                        <Text style={styles.cardAmount}>
                                                            {formatCurrency(amountGross)}
                                                        </Text>
                                                        {offer.orderTypeId === ORDER_TYPES.RENT && (
                                                            <Text style={styles.cardAmount}>
                                                                {t("bruxTestApp.offer.monthly")}
                                                            </Text>
                                                        )}
                                                    </Flex>
                                                </WingBlank>
                                                <View style={{ width: "100%", height: 1, backgroundColor: '#e6edf0', marginVertical: 30}} />

                                                <WingBlank>
                                                    <Text style={{fontSize: 20, textAlign:"left"}}>
                                                        {offer?.description}
                                                    </Text>
                                                </WingBlank>
                                                <View style={{ width: "100%", height: 1, backgroundColor: '#e6edf0', marginVertical: 30}} />
                                                <View style={{marginTop: 20}}>
                                                        {
                                                            offer.deviceNetPrice > 0 &&
                                                            (
                                                                offer.offerTypeId === OFFER_TYPES.RETAIL_OFFER ||
                                                                offer.offerTypeId === OFFER_TYPES.WHOLESALE_OFFER
                                                            ) &&

                                                            <View>
                                                                <Flex justify={"between"}>
                                                                    <Text style={styles.text}>
                                                                        <Text style={styles.textLink}>
                                                                            &gt;
                                                                        </Text>
                                                                        <Text>
                                                                            {offer?.deviceQuantity} x {t("homepage.measuringDevice")}
                                                                        </Text>
                                                                    </Text>
                                                                    <Text>
                                                                        <Text style={styles.textLink}>{amountGross} {currenciesEnumKey}</Text>
                                                                    </Text>
                                                                </Flex>
                                                            </View>
                                                        }
                                                        {
                                                            offer?.offerDeviceAccessories?.map((offerDeviceAccessory: any, index: number) => {
                                                                const deviceAccessoryType = deviceAccessoryTypesOptions.find((deviceAccessoryTypesOption:any) => deviceAccessoryTypesOption.id === offerDeviceAccessory.deviceAccessoryTypeId);
                                                                return (
                                                                    <View key={index}>
                                                                        <Flex justify={"between"}>
                                                                            <Text style={styles.text}>
                                                                                <Text style={styles.textLink}>
                                                                                    &gt;
                                                                                </Text>
                                                                                <Text>
                                                                                    {offer?.deviceQuantity} x {deviceAccessoryType?.translateLabel}
                                                                                </Text>
                                                                            </Text>
                                                                            <Text
                                                                                style={styles.textLink}>{amountGross} {currenciesEnumKey}</Text>
                                                                        </Flex>
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                </View>
                                            </WingBlank>
                                            <View style={{
                                                position: 'absolute',
                                                bottom: -20,
                                                alignSelf: 'center',
                                                width: 200,
                                            }}>
                                                <Button style={{borderRadius: 24, backgroundColor: "#584cd9"}}>
                                                    <Text style={{fontWeight: "600", color: "#ffffff"}}>
                                                        Choose
                                                    </Text>
                                                </Button>
                                            </View>
                                        </View>
                                )
                            })
                        }
                    </>
                )
            }
        }
    });


    const renderHeader = (section: any, _: any, isActive: boolean) => {
        return (
            <Animatable.View
                duration={400}
                style={[styles.header, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor">
                <Text style={isActive ? styles.headerText : styles.headerTextInactive}>{section.title}</Text>
            </Animatable.View>
        );
    };

    const renderContent = (section: any, _: any, isActive: boolean) => {

        if (!section?.content()) {
            return null
        }
        return (
            <Animatable.View
                duration={400}
                style={[styles.content,]}
                transition="backgroundColor">
                <Animatable.View
                    animation={isActive ? 'bounceIn' : undefined}
                >
                    {section?.content(isActive)}

                </Animatable.View>
            </Animatable.View>
        );
    };


    return (
        <ScrollView
            style={styles.homepage}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            <WingBlank style={styles.container}>

                <Flex align="end" justify={"between"} style={{height: 30}}>
                    <Text
                        style={styles.title}
                    >
                        Bruxtest
                    </Text>
                    <Text
                        onPress={onDrawerOpen}
                    >
                        <FontAwesome
                            name="bars"
                            size={25}
                            style={{marginRight: 5}}
                        />
                    </Text>


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
                        {t("homepage.headerDescription")}
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
                        {t("homepage.titleDescription")}

                    </Text>
                </WingBlank>
            </Flex>
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
                        {t("homepage.aboutUsDescription")}
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
                        {t("homepage.aboutUsDescriptionMore")}

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
                                {t("homepage.measuringDeviceDescriptionMore")}
                            </Text>
                        </WingBlank>
                    </Flex>
                </WingBlank>
            </Flex>

            <Flex style={{padding: 15}}>
                <WingBlank style={{marginTop: 20, marginBottom: 5}}>
                    <Flex align="end" justify={"center"}>
                        <WingBlank>
                            <ViewMoreText
                                numberOfLines={3}
                                renderViewMore={renderViewMore}
                                renderViewLess={renderViewLess}
                                textStyle={{textAlign: 'center'}}
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        textAlign: "center"
                                    }}
                                >
                                    {t("homepage.measuringDeviceDetail")}
                                </Text>
                            </ViewMoreText>
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

            <WingBlank style={{marginBottom: 20}}>
                {
                    stepList.map((step, index) => {
                        return (
                            <View key={index} style={{
                                shadowOffset: {
                                    width: 0,
                                    height: 2
                                },
                                shadowOpacity: 0.35,
                                shadowRadius: 3
                            }}>
                                <WingBlank style={styles.container}>
                                    <Flex align="center" justify={"start"} direction={"column"}
                                          style={styles.stepLogo}
                                    >
                                        <Flex.Item>
                                            <Image
                                                style={{
                                                    width: undefined,
                                                    height: 150,
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
                                                fontSize: 18,
                                                textAlign: "center",
                                                color: "#73858d",
                                                marginTop: 10,
                                                marginBottom: 30
                                            }}>
                                                {step.text}
                                            </Text>
                                        </Flex.Item>
                                    </Flex>
                                </WingBlank>
                            </View>
                        )
                    })
                }
            </WingBlank>

            <Flex direction={"column"} style={{padding: 15, backgroundColor: "rgba(50, 60, 70, 0.9)",}}>
                <ImageBackground source={require("src/resources/images/home/offer-bg.png")} resizeMode="cover"
                                 style={styles.image}>

                    <WingBlank style={{marginTop: 20, marginBottom: 5}}>
                        <Flex align="center" justify={"center"} direction={"column"}>
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

                            <WingBlank style={{paddingTop: 20}}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        textAlign: "center",
                                        color: "#ffffff"
                                    }}
                                >
                                    Find the package that suits your needs.
                                </Text>
                            </WingBlank>
                        </Flex>
                    </WingBlank>
                    <WingBlank style={{marginTop: 20, marginBottom: 5}}>
                        <Accordion
                            activeSections={activeSections}
                            sections={CONTENT}
                            touchableComponent={TouchableOpacity}
                            expandMultiple={false}
                            renderHeader={renderHeader}
                            //@ts-ignore
                            renderContent={renderContent}
                            duration={400}
                            onChange={setSections}
                        />
                    </WingBlank>

                </ImageBackground>
            </Flex>


            <WingBlank style={styles.container}>
                <WingBlank>
                    <Text
                        style={styles.title}
                    >
                        Contact
                    </Text>
                    <WhiteSpace size="lg" />
                    <Text
                        style={[styles.text, styles.textCenter]}
                    >
                        {t("homepage.contactDetail")}
                    </Text>
                    <WhiteSpace size="lg" />
                    <AutoComplete onChange={onSearch} data={placeOptions} onSelectedOption={onSelectedOption}/>
                </WingBlank>
                <MapView
                    style={styles.map}
                    region={{
                        latitude: locate?.latitude,
                        longitude: locate?.longitude,
                        latitudeDelta: 10,
                        longitudeDelta: 10,
                    }}

                    provider={PROVIDER_GOOGLE}
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
                        coordinate={{ latitude: locate?.latitude,
                            longitude: locate?.longitude,}}
                    />
                </MapView>
                <WingBlank style={{marginBottom: 40}}>
                    <WhiteSpace size="lg" />
                    <Text
                        style={[styles.text, styles.textCenter]}
                    >
                        {t("homepage.contactUsPartTwo")}
                    </Text>
                    <WhiteSpace size="lg" />
                    <Text
                        style={[styles.text, styles.textCenter]}
                    >
                        {t("homepage.contactUsPartThree")}
                    </Text>
                    <WhiteSpace size="lg" />
                    <Text
                        style={[styles.text, styles.textCenter]}
                    >
                        {t("homepage.contactUsPartFour")} <Text style={styles.phone}>+48 521 125 521</Text>
                    </Text>
                </WingBlank>
            </WingBlank>

        </ScrollView>
    );
};

export default Homepage;