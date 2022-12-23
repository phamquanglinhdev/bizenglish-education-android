import {Image, ScrollView, Text, View} from "react-native";
import {useEffect, useState} from "react";
import BeLanLoading from "../../components/BeLanLoading";
import {connect} from "react-redux";
import {Button} from "react-native-paper";
import {appStyle} from "../../Style/appStyle";

const TeachersScreen = (store) => {
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
                    >Tạo giáo viên</Button>
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
                                style={appStyle.tHead}>Mã giáo viên</Text></View>
                            <View style={[appStyle.cell, {width: 150}]}><Text style={appStyle.tHead}>Tên giáo
                                viên</Text></View>
                            <View style={[appStyle.cell, {width: 80}]}><Text style={appStyle.tHead}>Avatar</Text></View>
                            <View style={[appStyle.cell, {width: 180}]}><Text style={appStyle.tHead}>Email của giáo
                                viên</Text></View>
                            <View style={[appStyle.cell, {width: 200}]}><Text style={appStyle.tHead}>Số điện
                                thoại</Text></View>
                            <View style={[appStyle.cell, {width: 400}]}><Text style={appStyle.tHead}>Tag</Text></View>
                            <View style={[appStyle.cell, {width: 120}]}><Text style={appStyle.tHead}>Video</Text></View>
                            <View style={[appStyle.cell, {width: 120}]}><Text style={appStyle.tHead}>Hồ sơ giáo
                                viên</Text></View>
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
                                                style={appStyle.tBody}>GVVN072</Text></View>
                                            <View style={[appStyle.cell, {width: 150}]}><Text style={appStyle.tBody}>
                                                <Button
                                                    onPress={() => {
                                                        store.navigation.navigate("TeacherShowScreen", {
                                                            id: 1,
                                                            name: "Hồng Nhung"
                                                        })
                                                    }}
                                                >
                                                    Hồng Nhung
                                                </Button>
                                            </Text></View>
                                            <View style={[appStyle.cell, {width: 80}]}>
                                                <Image
                                                    source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm_0cgTzfijHlffjWhbjXhp6w-iP3XLNyERQ&usqp=CAU"}}
                                                    style={{width: 50, height: 50, borderRadius: 50}}
                                                />
                                            </View>
                                            <View style={[appStyle.cell, {width: 180}]}><Text
                                                style={appStyle.tBody}>Hongnhung@gmail.com</Text></View>
                                            <View style={[appStyle.cell, {width: 200}]}><Text style={appStyle.tBody}>
                                                0904800240
                                            </Text></View>
                                            <View style={[appStyle.cell, {width: 400}]}><Text
                                                style={appStyle.tBody}>Trẻ em 5 - 10 tuổi , Trẻ em 11 - 18 tuổi ,
                                                Starter, Mover, Flyer , Người đi làm cơ bản</Text></View>
                                            <View style={[appStyle.cell, {width: 120}]}>
                                                <Button
                                                    textColor={"red"}
                                                    onPress={() => {
                                                    }}
                                                    icon={"youtube"}
                                                >Xem</Button>
                                            </View>
                                            <View style={[appStyle.cell, {width: 120}]}>
                                                <Button
                                                    textColor={"green"}
                                                    onPress={() => {
                                                    }}
                                                    icon={"google-drive"}
                                                >Xem</Button>
                                            </View>
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
                                                                store.navigation.navigate("EditTeacherScreen", {
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
                                                                    type: "teacher",
                                                                    message: "Bạn có chắc chắn muốn xoá ?"
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
export default connect(state => ({store: state}))(TeachersScreen);
