import {useEffect, useState} from "react";
import BeLanLoading from "../../components/BeLanLoading";
import {Image, Linking, ScrollView, Text, View} from "react-native";
import {connect} from "react-redux";
import {Button, Chip} from "react-native-paper";
import {appStyle} from "../../Style/appStyle";

const StudentShowScreen = (store) => {
    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [code, setCode] = useState("")
    const [email, setEmail] = useState("")
    const [facebook, setFacebook] = useState("")
    const [phone, setPhone] = useState("")
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [extras, setExtras] = useState([])
    const [parent, setParent] = useState("")
    const [status, setStatus] = useState("")
    const [attachment, setAttachment] = useState("")
    const id = store.route.params.id
    useEffect(() => {
        setTimeout(() => {
            console.log("make-data")
            const data =
                {
                    id: "1",
                    address: "Ninh Bình",
                    avatar: "https://vanhoaviet.net/wp-content/uploads/2020/07/hot-girl-anh-the-thanh-hang-02.jpg",
                    code: "HS001",
                    email: "hongnhung@gmail.com",
                    extras: [
                        {info: "Cao học", name: "Học vấn"},
                        {info: "IELTS 9.5", name: "Trình độ"},
                        {info: "Ca nhạc", name: "Sở thích"},
                    ],
                    facebook: "https://fb.me/linhcuenini",
                    name: "Nguyễn Thị Hồng Nhung",
                    phone: "0904800240",
                    status: "Đang học",
                    parent: "mẹ - Hồng Thanh"
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
            setParent(data.parent)
            setStatus(data.status)

            setAttachment(data.attachment)
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

                    {parent !== "" ?
                        <Chip icon={"account-child"} style={appStyle.listItem}>{parent}</Chip>
                        : null}
                    <Chip icon={"access-point"} style={appStyle.listItem}>{status}</Chip>
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

                        }}
                    >
                        Xem lớp đang học
                    </Button>
                    <Button
                        onPress={() => {

                        }}
                    >
                        Nhật ký học
                    </Button>
                    <Button
                        onPress={() => {
                            store.navigation.navigate("EditTeacherScreen", {id: id, name: "Hồng Nhung"})
                        }}
                    >
                        Chỉnh sửa thông tin
                    </Button>
                    <Button
                        onPress={() => {
                            store.navigation.navigate("DeleteScreen", {
                                id: id,
                                type: "student",
                                message: "Bạn có chắc chắn muốn xoá " + name + " ?"
                            })
                        }}
                    >
                        Xoá học sinh
                    </Button>
                </View>
            </View>
        )
}
export default connect(state => ({store: state}))(StudentShowScreen);
