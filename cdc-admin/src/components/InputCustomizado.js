import React, { Component } from 'react';
import PubSub from 'pubsub-js';
export class InputCustomizado extends Component {

    constructor() {
        super();
        this.state = { msgErro: '' };
    }

    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input   {...this.props} />
                <span className="erro">{this.state.msgErro.toString()}</span>
            </div>
        );
    }

    componentDidMount() {
        PubSub.subscribe("erro-validacao", function (topico, erro) {
            if (erro.param === this.props.name) {
                this.setState({ msgErro: erro.msg });
            }
        }.bind(this));
        PubSub.subscribe("limpa-erros", function (topico) {
            this.setState({ msgErro: '' });
        }.bind(this));
    };
}


