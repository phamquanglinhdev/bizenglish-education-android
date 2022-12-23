import {Image, StatusBar, Text, View} from "react-native";
import {appStyle} from "../Style/appStyle";
import {connect} from "react-redux";
import {Button} from "react-native-paper";
import {CommonActions} from "@react-navigation/native";

const SuccessScreen = (store) => {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <StatusBar/>
            <Image
                source={require("../../assets/success.png")}
                style={{width: 200, height: 200}}
            />
            <Text style={{padding: 5, fontSize: 25, marginTop: 20}}>Thành công</Text>
            <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                <Button icon={"home"}
                        onPress={() => {
                            store.navigation.dispatch(CommonActions.reset({
                                index: 1, routes: [{name: "LoginScreen"},]
                            }))
                        }}
                >Quay về trang chủ</Button>
            </View>
        </View>
    )
}
export default connect(state => ({store: state}))(SuccessScreen);
