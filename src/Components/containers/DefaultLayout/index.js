import DefaultLayout from './DefaultLayout';
import { connect } from "react-redux";



const mapStateToProps = state => ({
    auth: state.currentUser.isAuthenticated
});


export default connect(mapStateToProps)(DefaultLayout);