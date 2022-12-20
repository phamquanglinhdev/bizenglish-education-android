import {StatusBar} from 'expo-status-bar';
import {KeyboardAvoidingView, Platform, StyleSheet, Text, View} from 'react-native';
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

const Stack = createNativeStackNavigator();
const store = createStore(allReducers);
store.dispatch(setTheme("light"))
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function App() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

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
                    <Stack.Screen name="CreateStaffScreen" component={CreateStaffScreen}
                                  options={{title: "Tạo nhân viên"}}/>
                    <Stack.Screen name="EditStaffScreen" component={EditStaffScreen}
                                  options={({route}) => ({title:route.params.name})}/>
                    <Stack.Screen name="StaffShowScreen" component={StaffShowScreen}
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
            console.log(response.data)
            alert(response.data)
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
