import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {CardItem, SuitColor} from "./Interface/CardInterface";
import {Design, Letter} from "./model/CardInfoMaps";

export default function Card(props: any) {
    let {letter, suit}: CardItem = props;
    let {isInverted, style, click}: any = props;
    let suitColor: any;
    switch (suit.color) {
        case SuitColor.BLACK:
            suitColor = styles.colorBlack;
            break;
        case SuitColor.RED:
            suitColor = styles.colorRed;
            break;
    }
    return (
        <TouchableOpacity onPress={click}>
            <View style={[styles.card, style]}>
                {!isInverted && (
                    <>
                        <Text style={[styles.text, suitColor]}>{Letter[letter]}</Text>
                        <Text style={[styles.text, styles.design, suitColor]}>{Design[suit.design]}</Text>
                    </>
                )}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: 'orange',
        borderStyle: 'solid',
        paddingHorizontal: 4,
        paddingVertical: 8,
        display: 'flex',
        width: 40,
        height: 60,
        borderRadius: 6,
        backgroundColor: '#212121'
    },
    text: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    design: {
        color: '#FFFFFF',
        fontSize: 18
    },
    colorRed: {
        color: '#FF6347'
    },
    colorBlack: {
        color: 'white'
    }
});
