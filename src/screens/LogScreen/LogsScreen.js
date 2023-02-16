import {connect} from "react-redux";
import {Image, ScrollView, Text, View} from "react-native";
import {Button, Chip} from "react-native-paper";
import {appStyle} from "../../Style/appStyle";
import {useEffect, useState} from "react";
import BeLanLoading from "../../components/BeLanLoading";
import axios from "axios";

const LogsScreen = (store) => {
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [data, setData] = useState([]);
    const [more, setMore] = useState(true)
    useEffect(() => {
        setLoading(true)
        axios.post(store.store.config.api + "logs", {
            page: page
        }, {
            headers: {
                Authorization: store.store.token
            }
        }).then((response) => {
            // console.log(response.data)
            setData(response.data)
            setLoading(false)
        }).catch((error) => {
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
                    <View>
                        <View style={{flexDirection: "row", backgroundColor: "white"}}>
                            <View style={[appStyle.cell, {width: 80}]}><Text style={appStyle.tHead}>ID</Text></View>
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
                        <ScrollView
                            onMomentumScrollEnd={() => {

                            }}
                        >
                            <View style={{paddingBottom: 40}}>
                                {data.map((item, key) => {
                                    return (
                                        <View key={item.id}
                                              style={{
                                                  flexDirection: "row",
                                                  backgroundColor: key % 2 === 1 ? "rgba(255,255,255,0.21)" : "white"
                                              }}>
                                            <View style={[appStyle.cell, {width: 80}]}>
                                                <Text>#{item.id}</Text>
                                            </View>
                                            <View style={[appStyle.cell, {width: 150}]}>
                                                <Button
                                                    onPress={() => {
                                                        store.navigation.navigate("LogShowScreen", {
                                                            id: item.id,
                                                            date: item.date,
                                                        })
                                                    }}
                                                    style={appStyle.tBody}>{item.date}</Button></View>
                                            <View style={[appStyle.cell, {width: 120}]}><Text
                                                style={appStyle.tBody}>{item.start}</Text></View>
                                            <View style={[appStyle.cell, {width: 120}]}><Text
                                                style={appStyle.tBody}>{item.end}</Text></View>
                                            <View style={[appStyle.cell, {width: 120}]}>
                                                <Button
                                                    onPress={() => {
                                                        store.navigation.navigate("GradeShowScreen", {
                                                            id: item.grade.id,
                                                            name: item.grade.name
                                                        })
                                                    }}
                                                >{item.grade.name}</Button>
                                            </View>
                                            <View style={[appStyle.cell, {width: 300}]}><Text style={appStyle.tBody}>
                                                {item.students.map((student, key) =>
                                                    <Button key={student.id}
                                                            onPress={() => {
                                                                store.navigation.navigate("StudentShowScreen", {
                                                                    id: student.id,
                                                                    name: student.name,
                                                                })
                                                            }}
                                                    >{student.name}</Button>
                                                )}
                                            </Text></View>
                                            <View style={[appStyle.cell, {width: 300}]}>
                                                {item.teachers.map((teacher, key) =>
                                                    <Button key={key} style={appStyle.tBody}
                                                            onPress={() => {
                                                                store.navigation.navigate("TeacherShowScreen", {
                                                                    id: teacher.id,
                                                                    name: teacher.name,
                                                                })
                                                            }}
                                                    >{teacher.name}
                                                    </Button>
                                                )}
                                            </View>
                                            <View style={[appStyle.cell, {width: 300}]}>
                                                {item.clients.map((client, key) =>
                                                    <Button
                                                        key={client.id}
                                                        onPress={() => {
                                                            store.navigation.navigate("ClientShowScreen", {
                                                                id: client.id,
                                                                name: client.name,
                                                            })
                                                        }}
                                                    >{client.name}</Button>
                                                )}
                                            </View>
                                            <View style={[appStyle.cell, {width: 300}]}>
                                                <Text style={appStyle.tBody}>{item.lesson}</Text>
                                            </View>
                                            <View style={[appStyle.cell, {width: 100}]}>
                                                {item.video !== null ?
                                                    <Button
                                                        onPress={() => {
                                                            store.navigation.navigate("LogShowScreen", {
                                                                id: item.id,
                                                                date: item.date
                                                            })
                                                        }}
                                                        icon={"youtube"} textColor={"red"}>Xem</Button>
                                                    : <Text>-</Text>}
                                            </View>
                                            <View style={[appStyle.cell, {width: 100}]}><Text
                                                style={appStyle.tBody}>{item.duration} phút</Text></View>
                                            <View style={[appStyle.cell, {width: 120}]}><Text
                                                style={appStyle.tBody}>{item.hourSalary}</Text></View>
                                            <View style={[appStyle.cell, {width: 120}]}><Text
                                                style={appStyle.tBody}>{item.logSalary}</Text></View>
                                            <View style={[appStyle.cell, {width: 300}]}><Text
                                                style={appStyle.tBody}>{item.status}</Text></View>
                                            <View style={[appStyle.cell, {width: 300}]}>
                                                <Text style={appStyle.tBody}>
                                                    {item.assessment}
                                                </Text></View>
                                            <View style={[appStyle.cell, {width: 150}]}>
                                                {item.attachments.length !== 0 ?
                                                    (item.attachments.map((item, key) =>
                                                        <Text>{item}</Text>))
                                                    : <Text>-</Text>
                                                }
                                            </View>
                                            <View style={[appStyle.cell, {width: 200}]}>
                                                <View style={{flexDirection: "row"}}>
                                                    <Button icon={"pencil"}
                                                            onPress={() => {
                                                                store.navigation.navigate("EditLogScreen", {
                                                                    id: item.id,
                                                                    date: item.date,
                                                                })
                                                            }}
                                                    >Sửa</Button>
                                                    <Button icon={"trash-can"}
                                                            onPress={() => {
                                                                store.navigation.navigate("DeleteScreen", {
                                                                    id: item.id,
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
                <View style={{margin: 20, flexDirection: "row", justifyContent: "center"}}>
                    {page !== 1 ?
                        <Button
                            onPress={() => {
                                setLoading(true)
                                setPage(1)
                            }}
                        > {"|<<"} </Button> : null
                    }
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
            </View>
        )
}
export default connect(state => ({store: state}))(LogsScreen);
