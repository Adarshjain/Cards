import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-eva-icons";
import {Q_NEW_BOARD} from "./gqlConstants";
import {useLazyQuery} from "@apollo/react-hooks";
import Loading from "./helper/Loading";
import Error from "./helper/Error";
import ShowBoardInfo from "./Components/ShowBoardInfo";
import GetBoardId from "./Components/GetBoardId";

export default function IntroActions({user,onBoardFull}: { user: { id: number, name: string } , onBoardFull?: () => void }) {
    let [createNewBoard, {loading, data, error}] = useLazyQuery<{ newBoard: { id: number } }>(Q_NEW_BOARD, {variables: {user}});
    let [showGetBoardId, setShowGetBoardId] = useState(false);
    let [showBoardInfo, setShowBoardInfo] = useState(false);
    let [manualBoardId, setManualBoardId] = useState(0);
    useEffect(() => {
        if (data !== undefined && data.newBoard !== undefined) {
            setShowBoardInfo(true);
        }
    }, [data]);

    useEffect(() => {
        if(manualBoardId !== 0){
            setShowBoardInfo(true);
        }
    }, [manualBoardId]);

    function onBackPressed() {
        setShowGetBoardId(false);
        setShowBoardInfo(false);
    }


    if (loading) {
        return <View style={styles.cardsContainer}>
            <Loading fill="#000"/>
        </View>
    }
    if (error) {
        console.log(error);
        return <View style={styles.cardsContainer}>
            <Error/>
        </View>
    }

    return (
        <View style={styles.cardsContainer}>
            {
                showBoardInfo ?
                    <ShowBoardInfo
                        //@ts-ignore
                        boardId={manualBoardId || data.newBoard.id}
                        onBackPressed={onBackPressed}
                        onBoardFull={onBoardFull}
                    /> :
                    !showGetBoardId ?
                        <>
                            <TouchableOpacity style={styles.card} onPress={() => createNewBoard()}>
                                <Text style={styles.cardText}>Create</Text>
                                <Text style={styles.cardText}>New board</Text>
                                <Icon style={styles.cardHeaderIcon} fill="#FFF" name="plus-outline"/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.card} onPress={() => setShowGetBoardId(true)}>
                                <Text style={styles.cardText}>Join</Text>
                                <Text style={styles.cardText}>Existing board</Text>
                                <Icon style={styles.cardHeaderIcon} fill="#FFF" name="person-add"/>
                            </TouchableOpacity>
                        </>
                        :
                        <GetBoardId user={user} onBackPressed={onBackPressed} onBoardId={setManualBoardId}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
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
    cardFullWidth: {
        maxWidth: 648,
    },
    cardText: {
        color: "white",
        fontFamily: "Inter-Bold",
        paddingBottom: 8,
        fontSize: 28
    },
    cardTextMedium: {
        fontSize: 22,
        fontFamily: "Inter"
    },
    cardHeaderIcon: {
        height: 32,
        width: 32,
        marginTop: 26
    },
    boardId: {
        fontFamily: "Inter-Bold",
        color: "white",
        fontSize: 60,
        letterSpacing: 2,
        marginTop: 4,
        marginBottom: 12
    },
    cardSmallText: {
        fontFamily: "Inter",
        color: "white",
        fontSize: 12
    },
    boardUserInfo: {
        display: "flex",
        flexDirection: "row"
    }
})