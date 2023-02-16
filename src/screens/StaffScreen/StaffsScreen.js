import {ScrollView, Text, View} from "react-native";
import {useEffect, useState} from "react";
import BeLanLoading from "../../components/BeLanLoading";
import {connect} from "react-redux";
import {Button} from "react-native-paper";
import {appStyle} from "../../Style/appStyle";
import axios from "axios";

const StaffsScreen = (store) => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.post(store.store.config.api + "staffs",
            {
                page: page
            }, {
                headers: {
                    Authorization: store.store.token
                }
            })
            .then((response) => {
                setData(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [page])
    if (loading)
        return (
            <BeLanLoading/>
        )
    else
        return (
            <View style={{flex: 1}}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Button
                        mode={""}
                        style={{borderRadius: 0}}
                        icon={"card-plus"}
                        onPress={() => {
                            store.navigation.navigate("CreateStaffScreen")
                        }}
                    >Tạo nhân viên</Button>
                    <Button
                        mode={""}
                        style={{borderRadius: 0}}
                        icon={"filter"}
                    >Bộ lọc</Button>
                </View>
                <ScrollView horizontal={true}>
                    <View style={{paddingBottom: 0}}>
                        <View style={{flexDirection: "row", backgroundColor: "white"}}>
                            <View style={[appStyle.cell, {width: 120}]}><Text
                                style={appStyle.tHead}>Mã nhân viên</Text></View>
                            <View style={[appStyle.cell, {width: 200}]}><Text style={appStyle.tHead}>Tên nhân
                                viên</Text></View>
                            <View style={[appStyle.cell, {width: 150}]}><Text style={appStyle.tHead}>Chức
                                vụ</Text></View>
                            <View style={[appStyle.cell, {width: 200}]}><Text style={appStyle.tHead}>Số điện
                                thoại</Text></View>
                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tHead}>Email của nhân
                                viên</Text></View>
                            <View style={[appStyle.cell, {width: 180}]}><Text style={appStyle.tHead}>Hoạt
                                động</Text></View>
                        </View>
                        <ScrollView>
                            <View>
                                {data.map((item, key) => {
                                    return (
                                        <View key={item.id}
                                              style={{
                                                  flexDirection: "row",
                                                  backgroundColor: key % 2 === 1 ? "rgba(255,255,255,0.21)" : "white"
                                              }}>
                                            <View style={[appStyle.cell, {width: 120}]}><Text
                                                style={appStyle.tBody}>{item.code}</Text></View>
                                            <View style={[appStyle.cell, {width: 200}]}>
                                                <Button
                                                    onPress={() => {
                                                        store.navigation.navigate("StaffShowScreen", {
                                                            id: item.id,
                                                            name: item.name,
                                                        })
                                                    }}
                                                    style={{width: "100%"}}>{item.name}</Button></View>
                                            <View style={[appStyle.cell, {width: 150}]}><Text
                                                style={appStyle.tBody}>{item.job}</Text></View>
                                            <View style={[appStyle.cell, {width: 200}]}><Text
                                                style={appStyle.tBody}>{item.phone}</Text></View>
                                            <View style={[appStyle.cell, {width: 300}]}><Text
                                                style={appStyle.tBody}>{item.email}</Text></View>
                                            <View style={[appStyle.cell, {width: 180}]}>
                                                <View style={{flexDirection: "row"}}>
                                                    <Button icon={"pencil"}
                                                            onPress={() => {
                                                                store.navigation.navigate("EditStaffScreen", {
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
                                                                    type: "staff",
                                                                    message: "Bạn có chắc chắn muốn xoá nhân viên?"
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
                {/*pagination*/}
                <View style={{margin: 20, flexDirection: "row", justifyContent: "center"}}>
                    {page !== 1 ?
                        <Button
                            onPress={() => {
                                setLoading(true)
                                setPage(1)
                            }}
                        > {"|<<"} </Button>
                        : null}
                    {page > 1 ?
                        <Button
                            onPress={() => {
                                setLoading(true)
                                setPage(page - 1)
                            }}
                        >{page - 1}</Button> : null
                    }
                    <Button mode={"contained"}>{page}</Button>
                    <Button
                        onPress={() => {
                            setLoading(true)
                            setPage(page + 1)
                        }}
                    >{page + 1}</Button>
                    <Button
                        onPress={() => {
                            setLoading(true)
                            setPage(page + 20)
                        }}
                    > {">>|"}</Button>
                </View>
                {/*pagination*/}
            </View>
        )
}
export default connect(state => ({store: state}))(StaffsScreen);
