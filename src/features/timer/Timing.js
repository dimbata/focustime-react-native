import React from "react";
import { View, StyleSheet } from "react-native";

import { RoundedButton } from "../../components/RoundedButton";

export const Timing = (props) => {
    return (
        <>
            <View style={styles.timingButton}>
                <RoundedButton
                    size={75}
                    title={props.minutes.toString()}
                    onPress={() => props.onChangeTime(props.minutes)}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    timingButton: {
        flex: 1,
        alignItems: "center",
    },
});
