import {HttpLink} from 'apollo-boost';
import {ApolloClient} from 'apollo-client';
import {WebSocketLink} from 'apollo-link-ws';
import {split} from 'apollo-link';
import {getMainDefinition} from 'apollo-utilities';
import {InMemoryCache} from 'apollo-cache-inmemory';

const IS_DEV = true;

let normalUri = 'http://13.127.55.53:4000/graphql';
let subscriptionUri = 'ws://13.127.55.53:4000/graphql';

if(IS_DEV){
    normalUri = 'http://192.168.43.12:4000/graphql'//'http://localhost:4000/graphql';
    subscriptionUri = 'ws://localhost:4000/graphql';
}

const httpLink = new HttpLink({
    uri: normalUri,
});

const wsLink = new WebSocketLink({
    uri: subscriptionUri,
    options: {
        reconnect: true,
    },
});
const link = split(
    ({ query }) => {
        let definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
)
const cache = new InMemoryCache({
    addTypename: false
});

const client = new ApolloClient({
    link,
    cache,
});


export default client;