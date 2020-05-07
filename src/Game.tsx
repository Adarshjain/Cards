import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Card from "./Card";
import {getRandom, sortCards} from "./model/CardModel";
import {CardItem} from "./Interface/CardInterface";
import {gql} from "apollo-boost";
import {useMutation, useQuery, useSubscription} from "@apollo/react-hooks";

const GET_DECK = gql`
    {
        chokdiBase{
            letter
            suit{
                design
                color
                suit
            }
        }
    }
`;
const UPDATE_DECK = gql`
    mutation updateDeck($input: UpdateUserEmailInput){
        updateDeck(input: $input) {
            letter
            suit {
                design
                color
                suit
            }
        }
    }
`
const DECK_PUSHED = gql`
    subscription {
        deckUpdated {
            letter
            suit {
                design
                color
                suit
            }
        }
    }
`;

export default function Game() {
    let {loading, error, data} = useQuery<{ chokdiBase: CardItem[][] }>(GET_DECK);
    const resp = useSubscription(DECK_PUSHED);
    const [updateTodo] = useMutation(UPDATE_DECK);
    if (loading) {
        return <Text>Loading...</Text>
    }
    if (error) {
        console.log(error);
        return <Text>error</Text>
    }
    if (!data?.chokdiBase) {
        return <Text>No data.</Text>
    }
    let finalData = data.chokdiBase;
    if (resp.data && resp.data.deckUpdated) {
        finalData = resp.data.deckUpdated;
    }
    let [left, top, right, bottom, center] = finalData;

    function onCardPress(cardItem: CardItem, isInverted: boolean, position: "left" | "right" | "bottom" | "top" | "center") {
        if (isInverted) {
            return;
        }
        let newLeft, newRight, newTop, newBottom, newCenter;
        if (position === "bottom") {
            newBottom = [...bottom.slice(0, getCardIndex(cardItem, bottom)), ...bottom.slice(getCardIndex(cardItem, bottom) + 1)];
            newLeft = left;
            newRight = right;
            newTop = top;
        }
        newCenter = [...center, cardItem];
        updateTodo({
            variables: {
                input: {
                    newDeck: [newLeft, newTop, newRight, newBottom, newCenter]
                }
            }
        })
    }

    return (
        <View style={styles.container}>
            {left && left.length > 0 && <View style={[styles.stack, styles.left, styles.vertical]}>
                {left.map((card, index) => getCard(card, {
                    index,
                    position: "left",
                    direction: "vertical",
                    isInverted: true
                }))}
            </View>}
            {top && top.length > 0 && <View style={[styles.stack, styles.top, styles.horizontal]}>
                {top.map((card, index) => getCard(card, {
                    index,
                    position: "top",
                    direction: "horizontal",
                    isInverted: true
                }))}
            </View>}
            {right && right.length > 0 && <View style={[styles.stack, styles.right, styles.vertical]}>
                {right.map((card, index) => getCard(card, {
                    index,
                    position: "right",
                    direction: "vertical",
                    isInverted: true
                }))}
            </View>}
            {bottom && bottom.length > 0 && <View style={[styles.stack, styles.bottom, styles.horizontal]}>
                {bottom.map((card, index) => getCard(card, {index, position: "bottom", onCardPress}))}
            </View>}
            {center && center.length > 0 && <View style={[styles.stack, styles.center, styles.horizontal]}>
                {center.map((card, index) => getCard(card, {index, position: "center",}))}
            </View>}
        </View>
    )
}


function getFourUniqueSets() {
    let randomCards = getRandom();
    let left = sortCards(randomCards.slice(0, 13));
    let top = sortCards(randomCards.slice(13, 26));
    let right = sortCards(randomCards.slice(26, 39));
    let bottom = sortCards(randomCards.slice(39, 52));
    return [left, top, right, bottom];
}

function getCard(
    card: CardItem,
    {index, direction, isInverted, onCardPress, position}:
        { index?: number, direction?: 'vertical' | 'horizontal', isInverted?: boolean, onCardPress?: (cardItem: CardItem, isInverted: boolean, position: "left" | "right" | "bottom" | "top" | "center") => void, position: "left" | "right" | "bottom" | "top" | "center" }
) {
    let style: any = {};
    if (direction === "vertical") {
        style = {
            marginBottom: -40,
            zIndex: index
        }
    }
    if (direction === "horizontal") {
        style = {
            marginLeft: -20,
            zIndex: index
        }
    }
    return <Card key={card.letter + card.suit.design}
                 style={style}
                 letter={card.letter}
                 suit={card.suit}
                 isInverted={isInverted}
                 click={() => onCardPress && onCardPress(card, !!isInverted, position)}
    />
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#212121',
        width: '100%',
        height: '100%'
    },
    stack: {
        position: 'absolute'
    },
    left: {
        left: 4,
        top: -16
    },
    top: {
        top: 4,
    },
    right: {
        right: 4,
        top: -16
    },
    bottom: {
        bottom: 8,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        top: '50%',
        transform: [{translateY: -50}]
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    vertical: {
        justifyContent: 'center',
        height: '100%'
    }
});

function getCardIndex(card: CardItem, cards: CardItem[]): number {
    return cards.findIndex(cardItem => cardItem.letter === card.letter && cardItem.suit.suit === card.suit.suit)
}

function DontReadTheComments() {
    const {data, loading} = useSubscription(
        DECK_PUSHED,
    );
    if (loading) {
        console.log('loading...');
    } else {
        console.log({data});
    }
}