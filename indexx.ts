import {AppRegistry, Platform} from 'react-native';
import {expo} from './app.json';
import Intro from "./src/Intro";

AppRegistry.registerComponent(expo.name, () => Intro);

if (Platform.OS === 'web') {
    let rootTag = document.getElementById('root');
    if (!rootTag) {
        rootTag = document.createElement('div');
        document.body.appendChild(rootTag);
    }
    AppRegistry.runApplication(expo.name, {rootTag});
}