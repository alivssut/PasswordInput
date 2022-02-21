import React, {Component, Fragment, useState} from "react";
import Input from "../Components/Input";
import Bar from "../Components/Bar";
import zxcvbn from 'zxcvbn'

class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestion: "",
            result :"Enter Your Password",
            strength: this.props.strength,
            color :"",
            index : 0,
            width : 0

        }
    }
    updateContent = (val) => {
        var text_ = "";
        text_ = val
        this.state.suggestion = "sd"

        if (text_ === '') {
            this.setState({
                result : "Enter Your Password",
                width : 0 ,
                suggestion : ""
            })
        } else {
            let result = zxcvbn(text_);
            let score = result.score;
            let feedback = result.feedback.suggestions
            let totalStates = 5;
            let division = 700 / totalStates;
            let width = (score + 1) * division;
            this.setState({
                index : score,
                color : this.state.strength[score].bgColor,
                result : this.state.strength[score].text,
                width : width,
                suggestion : feedback
            })
        }
    }

    render() {
        return (
            <div>
                <Input onChange={event => this.updateContent(event.target.value)} type={"password"}></Input>
                <Bar width={this.state.width} height={6} bgColor={this.state.color}></Bar>
                <div id={"result"}>{this.state.result}</div>
                <div id={"suggestion"}>{this.state.suggestion}</div>
            </div>
        )
    }
}
export default Password;
