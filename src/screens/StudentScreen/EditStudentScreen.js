import {useCallback, useEffect, useState} from "react";
import BeLanLoading from "../../components/BeLanLoading";
import {Image, Modal, ScrollView, Text, View} from "react-native";
import {Button, Chip, RadioButton, TextInput} from "react-native-paper";
import {connect} from "react-redux";
import {appStyle} from "../../Style/appStyle";
import * as ImagePicker from "expo-image-picker";
import BeLanRepeatable from "../../components/BeLanRepeatable";
import {CommonActions} from "@react-navigation/native";
import WebView from "react-native-webview";

const EditStudentScreen = (store) => {
    const id = store.route.params.id
    const [uploadModal, setUploadModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [code, setCode] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [avatar, setAvatar] = useState("")
    const [facebook, setFacebook] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState()
    const [parent, setParent] = useState("")
    const [status, setStatus] = useState("")
    const [extras, setExtras] = useState([
        {name: "Học vấn", info: "Cao học"}
    ])
    const [file, setFile] = useState([])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            allowsEditing: false,
            aspect: [1, 1],
            quality: 1,
        })

        if (!result.canceled) {
            setAvatar("data:image/jpg;base64," + result.assets[0].base64)
        }
    };

    const getExtras = (childData) => {
        setExtras(childData)
    }
    const [showPassword, setShowPassword] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 5)
    })
    if (loading) return (<BeLanLoading/>)
    else
        return (<View style={[appStyle.container, {backgroundColor: "white"}]}>
            <ScrollView>
                {avatar !== "" ?
                    <Image
                        style={{
                            width: 150,
                            height: 150,
                            borderRadius: 150,
                            justifyContent: "center",
                            alignSelf: "center",
                            borderWidth: 5,
                            borderColor: "#01a1bd"
                        }}
                        source={{uri: avatar}}
                    ></Image>
                    :
                    null}
                <Button onPress={pickImage}>
                    Chọn Ảnh Đại Diện
                </Button>
                <TextInput
                    label={"Mã học sinh"}
                    mode={"outlined"}
                    style={appStyle.textInput}
                    value={code}
                    onChangeText={(r) => {
                        setCode(r)
                    }}
                />
                <TextInput
                    label={"Tên học sinh"}
                    mode={"outlined"}
                    style={appStyle.textInput}
                    value={name}
                    onChangeText={(r) => {
                        setName(r)
                    }}
                />
                <TextInput
                    label={"Người giám hộ"}
                    mode={"outlined"}
                    style={appStyle.textInput}
                    value={parent}
                    onChangeText={(r) => {
                        setParent(r)
                    }}
                />
                <TextInput
                    label={"Email học sinh"}
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
                    keyboardType={"numeric"}
                />
                <View style={{borderWidth: 1, marginVertical: 10, borderRadius: 5}}>
                    <RadioButton.Group onValueChange={value => setStatus(value)} value={status}>
                        <RadioButton.Item label="Đang học" value="0"/>
                        <RadioButton.Item label="Đã ngừng học" value="1"/>
                        <RadioButton.Item label="Đang bảo lưu" value="2"/>
                    </RadioButton.Group>
                </View>
                <BeLanRepeatable
                    parentCallback={getExtras}
                    data={extras}
                />
                {/*Modal*/}
                <Text>Văn bản:</Text>
                {file.map((item, key) => (
                    <Chip key={key} style={{marginBottom: 10}}
                          icon={"trash-can"}
                          onPress={() => {
                              SetAttachment(attachments.filter(a => a !== item))
                          }}
                    >{item}</Chip>
                ))}
                <Button
                    onPress={() => {
                        setUploadModal(true)
                    }}
                >
                    Tải thêm văn bản lên
                </Button>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={uploadModal}
                    onRequestClose={() => {
                        setUploadModal(false);
                    }}
                >
                    <View
                        style={{flex: 1, backgroundColor: "white"}}>
                        <View style={{paddingBottom: 50}}>
                            <Button
                                style={{
                                    position: 'absolute', right: -15
                                }}
                                icon={"close-circle"}
                                onPress={() => {
                                    setUploadModal(false)
                                }}

                            />
                        </View>
                        <WebView
                            onMessage={(event) => {
                                const data = event.nativeEvent.data
                                let temp = file
                                temp.push(data)
                                setFile(temp)
                                setUploadModal(!uploadModal)
                            }}
                            source={{uri: "https://bizenglish-edu.net/app/upload"}}
                        />
                    </View>
                </Modal>
                {/*Modal*/}
                <TextInput
                    label={"Link facebook"}
                    mode={"outlined"}
                    style={appStyle.textInput}
                    value={facebook}
                    onChangeText={(r) => {
                        setFacebook(r)
                    }}
                />
                <TextInput
                    label={"Địa chỉ"}
                    mode={"outlined"}
                    style={appStyle.textInput}
                    value={address}
                    onChangeText={(r) => {
                        setAddress(r)
                    }}
                />

                <TextInput
                    label={"Mật khẩu"}
                    mode={"outlined"}
                    style={appStyle.textInput}
                    value={password}
                    secureTextEntry={!showPassword}
                    onChangeText={(r) => {
                        setPassword(r)
                    }}
                    right={<TextInput.Icon onPress={() => {
                        setShowPassword(!showPassword)
                    }} icon="eye"/>}
                />
                <Button
                    style={{borderRadius: 5}}
                    mode={"contained"}
                    onPress={() => {
                        const student = {
                            id: id,
                            paren: parent,
                            status: status,
                            code: code,
                            avatar: avatar,
                            name: name,
                            file: file,
                            email: email,
                            phone: phone,
                            extras: extras,
                            facebook: facebook,
                            address: address,
                            password: password,
                        }
                        console.log(student)
                        // store.navigation.dispatch(CommonActions.reset({
                        //     index: 1, routes: [{name: "HomeScreen"},]
                        // }))
                    }}
                >
                    Tạo học sinh
                </Button>
            </ScrollView>
        </View>)
}
export default connect(state => ({store: state}))(EditStudentScreen);
