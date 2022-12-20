import {ImageBackground, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, View} from "react-native";
import {appStyle} from "../../Style/appStyle";
import {connect} from "react-redux";
import {Button, Chip, RadioButton, Snackbar, TextInput} from "react-native-paper";
import {CommonActions} from "@react-navigation/native";
import {useEffect, useState} from "react";
import MultiSelect from "react-native-multiple-select";
import BeLanLoading from "../../components/BeLanLoading";

const CreateGradeScreen = (store) => {
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
    const TeacherList = [];
    const StudentList = [];
    const ClientList = [];
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setInterval(() => {
            setLoading(false)
        }, 5)
    }, [1])
    if (loading)
        return (
            <BeLanLoading/>
        )
    else
    return (<ImageBackground style={{flex: 1, padding: 0}}
                             source={{uri: "https://t4.ftcdn.net/jpg/04/31/44/89/360_F_431448941_oo9a7gWADWwWjyYBDmdcYvuIZdss3sxh.jpg"}}>
        <View style={[appStyle.container, {backgroundColor: "white", borderRadius: 0}]}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView>
                    <TextInput
                        mode={"outlined"}
                        label={"Tên lớp"}
                        value={name}
                        onChangeText={(r) => {
                            setName(r)
                        }}
                        style={appStyle.textInput}
                    />
                    <TextInput
                        mode={"outlined"}
                        label={"Link lớp"}
                        value={zoom}
                        onChangeText={(r) => {
                            setZoom(r)
                        }}
                        style={appStyle.textInput}
                    />
                    <TextInput
                        mode={"outlined"}
                        label={"Gói học phí"}
                        value={pricing}
                        onChangeText={(r) => {
                            setPricing(r)
                        }}
                        keyboardType="numeric"
                        style={appStyle.textInput}
                    />
                    <TextInput
                        mode={"outlined"}
                        label={"Số phút"}
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
                    >Lịch học</Button>
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
                                <Text style={{padding: 10, borderTopWidth: 1, textAlign: "center"}}>Lịch học đã
                                    tạo</Text>
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
                                    label={"Ngày"}
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
                                            setNotification("Ngày học không được để trống ")
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
                                >Thêm lịch học</Button>
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
                        label={"Thông tin chi tiết"}
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
                            <RadioButton.Item label="Đang học" value="0"/>
                            <RadioButton.Item label="Đã kết thúc" value="1"/>
                            <RadioButton.Item label="Đang bảo lưu" value="2"/>
                        </RadioButton.Group>
                    </View>
                    <TextInput
                        mode={"outlined"}
                        label={"Link tài liệu"}
                        placeholder={"https://"}
                        value={attachment}
                        onChangeText={(r) => {
                            setAttachment(r)
                        }}
                        style={appStyle.textInput}
                    />
                    {/*People modal*/}
                    <Text style={appStyle.textLabel}>Thành phần lớp</Text>
                    <View style={{flexDirection: "row", marginBottom: 10, justifyContent: "space-between"}}>
                        <Chip
                            onPress={() => {
                                setPeopleModal(true)
                            }}
                        >
                            {students.length} Học sinh
                        </Chip>
                        <Chip
                            onPress={() => {
                                setPeopleModal(true)
                            }}
                        >
                            {teachers.length} Giáo viên
                        </Chip>
                        <Chip
                            onPress={() => {
                                setPeopleModal(true)
                            }}
                        >
                            {clients.length} Đối tác
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
                                        selectText="Chọn giáo viên"
                                        searchInputPlaceholderText="Tìm giáo viên"
                                        onChangeInput={(text) => console.log(text)}
                                        tagRemoveIconColor="black"
                                        tagContainerStyle={{
                                            borderRadius: 5, borderWidth: 0, backgroundColor: "rgba(1,161,189,0.25)",
                                        }}
                                        styleMainWrapper={{
                                            marginBottom: 30
                                        }}
                                        tagTextColor={"black"}
                                        displayKey="name"
                                        searchInputStyle={{color: '#06d1f6'}}
                                        submitButtonColor="#CCC"
                                        submitButtonText="Xác nhận"
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
                                        selectText="Chọn học sinh"
                                        searchInputPlaceholderText="Tìm học sinh"
                                        onChangeInput={(text) => console.log(text)}
                                        tagRemoveIconColor="black"
                                        tagContainerStyle={{
                                            borderRadius: 5, borderWidth: 0, backgroundColor: "rgba(1,161,189,0.25)",
                                        }}
                                        styleMainWrapper={{
                                            marginBottom: 30
                                        }}
                                        tagTextColor={"black"}
                                        displayKey="name"
                                        searchInputStyle={{color: '#06d1f6'}}
                                        submitButtonColor="#CCC"
                                        submitButtonText="Xác nhận"
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
                                        selectText="Chọn đối tác"
                                        searchInputPlaceholderText="Tìm đối tác"
                                        onChangeInput={(text) => console.log(text)}
                                        tagRemoveIconColor="black"
                                        tagContainerStyle={{
                                            borderRadius: 5, borderWidth: 0, backgroundColor: "rgba(1,161,189,0.25)",
                                        }}
                                        styleMainWrapper={{
                                            marginBottom: 30
                                        }}
                                        tagTextColor={"black"}
                                        displayKey="name"
                                        searchInputStyle={{color: '#06d1f6'}}
                                        submitButtonColor="#CCC"
                                        submitButtonText="Xác nhận"
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
                            console.log(store)
                            store.navigation.dispatch(CommonActions.reset({
                                index: 1, routes: [{name: "HomeScreen"},]
                            }))
                        }}
                    >
                        Tạo lớp
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    </ImageBackground>);
}
export default connect(state => ({store: state}))(CreateGradeScreen);
