import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class FormWrapper extends Component {
	constructor(props) {
        super(props);
        let stateObj = {};
        this.props.formGroups.forEach(
            element => (stateObj[element.name] = "")
        );
        console.log(stateObj)
		this.state = stateObj;
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
    }
    handleSubmit(e) {
		e.preventDefault();
        this.props.handler(this.state)
	}
	render() {
		return (
			<Form
				className={this.props.class || ""}
				onSubmit={e => this.handleSubmit(e)}
			>
				{this.props.formGroups.map(v => (
					<FormInputLabel
						type={v.type}
						name={v.name}
						class={v.class}
						placeholder={v.placeholder}
						handler={e => this.handleChange(e)}
					/>
				))}
				<FormButton
					type={this.props.button.type}
					className={this.props.button.class || ""}
					text={this.props.button.text}
				/>
			</Form>
		);
	}
}

class FormInputLabel extends Component {
	render() {
        let text = this.props.name[0].toUpperCase() + this.props.name.substr(1)
        return (
			<FormGroup className={this.props.class || ""}>
				<Label for={this.props.name}>{text}</Label>
				<Input
					type={this.props.type}
					name={this.props.name}
					placeholder={this.props.placeholder || ""}
					onChange={e => this.props.handler(e)}
				/>
			</FormGroup>
		);
	}
}

class FormButton extends Component {
	render() {
		return (
			<React.Fragment>
				<Button
					type={this.props.type}
					className={this.props.class || ""}
				>
					{this.props.text}
				</Button>
			</React.Fragment>
		);
	}
}

export default FormWrapper