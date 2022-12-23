import {ScrollView, Text, View} from "react-native";
import {useEffect, useState} from "react";
import BeLanLoading from "../../components/BeLanLoading";
import {connect} from "react-redux";
import {Button} from "react-native-paper";
import {appStyle} from "../../Style/appStyle";

const CustomersScreen = (store) => {
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
                            store.navigation.navigate("CreateCustomerScreen")
                        }}
                    >Tạo khách hàng</Button>
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
                                style={appStyle.tHead}>Mã khách hàng</Text></View>
                            <View style={[appStyle.cell, {width: 150}]}><Text style={appStyle.tHead}>Tên khách hàng</Text></View>
                            <View style={[appStyle.cell, {width: 200}]}><Text style={appStyle.tHead}>Số điện
                                thoại</Text></View>
                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tHead}>Email của khách hàng</Text></View>
                            <View style={[appStyle.cell, {width: 180}]}><Text style={appStyle.tHead}>Phân loại khách hàng</Text></View>
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
                                                style={appStyle.tBody}>KH00{item}</Text></View>
                                            <View style={[appStyle.cell, {width: 150}]}>
                                                <Button
                                                    onPress={() => {
                                                        store.navigation.navigate("CustomerShowScreen", {
                                                            id: 1,
                                                            name: "Phùng Thái Anh"
                                                        })
                                                    }}
                                                    style={appStyle.tBody}>Phùng Thái Anh</Button></View>
                                            <View style={[appStyle.cell, {width: 200}]}><Text style={appStyle.tBody}>(+84)
                                                904 800 240</Text></View>
                                            <View style={[appStyle.cell, {width: 300}]}><Text
                                                style={appStyle.tBody}>phamquanglinhdev@gmail.com</Text></View>
                                            <View style={[appStyle.cell, {width: 180}]}><Text
                                                style={appStyle.tBody}>Tiềm năng</Text></View>
                                            <View style={[appStyle.cell, {width: 180}]}>
                                                <View style={{flexDirection: "row"}}>
                                                    <Button icon={"pencil"}
                                                            onPress={() => {
                                                                store.navigation.navigate("EditCustomerScreen", {
                                                                    id: 1,
                                                                    name: "Phùng Anh"
                                                                })
                                                            }}
                                                    >Sửa</Button>
                                                    <Button icon={"trash-can"}
                                                            onPress={() => {
                                                                store.navigation.navigate("DeleteScreen", {
                                                                    id: key,
                                                                    name: "C00" + item,
                                                                    type: "customer",
                                                                    message: "Bạn có chắc chắn muốn xoá khách hàng?"
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
export default connect(state => ({store: state}))(CustomersScreen);
