export enum Suit {
    SPADES = 'SPADES',
    HEARTS = 'HEARTS',
    CLUBS = 'CLUBS',
    DIAMONDS = 'DIAMONDS'
}

export interface CardItem {
    letter: Letter,
    suit: SuitMeta
}

export interface SuitMeta {
    design: SuitDesign,
    color: SuitColor,
    suit: Suit
}

export enum Letter {
    ONE = '1',
    TWO = '2',
    THREE = '3',
    FOUR = '4',
    FIVE = '5',
    SIX = '6',
    SEVEN = '7',
    EIGHT = '8',
    NINE = '9',
    TEN = '10',
    J = 'J',
    Q = 'Q',
    K = 'K'
}

export enum SuitColor {
    RED = "RED",
    BLACK = "BLACK"
}
export enum SuitDesign {
    SPADES = '♠',
    HEARTS = '♥',
    CLUBS = '♣',
    DIAMONDS = '♦'
}