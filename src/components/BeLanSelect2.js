import {ScrollView, Text, View} from "react-native";
import {appStyle} from "../Style/appStyle";
import {Button, Chip, TextInput} from "react-native-paper";
import {useEffect, useState} from "react";

const BeLanSelect2 = (props) => {

    const [show, isShow] = useState(false)
    const data = props.data
    const [dataFilter, setDataFilter] = useState(data)
    const [choose, setChoose] = useState(
        [
            {
                id: 1,
                name: "Phạm Hồng Hạnh"
            },
            {
                id: 2,
                name: "Trần Thuỳ Trang"
            }]
    )
    useEffect(() => {
        props.parentCallback(choose)
    }, [choose])
    return (
        <View style={{flex: 1, paddingVertical: 10}}>
            <Text style={{paddingBottom: 10}}>Học sinh quản lý:</Text>
            <View style={{padding: 5, flexDirection: "row", flexWrap: "wrap"}}>
                {choose.map((item, key) => (
                    <Chip
                        key={key}
                        icon={"trash-can"}
                        style={{margin: 2}}
                        onPress={() => {
                            setChoose(choose.filter(a => (a !== item)))
                        }}>
                        {item.name}
                    </Chip>
                ))}
            </View>
            <View
                display={show ? "flex" : "none"}
                style={{
                    borderWidth: 1,
                    position: "relative",
                    borderColor: "rgba(0,0,0,0.37)",
                    width: "100%",
                    borderRadius: 5,
                    zIndex: 99,
                }}
            >
                {dataFilter.map((item, key) => (
                    <Chip
                        style={{paddingVertical: 2, borderBottomWidth: 1, borderRadius: 0}}
                        key={key}
                        onPress={() => {
                            let temp = choose
                            if (temp.findIndex(x => x.id === item.id) === -1) {
                                temp.push(item)
                                setChoose(temp)
                                isShow(false)
                            } else {
                                isShow(false)
                            }
                        }}
                    >{item.name}</Chip>
                ))}
            </View>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <TextInput
                    style={{width: "70%"}}
                    label={"Tìm học sinh"}
                    mode={"outlined"}
                    onFocus={() => {
                        isShow(true)
                    }}
                    onChangeText={(r) => {
                        const subData = data
                        if (r === "") {
                            setDataFilter(subData)

                        } else {
                            setDataFilter(subData.filter(a => a.name.toUpperCase().indexOf(r.toUpperCase()) > -1))
                        }
                    }}
                />
                <Button
                    style={{
                        width: "30%"
                    }}
                    onPress={() => {
                        isShow(!show)
                    }}
                >
                    Danh Sách
                </Button>
            </View>

        </View>
    )
}
export default BeLanSelect2;
