import React, { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { fontSizes, spacing } from "../utils/sizes";

const minutesToMillis = (min) => {
    return min * 1000 * 60;
};

const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 1, isPaused, onProgress, onEnd }) => {
    const [millis, setMillis] = useState(minutesToMillis(minutes));
    const [timeleft, setTimeleft] = useState(minutesToMillis(minutes));

    const interval = useRef(null);

    const minute = Math.floor(millis / 1000 / 60) % 60;
    const seconds = Math.floor(millis / 1000) % 60;

    useEffect(() => {
        setMillis(minutesToMillis(minutes));
        setTimeleft(minutesToMillis(minutes));
    }, [minutes]);

    useEffect(() => {
        if (isPaused) {
            if (interval.current) {
                clearInterval(interval.current);
            }
            return;
        }

        interval.current = setInterval(countDown, 1000);

        return () => clearInterval(interval.current);
    }, [isPaused, timeleft]);

    useEffect(() => {
        onProgress(timeleft / minutesToMillis(minutes));
    }, [millis]);

    useEffect(() => {
        if (timeleft === 0) {
            onEnd();
        }
    }, [timeleft]);

    const countDown = () => {
        setMillis((prevTimeLeft) => {
            if (prevTimeLeft === 0) {
                clearInterval(interval.current);
                return prevTimeLeft;
            }

            const timeLeft = prevTimeLeft - 1000;
            setTimeleft(timeLeft);

            return timeLeft;
        });
    };

    return (
        <Text style={styles.text}>
            {formatTime(minute)}:{formatTime(seconds)}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: fontSizes.lg,
        fontWeight: "bold",
        color: colors.white,
        padding: spacing.lg,
        backgroundColor: "rgba(94,132,226,0.3)",
    },
});
