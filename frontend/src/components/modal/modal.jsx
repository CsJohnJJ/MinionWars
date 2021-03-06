import React from 'react';
import { closeModal, openModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import LoginFormContainer from "../session/login_form_container";
import SignupFormContainer from "../session/signup_form_container";
import BuyAlert from "../buyAlert/buy_alert_container";
import NotEnough from "../buyAlert/not_enough";
import SellMinion from "../users/sell_minion";
import './modal.css';


function Modal({ modal, closeModal }) {
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
      case "loginForm":
        component = <LoginFormContainer />;
        break;
      case "signupForm":
        component = <SignupFormContainer />;
        break;
        case "BuyAlert":
            component = <BuyAlert />;
            break;
        case "NotEnough":
            component = <NotEnough />;
            break;
        case "SellMinion":
            component = <SellMinion />;
            break;
      default:
        return null;
    }
    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                { component }
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        signupForm: () => dispatch(openModal("signupForm")),
        BuyAlert: () => dispatch(openModal("BuyAlert"))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
