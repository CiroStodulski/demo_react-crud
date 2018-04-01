import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';
export class SelectCustomizado extends Component {

    constructor() {
        super();
        this.state = { msgErro: '', autores: [] };
    }
    componentWillMount() {
        $.ajax({
            url: "http://localhost:8080/api/autores",
            dataType: 'json',
            success: function (resposta) {
                this.setState({ autores: resposta });
            }.bind(this)
        });
    }
    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <select name={this.props.name} id={this.props.id} onChange={this.props.onChange} >
                    <option value="">Selecione autor</option>
                    {
                        this.state.autores.map((autor) => {
                            return <option key={autor._id} value={autor._id}>{autor.nome}</option>
                        })
                    }
                </select>
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


