import {connect} from "react-redux";
import {Image, Text, View} from "react-native";
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
            console.log("token:" + store.store.token)
            console.log(error)
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
        return (<View style={[appStyle.container, appStyle.flexCenter]}>
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
                    console.log(email)
                    console.log(password)
                    setLoading(true)
                    store.dispatch(setIndexTab(0))
                    axios.post(store.store.config.api + "login", {
                        email: email,
                        password: password,
                    }).then((response) => {
                        console.log(response.data)
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
        </View>);
}
export default connect(state => ({store: state}))(LoginScreen);
