import {useEffect, useState} from "react";
import BeLanLoading from "../../components/BeLanLoading";
import {Image, Linking, ScrollView, Text, View} from "react-native";
import {connect} from "react-redux";
import {Button, Chip} from "react-native-paper";
import {appStyle} from "../../Style/appStyle";

const TeacherShowScreen = (store) => {
    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [code, setCode] = useState("")
    const [email, setEmail] = useState("")
    const [facebook, setFacebook] = useState("")
    const [phone, setPhone] = useState("")
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [extras, setExtras] = useState([])
    const [tags, setTags] = useState([])
    const [video, setVideo] = useState("")
    const [attachment, setAttachment] = useState("")
    const id = store.route.params.id
    useEffect(() => {
        setTimeout(() => {
            console.log("make-data")
            const data =
                {
                    id: "1",
                    address: "Ninh Bình",
                    avatar: "https://mega.com.vn/media/news/0406_anh-gai-xinh-104.jpg",
                    code: "NV01",
                    email: "phamquanglinhdev@gmail.com",
                    extras: [
                        {info: "Cao học", name: "Học vấn"},
                        {info: "IELTS 9.5", name: "Trình độ"},
                        {info: "Ca nhạc", name: "Sở thích"},
                    ],
                    tags: [
                        {id: 1, name: "Trẻ từ 10-15 tuổi"},
                        {id: 2, name: "IELTS, TOEIC cơ bản"},
                        {id: 2, name: "Trẻ từ 3-8 tuổi"},
                    ],
                    facebook: "https://fb.me/linhcuenini",
                    name: "Phạm Quang Linh",
                    phone: "0904800240",
                    students: [{id: 1, name: "Phạm Hồng Hạnh"}, {id: 2, name: "Trần Thuỳ Trang"}],
                    video: "https://www.youtube.com/watch?v=fkO2Shm_mUU",
                    attachment: "https://drive.google.com/drive/folders/1fPsmWJbe-BVuHaf0E1NxfloE17NBN5P3?usp=sharing"
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
            setTags(data.tags)
            setVideo(data.video)
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
                <View style={{flexDirection: "row", padding: 10, justifyContent: "space-around"}}>
                    <Button onPress={() => {
                        Linking.openURL(video).then()
                    }} icon={"youtube"} mode={"contained"} buttonColor={"red"}>Xem</Button>
                    <Button
                        onPress={() => {
                            Linking.openURL(attachment).then()
                        }}
                        icon={"google-drive"} mode={"contained"} buttonColor={"green"}>Xem</Button>
                </View>
                <ScrollView>
                    <Chip icon={"gmail"} style={appStyle.listItem}>{email}</Chip>
                    <Chip icon={"phone"} style={appStyle.listItem}>{phone}</Chip>
                    <Chip icon={"facebook"} style={appStyle.listItem}>{facebook}</Chip>
                    <Chip icon={"account-multiple"} style={[appStyle.listItem]}>Số học sinh quản
                        lý: {students.length}</Chip>

                    {tags.map((item, key) => <Chip icon={"tag"} style={[appStyle.listItem]}>{item.name}</Chip>)}

                    {extras.map((item, key) => (
                        <Chip icon={"subtitles"} key={key} style={appStyle.listItem}>{item.name}: {item.info}</Chip>
                    ))}
                </ScrollView>
                <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", width: "100%"}}>
                    <Button
                        onPress={() => {

                        }}
                    >
                        Xem lớp quản lý
                    </Button>
                    <Button
                        onPress={() => {

                        }}
                    >
                        Nhật ký dạy
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
                                type: "teacher",
                                message: "Bạn có chắc chắn muốn xoá " + name + " ?"
                            })
                        }}
                    >
                        Xoá nhân viên
                    </Button>
                </View>
            </View>
        )
}
export default connect(state => ({store: state}))(TeacherShowScreen);
