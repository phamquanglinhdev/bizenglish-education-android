import {Text, View, StyleSheet, Platform} from "react-native";
import {useEffect, useState} from "react";
import WebView from "react-native-webview";
import {Button, Chip, Modal, Portal, Provider} from "react-native-paper";

const UploadLanCute = (props) => {
    const [visible, setVisible] = useState(false)
    // useEffect(() => {
    //     props.parentCallback(attachment)
    // }, [attachment])
    return (
        <Provider style={{flex: 1}}>
            <Portal>
                <Modal visible={visible} onDismiss={() => {
                    setVisible(false)
                }} contentContainerStyle={containerStyle}>
                    <Text>Example Modal. Click outside this area to dismiss.</Text>
                </Modal>
            </Portal>
            <Button style={{marginTop: 30}} onPress={() => {
                setVisible(true)
            }}>
                Show
            </Button>
        </Provider>
    )
}
const containerStyle = {
    flex: 1
}
export default UploadLanCute
