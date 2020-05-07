import {AsyncStorage} from 'react-native';
import React, {useEffect, useState} from "react";

export function useLocalStorage(key) {
    const [userInfo, setUserInfo] = useState<any>(undefined);
    const [pollId] = useState();
    useEffect(() => {
        const dummyFn = async () => {
            try {
                const value = await AsyncStorage.getItem(key);
                setUserInfo(value !== null ? value : undefined)
            } catch (error) {
                setUserInfo(undefined);
            }
        }
        setInterval(dummyFn, 100);
    })

    async function setValue(value) {
        try {
            await AsyncStorage.setItem(key, value);
            setUserInfo(value);
        } catch (error) {
            setUserInfo(undefined);
        }
    }

    function stopPolling() {
        clearInterval(pollId);
    }

    return [userInfo, setValue, stopPolling];
}
