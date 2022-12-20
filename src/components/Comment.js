import {Image, Text, View} from "react-native";

const Comment = (props) => {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
                borderBottomWidth: 1,
                borderColor: "rgba(0,0,0,0.17)",
                padding: 5,
                marginBottom: 10
            }}>
            <Image
                style={{width: 50, height: 50, borderRadius: 50}}
                source={{uri: props.avatar}}
            />
            <View style={{width: "80%", paddingHorizontal: 10}}>
                <Text
                    style={{fontSize: 13, fontStyle: "normal", color: "purple", fontWeight: "bold"}}>{props.name}</Text>
                <Text>{props.message}</Text>
                <Text style={{fontSize: 12, fontStyle: "italic", color: "purple"}}>{props.time}</Text>
            </View>

        </View>
    )
}
export default Comment;
