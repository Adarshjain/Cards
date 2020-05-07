import {AsyncStorage} from 'react-native';
import React, {useState} from "react";

export function useLocalStorage(key) {
    const [userInfo, setUserInfo] = useState<any>(async () => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value !== null ? value : undefined;
        } catch (error) {
            return undefined;
        }
    });

    async function setValue(value) {
        try {
            await AsyncStorage.setItem(key, value);
            setUserInfo(value);
        } catch (error) {
            setUserInfo(undefined);
        }
    }

    return [userInfo, setValue];
}
