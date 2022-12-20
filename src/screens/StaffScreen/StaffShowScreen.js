import {useEffect, useState} from "react";
import BeLanLoading from "../../components/BeLanLoading";
import {Image, Text, View} from "react-native";
import {connect} from "react-redux";
import {Button, Chip} from "react-native-paper";
import {appStyle} from "../../Style/appStyle";

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
    const [id, setId] = useState("")
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
                    extras: [{info: "Cao học", name: "Học vấn"}],
                    facebook: "https://fb.me/linhcuenini",
                    job: "Developer",
                    name: "Phạm Quang Linh",
                    phone: "0904800240",
                    students: [{id: 1, name: "Phạm Hồng Hạnh"}, {id: 2, name: "Trần Thuỳ Trang"}]
                }
            setAvatar(data.avatar)
            setName(data.name)
            setCode(data.code)
            setEmail(data.email)
            setFacebook(data.facebook)
            setJob(data.job)
            setPhone(data.phone)
            setStudents(data.students)
            setLoading(false)
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
                <Chip icon={"gmail"} style={appStyle.listItem}>{email}</Chip>
                <Chip icon={"phone"} style={appStyle.listItem}>{phone}</Chip>
                <Chip icon={"facebook"} style={appStyle.listItem}>{facebook}</Chip>
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
                        store.navigation.navigate("EditStaffScreen", {id: id})
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
