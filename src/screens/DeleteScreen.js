import {connect} from "react-redux";
import {Alert, Image, View} from "react-native";
import {appStyle} from "../Style/appStyle";
import {Button, Text} from "react-native-paper";
import {CommonActions} from "@react-navigation/native";
import axios from "axios";
import {useState} from "react";
import BeLanLoading from "../components/BeLanLoading";

const DeleteScreen = (store) => {
    const [loading, setLoading] = useState(false)
    const params = store.route.params;
    console.log(params)
    if (loading)
        return (
            <BeLanLoading/>
        )
    else
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <View>
                    <Image
                        style={{width: 200, height: 200, margin: 20}}
                        source={{uri: "https://www.thermbond.com/wp-content/uploads/2016/12/Thermbond-Icons-TRASH.gif"}}
                    />
                </View>
                <Text variant={"titleMedium"}>{params.message}</Text>
                <View style={{flexDirection: "row", paddingTop: 12, justifyContent: "space-between", width: "75%"}}>
                    <Button
                        onPress={() => {
                            store.navigation.goBack()
                        }}
                        mode={"contained"} style={{borderRadius: 5, width: "45%"}} buttonColor={"gray"}>Trở về</Button>
                    <Button
                        onPress={() => {
                            setLoading(true)
                            axios.post(store.store.config.api + params.type + "/destroy", {id: params.id}, {
                                headers: {
                                    Authorization: store.store.token
                                }
                            }).then((response) => {
                                console.log(response.data)
                                store.navigation.dispatch(CommonActions.reset({
                                    index: 1, routes: [{name: "HomeScreen"},]
                                }))
                            }).catch((error) => {
                                console.log(error)
                                setLoading(false)
                                Alert.alert("Không thể xoá","Đã xảy ra lỗi")
                            })

                        }}
                        mode={"contained"} style={{borderRadius: 5, width: "45%"}} buttonColor={"red"}>Xác nhận</Button>
                </View>
            </View>
        )
}
export default connect(state => ({store: state}))(DeleteScreen);
