import {Image, ImageBackground, Linking, ScrollView, View} from "react-native";
import {connect} from "react-redux";
import {appStyle} from "../../Style/appStyle";
import {Button, TextInput} from "react-native-paper";
import {useState} from "react";

const UserTab = (store) => {
    const user = store.store.auth
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    const [facebook, setFacebook] = useState(user.facebook)
    const [extra, setExtra] = useState(user.extra)
    return (
        <ImageBackground style={appStyle.container} resizeMode={"cover"}
                         source={require("../../../assets/app-background.png")}>
            <Image
                style={appStyle.userAvatar}
                source={{uri: user.avatar}}
            />
            <View style={[appStyle.materialContent, {marginTop: 150, paddingTop: 80, padding: 10}]}>
                <ScrollView>
                    <TextInput
                        label={"Họ và tên"}
                        mode={"outlined"}
                        style={appStyle.textInput}
                        value={name}
                        onChangeText={(r) => {
                            setName(r)
                        }}
                    />
                    <TextInput
                        label={"Email"}
                        mode={"outlined"}
                        style={appStyle.textInput}
                        value={email}
                        onChangeText={(r) => {
                            setEmail(r)
                        }}
                    />
                    <TextInput
                        label={"Số điện thoại"}
                        mode={"outlined"}
                        style={appStyle.textInput}
                        value={phone}
                        onChangeText={(r) => {
                            setPhone(r)
                        }}
                    />
                    <TextInput
                        label={"Link Facebook"}
                        mode={"outlined"}
                        style={appStyle.textInput}
                        value={facebook}
                        onChangeText={(r) => {
                            setFacebook(r)
                        }}
                        right={<TextInput.Icon icon="facebook" onPress={() => {
                            Linking.openURL(facebook).then()
                        }}/>}
                    />
                    <Button
                        mode={"contained"}
                        style={{borderRadius: 0}}
                    >Cập nhật</Button>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}
export default connect(state => ({store: state}))(UserTab);
