import { Component } from 'react';
import PubSub from 'pubsub-js';

export class TratadorDeErros extends Component {
    publicaErros(erros) {
        erros.map((erro) => PubSub.publish("erro-validacao", erro));
    }
}