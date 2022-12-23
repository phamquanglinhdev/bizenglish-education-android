import {Image, Text, TouchableNativeFeedback, View} from "react-native";
import {Badge} from "react-native-paper";

const NotifyItem = (props) => {
    // console.log(props)
    return (<TouchableNativeFeedback
        onPress={() => {
            props.navigation.navigate("NotificationScreen")
        }}
    >
        <View style={{
            flexDirection: "row",
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0, height: 7,
            },
            shadowOpacity: 0.43,
            shadowRadius: 9.51,

            elevation: 15,
            marginBottom: 10

        }}>
            <Badge
                style={{
                    backgroundColor: "rgba(54,245,26,0.56)", position: "absolute", bottom: 3, right: 3,
                }}></Badge>
            <View style={{width: "20%"}}>
                <Image
                    style={{width: 60, height: 60, borderRadius: 50, borderWidth: 1, borderColor: "rgba(0,0,0,0)"}}
                    source={{uri: props.icon}}
                />
            </View>
            <View style={{width: "80%"}}>
                <View style={{
                    flexDirection: 'row', alignItems: "center", justifyContent: "space-between", padding: 5,
                }}>
                    <Text style={{fontSize: 16, fontWeight: "bold"}}>{props.title}</Text>
                    <Text style={{fontSize: 12, color: 'rgba(0,0,0,0.56)'}}>{props.time}</Text>
                </View>
                <Text style={{fontSize: 14, color: 'rgba(0,0,0,0.56)', paddingLeft: 5}}>
                    {props.message}

                </Text>
            </View>
        </View>
    </TouchableNativeFeedback>)
}
export default NotifyItem;
