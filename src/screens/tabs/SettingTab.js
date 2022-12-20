import {Switch} from 'react-native-paper';
import {useState} from "react";
import {View} from "react-native";
import {connect} from "react-redux";

const SettingTab = (store) => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    return (
        <View flex={1}>
            <Switch value={isSwitchOn} onValueChange={() => {
                setIsSwitchOn(!isSwitchOn)
            }}/>
        </View>
    )
}
export default connect(state => ({store: state}))(SettingTab);
