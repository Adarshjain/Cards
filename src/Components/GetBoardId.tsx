import {StyleSheet, Text, TextInput, View} from "react-native";
import {Icon} from "react-native-eva-icons";
import React, {useState} from "react";
import {useMutation} from "@apollo/react-hooks";
import {Board, IUser, Maybe, Scalars} from "../types";
import {M_ADD_USER_TO_BOARD} from "../gqlConstants";

export default function GetBoardId({user, onBackPressed, onBoardId}: { user: { id: number, name: string }, onBackPressed: () => void, onBoardId: (id: number) => void }) {
    let [boardId, setBoardID] = useState<string>('');
    let [addUser, {data}] = useMutation<{ addUserToBoard?: Maybe<Board>; }, { user: IUser; boardId?: Maybe<Scalars['Int']>; }>(M_ADD_USER_TO_BOARD);

    async function addUserToBoard() {
        if (!Number.isInteger(parseInt(boardId)) || boardId.length > 6) {
            return;
        }
        await addUser({variables: {user, boardId: parseInt(boardId)}});
        onBoardId(parseInt(boardId));
    }

    return (
        <View style={styles.getInfoContainer}>
            <View style={styles.getInfoCard}>
                <View style={styles.titleContainer}>
                    <Text style={styles.getInfoCardTitle}>Board ID</Text>
                    <Icon onPress={onBackPressed} style={styles.backButton} fill="#FFF"
                          name="close-outline"/>
                </View>

                <View style={styles.getInfoInputContainer}>
                    <TextInput keyboardType="numeric" maxLength={12} value={boardId} style={styles.getInfoInput}
                               onChangeText={setBoardID}/>
                    <Icon onPress={addUserToBoard} style={styles.getInfoInputIcon} fill="#FFF"
                          name="arrow-right"/>
                </View>
                <Text style={styles.cardSmallText}>Enter board id to join</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    getInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '70%',
        justifyContent: "center",
        maxWidth: 648,
        flex: 1
    },
    getInfoCard: {
        display: "flex",
        flexDirection: "column",
        borderRadius: 24,
        margin: 12,
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 24,
        paddingHorizontal: 32,
        height: 200
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
        padding: 24,
        height: 50,
        borderRadius: 12,
        width: 400
    },
    getInfoInputIcon: {
        height: 60,
        width: 60
    },
    cardSmallText: {
        fontFamily: "Inter",
        color: "white",
        fontSize: 12,
        marginTop: 12
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
    }
})