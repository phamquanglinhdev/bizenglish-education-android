import {Image, ImageBackground, Linking, ScrollView, View} from "react-native";
import {connect} from "react-redux";
import {appStyle} from "../../Style/appStyle";
import {Button, TextInput} from "react-native-paper";
import {useState} from "react";

const UserTab = (store) => {
    const [name, setName] = useState("Phạm Quang Linh")
    const [email, setEmail] = useState("Phamquanglinhdev@gmail.com")
    const [phone, setPhone] = useState("+84904800240")
    const [facebook, setFacebook] = useState("https://facebook.com/linhcuenini")
    const [extra, setExtra] = useState([])
    return (
        <ImageBackground style={appStyle.container} resizeMode={"cover"}
                         source={require("../../../assets/app-background.png")}>
            <Image
                style={appStyle.userAvatar}
                source={{uri: "https://phunugioi.com/wp-content/uploads/2020/10/anh-dai-dien-avt-anime-1.jpg"}}
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
