import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { RoundedButton } from "../../components/RoundedButton";
import { fontSizes, spacing } from "../../utils/sizes";
import { colors } from "../../utils/colors";

const Focus = (props) => {
    const [subject, setSubject] = useState(null);

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Whatchu wants ?</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={{ flex: 0.95 }}
                        // onChange={({ nativeEvent }) =>
                        //     setTmpItem(nativeEvent.text)
                        // }
                        onChangeText={(text) => setSubject(text)}
                    />
                    <RoundedButton
                        size={50}
                        title="+"
                        onPress={() => props.addSubject(subject)}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
    },
    titleContainer: {
        flex: 1,
        padding: spacing.md,
        justifyContent: "center",
    },
    title: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: fontSizes.lg,
    },
    inputContainer: {
        paddingTop: spacing.xl,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});

export { Focus };
