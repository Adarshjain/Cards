export enum Suit {
    SPADES,
    HEARTS,
    CLUBS,
    DIAMONDS
}

export interface CardItem {
    letter: Letter,
    suit: SuitMeta
}

export interface SuitMeta {
    design: string,
    color: string,
    suit: Suit
}

export enum Letter {
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    J,
    Q,
    K
}
