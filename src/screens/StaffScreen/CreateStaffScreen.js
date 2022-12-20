import {useCallback, useEffect, useState} from "react";
import BeLanLoading from "../../components/BeLanLoading";
import {Image, ScrollView, View} from "react-native";
import {Button, TextInput} from "react-native-paper";
import {connect} from "react-redux";
import {appStyle} from "../../Style/appStyle";
import * as ImagePicker from "expo-image-picker";
import BeLanSelect2 from "../../components/BeLanSelect2";
import BeLanRepeatable from "../../components/BeLanRepeatable";
import {CommonActions} from "@react-navigation/native";

const CreateStaffScreen = (store) => {
    const [loading, setLoading] = useState(true)
    const [code, setCode] = useState("")
    const [name, setName] = useState("")
    const [job, setJob] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [avatar, setAvatar] = useState("")
    const [facebook, setFacebook] = useState("")
    const [address, setAddress] = useState("")
    const [students, setStudents] = useState([])
    const [password, setPassword] = useState()
    const [studentData, setStudentData] = useState([
        {
            id: 1,
            name: "Phạm Hồng Hạnh"
        },
        {
            id: 2,
            name: "Trần Thuỳ Trang"
        },
        {
            id: 3,
            name: "Lê Xuân Văn"
        },
        {
            id: 4,
            name: "Triệu Thị Ngọc"
        },
    ])
    const [extras, setExtras] = useState([])
    const [extrasData, setExtraData] = useState([
        {name: "Học vấn", info: "Cao học"}
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
    const getStudent = (childData) => {
        setStudents(childData)
    }
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
                    label={"Mã nhân viên"}
                    mode={"outlined"}
                    style={appStyle.textInput}
                    value={code}
                    onChangeText={(r) => {
                        setCode(r)
                    }}
                />
                <TextInput
                    label={"Tên nhân viên"}
                    mode={"outlined"}
                    style={appStyle.textInput}
                    value={name}
                    onChangeText={(r) => {
                        setName(r)
                    }}
                />
                <TextInput
                    label={"Chức vụ"}
                    mode={"outlined"}
                    style={appStyle.textInput}
                    value={job}
                    onChangeText={(r) => {
                        setJob(r)
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
                {/*<TextInput*/}
                {/*    label={"Avatar"}*/}
                {/*    mode={"outlined"}*/}
                {/*    style={appStyle.textInput}*/}
                {/*    value={avatar}*/}
                {/*    onChangeText={(r) => {*/}
                {/*        setAvatar(r)*/}
                {/*    }}*/}
                {/*/>*/}
                <BeLanRepeatable
                    parentCallback={getExtras}
                    data={extrasData}
                />
                <TextInput
                    label={"Link facebook"}
                    mode={"outlined"}
                    style={appStyle.textInput}
                    value={facebook}
                    onChangeText={(r) => {
                        setFacebook(r)
                    }}
                />
                <BeLanSelect2 parentCallback={getStudent} data={studentData}/>
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
                        const staff = {
                            code: code,
                            avatar:avatar,
                            name: name,
                            job: job,
                            email: email,
                            phone: phone,
                            extras: extras,
                            facebook: facebook,
                            students: students,
                            address: address,
                            password: password,
                        }
                        console.log(staff)
                        store.navigation.dispatch(CommonActions.reset({
                            index: 1, routes: [{name: "HomeScreen"},]
                        }))
                    }}
                >
                    Tạo nhân viên
                </Button>
            </ScrollView>
        </View>)
}
export default connect(state => ({store: state}))(CreateStaffScreen);
