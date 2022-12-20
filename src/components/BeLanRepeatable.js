import {Text, View} from "react-native";
import {appStyle} from "../Style/appStyle";
import {useEffect, useState} from "react";
import {Button, Chip, TextInput} from "react-native-paper";

const BeLanRepeatable = (props) => {
    const [extras, setExtras] = useState(props.data)
    const [info, setInfo] = useState("")
    const [name, setName] = useState("")
    const [update, setUpdate] = useState(true)
    useEffect(() => {
        props.parentCallback(extras)
    }, [extras])
    return (
        <View style={{flex: 1, padding: 10, backgroundColor: "rgba(0,0,0,0.09)"}}>
            <Text style={{marginBottom: 10, fontSize: 16}}>Thông tin thêm:</Text>
            <View>
                {extras.map((item, key) => (
                    <Chip
                        icon={"trash-can"}
                        onPress={() => {
                            setExtras(extras.filter(a => a !== item))
                        }}
                        key={key}>{item.name}:{item.info}</Chip>
                ))}
            </View>
            <TextInput
                value={name}
                label={"Tên thông tin"}
                mode={"outlined"}
                onChangeText={(r) => {
                    setName(r)
                }}
            />
            <TextInput
                value={info}
                label={"Thông tin"}
                mode={"outlined"}
                onChangeText={(r) => {
                    setInfo(r)
                }}
            />
            <Button
                onPress={() => {
                    if (info !== "" && name !== "") {
                        console.log("B")
                        const newExtra = {
                            name: name,
                            info: info,
                        }
                        const temp = extras
                        temp.push(newExtra)
                        setExtras(temp)
                        setUpdate(!update)
                    }
                }}
            >Thêm thông tin</Button>

        </View>
    )
}
export default BeLanRepeatable;
