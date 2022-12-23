import {Image, ScrollView, Text, View} from "react-native";
import {useEffect, useState} from "react";
import BeLanLoading from "../../components/BeLanLoading";
import {connect} from "react-redux";
import {Button} from "react-native-paper";
import {appStyle} from "../../Style/appStyle";

const StudentsScreen = (store) => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13]
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            console.log("data")
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
                            store.navigation.navigate("CreateTeacherScreen")
                        }}
                    >Tạo học sinh</Button>
                    <Button
                        mode={""}
                        style={{borderRadius: 0}}
                        icon={"filter"}
                    >Bộ lọc</Button>
                </View>
                <ScrollView horizontal={true}>
                    <View style={{paddingBottom: 50}}>
                        <View style={{flexDirection: "row", backgroundColor: "white"}}>
                            <View style={[appStyle.cell, {width: 120}]}><Text
                                style={appStyle.tHead}>Mã học sinh</Text></View>
                            <View style={[appStyle.cell, {width: 200}]}><Text style={appStyle.tHead}>Tên học sinh</Text></View>
                            <View style={[appStyle.cell, {width: 150}]}><Text style={appStyle.tHead}>Nhân viên quản
                                lý</Text></View>
                            <View style={[appStyle.cell, {width: 150}]}><Text style={appStyle.tHead}>Người giám
                                hộ</Text></View>
                            <View style={[appStyle.cell, {width: 80}]}><Text style={appStyle.tHead}>Avatar</Text></View>
                            <View style={[appStyle.cell, {width: 180}]}><Text style={appStyle.tHead}>Email của học
                                sinh</Text></View>
                            <View style={[appStyle.cell, {width: 200}]}><Text style={appStyle.tHead}>Số điện
                                thoại</Text></View>
                            <View style={[appStyle.cell, {width: 150}]}><Text style={appStyle.tHead}>Tình
                                trạng</Text></View>
                            <View style={[appStyle.cell, {width: 120}]}><Text style={appStyle.tHead}>Lớp</Text></View>
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
                                            <View style={[appStyle.cell, {width: 120}]}><Text
                                                style={appStyle.tBody}>HS001</Text></View>
                                            <View style={[appStyle.cell, {width: 200}]}>
                                                <Button onPress={() => {
                                                    store.navigation.navigate("StudentShowScreen", {
                                                        id: key,
                                                        name: "Nguyễn Thị Hồng Nhung"
                                                    })
                                                }}>
                                                    Nguyễn Thị Hồng Nhung
                                                </Button>
                                            </View>
                                            <View style={[appStyle.cell, {width: 150}]}><Text style={appStyle.tBody}>Phạm
                                                Quang Linh</Text></View>
                                            <View style={[appStyle.cell, {width: 150}]}><Text style={appStyle.tBody}>(mẹ)
                                                Hồng Anh</Text></View>
                                            <View style={[appStyle.cell, {width: 80}]}>
                                                <Image
                                                    source={{uri: "https://vanhoaviet.net/wp-content/uploads/2020/07/hot-girl-anh-the-thanh-hang-02.jpg"}}
                                                    style={{width: 50, height: 50, borderRadius: 50}}
                                                />
                                            </View>
                                            <View style={[appStyle.cell, {width: 180}]}><Text
                                                style={appStyle.tBody}>Nguyenc@gmai.com</Text></View>
                                            <View style={[appStyle.cell, {width: 200}]}><Text
                                                style={appStyle.tBody}>0904800240</Text></View>
                                            <View style={[appStyle.cell, {width: 150}]}><Text style={appStyle.tBody}>Đang
                                                học</Text></View>

                                            <View style={[appStyle.cell, {width: 120}]}>
                                                <Button
                                                    onPress={() => {
                                                        store.navigation.navigate("GradeShowScreen", {
                                                            id: 65,
                                                            name: "C395"
                                                        })
                                                    }}
                                                >C395</Button>
                                            </View>
                                            <View style={[appStyle.cell, {width: 180}]}>
                                                <View style={{flexDirection: "row"}}>
                                                    <Button icon={"pencil"}
                                                            onPress={() => {
                                                                store.navigation.navigate("EditStudentScreen", {
                                                                    id: 1,
                                                                    name: "Phạm Quang Linh"
                                                                })
                                                            }}
                                                    >Sửa</Button>
                                                    <Button icon={"trash-can"}
                                                            onPress={() => {
                                                                store.navigation.navigate("DeleteScreen", {
                                                                    id: key,
                                                                    name: "C00" + item,
                                                                    type: "student",
                                                                    message: "Bạn có chắc chắn muốn xoá học sinh?"
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
export default connect(state => ({store: state}))(StudentsScreen);
