import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import api from "../api"

export default class CreateOffering extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: "",
            quantity: 0,
            fromDate: "",
            toDate: "",
            ingredients: "",
            category: "",
            image: "",
            delivery: false
        };
      }
    
      handleChange(e) {
        if (e.target.name !== "delivery") {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
        else {
            this.setState(prevState => ({
                [e.target.name]: !prevState.delivery
            }));
        }
      }
      handleSubmit(e) {
        e.preventDefault();
        api.createOffering(this.state)
      }
    
  render() {
    return (
       <Form onSubmit={e => this.handleSubmit(e)}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="title"
            onChange={e => this.handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            placeholder="Offering description"
            onChange={e => this.handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="quantity">Quantity</Label>
          <Input
            type="number"
            name="quantity"
            id="quantity"
            min="10"
            onChange={e => this.handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="fromDate">Avaialble From</Label>
          <Input
            type="date"
            min={String(new Date())}
            name="fromDate"
            id="fromDate"
            onChange={e => this.handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="toDate">Avaialble From</Label>
          <Input
            type="date"
            min={String(new Date())}
            name="toDate"
            id="toDate"
            onChange={e => this.handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="ingredients">Ingredients</Label>
          <Input
            type="text"
            name="ingredients"
            id="ingredients"
            placeholder="ingredients"
            onChange={e => this.handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="category">Categories</Label>
          <Input
            type="text"
            name="category"
            id="category"
            placeholder="category"
            onChange={e => this.handleChange(e)}
          />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input name="delivery" type="checkbox" />{' '}
        Delivery
          </Label>
        </FormGroup>
        <Button type="submit">
          Submit
        </Button>
      </Form>
    )
  }
}
