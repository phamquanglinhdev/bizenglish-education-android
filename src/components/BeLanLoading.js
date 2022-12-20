import {Image, View} from "react-native";

const BeLanLoading = () => {
    return (
        <View style={{flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center"}}>
            <Image
                source={{uri: "https://i.pinimg.com/originals/71/3a/32/713a3272124cc57ba9e9fb7f59e9ab3b.gif"}}
                style={{
                    width: 200,
                    height: 200,
                }}
            />
        </View>
    )
}
export default BeLanLoading;
