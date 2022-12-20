import {StyleSheet} from "react-native";


export const appStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    flexCenter: {
        justifyContent: "center",
    },
    bgMain: {
        backgroundColor: "violet"
    },
    loginLogo: {
        width: 200,
        height: 200,
        alignSelf: "center"
    },
    textInput: {
        backgroundColor: "white",
        marginBottom: 10,
    },
    materialContent: {
        backgroundColor: "white",
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    headingText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    headerBar: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    card: {
        padding: 10,
        borderBottomWidth: 1,
        marginVertical: 5,
        borderRadius: 10,
        borderColor: "rgba(0,0,0,0.25)",
    },
    cardTitle: {
        color: "#01a1bd",
        fontSize: 15,
        fontWeight: "bold",
    },
    cardContent: {},
    cardSub: {
        fontStyle: "italic",
        fontSize: 12,
        color: "rgba(0,0,0,0.21)"
    },
    unread: {
        backgroundColor: "rgba(0,0,0,0.23)",
    },
    userAvatar: {
        top: 50,
        width: 180,
        height: 180,
        borderRadius: 200,
        borderWidth: 5,
        borderColor: "white",
        position: "absolute",
        zIndex: 99,
        alignSelf: "center",
    },
    tHead: {
        fontWeight: "bold",
        textAlign: "center",
        alignItems: "center",
        // color: "white"
    },
    tBody: {},
    cell: {
        borderWidth: 0.2,
        borderColor: "rgba(0,0,0,0.23)",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    textLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#01a1bd",
        marginVertical: 10
    },
    listItem: {
        borderRadius: 1,
        padding: 5,
        marginBottom: 5,
    }

});
