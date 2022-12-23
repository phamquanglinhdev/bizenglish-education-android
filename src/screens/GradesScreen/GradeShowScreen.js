import {Image, View, Text, Linking, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {Button, Chip, Drawer} from 'react-native-paper';
import {useEffect, useState} from "react";
import {appStyle} from "../../Style/appStyle";
import BeLanLoading from "../../components/BeLanLoading";
import axios from "axios";

const GradeShowScreen = (store) => {
    const [name, setName] = useState("")
    const [students, setStudents] = useState([])
    const [teachers, setTeachers] = useState([])
    const [minutes, setMinutes] = useState([])
    const [remaining, setRemaining] = useState([])
    const [pricing, setPricing] = useState("")
    const [attachment, setAttachment] = useState("")
    const [status, setStatus] = useState("")
    const [create, setCreate] = useState("")
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.post(store.store.config.api + "grade/show", {id: store.route.params.id}, {
            headers: {
                Authorization: store.store.token
            }
        }).then((response) => {
            console.log(response.data)
            setName(response.data.name)
            setLoading(false)
            setTeachers(response.data.teachers)
            setStudents(response.data.students)
            setMinutes(response.data.minutes)
            setRemaining(response.data.remaining)
            setPricing(response.data.pricing)
            setAttachment(response.data.attachment)
            setStatus(response.data.status)
            setCreate(response.data.created)
        }).catch((error) => {
            console.log(error)
            store.navigation.goBack()
        })
    }, [1])
    if (loading)
        return (
            <BeLanLoading/>
        )
    else
        return (
            <View style={appStyle.container}>
                <Chip icon={"google-classroom"} style={appStyle.listItem}>Lớp {name}</Chip>
                <Chip icon={"account-tie-voice"} style={appStyle.listItem}>GV: {teachers.map((item, key) =>
                    (item.name
                        // <TouchableOpacity key={key}>
                        //     <Text>{item.name}</Text>
                        // </TouchableOpacity>
                    )
                )}</Chip>
                <Chip icon={"ticket-account"} style={appStyle.listItem}>HS: {students.map((item, key) =>
                    item.name
                )}</Chip>
                <Chip icon={"book-clock"} style={appStyle.listItem}>Số phút : {minutes} Phút</Chip>
                <Chip icon={"archive-clock"} style={appStyle.listItem}>Số phút còn lại: {remaining} Phút</Chip>
                <Chip icon={"account-cash"} style={appStyle.listItem}>Gói học phí: {pricing} đ</Chip>
                {attachment !== null ?
                    <Chip onPress={() => {
                        Linking.openURL(attachment).then()
                    }} icon={"file-document-multiple"} style={appStyle.listItem}>Tài liệu</Chip>
                    : null}
                <Chip icon={"list-status"} style={appStyle.listItem}>Trạng thái: {status}</Chip>
                <Chip icon={"calendar-today"} style={appStyle.listItem}>Ngày tạo lớp: {create}</Chip>
                <View style={{flexDirection: "row"}}>
                    <Button
                        onPress={() => {

                        }}
                    >Xem nhật ký</Button>
                    <Button
                        onPress={() => {
                            store.navigation.navigate("EditGradeScreen", {
                                id: store.route.params.id,
                                name: name
                            })
                        }}
                    >Chỉnh sửa lớp học</Button>
                    <Button
                        onPress={() => {
                            store.navigation.navigate("DeleteScreen", {
                                id: store.route.params.id,
                                type: "grade",
                                message: "Bạn có chắc chắn muốn xoá lớp " + name + " ?"
                            })
                        }}
                    >Xoá lớp học</Button>
                </View>
                <Image
                    style={{
                        width: 150,
                        height: 150,
                        alignSelf: "center"
                    }}
                    source={{uri: "https://images.viblo.asia/a87852d0-d60c-4a7c-ae42-0bfb6679ecb3.gif"}}
                >

                </Image>
            </View>
        )
}
export default connect(state => ({store: state}))(GradeShowScreen);
