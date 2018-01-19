import React from 'react';
import axios from 'axios';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';

import { connect } from 'react-redux';
import { changeUsernames, changePayeeUsername, payUser, noPayUser, handlePaymentInputs } from './Reducers/Actions.js';

const style = {
  form: {
  },
  input: {
    background: '#fff',
    flex: 'auto',
  },
  button: {
    label: {
      color: '#fff',
      position: 'relative'
    },
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: 30,
  }
}

class Payment extends React.Component {


  componentDidMount() {
    axios('/usernames', { params: { userId: this.props.userInfo.userId }})
    .then(response => {
      this.props.dispatch(changeUsernames(response.data.usernames));
   
    })
    .catch(err => {
      console.error(err);
    })
  }
  
  handleInputChanges (event) {
    let target = event.target;
    var obj = {
      name: target.name,
      value: target.value
    }
    this.props.dispatch(handlePaymentInputs(obj));
  
  }

  onDropdownInput(searchText) {
    this.props.dispatch(changePayeeUsername(searchText));
  
  }

  payUser() {
    let payment = {
      payerId: this.props.userInfo.userId,
      payeeUsername: this.props.payeeUsername,
      amount: this.props.amount,
      note: this.props.note
    };
    axios.post('/pay', payment)
      .then((response) => {
      this.props.dispatch(payUser());    
        this.props.refreshUserData(this.props.userInfo.userId);
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              console.error('UNAUTHORIZED:', error.response);
              break;
            case 422:
              console.error('UNPROCESSABLE ENTRY:', error.response);
              break;
            case 400:
              console.error('BAD REQUEST:', error.response);
              break;
          }
        } else {
          console.error('Error in payment component:', error);
        }
        this.props.dispatch(noPayUser());
      })
  }

  render() {
    return (
      <Paper className='payment-container' style={style.form}>
        <div className='payment-item-container'>         
              <div className="form-box payment-username">
                <AutoComplete
                  hintText="Enter a username"
                  floatingLabelText="To:"
                  style={style.input}
                  name='payeeUsername'
                  filter={AutoComplete.caseInsensitiveFilter}
                  dataSource={this.props.usernames || []}
                  maxSearchResults={7}
                  searchText={this.props.payeeUsername}
                  onUpdateInput = {this.onDropdownInput.bind(this)}
                />
              </div>
          <br />
          <div className="form-box payment-amount">
            <TextField
              style={style.input}
              name='amount'
              value={this.props.amount}
              onChange = {this.handleInputChanges.bind(this)}
              hintText="Enter an amount"
              floatingLabelText="$"
            />
          <br />
          </div>
          <div className="form-box payment-note">
            <TextField
              style={style.input}
              name='note'
              value={this.props.note}
              onChange = {this.handleInputChanges.bind(this)}
              hintText="for"
              floatingLabelText="Leave a comment"
              fullWidth={true}
              multiLine={true}
            />
          <br />
          </div>
        </div>

        <button className='btn' onClick={this.payUser.bind(this)}>Pay</button>
        {this.props.paymentFail
          ? <label className='error-text'>
              Error in payment processing
            </label>
          : null
        }
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    paymentFail: state.paymentFail,
    usernames: state.usernames,
    note: state.note,
    amount: state.amount,
    userInfo: state.userInfo,
    payeeUsername: state.payeeUsername,
    changePayeeUsername,
    changeUsernames,
    payUser,
    noPayUser,
    handlePaymentInputs
  }
}

export default connect(mapStateToProps)(Payment);
