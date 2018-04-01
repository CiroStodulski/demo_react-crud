function Livro(cn) {

    this._cn = cn;

}

Livro.prototype.getLivros = function (callback) {
    this._cn.find({}, (err, result) => callback(err, result))
}

Livro.prototype.addLivro = function (livro, callback) {
    this._cn.insert(livro, (err, result) => callback(err, result));
}

Livro.prototype.loadLivros = function (callback) {
    let livros = [
        { titulo: 'o grande ciro', preco: '100.00', autor: { "nome": "yuri", "senha": "123", "email": "yuri@gmail.com", "_id": "HHS48EJODwJTR5PP" } },
        { titulo: 'o programador', preco: '85.00', autor: { "nome": "darlan", "senha": "123", "email": "darlan@gmail.com", "_id": "OwZzHPeTMZjvX8Fx" } }, ,
        { titulo: 'justiceiro', preco: '140.00', autor: { "nome": "ciro", "senha": "123", "email": "ciro@aluno.com", "_id": "Mh9jmDNBSF23K9aM" } }
    ]
    this._cn.insert(livros, (err, result) => callback(err, result))
}

module.exports = () => Livro;