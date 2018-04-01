import React, { Component } from 'react';
import { InputCustomizado } from './components/InputCustomizado';
import { SubmitCustotmizado } from './components/submitCustomizado';
import PubSub from 'pubsub-js'
import $ from 'jquery';
import { TratadorDeErros } from './TratadorDeErros';
import { SelectCustomizado } from './components/selectCustomizado';

class FormularioLivro extends Component {
    constructor() {
        super();
        this.state = { titulo: '', preco: '', autor: '' }
        this.enviaForm = this.enviaForm.bind(this);

    }
    enviaForm(event) {
        event.preventDefault();
        $.ajax({
            url: 'http://localhost:8080/api/livros',
            dataType: 'json',
            type: 'post',
            data: { titulo: this.state.titulo, preco: this.state.preco, autor: this.state.autor },
            success: (response) => {
                PubSub.publish('atualiza-lista-livro', response);
            },
            error: (err) => {
                new TratadorDeErros().publicaErros(err.responseJSON);
            },
            beforeSend: function () {
                PubSub.publish("limpa-erros", {});
            }
        });
    }
    salvaAlteracao(nomeInput, evento) {
        var campoSendoAlterado = {};
        campoSendoAlterado[nomeInput] = evento.target.value;
        this.setState(campoSendoAlterado);
    }


    render() {
        return (
            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                <InputCustomizado id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.salvaAlteracao.bind(this,'titulo')}label="Titulo" />
                <InputCustomizado id="preco" type="text" name="preco" value={this.state.preco} onChange={this.salvaAlteracao.bind(this,'preco')}label="Preco" />
                <SelectCustomizado id="autor" name="autor"  onChange={this.salvaAlteracao.bind(this,'autor')} label="Autor" />
                <SubmitCustotmizado label='Cadastrar' />
            </form>
        );
    };

}

class TabelaLivro extends Component {

    render() {
        return (
            <table className="pure-table">
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Preco</th>
                        <th>Autor</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.lista.map((livro) => {
                            return (
                                <tr key={livro._id}>
                                    <td>{livro.titulo}</td>
                                    <td>{livro.preco}</td>
                                    <td>{livro.autor.nome}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }

}

export default class LivroBox extends Component {
    constructor() {
        super();
        this.state = { lista: [] };
    }
    componentDidMount() {
        $.ajax({
            url: 'http://localhost:8080/api/livros',
            dataType: 'json',
            success: (result) => {
                this.setState({ lista: result })
            }
        });
        PubSub.subscribe('atualiza-lista-livro', (topico, novaLista) => {
            this.setState({ lista: novaLista });
        });
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de Livro</h1>
                </div>
                <div className="content" id="content">
                    <FormularioLivro />
                    <TabelaLivro lista={this.state.lista} />
                </div>
            </div>
        );
    }

}