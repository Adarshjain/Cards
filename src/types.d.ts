export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
   __typename?: 'Query';
  getBoard?: Maybe<Board>;
  newBoard?: Maybe<Board>;
};


export type QueryGetBoardArgs = {
  boardId: Scalars['Int'];
};


export type QueryNewBoardArgs = {
  user: IUser;
};

export type Subscription = {
   __typename?: 'Subscription';
  board?: Maybe<Board>;
  currentUser?: Maybe<CurrentUser>;
};


export type SubscriptionBoardArgs = {
  boardId: Scalars['Int'];
};


export type SubscriptionCurrentUserArgs = {
  boardId: Scalars['Int'];
};

export type Mutation = {
   __typename?: 'Mutation';
  updateDeck?: Maybe<Array<Array<Card>>>;
  addUserToBoard?: Maybe<Board>;
};


export type MutationUpdateDeckArgs = {
  user: IUser;
  deck?: Maybe<Array<Array<ICard>>>;
  boardId: Scalars['Int'];
};


export type MutationAddUserToBoardArgs = {
  user: IUser;
  boardId?: Maybe<Scalars['Int']>;
};

export type Deck = {
   __typename?: 'Deck';
  id?: Maybe<Scalars['Int']>;
  deck?: Maybe<Array<Maybe<Card>>>;
};

export type ChokdiDeck = {
   __typename?: 'ChokdiDeck';
  id?: Maybe<Scalars['Int']>;
  deck?: Maybe<Array<Maybe<Array<Card>>>>;
};

export type Board = {
   __typename?: 'Board';
  id?: Maybe<Scalars['Int']>;
  users?: Maybe<Array<User>>;
  deck?: Maybe<Array<Array<Card>>>;
  status?: Maybe<Scalars['String']>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type CurrentUser = {
   __typename?: 'CurrentUser';
  user: User;
  boardId: Scalars['Int'];
};

export type IUser = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export enum Suit {
  Spades = 'SPADES',
  Hearts = 'HEARTS',
  Clubs = 'CLUBS',
  Diamonds = 'DIAMONDS'
}

export type Card = {
   __typename?: 'Card';
  letter?: Maybe<Letter>;
  suit?: Maybe<SuitMeta>;
  cardId: Scalars['String'];
};

export type ICard = {
  letter?: Maybe<Letter>;
  suit?: Maybe<ISuitMeta>;
  cardId: Scalars['String'];
};

export type SuitMeta = {
   __typename?: 'SuitMeta';
  design?: Maybe<SuitDesign>;
  color?: Maybe<SuitColor>;
  suit?: Maybe<Suit>;
};

export type ISuitMeta = {
  design?: Maybe<SuitDesign>;
  color?: Maybe<SuitColor>;
  suit?: Maybe<Suit>;
};

export enum Letter {
  One = 'ONE',
  Two = 'TWO',
  Three = 'THREE',
  Four = 'FOUR',
  Five = 'FIVE',
  Six = 'SIX',
  Seven = 'SEVEN',
  Eight = 'EIGHT',
  Nine = 'NINE',
  Ten = 'TEN',
  Jack = 'JACK',
  Queen = 'QUEEN',
  King = 'KING'
}

export enum SuitColor {
  Red = 'RED',
  Black = 'BLACK'
}

export enum SuitDesign {
  Spades = 'SPADES',
  Hearts = 'HEARTS',
  Clubs = 'CLUBS',
  Diamonds = 'DIAMONDS'
}

export type CreateBoardInput = {
  userId: Scalars['Int'];
  userName: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


