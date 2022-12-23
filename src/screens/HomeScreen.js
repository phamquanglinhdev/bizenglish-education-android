import * as React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import {connect} from "react-redux";
import HomeTab from "./tabs/HomeTab";
import ListTab from "./tabs/ListTab";
import {Platform, StatusBar, View} from "react-native";
import NotificationTab from "./tabs/NotificationTab";
import UserTab from "./tabs/UserTab";
import SettingTab from "./tabs/SettingTab";
import {CommonActions, StackActions} from "@react-navigation/native";
import {useEffect} from "react";
import BeLanIosBar from "../components/BeLanIosBar";

const HomeScreen = (store) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {
            key: 'home',
            title: 'Trang chủ',
            focusedIcon: 'home',
            unfocusedIcon: 'home-outline',
            accessibilityLabel: "Trang chủ"
        },
        {
            key: 'list',
            title: 'Danh sách',
            focusedIcon: 'database',
            unfocusedIcon: 'database-outline',
            navigation: store.navigation
        },
        {
            key: 'notification',
            title: 'Thông báo',
            focusedIcon: 'bell',
            unfocusedIcon: 'bell-outline',
            badge: 1,
            navigation: store.navigation
        },
        {
            key: 'user',
            title: 'Cá nhân',
            focusedIcon: "account",
            unfocusedIcon: "account-outline",
            navigation: store.navigation
        },
        {
            key: 'setting',
            title: 'Cài đặt',
            focusedIcon: 'cog',
            unfocusedIcon: 'cog-outline',
            navigation: store.navigation
        },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeTab,
        list: ListTab,
        notification: NotificationTab,
        user: UserTab,
        setting: SettingTab,
    });

    return (
        <>
            {Platform.OS === "ios" ?
                <BeLanIosBar/>
                : null}
            <StatusBar backgroundColor={"black"}/>
            <BottomNavigation
                compact={true}
                navigationState={{index, routes}}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        </>

    );
};

export default connect(state => ({store: state}))(HomeScreen);
