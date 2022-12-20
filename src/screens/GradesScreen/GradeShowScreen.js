import {Image, View} from "react-native";
import {connect} from "react-redux";
import {Button, Chip, Drawer} from 'react-native-paper';
import {useEffect, useState} from "react";
import {appStyle} from "../../Style/appStyle";
import BeLanLoading from "../../components/BeLanLoading";

const GradeShowScreen = (store) => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 5)
    }, [1])
    if (loading)
        return (
            <BeLanLoading/>
        )
    else
        return (
            <View style={appStyle.container}>
                <Chip icon={"google-classroom"} style={appStyle.listItem}>Lớp C001</Chip>
                <Chip icon={"account-tie-voice"} style={appStyle.listItem}>GV: Trần Thị Cẩm Bình, Vũ Phương Oanh</Chip>
                <Chip icon={"ticket-account"} style={appStyle.listItem}>HS: Vinh-Hà</Chip>
                <Chip icon={"book-clock"} style={appStyle.listItem}>Số phút : 6500 Phút</Chip>
                <Chip icon={"archive-clock"} style={appStyle.listItem}>Số phút còn lại: 5400 Phút</Chip>
                <Chip icon={"account-cash"} style={appStyle.listItem}>Gói học phí: 1.200.000 đ</Chip>
                <Chip onPress={() => {
                }} icon={"file-document-multiple"} style={appStyle.listItem}>Tài liệu</Chip>
                <Chip icon={"list-status"} style={appStyle.listItem}>Trạng thái: Đang học</Chip>
                <Chip icon={"calendar-today"} style={appStyle.listItem}>Ngày tạo lớp: 25-12-2022 19:00 AM</Chip>
                <View style={{flexDirection: "row"}}>
                    <Button
                        onPress={() => {

                        }}
                    >Xem nhật ký</Button>
                    <Button
                        onPress={() => {
                            store.navigation.navigate("EditGradeScreen", {id: 1, name: "C001"})
                        }}
                    >Chỉnh sửa lớp học</Button>
                    <Button
                        onPress={() => {
                            store.navigation.navigate("DeleteScreen", {
                                id: 1,
                                type: "grade",
                                message: "Bạn có chắc chắn muốn xoá lớp học ?"
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
