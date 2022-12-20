import {Linking, ScrollView, Text, View} from "react-native";
import {Button, DataTable} from "react-native-paper";
import {connect} from "react-redux";
import {appStyle} from "../../Style/appStyle";
import {useEffect, useState} from "react";
import BeLanLoading from "../../components/BeLanLoading";
import axios from "axios";

const GradesScreen = (store) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        console.log("Hi")
        axios.post(store.store.config.api + "grades", {}, {
            headers: {
                Authorization: store.store.token
            }
        }).then((response) => {
            setData(response.data)
            setLoading(false)
        }).catch((error) => {
            console.log(error.toJSON())
            setLoading(false)
        })
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
                                        <View key={key}
                                              style={{
                                                  flexDirection: "row",
                                                  backgroundColor: key % 2 === 1 ? "rgba(255,255,255,0.21)" : "white"
                                              }}>
                                            <View style={[appStyle.cell, {width: 100}]}>
                                                <Button
                                                    style={{width: 100}}
                                                    onPress={() => {
                                                        store.navigation.navigate("GradeShowScreen", {
                                                            id: item.id,
                                                            name: item.name
                                                        })
                                                    }}
                                                >{item.name}</Button>
                                            </View>
                                            <View style={[appStyle.cell, {width: 300}]}>
                                                {item.students.map((student) => (
                                                    <Text key={student.id} style={appStyle.tBody}>{student.name}</Text>
                                                ))}
                                            </View>
                                            <View style={[appStyle.cell, {width: 300}]}>
                                                {item.teachers.map((teacher) => (
                                                    <Text key={teacher.id} style={appStyle.tBody}>{teacher.name}</Text>
                                                ))}
                                            </View>
                                            <View style={[appStyle.cell, {width: 300}]}>
                                                {item.staffs.map((staff) => (
                                                    <Text key={staff.id} style={appStyle.tBody}>{staff.name}</Text>
                                                ))}
                                            </View>
                                            <View style={[appStyle.cell, {width: 300}]}>
                                                {item.clients.map((client) => (
                                                    <Text key={client.id} style={appStyle.tBody}>{client.name}</Text>
                                                ))}
                                            </View>
                                            <View style={[appStyle.cell, {width: 100}]}>
                                                <Button
                                                    onPesss={() => {
                                                        Linking.openURL(item.zoom).then()
                                                    }}
                                                >Mở</Button>
                                            </View>
                                            <View style={[appStyle.cell, {width: 150}]}><Text
                                                style={appStyle.tBody}>{item.pricing}</Text></View>
                                            <View style={[appStyle.cell, {width: 150}]}><Text
                                                style={appStyle.tBody}>{item.minutes}</Text></View>
                                            <View style={[appStyle.cell, {width: 150}]}><Text
                                                style={appStyle.tBody}>{item.remaining}</Text></View>
                                            <View style={[appStyle.cell, {width: 100}]}>
                                                <Button
                                                    onPesss={() => {
                                                        Linking.openURL(item.attachment).then()
                                                    }}
                                                >Mở</Button>
                                            </View>
                                            <View style={[appStyle.cell, {width: 150}]}><Text
                                                style={appStyle.tBody}>{item.status}</Text></View>
                                            <View style={[appStyle.cell, {width: 150}]}><Text
                                                style={appStyle.tBody}>{item.created}</Text></View>
                                            <View style={[appStyle.cell, {width: 180}]}>
                                                <View style={{flexDirection: "row"}}>
                                                    <Button icon={"pencil"}
                                                            onPress={() => {
                                                                store.navigation.navigate("EditGradeScreen", {
                                                                    id: item.id,
                                                                    name: item.name
                                                                })
                                                            }}
                                                    >Sửa</Button>
                                                    <Button icon={"trash-can"}
                                                            onPress={() => {
                                                                store.navigation.navigate("DeleteScreen", {
                                                                    id: item.id,
                                                                    name: item.name,
                                                                    type: "grade",
                                                                    message: "Bạn có chắc chắn muốn xoá lớp " + item.name + " c?"
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
