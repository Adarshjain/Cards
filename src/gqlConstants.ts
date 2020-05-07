import {gql} from 'apollo-boost';

export const Q_NEW_BOARD = gql`
    query newBoard($user: IUser!) {
        newBoard(user: $user) {
            id
        }
    }
`;

export const Q_GET_BOARD = gql`
    query getBoard($boardId: Int!) {
        getBoard( boardId: $boardId) {
            id
            users {
                id
                name
            }
            deck {
                letter
                suit {
                    design
                    color
                    suit
                }
                cardId
            }
        }
    }
`;

export const M_UPDATE_DECK = gql`
    mutation updateDeck($user: IUser!, $deck: [[ICard!]!], $boardId: Int!) {
        updateDeck(deck: $deck, boardId: $boardId, user: $user) {
            letter
            suit{
                design
                color
                suit
            }
            cardId
        }
    }
`;
export const M_ADD_USER_TO_BOARD = gql`
    mutation addUserToBoard($user: IUser!, $boardId: Int) {
        addUserToBoard(user: $user, boardId: $boardId) {
            id
            deck {
                letter
                suit {
                    design
                    color
                    suit
                }
                cardId
            }
            users {
                name
                id
            }
            status
        }
    }
`;

export const S_BOARD = gql`
    subscription board($boardId: Int!) {
        board(boardId:$boardId){
            id
            users{
                id
                name
            }
            status
            deck{
                letter
                suit{
                    design
                    color
                    suit
                }
                cardId
            }
        }
    }
`;

export const S_CURRENT_USER = gql`
    subscription currentUser($boardId: Int!) {
        currentUser(boardId:$boardId){
            user{
                id
                name
            }
            boardId
        }
    }
`;
