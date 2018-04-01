module.exports = app => {

    const controller = app.app.controllers.livro;

    app.route('/api/livros')
        .get(controller.getLivros)
        .post(controller.addLivro);

    app.get('/api/loadlivros', controller.loadLivros);
    
}