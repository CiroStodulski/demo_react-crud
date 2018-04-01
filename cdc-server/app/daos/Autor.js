class Autor {

    constructor(cn) {
        this._connection = cn;
    }

    loadingBd(callback) {
        let autores = [
            { nome: 'ciro', senha: '123', email: 'ciro@gmail.com' },
            { nome: 'yuri', senha: '123', email: 'yuri@gmail.com' },
            { nome: 'darlan', senha: '123', email: 'darlan@gmail.com' }
        ]
        this._connection.insert(autores, (err, result) => {
            callback(err, result)
        });
    }

    autores(callback) {
        this._connection.find({}, (err, result) => {
            callback(err, result);
        });
    }

    incluirAutor(autor, callback) {
        this._connection.insert(autor, (err, insert) => {
            callback(err, insert);
        })
    }

    findAutor(autor) {
        let result = new Promise((resolve, erro) => {
            this._connection.find({ _id: autor }, (err, result) => {
                if (err)
                    erro(err);
                else
                    resolve(result);
            });
        })
        return result;
    }

}

module.exports = () => Autor;