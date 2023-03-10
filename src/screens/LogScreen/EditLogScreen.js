import {useEffect, useState} from "react";
import {Image, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, View} from "react-native";
import {appStyle} from "../../Style/appStyle";
import {DatePickerInput, TimePickerModal} from "react-native-paper-dates";
import {Button, Chip, TextInput} from "react-native-paper";
import {Until} from "../../components/getYoutubeId";
import axios from "axios";
import BeLanCute from "../../components/BeLanCute";
import WebView from "react-native-webview";
import {connect} from "react-redux";
import BeLanLoading from "../../components/BeLanLoading";

const EditLogScreen = (store) => {
    const [lesson, setLesson] = useState("")
    const [information, setInformation] = useState("")
    const [question, setQuestion] = useState("")
    const [assessment, setAssessment] = useState("")
    const [attachments, SetAttachment] = useState([])
    const [uploadModal, setUploadModal] = useState(false)
    const [youtubeInfo, setYoutubeInfo] = useState(false)
    const [date, setDate] = useState(Date.now())
    const [start, setStart] = useState("00:00")
    const [end, setEnd] = useState("00:00")
    const [startVisible, setStartVisible] = useState(false)
    const [current, setCurrent] = useState(0)
    const [duration, setDuration] = useState("")
    const [hourSalary, setHourSalary] = useState("")
    const [logSalary, setLogSalary] = useState("")
    const [youtubeUrl, setYoutubeUrl] = useState("")
    const [video, setVideo] = useState({})
    const [status, setStatus] = useState([])
    const callbackFunction = (childData) => {
        setStatus(childData)
    }
    useEffect(() => {
        setUploadModal(false)
    }, [attachments])
    useEffect(() => {
        SetAttachment(attachments)
    }, [attachments])
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
            <View style={appStyle.container}>
                <ScrollView>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
                        <DatePickerInput
                            mode={"outlined"}
                            locale="en"
                            label="Ng??y"
                            value={date}
                            onChange={(date) => {
                                setDate(date)
                                console.log("date:" + date)
                            }}
                            inputMode="start"
                            style={appStyle.textInput}
                        />
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <TextInput
                                editable={false}
                                onPress={() => {
                                    setCurrent(0)
                                    setStartVisible(true)
                                }}
                                label={"B???t ?????u"}
                                mode={"outlined"}
                                value={start}
                                right={<TextInput.Icon onPress={
                                    () => {
                                        setCurrent(0)
                                        setStartVisible(true)
                                    }
                                } icon="clock"/>}
                                style={[appStyle.textInput, {width: "48%"}]}
                            />
                            <TextInput
                                editable={false}
                                label={"K???t th??c"}
                                mode={"outlined"}
                                value={end}
                                right={<TextInput.Icon onPress={
                                    () => {
                                        setCurrent(1)
                                        setStartVisible(true)
                                    }
                                } icon="clock"/>}
                                style={[appStyle.textInput, {width: "48%"}]}
                            />
                        </View>
                        <TimePickerModal
                            visible={startVisible}
                            onConfirm={(hoursAndMinutes) => {
                                if (current === 0) {
                                    setStart(hoursAndMinutes.hours + ":" + hoursAndMinutes.minutes)
                                } else {
                                    setEnd(hoursAndMinutes.hours + ":" + hoursAndMinutes.minutes)
                                }
                                setStartVisible(false)
                            }}
                            hours={0}
                            minutes={0}
                            onFocusInput={() => {
                            }}
                            onChange={({hours, minutes, focused,}) => {
                                console.log(hours, minutes)
                            }}
                            onDismiss={() => {
                                setStartVisible(false)
                            }}>

                        </TimePickerModal>

                        <TextInput
                            label={"Th???i l?????ng (ph??t)"}
                            mode={"outlined"}
                            style={appStyle.textInput}
                            keyboardType="numeric"
                            value={duration}
                            onChangeText={(r) => {
                                setDuration(r)
                            }}
                            onEndEditing={() => {
                                const logSa = duration / 60 * hourSalary
                                setLogSalary(logSa.toString())
                            }}
                        />
                        <TextInput
                            label={"L????ng / gi???"}
                            mode={"outlined"}
                            style={appStyle.textInput}
                            keyboardType="numeric"
                            value={hourSalary}
                            onChangeText={(r) => {
                                setHourSalary(r)
                            }}
                            onEndEditing={() => {
                                const logSa = duration / 60 * hourSalary
                                setLogSalary(logSa.toString())
                            }}
                        />
                        <TextInput
                            editable={false}
                            label={"L????ng c???a bu???i h???c"}
                            mode={"outlined"}
                            value={logSalary}
                            style={appStyle.textInput}
                            keyboardType="numeric"
                            // disabled={true}
                        />
                        <TextInput
                            label={"B??i h???c"}
                            mode={"outlined"}
                            value={lesson}
                            onChangeText={(r) => {
                                setLesson(r)
                            }}
                            style={appStyle.textInput}
                        />
                        <TextInput
                            multiline
                            label={"N???i dung"}
                            mode={"outlined"}
                            value={information}
                            onChangeText={(r) => {
                                setInformation(r)
                            }}
                            style={appStyle.textInput}
                        />
                        <TextInput
                            label={"Video"}
                            mode={"outlined"}
                            right={<TextInput.Icon onPress={
                                () => {
                                    // this.onEndEditing()
                                }
                            } icon="youtube"/>}
                            value={youtubeUrl}
                            style={appStyle.textInput}
                            onChangeText={(r) => {
                                setYoutubeUrl(r)
                            }}
                            onEndEditing={() => {
                                console.log(youtubeUrl)
                                const id = new Until().tryYouTube(youtubeUrl)
                                console.log("id:" + id)
                                const key = "AIzaSyDc3MoGdCrqbCHq6XRbulelTPy5oWsLwIE"
                                const api = "https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=" + key + "&part=snippet"
                                console.log(api)
                                axios.get(api)
                                    .then((response) => {
                                        if (typeof (response.data.items[0]) != "undefined") {
                                            const snippet = response.data.items[0].snippet
                                            const newData = {
                                                provider: 'youtube',
                                                id: id,
                                                title: snippet.title,
                                                image: snippet.thumbnails.default.url,
                                                url: "https://www.youtube.com/watch?v=" + id,
                                            }
                                            setVideo(newData)
                                            setYoutubeInfo(true)
                                        } else {
                                            setVideo({})
                                            setYoutubeInfo(false)
                                        }
                                        // console.log(video)
                                    }).catch((error) => {
                                    console.log(error)
                                })
                            }}
                        />
                        <View
                            style={{
                                borderColor: "rgba(0,0,0,0.11)",
                                flexDirection: "row",
                                padding: 10,
                                borderWidth: 1,
                                marginBottom: 10,
                                borderRadius: 5,
                            }}
                            display={youtubeInfo ? "flex" : "none"}
                        >
                            <View>
                                <Image style={{width: 120, height: 90, padding: 5}} source={{uri: video.image}}/>
                            </View>
                            <Text style={{width: "60%", padding: 10}}>{video.title}</Text>
                        </View>
                        <View style={[appStyle.textInput]}>
                            <BeLanCute parentCallback={callbackFunction}></BeLanCute>
                        </View>
                        <TextInput
                            multiline
                            value={assessment}
                            onChangeText={(r) => {
                                setAssessment(r)
                            }}
                            label={"Nh???n x??t c???a gi??o vi??n"}
                            mode={"outlined"}
                            style={appStyle.textInput}
                        />
                        <TextInput
                            multiline
                            value={question}
                            onChangeText={(r) => {
                                setQuestion(r)
                            }}
                            label={"B??i t???p"}
                            mode={"outlined"}
                            style={appStyle.textInput}
                        />
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={uploadModal}
                            onRequestClose={() => {
                                setUploadModal(false);
                            }}
                        >
                            <View
                                style={{flex: 1, backgroundColor: "white"}}>
                                <View style={{paddingBottom: 50}}>
                                    <Button
                                        style={{
                                            position: 'absolute', right: -15
                                        }}
                                        icon={"close-circle"}
                                        onPress={() => {
                                            setUploadModal(false)
                                        }}

                                    />
                                </View>
                                <WebView
                                    onMessage={(event) => {
                                        const data = event.nativeEvent.data
                                        let temp = attachments
                                        temp.push(data)
                                        SetAttachment(temp)
                                        setUploadModal(!uploadModal)
                                    }}
                                    source={{uri: "https://bizenglish-edu.net/app/upload"}}
                                />
                            </View>
                        </Modal>
                        <View>
                            <Text>????nh k??m :</Text>
                            {attachments.map((item, key) => (
                                <Chip key={key} style={{marginBottom: 10}}
                                      icon={"trash-can"}
                                      onPress={() => {
                                          SetAttachment(attachments.filter(a => a !== item))
                                      }}
                                >{item}</Chip>
                            ))}

                        </View>
                        <Button
                            mode={"contained"}
                            onPress={() => {
                                setUploadModal(true)
                            }}
                            style={{
                                borderRadius: 0,
                                marginBottom: 10
                            }}
                        >T???i t??i li???u l??n</Button>
                        <Button
                            mode={"contained"}
                            buttonColor={"#01a1bd"}
                            style={{borderRadius: 0}}
                            onPress={() => {
                                // store.navigation.dispatch(CommonActions.reset({
                                //     index: 1, routes: [{name: "HomeScreen"},]
                                // }))
                                console.log(lesson)
                            }}
                        >
                            T???o nh???t k??
                        </Button>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
}
export default connect(state => ({store: state}))(EditLogScreen);
