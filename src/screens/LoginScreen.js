import {connect} from "react-redux";
import {Image, Text, View} from "react-native";
import {appStyle} from "../Style/appStyle";
import {Button, Snackbar, TextInput} from "react-native-paper";
import {useState} from "react";
import setIndexTab from "../store/actions/setIndexTab";
import {CommonActions} from "@react-navigation/native";

const LoginScreen = (store) => {
    const [visible, setVisible] = useState(false)
    const [notification, setNotification] = useState('')
    return (<View style={[appStyle.container, appStyle.flexCenter]}>
        <Image
            source={require("../../assets/icon.png")}
            style={[appStyle.loginLogo]}
        />
        <TextInput
            label={"Email"}
            style={appStyle.textInput}
            mode={"outlined"}
        />
        <TextInput
            label={"Mật khẩu"}
            style={appStyle.textInput}
            mode={"outlined"}
        />
        <Button
            mode={"contained"}
            buttonColor={"#01a1bd"}
            onPress={() => {
                setNotification("Đã đăng nhập")
                setVisible(true)
                store.dispatch(setIndexTab(0))
                // store.navigation.navigate("HomeScreen")
                store.navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            {name: "HomeScreen"},
                        ]
                    })
                )
            }}
            style={{
                borderRadius: 0
            }}
        >Đăng nhập</Button>
        <Snackbar
            style={{width: "100%", backgroundColor: "white"}}
            visible={visible}
            onDismiss={() => {
                setVisible(false)
            }}
            action={{
                label: 'OK', onPress: () => {
                    setVisible(false)
                },
            }}>
            <Text>{notification}</Text>
        </Snackbar>
    </View>);
}
export default connect(state => ({store: state}))(LoginScreen);
