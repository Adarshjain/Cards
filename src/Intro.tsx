import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import * as Font from 'expo-font';
import {AppLoading} from "expo";
import {useLocalStorage} from "./LocalStorage";
import UserInfo from "./Components/UserInfo";
import IntroActions from "./IntroActions";

function useFonts(fontMap: { [key: string]: string }) {
    let [fontsLoaded, setFontsLoaded] = useState(false);
    (async () => {
        await Font.loadAsync(fontMap);
        setFontsLoaded(true);
    })();
    return [fontsLoaded];
}


export default function Intro() {
    let [userInfo, _, stopPolling] = useLocalStorage('userInfo');
    let [isBoardFull, setIsBoardFull] = useState(false);

    let [fontsLoaded] = useFonts({
        'DancingScript': require('../assets/fonts/DancingScript-Bold.ttf'),
        'Inter': require('../assets/fonts/Inter.ttf'),
        'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
        'Inter-Thin': require('../assets/fonts/Inter-Thin.ttf'),
    });
    useEffect(() => {
        if (userInfo !== undefined) {
            stopPolling();
        }
    }, [userInfo]);


    if (!fontsLoaded) {
        return <AppLoading/>
    }
    return (
        !isBoardFull ?
            <View style={styles.container}>
                <View style={styles.appNameContainer}>
                    <Text style={styles.appNameText}>Chokdi</Text>
                </View>
                {
                    userInfo !== undefined ?
                        <IntroActions user={JSON.parse(userInfo)} onBoardFull={() => setIsBoardFull(true)}/>
                        : <UserInfo/>
                }
            </View> :
            <Text>Lets start the game</Text>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FED232",
        width: '100%',
        height: '100%',
        overflow: "hidden",
        display: 'flex',
        flexDirection: 'column',
    },
    appNameContainer: {
        display: 'flex',
        height: '30%',
        justifyContent: "center"
    },
    appNameText: {
        fontFamily: "DancingScript",
        fontSize: 50,
        textAlignVertical: "center",
        maxWidth: 620,
        alignSelf: "center",
        width: "100%"
    },
    cardsContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '70%',
        justifyContent: "center"
    },
    card: {
        borderRadius: 24,
        margin: 12,
        flex: 1,
        backgroundColor: '#000',
        maxWidth: 320,
        height: 200,
        padding: 24
    },
    cardText: {
        color: "white",
        fontFamily: "Inter-Bold",
        paddingBottom: 8,
        fontSize: 28
    },
    cardHeaderIcon: {
        height: 32,
        width: 32,
        marginTop: 26
    }
})