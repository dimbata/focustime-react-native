import React from "react";
import { View, SafeAreaView, FlatList, Text, StyleSheet } from "react-native";
import { RoundedButton } from "../../components/RoundedButton";
import { fontSizes, spacing } from "../../utils/sizes";

const HistoryItem = ({ item, index }) => {
    return (
        <Text
            style={item.status > 1 ? styles.failedItem : styles.successfulItem}
        >
            {item.subject}
        </Text>
    );
};

export const FocusHistory = ({ focusHistory, onClear }) => {
    const clearHistory = () => {
        onClear();
    };

    return (
        <>
            <SafeAreaView style={{ flex: 0.5, alignItems: "center" }}>
                {focusHistory.length > 0 && (
                    <>
                        <Text style={styles.title}>
                            Things we've focused on
                        </Text>

                        <FlatList
                            style={{ flex: 1 }}
                            contentContainerStyle={{
                                flex: 1,
                                alignItems: "center",
                            }}
                            data={focusHistory}
                            renderItem={HistoryItem}
                            keyExtractor={(item) => JSON.stringify(item)}
                        />
                        <View style={styles.clearContainer}>
                            <RoundedButton
                                size={75}
                                title="clear"
                                onPress={() => onClear()}
                            />
                        </View>
                    </>
                )}
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: fontSizes.lg,
        color: "white",
    },
    failedItem: {
        color: "red",
        fontSize: fontSizes.xxl,
    },
    successfulItem: {
        color: "green",
        fontSize: fontSizes.xxl,
    },
    clearContainer: {
        alignItems: "center",
        padding: spacing.md,
    },
});
