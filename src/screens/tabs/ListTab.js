import {appStyle} from "../../Style/appStyle";
import {Button} from "react-native-paper";
import {ScrollView, View} from "react-native";
import {List} from 'react-native-paper';
import {useState} from "react";
import {connect} from "react-redux";
import setIndexTab from "../../store/actions/setIndexTab";

const ListTab = (store) => {
    const navigation = store.route.navigation;
    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(!expanded);
    return (
        <View style={[appStyle.container]}>
            <ScrollView>
                <List.Section title="Danh sách">
                    <List.Accordion
                        title="Lớp học"
                        left={props => <List.Icon {...props} icon="google-classroom"/>}>
                        <List.Item title="Danh sách lớp học" onPress={() => {
                            navigation.navigate("GradesScreen")
                        }}
                                   left={props => <List.Icon {...props} icon="format-list-bulleted"/>}
                        />
                        <List.Item title="Tạo lớp học" onPress={() => {
                            navigation.navigate("CreateGradeScreen")
                        }}
                                   left={props => <List.Icon {...props} icon="card-plus"/>}
                        />
                    </List.Accordion>
                    <List.Accordion
                        title="Nhật ký"
                        left={props => <List.Icon {...props} icon="book-clock"/>}>
                        <List.Item title="Danh sách nhật ký" onPress={() => {
                            navigation.navigate("LogsScreen")
                        }}
                                   left={props => <List.Icon {...props} icon="format-list-bulleted"/>}
                        />
                        <List.Item title="Tạo nhật ký" onPress={() => {
                            navigation.navigate("CreateLogScreen")
                        }}
                                   left={props => <List.Icon {...props} icon="card-plus"/>}
                        />
                    </List.Accordion>
                    <List.Accordion
                        title="Nhân viên"
                        left={props => <List.Icon {...props} icon="account-tie"/>}>
                        <List.Item title="Danh sách nhân viên" onPress={() => {
                            navigation.navigate("StaffsScreen")
                        }}
                                   left={props => <List.Icon {...props} icon="format-list-bulleted"/>}
                        />
                        <List.Item title="Tạo nhân viên" onPress={() => {
                            navigation.navigate("CreateStaffScreen")
                        }}
                                   left={props => <List.Icon {...props} icon="card-plus"/>}
                        />
                    </List.Accordion>
                    <List.Accordion
                        title="Giáo viên"
                        left={props => <List.Icon {...props} icon="account-tie-voice"/>}>
                        <List.Item title="Danh sách giáo viên" onPress={() => {
                            navigation.navigate("TeachersScreen")
                        }}
                                   left={props => <List.Icon {...props} icon="format-list-bulleted"/>}
                        />
                        <List.Item title="Tạo giáo viên" onPress={() => {
                            navigation.navigate("CreateTeacherScreen")
                        }}
                                   left={props => <List.Icon {...props} icon="card-plus"/>}
                        />
                    </List.Accordion>
                    <List.Accordion
                        title="Học sinh"
                        left={props => <List.Icon {...props} icon="ticket-account"/>}>
                        <List.Item title="Danh sách học sinh" onPress={() => {
                            navigation.navigate("StudentsScreen")
                        }}
                                   left={props => <List.Icon {...props} icon="format-list-bulleted"/>}
                        />
                        <List.Item title="Tạo học sinh" onPress={() => {
                            navigation.navigate("CreateStudentScreen")
                        }}
                                   left={props => <List.Icon {...props} icon="card-plus"/>}
                        />
                    </List.Accordion>
                    <List.Accordion
                        title="Khách hàng"
                        left={props => <List.Icon {...props} icon="account-cash"/>}>
                        <List.Item title="Danh sách khách hàng" onPress={() => {

                        }}
                                   left={props => <List.Icon {...props} icon="format-list-bulleted"/>}
                        />
                        <List.Item title="Tạo khách hàng" onPress={() => {

                        }}
                                   left={props => <List.Icon {...props} icon="card-plus"/>}
                        />
                    </List.Accordion>
                    <List.Accordion
                        title="Đối tác"
                        left={props => <List.Icon {...props} icon="account-details"/>}>
                        <List.Item title="Danh sách đối tác" onPress={() => {

                        }}
                                   left={props => <List.Icon {...props} icon="format-list-bulleted"/>}
                        />
                        <List.Item title="Tạo đối tác" onPress={() => {

                        }}
                                   left={props => <List.Icon {...props} icon="card-plus"/>}
                        />
                    </List.Accordion>
                    <List.Accordion
                        title="Bộ Sách"
                        left={props => <List.Icon {...props} icon="bookshelf"/>}>
                        <List.Item title="Danh sách bộ sách" onPress={() => {

                        }}
                                   left={props => <List.Icon {...props} icon="format-list-bulleted"/>}
                        />
                        <List.Item title="Tạo bộ sách" onPress={() => {

                        }}
                                   left={props => <List.Icon {...props} icon="card-plus"/>}
                        />
                    </List.Accordion>
                    <List.Accordion
                        title="Sách"
                        left={props => <List.Icon {...props} icon="book"/>}>
                        <List.Item title="Danh mục sách" onPress={() => {

                        }}
                                   left={props => <List.Icon {...props} icon="format-list-bulleted"/>}
                        />
                        <List.Item title="Tạo sách" onPress={() => {

                        }}
                                   left={props => <List.Icon {...props} icon="card-plus"/>}
                        />
                    </List.Accordion>
                    <List.Accordion
                        title="Văn bản"
                        left={props => <List.Icon {...props} icon="file-document-multiple"/>}
                        right={props => <></>}
                        onPress={() => {
                            console.log("file")
                        }}
                    >
                    </List.Accordion>
                    <List.Accordion
                        title="Thông báo"
                        left={props => <List.Icon {...props} icon="bell"/>}
                        right={props => <></>}
                        onPress={() => {
                            store.dispatch(setIndexTab(2))
                            store.jumpTo("notification")
                        }}
                    >
                    </List.Accordion>
                </List.Section>

            </ScrollView>
        </View>
    )
}
export default connect(state => ({store: state}))(ListTab);
