import React, {useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Icon} from "react-native-eva-icons";
import {Q_GET_BOARD} from "../gqlConstants";
import {useQuery} from "@apollo/react-hooks";
import {Board, Maybe, Scalars} from "../types";

export default function ShowBoardInfo({boardId, onBackPressed, onBoardFull}: { boardId, onBackPressed: () => void, onBoardFull?: () => void }) {
    let {data} = useQuery<{ getBoard?: Maybe<Board> }, { boardId: Scalars['Int']; }>(
        Q_GET_BOARD, {pollInterval: 1000, variables: {boardId}}
    );
    useEffect(() => {
        if (data?.getBoard?.users?.length === 4) {
            onBoardFull && onBoardFull();
        }
    }, [data])

    return (
        <View style={styles.cardsContainer}>
            <View style={[styles.card, styles.cardFullWidth]}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.cardText, styles.cardTextMedium]}>Board ID</Text>
                    <Icon onPress={onBackPressed} style={styles.backButton} fill="#FFF"
                          name="close-outline"/>
                </View>
                <Text style={styles.boardId}>{boardId}</Text>
                <View style={styles.boardUserInfo}>
                    <Text style={styles.cardSmallText}>To start the game,
                        ask {data?.getBoard?.users && (4 - data.getBoard.users.length) || 3} more friends, with this
                        board ID to
                        join</Text>
                    <Icon animation={"pulse"}
                          style={{width: 16, height: 16, marginLeft: 12}}
                          fill="white"
                          name="loader-outline"/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardsContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '70%',
        justifyContent: "center",
        maxWidth: 648,
        flex: 1
    },
    card: {
        borderRadius: 24,
        margin: 12,
        flex: 1,
        backgroundColor: '#000',
        maxWidth: 320,
        height: 200,
        paddingVertical: 24,
        paddingHorizontal: 32
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between"
    },
    backButton: {
        width: 24,
        height: 24,
        marginRight: 12
    },
    cardFullWidth: {
        maxWidth: 648,
    },
    cardText: {
        color: "white",
        fontFamily: "Inter-Bold",
        fontSize: 28
    },
    cardTextMedium: {
        fontSize: 22,
        fontFamily: "Inter"
    },
    boardId: {
        fontFamily: "Inter-Bold",
        color: "white",
        fontSize: 60,
        letterSpacing: 2,
        marginTop: 12,
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