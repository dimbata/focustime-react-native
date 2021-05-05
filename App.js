import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Focus } from "./src/features/focus/Focus";
import { Timer } from "./src/features/timer/Timer";
import { colors } from "./src/utils/colors";
import { spacing } from "./src/utils/sizes";
import { FocusHistory } from "./src/features/focus/FocusHistory";

const STATUSES = {
    COMPLETE: 1,
    CANCELLED: 2,
};

export default function App() {
    const [focusSubject, setFocusSubject] = useState(null);
    const [focusHistory, setFocusHistory] = useState([]);

    const addFocusHistorySubjectWithFocus = (subject, status) => {
        setFocusHistory([...focusHistory, { subject, status }]);
    };

    const onClear = () => {
        setFocusHistory([]);
    };

    const saveFocusHistory = async () => {
        try {
            await AsyncStorage.setItem(
                "focusHistoryy",
                JSON.stringify(focusHistory)
            );
        } catch (e) {
            console.log(e);
        }
    };

    const loadFocusHistory = async () => {
        try {
            const history = await AsyncStorage.getItem("focusHistoryy");
            if (history && JSON.parse(history).length) {
                setFocusHistory(JSON.parse(history));
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        loadFocusHistory();
    }, []);

    useEffect(() => {
        saveFocusHistory();
    }, [focusHistory]);

    return (
        <View style={styles.container}>
            {focusSubject ? (
                <Timer
                    focusSubject={focusSubject}
                    onTimerEnd={() => {
                        addFocusHistorySubjectWithFocus(
                            focusSubject,
                            STATUSES.COMPLETE
                        );
                        setFocusSubject(null);
                    }}
                    clearSubject={() => {
                        addFocusHistorySubjectWithFocus(
                            focusSubject,
                            STATUSES.CANCELLED
                        );
                        setFocusSubject(null);
                    }}
                />
            ) : (
                <View style={{ flex: 0.5 }}>
                    <Focus addSubject={setFocusSubject} />
                    <FocusHistory
                        focusHistory={focusHistory}
                        onClear={() => onClear()}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightGreen,
        paddingTop: spacing.lg,
    },
});
