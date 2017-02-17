import React from 'react';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle, FormsyAutoComplete } from 'formsy-material-ui/lib';
import Request from 'superagent';
import TextField from 'material-ui/TextField';

const styles = {
  div: {
   width : 10,
    margin: 10,
    padding: 20,
  },
  switchStyle: {
    marginBottom: 16,
  },
  submitStyle: {
    marginTop: 32,
  },
  closeButton: {
    align: 'right',
    margin: 5
  },
  redBorder: {
    fontColor: 'red'
  }
}

export default class DeletePredicate extends React.Component {
  constructor(props) {
    super(props);
    this.deletePredicate = this.deletePredicate.bind(this);
    this.state = {
      predicateDetails: null,
      open: false
    }
  }

  handleClose = () => {
    this.props.handleModal();
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.predicateDetails !== null){
      this.setState({
        predicateDetails: nextProps.predicateDetails,
        open: nextProps.open
      });
    }
  }

  deletePredicate(){
    let url = `domain/${this.state.predicateDetails.domainName}/subject/${this.state.predicateDetails.subnodetype}/${this.state.predicateDetails.subnodename}/object/${this.state.predicateDetails.objnodetype}/${this.state.predicateDetails.objnodename}/predicate/${this.state.predicateDetails.predicate}`;
    console.log(url);
  }

  render(){
    let textFields = null;
    if(this.state.predicateDetails !== null){
    }
    return (
      <Dialog
        title="Predicate to be deleted"
        modal={true}
        open={this.state.open}
        autoScrollBodyContent={true}
      >
      {this.state.predicateDetails !== null &&
        <div>
        <TextField
          defaultValue={this.state.predicateDetails.subnodename}
          floatingLabelText="selected Subject"
          fullWidth={true}
          readOnly={true}
        />
       <TextField
          defaultValue={this.state.predicateDetails.predicate}
          floatingLabelText="selected Predicate"
          fullWidth={true}
          readOnly={true}
        />
      <TextField
          defaultValue={this.state.predicateDetails.objnodename}
          floatingLabelText="selected Object"
          fullWidth={true}
          readOnly={true}
        />
    </div>
      }
        <RaisedButton
            label="ok"
            secondary={true}
            onTouchTap={this.deletePredicate}
            />
        <RaisedButton
            label="Close"
            default={true}
            onTouchTap={this.handleClose}
            styles = {styles.closeButton}
            />
      </Dialog>
    );
  }
}
