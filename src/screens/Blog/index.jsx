import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const blogPosts = [
    "Kenapa jalan kaki bagus buat kesehatan mental? Yuk bahas!",
    "5 alasan kamu harus mulai jalan kaki 30 menit sehari.",
    "Beda jalan kaki pagi dan sore, mana yang lebih oke?",
];

export default function BlogScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Blog WalkingTracker</Text>
            {blogPosts.map((post, index) => (
                <Text key={index} style={styles.post}>{post}</Text>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f0f8ff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    post: {
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: "#d0f0c0",
        padding: 15,
        borderRadius: 10,
    },
});
