import {StatusBar} from 'expo-status-bar';
import {Alert, BackHandler, KeyboardAvoidingView, Linking, Platform, StyleSheet, Text, View} from 'react-native';
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
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {useEffect, useRef, useState} from "react";
import CreateStaffScreen from "./src/screens/StaffScreen/CreateStaffScreen";
import EditStaffScreen from "./src/screens/StaffScreen/EditStaffScreen";
import StaffShowScreen from "./src/screens/StaffScreen/StaffShowScreen";
import setApi from "./src/store/actions/setApi";
import SuccessScreen from "./src/screens/SuccessScreen";
import TeachersScreen from "./src/screens/TeacherScreen/TeachersScreen";
import CreateTeacherScreen from "./src/screens/TeacherScreen/CreateTeacherScreen";
import EditTeacherScreen from "./src/screens/TeacherScreen/EditTeacherScreen";
import setToken from "./src/store/actions/setToken";
import SetToken from "./src/store/actions/setToken";
import setExpo from "./src/store/actions/setExpo";
import SetExpo from "./src/store/actions/setExpo";
import TeacherShowScreen from "./src/screens/TeacherScreen/TeacherShowScreen";
import StudentsScreen from "./src/screens/StudentScreen/StudentsScreen";
import CreateStudentScreen from "./src/screens/StudentScreen/CreateStudentScreen";
import EditStudentScreen from "./src/screens/StudentScreen/EditStudentScreen";
import StudentShowScreen from "./src/screens/StudentScreen/StudentShowScreen";

const Stack = createNativeStackNavigator();
const store = createStore(allReducers);
store.dispatch(setTheme("light"))
store.dispatch(setApi("https://bizenglish-edu.net/api/"))
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function App() {
    const nativeVersion = "1.1.2"
    const [hasUpdate, setHasUpdate] = useState(false)
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    useEffect(() => {
        if(nativeVersion!=="1.1.2"){
            setHasUpdate(true)
        }
        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token)
        });

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    if (hasUpdate)
        return (
            Alert.alert("C???p nh???t", "???? c?? b???n c???p nh???t m???i, vui l??ng c???p nh???t ????? s??? d???ng",
                [
                    {
                        text: "Hu???",
                        onPress: () => BackHandler.exitApp(),
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: () => {
                            Linking.openURL("https://google.com").then()
                            BackHandler.exitApp()
                        }
                    }
                ]
            )

        )
    else return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={"LoginScreen"}>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="DeleteScreen" component={DeleteScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="SuccessScreen" component={SuccessScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="GradesScreen" component={GradesScreen} options={{title: "Danh s??ch l???p h???c"}}/>
                    <Stack.Screen name="CreateGradeScreen" component={CreateGradeScreen}
                                  options={{title: "T???o l???p h???c"}}/>
                    <Stack.Screen name="EditGradeScreen" component={EditGradeScreen}
                                  options={({route}) => ({title: "Ch???nh s???a l???p " + route.params.name})}/>
                    <Stack.Screen name="GradeShowScreen" component={GradeShowScreen}
                                  options={({route}) => ({title: "Th??ng tin l???p " + route.params.name})}/>
                    <Stack.Screen name="LogsScreen" component={LogsScreen}
                                  options={{title: "Danh s??ch nh???t k??"}}/>
                    <Stack.Screen name="CreateLogScreen" component={CreateLogScreen}
                                  options={{title: "Th??m nh???t k??"}}/>
                    <Stack.Screen name="EditLogScreen" component={EditLogScreen}
                                  options={({route}) => ({title: "Ch???nh s???a nh???t k?? : " + route.params.date})}/>
                    <Stack.Screen name="LogShowScreen" component={LogShowScreen}
                                  options={({route}) => ({title: "Nh???t k?? : " + route.params.date})}/>

                    <Stack.Screen name="StaffsScreen" component={StaffsScreen}
                                  options={{title: "Danh s??ch nh??n vi??n"}}/>
                    <Stack.Screen name="CreateStaffScreen" component={CreateStaffScreen}
                                  options={{title: "T???o nh??n vi??n"}}/>
                    <Stack.Screen name="EditStaffScreen" component={EditStaffScreen}
                                  options={({route}) => ({title: route.params.name})}/>
                    <Stack.Screen name="StaffShowScreen" component={StaffShowScreen}
                                  options={({route}) => ({title: route.params.name})}/>

                    <Stack.Screen name="TeachersScreen" component={TeachersScreen}
                                  options={{title: "Danh s??ch gi??o vi??n"}}/>
                    <Stack.Screen name="CreateTeacherScreen" component={CreateTeacherScreen}
                                  options={{title: "T???o gi??o vi??n"}}/>
                    <Stack.Screen name="EditTeacherScreen" component={EditTeacherScreen}
                                  options={({route}) => ({title: route.params.name})}/>
                    <Stack.Screen name="TeacherShowScreen" component={TeacherShowScreen}
                                  options={({route}) => ({title: route.params.name})}/>

                    <Stack.Screen name="StudentsScreen" component={StudentsScreen}
                                  options={{title: "Danh s??ch h???c sinh"}}/>
                    <Stack.Screen name="CreateStudentScreen" component={CreateStudentScreen}
                                  options={{title: "T???o h???c sinh"}}/>
                    <Stack.Screen name="EditStudentScreen" component={EditStudentScreen}
                                  options={({route}) => ({title: route.params.name})}/>
                    <Stack.Screen name="StudentShowScreen" component={StudentShowScreen}
                                  options={({route}) => ({title: route.params.name})}/>
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
// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
// async function sendPushNotification(expoPushToken) {
//     const message = {
//         to: expoPushToken,
//         sound: 'default',
//         title: 'Original Title',
//         body: 'And here is the body!',
//         data: { someData: 'goes here' },
//     };
//
//     await fetch('https://exp.host/--/api/v2/push/send', {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Accept-encoding': 'gzip, deflate',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(message),
//     });
// }

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        Notifications.getExpoPushTokenAsync().then((response) => {
            console.log("Token:" + response.data)
            store.dispatch(SetExpo(response.data))
        });

        // console.log("Token:"+token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}
