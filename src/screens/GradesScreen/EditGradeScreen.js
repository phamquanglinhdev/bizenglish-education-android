import {
    Alert,
    ImageBackground,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View
} from "react-native";
import {appStyle} from "../../Style/appStyle";
import {connect} from "react-redux";
import {Button, Chip, RadioButton, Snackbar, TextInput} from "react-native-paper";
import {CommonActions} from "@react-navigation/native";
import {useEffect, useState} from "react";
import MultiSelect from "react-native-multiple-select";
import BeLanLoading from "../../components/BeLanLoading";
import axios from "axios";

const EditGradeScreen = (store) => {
    const [name, setName] = useState("")
    const [zoom, setZoom] = useState("")
    const [pricing, setPricing] = useState("")
    const [minutes, setMinutes] = useState("")
    const [information, setInformation] = useState("")
    const [status, setStatus] = useState("")
    const [timeModal, setTimeModal] = useState(false)
    const [peopleModal, setPeopleModal] = useState(false)
    const [currenDay, setCurrenDay] = useState("mon")
    const [currenValue, setCurrentValue] = useState("")
    const [notificationVisible, setNotificationVisible] = useState(false)
    const [notification, setNotification] = useState("")
    const [attachment, setAttachment] = useState("")
    const [time, setTime] = useState([])
    const [teachers, setTeachers] = useState([])
    const [students, setStudents] = useState([])
    const [clients, setClients] = useState([])
    const [TeacherList, setTeacherList] = useState([]);
    const [StudentList, setStudentList] = useState([]);
    const [ClientList, setClientList] = useState([]);
    const [loading, setLoading] = useState(true)
    const redirectToHome = () => {
        // store.navigation.dispatch(CommonActions.reset({
        //     index: 1, routes: [{name: "HomeScreen"},]
        // }))
    }
    useEffect(() => {
        axios.post(store.store.config.api + "grade/people", {}, {
            headers: {
                Authorization: store.store.token
            }
        }).then((response) => {
            // console.log(response.data)
            setTeacherList(response.data.teachers)
            setStudentList(response.data.students)
            setClientList(response.data.clients)
        }).catch((error) => {
            redirectToHome()
        })
        axios.post(store.store.config.api + "grade/edit", {id: store.route.params.id}, {
            headers: {
                Authorization: store.store.token
            }
        }).then((response) => {
            console.log(response.data)
            const data = response.data
            setAttachment(data.attachment)
            setClients(response.data.clients)
            setInformation(data.information)
            setMinutes(data.minutes)
            setName(data.name)
            setPricing(data.pricing)
            setStatus(data.status)
            setStudents(data.students)
            setTeachers(data.teachers)
            setTime(data.time)
            setZoom(data.zoom)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            redirectToHome()
        })
    }, [1])
    if (loading)
        return (
            <BeLanLoading/>
        )
    else
        return (
            <ImageBackground style={{flex: 1, padding: 0}}
                             source={{uri: "https://t4.ftcdn.net/jpg/04/31/44/89/360_F_431448941_oo9a7gWADWwWjyYBDmdcYvuIZdss3sxh.jpg"}}>
                <View style={[appStyle.container, {backgroundColor: "white", borderRadius: 0}]}>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <ScrollView>
                            <TextInput
                                mode={"outlined"}
                                label={"T??n l???p"}
                                value={name}
                                onChangeText={(r) => {
                                    setName(r)
                                }}
                                style={appStyle.textInput}
                            />
                            <TextInput
                                mode={"outlined"}
                                label={"Link l???p"}
                                value={zoom}
                                onChangeText={(r) => {
                                    setZoom(r)
                                }}
                                style={appStyle.textInput}
                            />
                            <TextInput
                                mode={"outlined"}
                                label={"G??i h???c ph??"}
                                value={pricing}
                                onChangeText={(r) => {
                                    setPricing(r)
                                }}
                                keyboardType="numeric"
                                style={appStyle.textInput}
                            />
                            <TextInput
                                mode={"outlined"}
                                label={"S??? ph??t"}
                                value={minutes}
                                onChangeText={(r) => {
                                    setMinutes(r)
                                }}
                                keyboardType="numeric"
                                style={appStyle.textInput}
                            />
                            <Button
                                mode={"contained"}
                                style={{borderRadius: 0}}
                                onPress={() => {
                                    setTimeModal(true)
                                }}
                            >L???ch h???c</Button>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={timeModal}
                                onRequestClose={() => {
                                    setTimeModal(false);
                                }}
                            >
                                <View style={{flex: 1, backgroundColor: "white"}}>
                                    <View style={{paddingBottom: 50}}>
                                        <Button
                                            style={{
                                                position: 'absolute', right: -15
                                            }}
                                            icon={"close-circle"}
                                            onPress={() => {
                                                setTimeModal(false)
                                            }}

                                        />
                                    </View>
                                    <ScrollView>
                                        <Text style={{padding: 10, borderTopWidth: 1, textAlign: "center"}}>L???ch h???c ????
                                            t???o</Text>
                                        <View style={{padding: 10}}>
                                            <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                                                {time.map((item, key) => <Chip key={key} icon={"trash-can"}
                                                                               style={{padding: 1, margin: 1}}
                                                                               onPress={() => {
                                                                                   console.log(key)
                                                                                   // const temp = time
                                                                                   // temp.splice(key, 1)
                                                                                   setTime(time.filter(a => a !== item))
                                                                               }}>
                                                    {item.day.toUpperCase()}: {item.value}
                                                </Chip>)}
                                            </View>
                                        </View>
                                    </ScrollView>
                                    <View style={{paddingTop: 50, padding: 10, flex: 1}}>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                paddingVertical: 10,
                                                justifyContent: "space-around",
                                                flexWrap: "wrap"
                                            }}
                                        >
                                            <Chip
                                                selected={currenDay === "mon"}
                                                onPress={() => setCurrenDay("mon")}
                                                selectedColor={currenDay === "mon" ? "#01a1bd" : "black"}>2</Chip>
                                            <Chip
                                                selected={currenDay === "tue"}
                                                onPress={() => setCurrenDay("tue")}
                                                selectedColor={currenDay === "tue" ? "#01a1bd" : "black"}>3</Chip>
                                            <Chip
                                                selected={currenDay === "wed"}
                                                onPress={() => setCurrenDay("wed")}
                                                selectedColor={currenDay === "wed" ? "#01a1bd" : "black"}>4</Chip>
                                            <Chip
                                                selected={currenDay === "thu"}
                                                onPress={() => setCurrenDay("thu")}
                                                selectedColor={currenDay === "thu" ? "#01a1bd" : "black"}>5</Chip>
                                            <Chip
                                                selected={currenDay === "fri"}
                                                onPress={() => setCurrenDay("fri")}
                                                selectedColor={currenDay === "fri" ? "#01a1bd" : "black"}>6</Chip>
                                            <Chip
                                                selected={currenDay === "sat"}
                                                onPress={() => setCurrenDay("sat")}
                                                selectedColor={currenDay === "sat" ? "#01a1bd" : "black"}>7</Chip>
                                            <Chip
                                                selected={currenDay === "sun"}
                                                onPress={() => setCurrenDay("sun")}
                                                selectedColor={currenDay === "sun" ? "#01a1bd" : "black"}>CN</Chip>
                                        </View>
                                        <TextInput
                                            mode={"outlined"}
                                            label={"Ng??y"}
                                            style={appStyle.textInput}
                                            value={currenValue}
                                            onChangeText={(r) => {
                                                setCurrentValue(r)
                                            }}
                                        />
                                        <Button
                                            mode={"contained"}
                                            style={{borderRadius: 0}}
                                            onPress={() => {
                                                if (currenValue === "") {
                                                    setNotification("Ng??y h???c kh??ng ???????c ????? tr???ng ")
                                                    setNotificationVisible(true)
                                                } else {
                                                    const item = {
                                                        day: currenDay, value: currenValue
                                                    }
                                                    const temp = time
                                                    temp.push(item)
                                                    setTime(temp)
                                                    setCurrenDay("mon")
                                                    setCurrentValue("")
                                                }
                                            }}
                                        >Th??m l???ch h???c</Button>
                                        <Snackbar
                                            style={{width: "100%"}}
                                            visible={notificationVisible}
                                            onDismiss={() => {
                                                setNotificationVisible(false)
                                            }}
                                            action={{
                                                label: 'OK', onPress: () => {
                                                    // Do something
                                                },
                                            }}>
                                            {notification}
                                        </Snackbar>
                                    </View>
                                </View>
                            </Modal>


                            <TextInput
                                mode={"outlined"}
                                label={"Th??ng tin chi ti???t"}
                                value={information}
                                onChangeText={(r) => {
                                    setInformation(r)
                                }}
                                multiline={true}
                                style={[appStyle.textInput, {
                                    height: 120,
                                }]}
                            />
                            <View style={{borderWidth: 1, marginVertical: 10, borderRadius: 5}}>
                                <RadioButton.Group onValueChange={value => setStatus(value)} value={status}>
                                    <RadioButton.Item label="??ang h???c" value="0"/>
                                    <RadioButton.Item label="???? k???t th??c" value="1"/>
                                    <RadioButton.Item label="??ang b???o l??u" value="2"/>
                                </RadioButton.Group>
                            </View>
                            <TextInput
                                mode={"outlined"}
                                label={"Link t??i li???u"}
                                placeholder={"https://"}
                                value={attachment}
                                onChangeText={(r) => {
                                    setAttachment(r)
                                }}
                                style={appStyle.textInput}
                            />
                            {/*People modal*/}
                            <Text style={appStyle.textLabel}>Th??nh ph???n l???p</Text>
                            <View style={{flexDirection: "row", marginBottom: 10, justifyContent: "space-between"}}>
                                <Chip
                                    onPress={() => {
                                        setPeopleModal(true)
                                    }}
                                >
                                    {students.length} H???c sinh
                                </Chip>
                                <Chip
                                    onPress={() => {
                                        setPeopleModal(true)
                                    }}
                                >
                                    {teachers.length} Gi??o vi??n
                                </Chip>
                                <Chip
                                    onPress={() => {
                                        setPeopleModal(true)
                                    }}
                                >
                                    {clients.length} ?????i t??c
                                </Chip>
                            </View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={peopleModal}
                                onRequestClose={() => {
                                    setPeopleModal(false);
                                }}
                            >
                                <View style={{flex: 1, backgroundColor: "white"}}>
                                    <View style={{paddingBottom: 50}}>
                                        <Button
                                            style={{
                                                position: 'absolute', right: -15
                                            }}
                                            icon={"close-circle"}
                                            onPress={() => {
                                                setPeopleModal(false)
                                                console.log(teachers)
                                            }}
                                        />
                                    </View>
                                    <View style={{paddingTop: 50, padding: 10, flex: 1}}>
                                        <View>
                                            <MultiSelect
                                                items={TeacherList}
                                                uniqueKey="id"
                                                onSelectedItemsChange={selectedItems => {
                                                    setTeachers(selectedItems)
                                                    console.log(teachers)
                                                }}
                                                selectedItems={teachers}
                                                selectText="Ch???n gi??o vi??n"
                                                searchInputPlaceholderText="T??m gi??o vi??n"
                                                onChangeInput={(text) => console.log(text)}
                                                tagRemoveIconColor="black"
                                                tagContainerStyle={{
                                                    borderRadius: 5,
                                                    borderWidth: 0,
                                                    backgroundColor: "rgba(1,161,189,0.25)",
                                                }}
                                                styleMainWrapper={{
                                                    marginBottom: 30
                                                }}
                                                tagTextColor={"black"}
                                                displayKey="name"
                                                searchInputStyle={{color: '#06d1f6'}}
                                                submitButtonColor="#CCC"
                                                submitButtonText="X??c nh???n"
                                            />
                                            {/*student*/}
                                            <MultiSelect
                                                items={StudentList}
                                                uniqueKey="id"
                                                onSelectedItemsChange={selectedItems => {
                                                    setStudents(selectedItems)
                                                    console.log(teachers)
                                                }}
                                                selectedItems={students}
                                                selectText="Ch???n h???c sinh"
                                                searchInputPlaceholderText="T??m h???c sinh"
                                                onChangeInput={(text) => console.log(text)}
                                                tagRemoveIconColor="black"
                                                tagContainerStyle={{
                                                    borderRadius: 5,
                                                    borderWidth: 0,
                                                    backgroundColor: "rgba(1,161,189,0.25)",
                                                }}
                                                styleMainWrapper={{
                                                    marginBottom: 30
                                                }}
                                                tagTextColor={"black"}
                                                displayKey="name"
                                                searchInputStyle={{color: '#06d1f6'}}
                                                submitButtonColor="#CCC"
                                                submitButtonText="X??c nh???n"
                                            />
                                            {/*client*/}
                                            <MultiSelect
                                                items={ClientList}
                                                uniqueKey="id"
                                                onSelectedItemsChange={selectedItems => {
                                                    setClients(selectedItems)
                                                    console.log(clients)
                                                }}
                                                selectedItems={clients}
                                                selectText="Ch???n ?????i t??c"
                                                searchInputPlaceholderText="T??m ?????i t??c"
                                                onChangeInput={(text) => console.log(text)}
                                                tagRemoveIconColor="black"
                                                tagContainerStyle={{
                                                    borderRadius: 5,
                                                    borderWidth: 0,
                                                    backgroundColor: "rgba(1,161,189,0.25)",
                                                }}
                                                styleMainWrapper={{
                                                    marginBottom: 30
                                                }}
                                                tagTextColor={"black"}
                                                displayKey="name"
                                                searchInputStyle={{color: '#06d1f6'}}
                                                submitButtonColor="#CCC"
                                                submitButtonText="X??c nh???n"
                                            />
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            <Button
                                mode={"contained"}
                                buttonColor={"#01a1bd"}
                                style={{borderRadius: 0}}
                                onPress={() => {
                                    const data = {
                                        id: store.route.params.id,
                                        name: name,
                                        pricing: pricing,
                                        information: information,
                                        attachment: attachment,
                                        status: status,
                                        minutes: minutes,
                                        time: time,
                                        zoom: zoom,
                                        students: students,
                                        clients: clients,
                                        teachers: teachers,
                                    }
                                    console.log(data)
                                    setLoading(true)
                                    axios.post(store.store.config.api + "grade/update", data, {
                                        headers: {
                                            Authorization: store.store.token
                                        }
                                    }).then((response) => {
                                        console.log(response.data)
                                        store.navigation.dispatch(CommonActions.reset({
                                            index: 1, routes: [{name: "SuccessScreen"},]
                                        }))
                                        setLoading(false)
                                    }).catch((error) => {
                                        setLoading(false)
                                        console.log(error.toJSON())
                                        Alert.alert("L???i", "???? c?? l???i x???y ra, vui l??ng ki???m tra d??? li???u")
                                    })


                                }}
                            >
                                C???p nh???t l???p
                            </Button>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </ImageBackground>);
}
export default connect(state => ({store: state}))(EditGradeScreen);
