module.exports = app => {

    const controller = app.app.controllers.autor;

    app.get('/api/loadingBd', controller.loadingBd);

    app.route('/api/autores')
        .get(controller.autores)
        .post(controller.incluirAutor);

}