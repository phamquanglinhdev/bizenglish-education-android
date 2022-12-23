import {useEffect, useState} from "react";
import BeLanLoading from "../../components/BeLanLoading";
import {Image, Linking, ScrollView, Text, View} from "react-native";
import {connect} from "react-redux";
import {Button, Chip} from "react-native-paper";
import {appStyle} from "../../Style/appStyle";

const CustomerShowScreen = (store) => {
    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [code, setCode] = useState("")
    const [email, setEmail] = useState("")
    const [facebook, setFacebook] = useState("")
    const [phone, setPhone] = useState("")
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [extras, setExtras] = useState([])
    const [file, setFile] = useState("")
    const [studentType, setStudentType] = useState("")
    const id = store.route.params.id
    useEffect(() => {
        setTimeout(() => {
            const data =
                {
                    id: "1",
                    address: "Ninh Bình",
                    avatar: "https://baosongngu.net/wp-content/uploads/2022/09/su-nghiep-tiktoker-phun-anh.jpg",
                    code: "KH001",
                    email: "ph.anh@gmail.com",
                    extras: [
                        {info: "Cao học", name: "Học vấn"},
                        {info: "IELTS 9.5", name: "Trình độ"},
                        {info: "Ca nhạc", name: "Sở thích"},
                    ],
                    facebook: "https://fb.me/linhcuenini",
                    name: "Phùng Anh",
                    phone: "09019999999",
                    studentType: "Tiềm năng",
                }
            setAvatar(data.avatar)
            setName(data.name)
            setCode(data.code)
            setEmail(data.email)
            setFacebook(data.facebook)
            setPhone(data.phone)
            setStudents(data.students)
            setLoading(false)
            setExtras(data.extras)
            setStudentType(data.studentType)
        }, 5)
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
                <ScrollView>
                    <Chip icon={"access-point"} style={appStyle.listItem}>{studentType}</Chip>
                    <Chip icon={"gmail"} style={appStyle.listItem}>{email}</Chip>
                    <Chip icon={"phone"} style={appStyle.listItem}>{phone}</Chip>
                    <Chip icon={"facebook"} style={appStyle.listItem}>{facebook}</Chip>
                    {extras.map((item, key) => (
                        <Chip icon={"subtitles"} key={key} style={appStyle.listItem}>{item.name}: {item.info}</Chip>
                    ))}
                </ScrollView>
                <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", width: "100%"}}>
                    <Button
                        onPress={() => {
                            store.navigation.navigate("EditClientScreen", {id: id, name: "Phùng Anh"})
                        }}
                    >
                        Chỉnh sửa thông tin
                    </Button>
                    <Button
                        onPress={() => {
                            store.navigation.navigate("DeleteScreen", {
                                id: id,
                                type: "customer",
                                message: "Bạn có chắc chắn muốn xoá " + name + " ?"
                            })
                        }}
                    >
                        Xoá khách hàng
                    </Button>
                </View>

                <Button onPress={() => {
                }}>Chuyển thành học sinh</Button>
            </View>
        )
}
export default connect(state => ({store: state}))(CustomerShowScreen);
