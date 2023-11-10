import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewDataForm extends React.Component {
  state = {
    modal: false,
    inputs: [{ id: 1, data: "" }]  // Początkowy stan z jednym polem input
  };

  componentDidMount() {                       //sprawdza czy otrzymal dane
    if (this.props.data) {
      const { pk, data } = this.props.data;
      this.setState({ pk, data });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createData = e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editData = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  newInput = () => {
    const { inputs } = this.state;          //utworzenie tab dla kilku input
    const newId = inputs.length + 1;
  
    this.setState({
      inputs: [...inputs, { id: newId, data: "" }]
    });
  };

  handleInputChange = (e, id) => {
    const { inputs } = this.state; 
    const updatedInputs = inputs.map(input =>
      input.id === id ? { ...input, data: e.target.value } : input
    );
  
    this.setState({
      inputs: updatedInputs
    });
  };


  render() {
    return (
      <Form onSubmit={this.props.data ? this.editData : this.createData}>
        <FormGroup>
          {this.state.inputs.map(input => (
            <div key={input.id}>
              <Label for={`data${input.id}`}>Data:</Label>
              <Input
                type="text"
                name={`data${input.id}`}
                onChange={e => this.handleInputChange(e, input.id)}
                value={input.data}
              />
            </div>
          ))}
        </FormGroup>
        <Button>Send</Button>
        <Button onClick={this.newInput}>Add New Input</Button>
      </Form>
    );
  }
  
}

export default NewDataForm;
