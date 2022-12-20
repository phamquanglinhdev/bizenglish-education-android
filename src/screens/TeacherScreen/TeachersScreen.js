import PeopleScreen from "../Common/PeopleScreen";
import {connect} from "react-redux";

const TeachersScreen = (store) => {
    return (
        <PeopleScreen/>
    )
}
export default connect(state => ({store: state}))(TeachersScreen);
