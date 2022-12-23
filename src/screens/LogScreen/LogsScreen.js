import {connect} from "react-redux";
import {Image, ScrollView, Text, View} from "react-native";
import {Button, Chip} from "react-native-paper";
import {appStyle} from "../../Style/appStyle";
import {useEffect, useState} from "react";
import BeLanLoading from "../../components/BeLanLoading";

const LogsScreen = (store) => {

    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 5)
    }, [1])
    const [loading, setLoading] = useState(true)
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
                            store.navigation.navigate("CreateLogScreen")
                        }}
                    >Tạo nhật ký mới</Button>
                    <Button
                        mode={""}
                        style={{borderRadius: 0}}
                        icon={"filter"}
                    >Bộ lọc</Button>
                </View>
                <ScrollView horizontal={true}>
                    <View style={{paddingBottom: 50}}>
                        <View style={{flexDirection: "row", backgroundColor: "white"}}>
                            <View style={[appStyle.cell, {width: 150}]}><Text style={appStyle.tHead}>Ngày</Text></View>
                            <View style={[appStyle.cell, {width: 120}]}><Text style={appStyle.tHead}>Bắt
                                đầu</Text></View>
                            <View style={[appStyle.cell, {width: 120}]}><Text style={appStyle.tHead}>Kết
                                thúc</Text></View>
                            <View style={[appStyle.cell, {width: 120}]}><Text style={appStyle.tHead}>Lớp</Text></View>
                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tHead}>Học
                                viên</Text></View>
                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tHead}>Giáo
                                viên</Text></View>
                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tHead}>Đối
                                tác</Text></View>
                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tHead}>Bài
                                học</Text></View>
                            <View style={[appStyle.cell, {width: 100}]}><Text style={appStyle.tHead}>Video</Text></View>
                            <View style={[appStyle.cell, {width: 100}]}><Text style={appStyle.tHead}>Thời
                                lượng</Text></View>
                            <View style={[appStyle.cell, {width: 120}]}><Text
                                style={appStyle.tHead}>Lương/giờ</Text></View>
                            <View style={[appStyle.cell, {width: 120}]}><Text style={appStyle.tHead}>Lương buổi
                                học</Text></View>
                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tHead}>Tình trạng lớp
                                học</Text></View>
                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tHead}>Nhận xét của giáo
                                viên</Text></View>
                            <View style={[appStyle.cell, {width: 150}]}><Text style={appStyle.tHead}>Đính
                                kèm</Text></View>
                            <View style={[appStyle.cell, {width: 200}]}><Text style={appStyle.tHead}>Hoạt
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
                                            <View style={[appStyle.cell, {width: 150}]}>
                                                <Button
                                                    onPress={() => {
                                                        store.navigation.navigate("LogShowScreen", {
                                                            id: key,
                                                            date: "20-11-2022",
                                                        })
                                                    }}
                                                    style={appStyle.tBody}>20-11-2022</Button></View>
                                            <View style={[appStyle.cell, {width: 120}]}><Text
                                                style={appStyle.tBody}>19:00</Text></View>
                                            <View style={[appStyle.cell, {width: 120}]}><Text
                                                style={appStyle.tBody}>20:00</Text></View>
                                            <View style={[appStyle.cell, {width: 120}]}>
                                                <Button
                                                    onPress={() => {
                                                        store.navigation.navigate("GradeShowScreen", {
                                                            id: 0,
                                                            name: "C001"
                                                        })
                                                    }}
                                                >C001</Button>
                                            </View>
                                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tBody}>Đình
                                                Cảnh, Minh Long</Text></View>
                                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tBody}>Võ
                                                Thị
                                                Mỹ Linh</Text></View>
                                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tBody}>PING
                                                (ms Vân)</Text></View>
                                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tBody}>Unit
                                                3
                                                Level 1 Family</Text></View>
                                            <View style={[appStyle.cell, {width: 100}]}>
                                                <Button
                                                    onPress={() => {
                                                        store.navigation.navigate("LogShowScreen", {
                                                            id: item,
                                                            date: "20-11-2022"
                                                        })
                                                    }}
                                                    icon={"youtube"} textColor={"red"}>Xem</Button>
                                            </View>
                                            <View style={[appStyle.cell, {width: 100}]}><Text
                                                style={appStyle.tBody}>60</Text></View>
                                            <View style={[appStyle.cell, {width: 120}]}><Text
                                                style={appStyle.tBody}>120.000</Text></View>
                                            <View style={[appStyle.cell, {width: 120}]}><Text
                                                style={appStyle.tBody}>240.000</Text></View>
                                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tBody}>Học
                                                viên và giáo viên vào đúng giờ.</Text></View>
                                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tBody}>Học
                                                sinh hủy buổi học thứ Ba ngày 13/12/2022 lúc 18:22 và có đề nghị học bù
                                                vào
                                                thứ Tư 14/12/2022 </Text></View>
                                            <View style={[appStyle.cell, {width: 150}]}>
                                                <Button icon={"link"}>Mở</Button>
                                            </View>
                                            <View style={[appStyle.cell, {width: 200}]}>
                                                <View style={{flexDirection: "row"}}>
                                                    <Button icon={"pencil"}
                                                            onPress={() => {
                                                                store.navigation.navigate("EditLogScreen", {
                                                                    id: key,
                                                                    date: Date.now().toString(),
                                                                })
                                                            }}
                                                    >Sửa</Button>
                                                    <Button icon={"trash-can"}
                                                            onPress={() => {
                                                                store.navigation.navigate("DeleteScreen", {
                                                                    id: key,
                                                                    type: "log",
                                                                    message: "Bạn có chắc chắn muốn xoá nhật ký ?"
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
export default connect(state => ({store: state}))(LogsScreen);
