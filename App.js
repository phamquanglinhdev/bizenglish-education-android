import {StatusBar} from 'expo-status-bar';
import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import {createStore} from "redux";
import {allReducers} from "./src/store/reducers/allReducers";
import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import setTheme from "./src/store/actions/setTheme";
import LoginScreen from "./src/screens/LoginScreen";
import GradesScreen from "./src/screens/GradesScreen/GradesScreen";
import CreateGradeScreen from "./src/screens/GradesScreen/CreateGradeScreen";
import EditGradeScreen from "./src/screens/GradesScreen/EditGradeScreen";
import GradeShowScreen from "./src/screens/GradesScreen/GradeShowScreen";
import DeleteScreen from "./src/screens/DeleteScreen";
import LogsScreen from "./src/screens/LogScreen/LogsScreen";
import CreateLogScreen from "./src/screens/LogScreen/CreateLogScreen";
import EditLogScreen from "./src/screens/LogScreen/EditLogScreen";
import StaffsScreen from "./src/screens/StaffScreen/StaffsScreen";
import LogShowScreen from "./src/screens/LogScreen/LogShowScreen";

const Stack = createNativeStackNavigator();
const store = createStore(allReducers);
store.dispatch(setTheme("light"))
export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={"HomeScreen"}>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="DeleteScreen" component={DeleteScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="GradesScreen" component={GradesScreen} options={{title: "Danh sách lớp học"}}/>
                    <Stack.Screen name="CreateGradeScreen" component={CreateGradeScreen}
                                  options={{title: "Tạo lớp học"}}/>
                    <Stack.Screen name="EditGradeScreen" component={EditGradeScreen}
                                  options={({route}) => ({title: "Chỉnh sửa lớp " + route.params.name})}/>
                    <Stack.Screen name="GradeShowScreen" component={GradeShowScreen}
                                  options={({route}) => ({title: "Thông tin lớp " + route.params.name})}/>
                    <Stack.Screen name="LogsScreen" component={LogsScreen}
                                  options={{title: "Danh sách nhật ký"}}/>
                    <Stack.Screen name="CreateLogScreen" component={CreateLogScreen}
                                  options={{title: "Thêm nhật ký"}}/>
                    <Stack.Screen name="EditLogScreen" component={EditLogScreen}
                                  options={({route}) => ({title: "Chỉnh sửa nhật ký : " + route.params.date})}/>
                    <Stack.Screen name="LogShowScreen" component={LogShowScreen}
                                  options={({route}) => ({title: "Nhật ký : " + route.params.date})}/>
                    <Stack.Screen name="StaffsScreen" component={StaffsScreen}
                                  options={{title: "Danh sách nhân viên"}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
