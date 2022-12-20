import {useEffect, useState} from "react";
import BeLanLoading from "../../components/BeLanLoading";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import YoutubeVideo from "../../components/YoutubeVideo";
import {appStyle} from "../../Style/appStyle";
import {Button, Chip, TextInput} from "react-native-paper";
import Comment from "../../components/Comment";

const LogShowScreen = (store) => {
    const [lesson, setLesson] = useState("Bài học : Unit 2: Everyday Activities")
    const [information, setInformation] = useState("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries")
    const [message, setMessage] = useState("")
    const [duration, setDuration] = useState("40")
    const [grade, setGrade] = useState({
        name: "C001",
        id: 1,
    })
    const [teachers, setTeachers] = useState([
        {
            id: 1,
            name: "Võ Thị Mỹ Linh",
        },
        {
            id: 2,
            name: "Adeon Kveor",
        }
    ])
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
    const [userImage, setUserImage] = useState("https://scontent.fhan5-6.fna.fbcdn.net/v/t39.30808-6/312722863_856046165431806_7133547451032615828_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=jhAYvjdrOnYAX9dGbOc&_nc_ht=scontent.fhan5-6.fna&oh=00_AfDTDcftbMt6YBTEfcTCWxcgPBQmz1LFUrNQKoKNE3AHOA&oe=63A54F0C")
    const [comments, setComment] = useState(
        [
            {
                id: 1,
                name: "Hà Phương",
                avatar: "https://i.pinimg.com/736x/68/7f/f5/687ff58b82cf34da0cd1369598f22104.jpg",
                message: "Bài học rất hay và bổ ích ạ, cô dạy cũng rất vui nữa ",
                time: "20-11-2022 12:19",
            },
            {
                id: 2,
                name: "Andray",
                avatar: "https://cdn-icons-png.flaticon.com/512/168/168732.png",
                message: "Phần phát âm của tôi cứ bị sao ấy, khó chịu lắm ! ",
                time: "20-11-2022 12:19",
            },
            {
                id: 3,
                name: "Lương Thị Mai",
                avatar: "https://www.shareicon.net/data/2016/07/05/791221_man_512x512.png",
                message: "Con tôi bảo cô giáo nên nói chậm lại một chút thì con sẽ dễ hiểu hơn ",
                time: "20-11-2022 12:19",
            },
        ]
    )
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [1])
    if (loading)
        return (
            <BeLanLoading/>
        )
    else
        return (
            <View style={{backgroundColor: "white", flex: 1}}>
                <YoutubeVideo/>
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
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    {teachers.map((item, key) => (
                                        <TouchableOpacity key={key}>
                                            <Text style={{fontWeight: "bold"}}>{item.name}  </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
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
                                            id: 99,
                                            name: "Phạm Quang Linh",
                                            avatar: userImage,
                                            message: message,
                                            time: Date.now(),
                                        }
                                        let temp = comments
                                        temp.unshift(newComment)
                                        setComment(temp)
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
