import {useEffect, useState} from "react";
import BeLanLoading from "../../components/BeLanLoading";
import {Image, Linking, Text, View} from "react-native";
import {connect} from "react-redux";
import {Button, Chip} from "react-native-paper";
import {appStyle} from "../../Style/appStyle";
import axios from "axios";

const StaffShowScreen = (store) => {
    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [code, setCode] = useState("")
    const [email, setEmail] = useState("")
    const [facebook, setFacebook] = useState("")
    const [job, setJob] = useState("")
    const [phone, setPhone] = useState("")
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const id = store.route.params.id
    useEffect(() => {
        axios.post(store.store.config.api + "staff/show", {id: id}, {
            headers: {
                Authorization: store.store.token
            }
        }).then((response) => {
            const data = response.data
            setAvatar(data.avatar)
            setName(data.name)
            setCode(data.code)
            setEmail(data.email)
            setFacebook(data.facebook)
            setJob(data.job)
            setPhone(data.phone)
            setStudents(data.students)
            setLoading(false)
        }).catch((error) => {
            console.log(error.toJSON())
            // console.log(id)
            store.navigation.goBack()
        })
    }, [1])

    if (loading) return (
        <BeLanLoading/>
    )
    else
        return (
            <View style={{flex: 1, backgroundColor: "white"}}>
                <View style={{padding: 10}}>
                    <Image
                        style={{width: 150, height: 150, alignSelf: "center", borderRadius: 150}}
                        source={{uri: avatar}}
                    />
                </View>
                <Text style={{
                    fontSize: 20,
                    alignSelf: "center",
                    fontWeight: "bold",
                    marginBottom: 10
                }}>{name}({code})</Text>
                <Chip icon={"gmail"} style={appStyle.listItem}>{email}</Chip>
                <Chip icon={"phone"} style={appStyle.listItem}>{phone}</Chip>
                {facebook != null ?
                    <Chip icon={"facebook"} style={appStyle.listItem}
                          onPress={() => {
                              Linking.openURL(facebook).then()
                          }}
                    >{facebook}</Chip> :
                    null
                }
                <Chip icon={"badge-account-horizontal"} style={appStyle.listItem}>{job}</Chip>
                <Chip icon={"account-multiple"} style={appStyle.listItem}>Số học sinh quản lý: {students.length}</Chip>
                <Button
                    onPress={() => {

                    }}
                >
                    Xem lớp quản lý
                </Button>
                <Button
                    onPress={() => {
                        store.navigation.navigate("EditStaffScreen", {id: id, name: name})
                    }}
                >
                    Chỉnh sửa thông tin
                </Button>
                <Button
                    onPress={() => {
                        store.navigation.navigate("DeleteScreen", {
                            id: id,
                            type: "staff",
                            message: "Bạn có chắc chắn muốn xoá " + name + " ?"
                        })
                    }}
                >
                    Xoá nhân viên
                </Button>
            </View>
        )
}
export default connect(state => ({store: state}))(StaffShowScreen);
