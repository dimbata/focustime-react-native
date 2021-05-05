import React, { Component } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Pressable,
    View,
} from "react-native";

export const RoundedButton = ({
    style = {},
    textStyle = {},
    size = 125,
    ...props
}) => {
    return (
        <Pressable style={[styles(size).radius, style]}>
            <Text
                style={[styles(size).text, textStyle]}
                onPress={props.onPress}
            >
                {props.title}
            </Text>
        </Pressable>
    );
};

const styles = (size) =>
    StyleSheet.create({
        radius: {
            borderRadius: size / 2,
            width: size,
            height: size,
            alignItems: "center",
            justifyContent: "center",
            borderColor: "#fff",
            borderWidth: 2,
        },
        text: {
            color: "#111",
            fontSize: size / 5,
            padding: 15,
        },
    });
