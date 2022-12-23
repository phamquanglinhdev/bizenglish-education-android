import {ScrollView, Text, View} from "react-native";
import {useEffect, useState} from "react";
import BeLanLoading from "../../components/BeLanLoading";
import {connect} from "react-redux";
import {Button} from "react-native-paper";
import {appStyle} from "../../Style/appStyle";

const ClientsScreen = (store) => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13]
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
                            store.navigation.navigate("CreateClientScreen")
                        }}
                    >Tạo đối tác</Button>
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
                                style={appStyle.tHead}>Mã đối tác</Text></View>
                            <View style={[appStyle.cell, {width: 150}]}><Text style={appStyle.tHead}>Tên đối tác</Text></View>
                            <View style={[appStyle.cell, {width: 200}]}><Text style={appStyle.tHead}>Số điện
                                thoại</Text></View>
                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tHead}>Email của đối tác</Text></View>
                            <View style={[appStyle.cell, {width: 180}]}><Text style={appStyle.tHead}>Tình trạng hợp tác</Text></View>
                            <View style={[appStyle.cell, {width: 180}]}><Text style={appStyle.tHead}>Hoạt động</Text></View>
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
                                                style={appStyle.tBody}>NV00{item}</Text></View>
                                            <View style={[appStyle.cell, {width: 150}]}>
                                                <Button
                                                    onPress={() => {
                                                        store.navigation.navigate("ClientShowScreen", {
                                                            id: 1,
                                                            name: "King Group"
                                                        })
                                                    }}
                                                    style={appStyle.tBody}>King Group</Button></View>
                                            <View style={[appStyle.cell, {width: 200}]}><Text style={appStyle.tBody}>(+84)
                                                904 800 240</Text></View>
                                            <View style={[appStyle.cell, {width: 300}]}><Text
                                                style={appStyle.tBody}>phamquanglinhdev@gmail.com</Text></View>
                                            <View style={[appStyle.cell, {width: 180}]}><Text
                                                style={appStyle.tBody}>Đang hợp tác</Text></View>
                                            <View style={[appStyle.cell, {width: 180}]}>
                                                <View style={{flexDirection: "row"}}>
                                                    <Button icon={"pencil"}
                                                            onPress={() => {
                                                                store.navigation.navigate("EditClientScreen", {
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
                                                                    type: "client",
                                                                    message: "Bạn có chắc chắn muốn xoá đối tác?"
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
export default connect(state => ({store: state}))(ClientsScreen);
