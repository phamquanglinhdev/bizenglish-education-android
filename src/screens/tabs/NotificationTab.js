import {ScrollView, Text, View} from "react-native";
import NotifyItem from "../../components/NotifyItem";
import {connect} from "react-redux";
import {useState} from "react";

const NotificationTab = (store) => {
    const [notifications, setNotification] = useState([
        {
            name: "Hôm nay",
            notify: [1, 2, 3, 4, 5, 6]
        },
        {
            name: "Hôm qua",
            notify: [1, 2, 3, 4, 5, 6]
        },
    ])
    return (
        <ScrollView>
            <View style={{flex: 1, backgroundColor: "#f1ecec", padding: 10}}>
                {notifications.map((item, key) =>
                    <View key={key}>
                        <Text
                            style={{
                                padding: 20,
                                fontWeight: "bold",
                                color: "rgba(0,0,0,0.38)",
                                textAlign: "center"
                            }}>{item.name}</Text>
                        {item.notify.map((sub, k) =>
                            <NotifyItem
                                key={k}
                                icon={"https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-600x600.jpg"}
                                title={"Thông báo " + item.name + " " + sub}
                                message={"Đây là nội dung thông báo mẫu, chúc bạn nhỏ một ngày tốt lành như hũng ngày tốt lành khác nhé"}
                                time={"11:19 am"}
                                navigation={store.route.navigation}
                            />
                        )}
                    </View>
                )}
            </View>
        </ScrollView>

    )
}
export default connect(state => ({store: state}))(NotificationTab);
