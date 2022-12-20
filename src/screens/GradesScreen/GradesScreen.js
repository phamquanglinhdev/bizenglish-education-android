import {ScrollView, Text, View} from "react-native";
import {Button, DataTable} from "react-native-paper";
import {connect} from "react-redux";
import {appStyle} from "../../Style/appStyle";
import {useEffect, useState} from "react";
import BeLanLoading from "../../components/BeLanLoading";

const GradesScreen = (store) => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16];
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
            <View>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Button
                        mode={""}
                        style={{borderRadius: 0}}
                        icon={"card-plus"}
                        onPress={() => {
                            store.navigation.navigate("CreateGradeScreen")
                        }}
                    >Tạo lớp học mới</Button>
                    <Button
                        mode={""}
                        style={{borderRadius: 0}}
                        icon={"filter"}
                    >Bộ lọc</Button>
                </View>
                <ScrollView horizontal={true}>
                    <View style={{paddingBottom: 50}}>
                        <View style={{flexDirection: "row", backgroundColor: "white"}}>
                            <View style={[appStyle.cell, {width: 100}]}><Text
                                style={appStyle.tHead}>Tên
                                lớp</Text></View>
                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tHead}>Học
                                viên</Text></View>
                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tHead}>Giáo
                                viên</Text></View>
                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tHead}>Nhân viên quản
                                lý</Text></View>
                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tHead}>Đối
                                tác</Text></View>
                            <View style={[appStyle.cell, {width: 100}]}><Text style={appStyle.tHead}>Link
                                lớp</Text></View>
                            <View style={[appStyle.cell, {width: 150}]}><Text style={appStyle.tHead}>Gói học
                                phí</Text></View>
                            <View style={[appStyle.cell, {width: 150}]}><Text style={appStyle.tHead}>Số
                                phút</Text></View>
                            <View style={[appStyle.cell, {width: 150}]}><Text style={appStyle.tHead}>Số phút còn
                                lại</Text></View>
                            <View style={[appStyle.cell, {width: 100}]}><Text style={appStyle.tHead}>Tài
                                liệu</Text></View>
                            <View style={[appStyle.cell, {width: 150}]}><Text style={appStyle.tHead}>Trạng
                                thái</Text></View>
                            <View style={[appStyle.cell, {width: 150}]}><Text style={appStyle.tHead}>Ngày tạo
                                lớp</Text></View>
                            <View style={[appStyle.cell, {width: 180}]}><Text style={appStyle.tHead}>Hoạt
                                động</Text></View>
                        </View>
                        <ScrollView>
                            <View>
                                {data.map((item, key) => {
                                    return (
                                        <View key={item}
                                              style={{
                                                  flexDirection: "row",
                                                  backgroundColor: key % 2 === 1 ? "rgba(255,255,255,0.21)" : "white"
                                              }}>
                                            <View style={[appStyle.cell, {width: 100}]}>
                                                <Button
                                                    style={{width: 100}}
                                                    onPress={() => {
                                                        store.navigation.navigate("GradeShowScreen", {
                                                            id: key,
                                                            name: "C00" + item
                                                        })
                                                    }}
                                                >C00{item}</Button>
                                            </View>
                                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tBody}>Phạm
                                                Quang
                                                Linh,
                                                Nguyễn Minh Hải</Text></View>
                                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tBody}>Võ
                                                Thị
                                                Mỹ
                                                Linh, Võ
                                                Nhật Hoàng</Text></View>
                                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tBody}>Trần
                                                Phương
                                                Minh,
                                                Phạm Quang Hùng</Text></View>
                                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tBody}>Ngọc
                                                Bích</Text></View>
                                            <View style={[appStyle.cell, {width: 100}]}>
                                                <Button>Mở</Button>
                                            </View>
                                            <View style={[appStyle.cell, {width: 150}]}><Text
                                                style={appStyle.tBody}>1.900.000</Text></View>
                                            <View style={[appStyle.cell, {width: 150}]}><Text
                                                style={appStyle.tBody}>6000</Text></View>
                                            <View style={[appStyle.cell, {width: 150}]}><Text
                                                style={appStyle.tBody}>5400</Text></View>
                                            <View style={[appStyle.cell, {width: 100}]}>
                                                <Button>Mở</Button>
                                            </View>
                                            <View style={[appStyle.cell, {width: 150}]}><Text style={appStyle.tBody}>Đang
                                                học</Text></View>
                                            <View style={[appStyle.cell, {width: 150}]}><Text style={appStyle.tBody}>24-9-2022
                                                19:00:15</Text></View>
                                            <View style={[appStyle.cell, {width: 180}]}>
                                                <View style={{flexDirection: "row"}}>
                                                    <Button icon={"pencil"}
                                                            onPress={() => {
                                                                store.navigation.navigate("EditGradeScreen", {
                                                                    id: key,
                                                                    name: "C00" + item
                                                                })
                                                            }}
                                                    >Sửa</Button>
                                                    <Button icon={"trash-can"}
                                                            onPress={() => {
                                                                store.navigation.navigate("DeleteScreen", {
                                                                    id: key,
                                                                    name: "C00" + item,
                                                                    type: "grade",
                                                                    message: "Bạn có chắc chắn muốn xoá lớp học?"
                                                                })
                                                            }}
                                                    >Xoá</Button>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        )
}
export default connect(state => ({store: state}))(GradesScreen);
