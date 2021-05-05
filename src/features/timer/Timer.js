import React, { useState } from "react";
import { View, StyleSheet, Text, Platform, Vibration } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useKeepAwake } from "expo-keep-awake";

import { Countdown } from "../../components/Countdown";
import { RoundedButton } from "../../components/RoundedButton";
import { colors } from "../../utils/colors";
import { spacing } from "../../utils/sizes";
import { Timing } from "./Timing";

const DEFAULT_TIME = 0.1;

export const Timer = (props) => {
    useKeepAwake();

    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(1);
    const [minutes, setMinutes] = useState(DEFAULT_TIME);

    const onProgress = (progress) => {
        setProgress(progress);
    };

    const onChangeTime = (min) => {
        setMinutes(min);
        setProgress(1);
        setIsStarted(false);
    };

    const onEnd = () => {
        vibrate();
        setMinutes(DEFAULT_TIME);
        setProgress(1);
        setIsStarted(false);
        props.onTimerEnd();
    };

    const vibrate = () => {
        Vibration.vibrate([0, 500, 100, 200]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.countdown}>
                <Countdown
                    minutes={minutes}
                    isPaused={!isStarted}
                    onProgress={onProgress}
                    onEnd={onEnd}
                />
            </View>
            <View style={{ paddingTop: 50 }}>
                <Text style={styles.title}>Focusing on:</Text>
                <Text style={styles.task}>{props.focusSubject}</Text>
            </View>
            <View style={{ paddingTop: spacing.sm }}>
                <ProgressBar
                    color="#5E84E2"
                    progress={progress}
                    style={{ height: 10 }}
                />
            </View>
            <View style={styles.buttonWrapper}>
                <Timing onChangeTime={onChangeTime} minutes={10} />
                <Timing onChangeTime={onChangeTime} minutes={15} />
            </View>
            <View style={styles.buttonWrapper}>
                {isStarted ? (
                    <RoundedButton
                        title="pause"
                        size={100}
                        onPress={() => setIsStarted(false)}
                    />
                ) : (
                    <RoundedButton
                        title="start"
                        size={100}
                        onPress={() => setIsStarted(true)}
                    />
                )}
            </View>
            <View style={styles.clearSubject}>
                <RoundedButton
                    title="-"
                    size={60}
                    onPress={() => props.clearSubject()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: colors.white,
        textAlign: "center",
    },
    task: {
        color: colors.white,
        textAlign: "center",
        fontWeight: "bold",
    },
    countdown: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonWrapper: {
        flex: 0.3,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    clearSubject: {
        paddingBottom: 30,
        paddingLeft: 30,
    },
});
