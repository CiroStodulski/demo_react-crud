module.exports = app => {

    let controller = {};

    controller.loadingBd = (req, res) => {
        const cn = app.config.neDbAutor;
        const AutorDAO = new app.app.daos.Autor(cn);
        AutorDAO.loadingBd((err, result) => {
            if (err)
                res.send(err);
            else
                res.send(result);
        });
    }

    controller.autores = (req, res) => {
        const cn = app.config.neDbAutor;
        const AutorDAO = new app.app.daos.Autor(cn);
        autores(res, AutorDAO);
    }

    controller.incluirAutor = (req, res) => {
        const cn = app.config.neDbAutor;
        const AutorDAO = new app.app.daos.Autor(cn);

        req.checkBody('nome', 'nome não pode ser vazio').notEmpty();
        req.checkBody('senha', 'senha não pode ser vazio').notEmpty();
        req.checkBody('email', 'email não pode ser vazio').notEmpty();

        if (req.validationErrors()) {
            res.status(400).json(req.validationErrors());
            return;
        }

        AutorDAO.incluirAutor(req.body, (err, result) => {
            if (err)
                res.status(400).json(err);
            else
                autores(res, AutorDAO);
        });
    }

    return controller;

} 
// function generic
function autores(res, AutorDAO) {
    AutorDAO.autores((err, result) => {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(result);
    });
}
