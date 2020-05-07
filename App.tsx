import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import client from "./src/ApolloClient";
import Intro from "./src/Intro";

export default function App() {
    return (
        <ApolloProvider client={client}>
            <Intro/>
        </ApolloProvider>
    );
}

