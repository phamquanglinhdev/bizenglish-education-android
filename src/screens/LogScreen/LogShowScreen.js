import {useEffect, useState} from "react";
import BeLanLoading from "../../components/BeLanLoading";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import YoutubeVideo from "../../components/YoutubeVideo";
import {appStyle} from "../../Style/appStyle";
import {Button, Chip, TextInput} from "react-native-paper";
import Comment from "../../components/Comment";
import axios from "axios";

const LogShowScreen = (store) => {
    const id = store.route.params.id
    const [lesson, setLesson] = useState("Bài học : Unit 2: Everyday Activities")
    const [information, setInformation] = useState("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries")
    const [message, setMessage] = useState("")
    const [duration, setDuration] = useState("40")
    const [grade, setGrade] = useState({
        name: "C001",
        id: 1,
    })
    const [teachers, setTeachers] = useState({id: 1, name: "Võ Thị Mỹ Linh"})
    const [students, setStudents] = useState([
        {
            id: 1,
            name: "Hiền Nguyễn",
        },
        {
            id: 2,
            name: "Hà Phương",
        },
    ])
    const [date, setDate] = useState("22:00 - 22:40 | 16-12-2022")
    const [userImage, setUserImage] = useState(store.store.auth.avatar)
    const [comments, setComment] = useState(
        [
            {
                id: 1,
                name: "Hà Phương",
                avatar: "https://i.pinimg.com/736x/68/7f/f5/687ff58b82cf34da0cd1369598f22104.jpg",
                message: "Bài học rất hay và bổ ích ạ, cô dạy cũng rất vui nữa ",
                time: new Date().toLocaleString(),
            },
            {
                id: 2,
                name: "Andray",
                avatar: "https://cdn-icons-png.flaticon.com/512/168/168732.png",
                message: "Phần phát âm của tôi cứ bị sao ấy, khó chịu lắm ! ",
                time: new Date().toLocaleString(),
            },
            {
                id: 3,
                name: "Lương Thị Mai",
                avatar: "https://www.shareicon.net/data/2016/07/05/791221_man_512x512.png",
                message: "Con tôi bảo cô giáo nên nói chậm lại một chút thì con sẽ dễ hiểu hơn ",
                time: new Date().toLocaleString(),
            },
        ]
    )
    const [loading, setLoading] = useState(true)
    const [video, setVideo] = useState({})
    useEffect(() => {
        axios.post(store.store.config.api + "log/show", {id: id}, {
            headers: {
                Authorization: store.store.token
            }
        }).then((response) => {
            const data = response.data
            console.log(data)
            setLesson(data.lesson)
            setDate(data.date)
            setDuration(data.duration)
            setGrade(data.grade)
            setTeachers(data.teachers)
            setStudents(data.students)
            setInformation(data.information)
            setVideo(JSON.parse(data.video))
            setLoading(false)
        })
    }, [1])
    if (loading)
        return (
            <BeLanLoading/>
        )
    else
        return (
            <View style={{backgroundColor: "white", flex: 1}}>
                <YoutubeVideo id={video.id}/>
                <ScrollView>
                    <View>
                        <Text style={[appStyle.headingText, {color: "black", padding: 4, marginTop: 10}]}>
                            {lesson}
                        </Text>
                        <View style={{flexDirection: "row"}}>
                            <Chip icon={"calendar"} style={{backgroundColor: "white"}}>{date}</Chip>
                            <Chip icon={"clock"} style={{backgroundColor: "white"}}>{duration} Phút</Chip>
                        </View>
                        <View style={{borderWidth: 1, borderColor: "rgba(0,0,0,0.26)", padding: 5}}>
                            <Chip
                                onPress={() => {
                                    store.navigation.navigate("GradeShowScreen", {id: grade.id, name: grade.name})
                                }}
                                style={appStyle.listItem} icon={"google-classroom"}>
                                Lớp :{grade.name}
                            </Chip>
                            <Chip style={appStyle.listItem} icon={"account-voice"}>
                                {teachers.name}
                            </Chip>
                            <Chip style={appStyle.listItem} icon={"ticket-account"}>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    {students.map((item, key) => (
                                        <TouchableOpacity key={key}>
                                            <Text style={{fontWeight: "bold"}}>{item.name}  </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </Chip>
                            <View style={{padding: 10}}>
                                <Text style={{color: "rgba(0,0,0,0.61)"}}>
                                    {information}
                                </Text>
                            </View>
                        </View>
                        <View style={{flex: 1}}>
                            <TextInput
                                placeholder={"Nhập bình luận"}
                                value={message}
                                style={appStyle.textInput}
                                right={<TextInput.Icon
                                    onPress={() => {
                                        const newComment = {
                                            id: 98,
                                            name: store.store.auth.name,
                                            avatar: userImage,
                                            message: message,
                                            time: new Date().toLocaleString(),
                                        }
                                        if (message !== "") {
                                            let temp = comments
                                            temp.unshift(newComment)
                                            setComment(temp)
                                        }
                                        setMessage("")
                                    }
                                    } icon="send"/>}
                                onChangeText={(r) => {
                                    setMessage(r)
                                }}
                            />
                        </View>
                        <View style={{borderColor: "rgba(0,0,0,0.26)", padding: 5}}>
                            <ScrollView>
                                {comments.map((item, key) => (
                                    <Comment key={key} avatar={item.avatar} message={item.message} time={item.time}
                                             name={item.name}/>
                                ))}
                            </ScrollView>
                        </View>

                        <View>

                        </View>
                    </View>
                </ScrollView>
            </View>
        )
}
export default connect(state => ({store: state}))(LogShowScreen);
