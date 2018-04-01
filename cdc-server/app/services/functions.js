function autores(res, AutorDAO) {
    AutorDAO.autores((err, result) => {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(result);
    });
}
