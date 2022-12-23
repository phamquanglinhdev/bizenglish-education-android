import {useCallback, useEffect, useState} from "react";
import BeLanLoading from "../../components/BeLanLoading";
import {Image, Modal, ScrollView, Text, View} from "react-native";
import {Button, Chip, TextInput} from "react-native-paper";
import {connect} from "react-redux";
import {appStyle} from "../../Style/appStyle";
import * as ImagePicker from "expo-image-picker";
import BeLanSelect2 from "../../components/BeLanSelect2";
import BeLanRepeatable from "../../components/BeLanRepeatable";
import {CommonActions} from "@react-navigation/native";
import WebView from "react-native-webview";

const EditTeacherScreen = (store) => {
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
    const [students, setStudents] = useState([])
    const [password, setPassword] = useState()
    const [extras, setExtras] = useState([
        {name: "Học vấn", info: "Cao học"}
    ])
    const [video, setVideo] = useState("")
    const [cv, setCV] = useState("")
    const [tag, setTag] = useState([])
    const [file, setFile] = useState([])
    const [tagData, setTagData] = useState([
        {
            id: 1,
            name: "Trẻ em 5-10 tuổi"
        },
        {
            id: 2,
            name: "Trẻ em 8-11 tuổi"
        },
        {
            id: 3,
            name: "Starter,Mover"
        },
        {
            id: 4,
            name: "IELTS"
        },
    ])
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
    const getTag = (childData) => {
        setTag(childData)
    }
    const getExtras = (childData) => {
        setExtras(childData)
    }
    const getFile = (childData) => {
        setFile(childData)
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
                    label={"Mã giáo viên"}
                    mode={"outlined"}
                    style={appStyle.textInput}
                    value={code}
                    onChangeText={(r) => {
                        setCode(r)
                    }}
                />
                <TextInput
                    label={"Tên giáo viên"}
                    mode={"outlined"}
                    style={appStyle.textInput}
                    value={name}
                    onChangeText={(r) => {
                        setName(r)
                    }}
                />

                <TextInput
                    label={"Email nhân viên"}
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
                    label={"Link video"}
                    mode={"outlined"}
                    style={appStyle.textInput}
                    value={video}
                    onChangeText={(r) => {
                        setVideo(r)
                    }}
                />
                <TextInput
                    label={"Link hồ sơ"}
                    mode={"outlined"}
                    style={appStyle.textInput}
                    value={cv}
                    onChangeText={(r) => {
                        setCV(r)
                    }}
                />
                <BeLanSelect2 choose={tag} data={tagData} parentCallback={getTag} label={"Tag:"}/>
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
                        const staff = {
                            id: id,
                            code: code,
                            avatar: avatar,
                            name: name,
                            cv: cv,
                            video: video,
                            file: file,
                            email: email,
                            phone: phone,
                            extras: extras,
                            facebook: facebook,
                            students: students,
                            address: address,
                            password: password,
                            tag: tag,
                        }
                        console.log(staff)
                        // store.navigation.dispatch(CommonActions.reset({
                        //     index: 1, routes: [{name: "HomeScreen"},]
                        // }))
                    }}
                >
                    Tạo nhân viên
                </Button>
            </ScrollView>
        </View>)
}
export default connect(state => ({store: state}))(EditTeacherScreen);
