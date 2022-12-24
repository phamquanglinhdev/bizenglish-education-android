import {View, StyleSheet, ScrollView, Text} from "react-native";
import {Button, Chip, TextInput} from "react-native-paper";
import {appStyle} from "../Style/appStyle";
import {useEffect, useState} from "react";

const BeLanCute = (props) => {

    const options = [
        {id: 0, label: "Học sinh và giáo viên vào đúng giờ"},
        {id: 1, label: "Học sinh muộn"},
        {id: 2, label: "Giáo viên muộn"},
        {id: 3, label: "Học sinh huỷ trước ...giờ"},
        {id: 4, label: "Giáo viên huỷ trước ...giờ"},
    ]
    const [time, setTime] = useState("");
    const [name, setName] = useState("");
    const [contain, setContain] = useState([]);
    const [selected, setSelected] = useState("--Chọn--")
    const [show, setShow] = useState(false)
    const [subShow, setSubShow] = useState(false)
    const senData = () => {
    }
    useEffect(() => {
        props.parentCallback(contain)
    }, [contain])
    useEffect(() => {
        if (props.old !== undefined) {
            const old = props.old
            console.log(old.name)
            options.forEach((option) => {
                if (option.id.toString() === old.name) {
                    setSelected(option.label)
                    if (option.id !== 0) {
                        setSubShow(true)
                        setTime(old.time.toString())
                    }
                }
            })
        }
    }, [props.old])
    useEffect(() => {

        setContain([{
            name: name,
            time: time,
            message: ""
        }])
    }, [time])
    useEffect(() => {
        setContain([{
            name: name,
            time: time,
            message: ""
        }])
    }, [name])
    return (
        <View>
            <Text>Tình trạng lớp</Text>
            <Chip style={lan.selectedChip} textStyle={{fontWeight: "bold"}} onPress={() => {
                setShow(!show)
            }}>{selected}</Chip>
            <ScrollView>
                <View
                    display={show ? "flex" : "none"}
                >
                    {options.map((item, key) =>
                        <Chip key={key}
                              icon={item.label === selected ? "check" : ""}
                              style={lan.listChip}
                              onPress={() => {
                                  setName(item.id)
                                  setSelected(item.label)
                                  setShow(!show)
                                  if (item.id !== 0) {
                                      setSubShow(true)
                                  } else {
                                      setSubShow(false)
                                  }
                              }}
                        >{item.label}</Chip>
                    )}
                </View>
            </ScrollView>
            <View display={subShow ? "flex" : "none"}>
                <TextInput
                    value={time}
                    style={appStyle.textInput}
                    mode={"outlined"}
                    label={"Thời gian"}
                    onChangeText={(r) => {
                        setTime(r)
                    }}
                    onEndEditing={() => {
                    }}
                />
            </View>
        </View>
    )
}
export default BeLanCute;
const lan = StyleSheet.create({
    selectedChip: {
        borderRadius: 0,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        height: 50,
    },
    listChip: {
        borderRadius: 0,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        height: 50,
    }
})
