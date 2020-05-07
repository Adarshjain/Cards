import React from "react";
import {View} from "react-native";
import {Icon} from "react-native-eva-icons";

export default ({fill, style}: { fill?: string, style?: any }) =>
    <View style={{width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
        <Icon style={style || {width: 32, height: 32}} fill={fill || "blue"} name="loader-outline"/>
    </View>;