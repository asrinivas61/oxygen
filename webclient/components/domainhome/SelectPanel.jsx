import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import {Row, Col} from 'react-grid-system';
const style = {
  maxHeight: 80,
  maxWidth: 750,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 5,
  align: 'center',
  textAlign: 'center'
};
const styles = {
 checkbox: {
  marginBottom: 16
},
paper: {
  marginTop: '-20px',
  minWidth: 150,
 // backgroundColor:'#eaeaea',
 textAlign: 'left',
 padding: '20 0 5px '
}
};  

export default class SelectPanel extends React.Component {
  constructor(props) {
    super(props)
    this.filterFunc=this.filterFunc.bind(this);
    this.state={
      searchText:''
  }
}

filterFunc(searchText,key) {
    let sepDoc=key.split(" (")
    // if(searchText.length>=3 && searchText!==''){
    if(searchText!==''){
      return (sepDoc[0].toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
    }
    return false;
  }
  handleUpdateInput(intents) {
    this.setState({
      searchText: intents
    })
  }
  getCheckedIntent(intents){
    this.setState({
      searchText: ''
    })
    this.props.getCheckedIntent(intents);
  }
  render()
  {
    let nest = this.props.intents.map((intents, i)=>{
          return (<Checkbox
                    key={i}
                    label={intents}
                    value={intents}
                    onCheck={this.props.getCheckedIntent}
                    labelPosition='left'
                    style={styles.checkbox}
                  />);
        })
    return(
      <div style={{textAlign: 'left', paddingLeft: 25}}>
      <Paper style={style} zDepth={3} rounded={false}>
        <Row style={{padding:"0 20px"}}>
           <Col xs={10} sm={10} md={10} lg={10} xl={10} style={{paddingTop:10}}>
           <AutoComplete
                hintText="what intent you want to search for"
                filter={this.filterFunc}
                dataSource={this.props.intents}
                fullWidth={true}
                searchText={this.state.searchText}
                onUpdateInput={this.handleUpdateInput.bind(this)}
                onNewRequest={this.getCheckedIntent.bind(this)}
                maxSearchResults={5}
                />
            </Col>
        </Row>
      </Paper>
      </div>
      );
  }
}

SelectPanel.propTypes = {
  getCheckedIntent: React.PropTypes.func,
  intents: React.PropTypes.arrayOf(React.PropTypes.string)
};
