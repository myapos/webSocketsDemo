import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

const handleKeyPress = (e, props, inputUserName, inputLastName) => {
  if (e.key.match(/enter/gi)) {
    console.log('pressed enter');
    props.enter(inputUserName.current.value, inputLastName.current.value);
  }
};

const handleEnter = (props, inputUserName, inputLastName) => {
  // get firstname and lastname and keeped them in
  props.enter(inputUserName.current.value, inputLastName.current.value);
};

const Enter = props => {
  const inputUserName = useRef(null);
  const inputLastName = useRef(null);

  const { entered, isLoggedIn, firstScreen } = props;

  return (
    <div className="enter">
      <div className="introText"> Please enter your Name and hit enter!</div>
      {
        entered !== ''
          ? <div className="validatedText"> You have to insert firstname or lastname!</div>
          : null
      }
      {
        !firstScreen && !isLoggedIn
          ? <div className="validatedText"> Logged out!</div>
          : null
      }
      <div className="inputs">
        <input
          ref={inputUserName}
          type="text"
          placeholder="name"
          className="holder"
          onKeyPress={e => handleKeyPress(e, props, inputUserName, inputLastName)} />
        <input
          ref={inputLastName}
          type="text"
          placeholder="lastname"
          className="holder"
          onKeyPress={e => handleKeyPress(e, props, inputUserName, inputLastName)} />
      </div>
      <div className="myBtn clearFloat" onClick={() => handleEnter(props, inputUserName, inputLastName)}>
        Enter
      </div>
    </div>
  );
};

Enter.propTypes = {
  entered: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  isLoggedIn: PropTypes.bool,
  firstScreen: PropTypes.bool,
};
export default connect(state => state, actions)(Enter);
