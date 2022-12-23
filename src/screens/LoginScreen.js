import {connect} from "react-redux";
import {Image, KeyboardAvoidingView, Platform, Text, View} from "react-native";
import {appStyle} from "../Style/appStyle";
import {Button, Snackbar, TextInput} from "react-native-paper";
import {useEffect, useState} from "react";
import setIndexTab from "../store/actions/setIndexTab";
import {CommonActions} from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import setToken from "../store/actions/setToken";
import BeLanLoading from "../components/BeLanLoading";
import setAuth from "../store/actions/setAuth";
import * as Notifications from "expo-notifications";
import SetExpo from "../store/actions/setExpo";

const LoginScreen = (store) => {
    const [visible, setVisible] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [notification, setNotification] = useState('')

    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
    }

    async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
            return result
        } else {
            return null
        }
    }

    const tryGetInfo = (token) => {
        axios.get(store.store.config.api + "user", {
            headers: {
                Authorization: token
            }
        }).then((response) => {
            Notifications.getExpoPushTokenAsync().then((expo) => {
                axios.post(store.store.config.api + "checkin", {
                    platform: Platform.OS,
                    token: expo.data,
                }, {
                    headers: {
                        Authorization: token
                    }
                }).then((back) => {
                }).catch((er) => {

                })
            });
            store.dispatch(setAuth(response.data))
            store.navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        {name: "HomeScreen"},
                    ]
                })
            )
        }).catch((error) => {

        })
    }
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            getValueFor("token").then((result) => {
                if (result !== null) {
                    store.dispatch(setToken(result))
                    tryGetInfo(result)
                } else {
                    setLoading(false)
                }
            })
        }, 5)
    }, [1])
    if (loading)
        return (
            <BeLanLoading/>
        )
    else
        return (
            <View style={[appStyle.container, appStyle.flexCenter]}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
                    <Image
                        source={require("../../assets/icon.png")}
                        style={[appStyle.loginLogo]}
                    />
                    <TextInput
                        label={"Email"}
                        style={appStyle.textInput}
                        mode={"outlined"}
                        value={email}
                        onChangeText={(r) => {
                            setEmail(r)
                        }}
                    />
                    <TextInput
                        label={"Mật khẩu"}
                        style={appStyle.textInput}
                        mode={"outlined"}
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(r) => {
                            setPassword(r)
                        }}
                    />
                    <Button
                        mode={"contained"}
                        buttonColor={"#01a1bd"}
                        onPress={() => {

                            setLoading(true)
                            store.dispatch(setIndexTab(0))
                            axios.post(store.store.config.api + "login", {
                                email: email,
                                password: password,
                            }).then((response) => {
                                store.dispatch(setToken(response.data.token))
                                save("token", response.data.token).then()
                                tryGetInfo(response.data.token)
                                setLoading(false)
                            }).catch((error) => {
                                switch (error.toJSON().status) {
                                    case 400:
                                        setNotification("Không có người dùng")
                                        setVisible(true)
                                        break
                                    case 401:
                                        setNotification("Sai mật khẩu")
                                        setVisible(true)
                                        break
                                }
                                setLoading(false)
                            })


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
                </KeyboardAvoidingView>
            </View>
        );
}
export default connect(state => ({store: state}))(LoginScreen);
