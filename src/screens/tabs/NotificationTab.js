import {appStyle} from "../../Style/appStyle";
import {ScrollView, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {Button, Card, Paragraph, Text, Title} from "react-native-paper";

const NotificationTab = (store) => {
    const data = [1, 2, 3, 4, 5, 6]
    return (
        <View style={[appStyle.container]}>
            <ScrollView>
                <TouchableOpacity style={[appStyle.card, appStyle.unread]}>
                    <Text style={appStyle.cardTitle}>Phản hồi chưa đọc</Text>
                    <Text style={appStyle.cardSub}>12:15:21 12-12-2022</Text>
                    <Text style={appStyle.cardContent}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat tristique libero, ut
                        rhoncus lectus viverra id.
                    </Text>
                </TouchableOpacity>
                {data.map((itemm, key) =>
                    <TouchableOpacity key={key} style={appStyle.card}>
                        <Text style={appStyle.cardTitle}>Phản hồi từ học sinh</Text>
                        <Text style={appStyle.cardSub}>12:15:21 12-12-2022</Text>
                        <Text style={appStyle.cardContent}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat tristique libero, ut
                            rhoncus lectus viverra id.
                        </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    )
}
export default connect(state => ({store: state}))(NotificationTab);
