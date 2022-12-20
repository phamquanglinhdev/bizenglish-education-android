import {Button, Switch} from 'react-native-paper';
import {useState} from "react";
import {View} from "react-native";
import {connect} from "react-redux";
import {CommonActions} from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const SettingTab = (store) => {
    const logout = async () => {
        await SecureStore.deleteItemAsync("token")
        store.route.navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    {name: "LoginScreen"},
                ]
            })
        )
    }
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    return (
        <View flex={1}>
            <Switch value={isSwitchOn} onValueChange={() => {
                setIsSwitchOn(!isSwitchOn)
            }}/>
            <Button
                onPress={logout}
            >Đăng xuất</Button>
        </View>
    )
}
export default connect(state => ({store: state}))(SettingTab);
