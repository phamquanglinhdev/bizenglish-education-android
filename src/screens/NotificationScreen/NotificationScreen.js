import {Image, ScrollView, Text, View} from "react-native";
import WebView from "react-native-webview";

const NotificationScreen = () => {
    return (
        <View style={{backgroundColor: "white", padding: 10, flex: 1}}>
            <WebView
                source={{uri: "https://tienphong.vn/thoi-tiet-dem-noel-tren-ca-nuoc-ra-sao-post1497449.tpo"}}
            />
        </View>
    )
}
export default NotificationScreen;
