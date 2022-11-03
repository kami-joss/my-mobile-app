import { View, StyleSheet } from "react-native"

const MainLayout = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: "#212020",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
    },
})

export default MainLayout