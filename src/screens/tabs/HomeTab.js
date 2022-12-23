import {Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Button, Menu} from "react-native-paper";
import {appStyle} from "../../Style/appStyle";
import {useState} from "react";
import setIndexTab from "../../store/actions/setIndexTab";
import {connect} from "react-redux";
import YoutubeVideo from "../../components/YoutubeVideo";

const HomeTab = (store) => {
    const user = store.store.auth
    return (
        <View style={[appStyle.flexCenter, appStyle.bgMain]} flex={1}>
            <ImageBackground style={{flex: 1, padding: 0}} source={require("../../../assets/app-background.png")}>
                <View
                    style={appStyle.headerBar}>
                    <Text style={appStyle.headingText}>Xin chào ,{user.name}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            store.dispatch(setIndexTab(3))
                            store.jumpTo("user")
                        }}
                    >
                        <Image
                            source={{uri: user.avatar}}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                                borderWidth: 2,
                                borderColor: "white",
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={appStyle.materialContent}>
                    <ScrollView>
                        <YoutubeVideo/>
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>
    );
}
export default connect(state => ({store: state}))(HomeTab);
