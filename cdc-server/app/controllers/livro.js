module.exports = app => {

    let controller = {};

    controller.loadLivros = (req, res) => {
        const cn = app.config.neDbLivro;
        const LivroDAO = new app.app.daos.Livro(cn);

        LivroDAO.loadLivros((error, result) => error ? res.send(error) : res.send(result));
    }


    controller.getLivros = (req, res) => {
        const cn = app.config.neDbLivro;
        const LivroDAO = new app.app.daos.Livro(cn);
        getLivros(res, LivroDAO);
    }

    controller.addLivro = async (req, res) => {
        const cn = app.config.neDbLivro;
        const LivroDAO = new app.app.daos.Livro(cn);
        req.checkBody('titulo', 'titulo é obrigatorio').notEmpty();
        req.checkBody('preco', 'valor precisa ser numerico').isNumeric();  
        req.checkBody('preco', 'preco é obrigatorio').notEmpty();

        req.checkBody('autor', ' autor é obrigatorio').notEmpty();

        if (req.validationErrors()) {
            res.status(400).json(req.validationErrors());
            return;
        }
        
        // tem que validar se o memos possui o preco com .00 no final se não devolver informando que é necessário
        // informar o mesmo
        const cna = app.config.neDbAutor;
        const AutorDAO = new app.app.daos.Autor(cna);
        let autor = null;
        try {
            autor = await AutorDAO.findAutor(req.body.autor);
        } catch (error) {
            res.status(400).json(error)
        }
        let livro = req.body;
        livro.autor = autor[0];
        LivroDAO.addLivro(livro, (error, resutl) => {
            if (error)
                res.status(400).json(error);
            else
                getLivros(res, LivroDAO);

        });

    }

    return controller;

    function getLivros(res, dao) {
        dao.getLivros((error, result) => {
            if (error)
                res.status(400).json(error);
            else
                res.status(200).json(result);
        });
    }

}