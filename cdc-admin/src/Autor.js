import React, { Component } from 'react';
import { InputCustomizado } from './components/InputCustomizado';
import { SubmitCustotmizado } from './components/submitCustomizado';
import PubSub from 'pubsub-js'
import $ from 'jquery';
import { TratadorDeErros } from './TratadorDeErros';

class FormularioAutor extends Component {
    constructor() {
        super();
        this.state = { nome: '', senha: '', email: '' }
        this.enviaForm = this.enviaForm.bind(this);
        this.setSenha = this.setSenha.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
    }
    enviaForm(event) {
        event.preventDefault();
        $.ajax({
            url: 'http://localhost:8080/api/autores',
            dataType: 'json',
            type: 'post',
            data: { nome: this.state.nome, senha: this.state.senha, email: this.state.email },
            success: (response) => {
                PubSub.publish('atualiza-lista', response);
            },
            error: (err) => {
                new TratadorDeErros().publicaErros(err.responseJSON);
            },
            beforeSend: function () {
                PubSub.publish("limpa-erros", {});
            }
        });
    }
    setNome(evento) {
        this.setState({ nome: evento.target.value });
    }

    setEmail(evento) {
        this.setState({ email: evento.target.value });
    }

    setSenha(evento) {
        this.setState({ senha: evento.target.value });
    }

    render() {
        return (
            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome" />
                <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email" />
                <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha" />
                <SubmitCustotmizado label='Cadastrar' />
            </form>
        );
    };

}

class TabelaAutor extends Component {

    render() {
        return (
            <table className="pure-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.lista.map((autor) => {
                            return (
                                <tr key={autor._id}>
                                    <td>{autor.nome}</td>
                                    <td>{autor.email}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }

}

export default class AutorBox extends Component {
    constructor() {
        super();
        this.state = { lista: [] };
    }
    componentDidMount() {
        $.ajax({
            url: 'http://localhost:8080/api/autores',
            dataType: 'json',
            success: (result) => {
                this.setState({ lista: result })
            }
        });
        PubSub.subscribe('atualiza-lista', (topico, novaLista) => {
            this.setState({ lista: novaLista });
        });
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de autores</h1>
                </div>
                <div className="content" id="content">
                    <FormularioAutor />
                    <TabelaAutor lista={this.state.lista} />
                </div>

            </div>
        );
    }

}