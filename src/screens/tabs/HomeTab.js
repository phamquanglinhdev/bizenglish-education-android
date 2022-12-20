import {Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Button, Menu} from "react-native-paper";
import {appStyle} from "../../Style/appStyle";
import {useState} from "react";
import setIndexTab from "../../store/actions/setIndexTab";
import {connect} from "react-redux";
import YoutubeVideo from "../../components/YoutubeVideo";

const HomeTab = (store) => {
    return (
        <View style={[appStyle.flexCenter, appStyle.bgMain]} flex={1}>
            <ImageBackground style={{flex: 1, padding: 0}} source={require("../../../assets/app-background.png")}>
                <View
                    style={appStyle.headerBar}>
                    <Text style={appStyle.headingText}>Xin chào , Phạm Quang Linh</Text>
                    <TouchableOpacity
                        onPress={() => {
                            store.dispatch(setIndexTab(3))
                            store.jumpTo("user")
                        }}
                    >
                        <Image
                            source={{uri: "https://toigingiuvedep.vn/wp-content/uploads/2021/06/hinh-anh-anime-cute-584x600.jpg"}}
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
