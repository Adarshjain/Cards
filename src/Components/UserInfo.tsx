import React, {useState} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
import {Icon} from "react-native-eva-icons";
import {useLocalStorage} from "../LocalStorage";
import {randomNumber} from "../helper/Helpers";


export default function UserInfo() {
    let [_, setValue] = useLocalStorage('userInfo');
    let [userName, setUserName] = useState('');


    function saveUserInfo(userName: string) {
        let userId = randomNumber(100000, 999999);
        setValue(JSON.stringify({id: userId, name: userName}));
    }


    return (
        <View style={styles.getInfoContainer}>
            <View style={styles.getInfoCard}>
                <Text style={styles.getInfoCardTitle}>Name</Text>
                <View style={styles.getInfoInputContainer}>
                    <TextInput maxLength={12} value={userName} style={styles.getInfoInput}
                               onChangeText={setUserName}/>
                    <Icon onPress={() => saveUserInfo(userName)} style={styles.getInfoInputIcon} fill="#FFF"
                          name="arrow-right"/>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    getInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '70%',
        justifyContent: "center"
    },
    getInfoCard: {
        display: "flex",
        flexDirection: "column",
        borderRadius: 24,
        margin: 12,
        flex: 1,
        backgroundColor: '#000',
        maxWidth: 688,
        height: 160,
        padding: 24
    },
    getInfoInputContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    getInfoCardTitle: {
        color: "white",
        fontFamily: "Inter-Bold",
        paddingBottom: 16,
        fontSize: 28
    },
    getInfoInput: {
        backgroundColor: "#FFF",
        paddingLeft: 24,
        height: 50,
        borderRadius: 12,
        width: 400
    },
    getInfoInputIcon: {
        height: 60,
        width: 60
    }
})