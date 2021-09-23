//const { json } = require("express");
const { response } = require("express");
import Book from "../model/book";



export const searchByName = async function (req, res) {
    const themebooks = req.body.themebook;
    console.log(req.body.themebook)
    if (!themebooks) {
        return res.status(400).json({ error: "Parece que existe um campo vázio" });
    }
    
    await Book.findOne({ themebooks: new RegExp(themebooks, 'i') }, (err, data) => {
        if (err) {
            return res.status(400).json({error: "Não existe arquivos com estes nome"})
        } else {
            return res.status(200).json({data: data})
        }
    })
}


export const listallfiles = async function (req, res) {
   await  Book.find((err, data) => {
       if (err) {
           return res.status(400).json({ error: err });
       } else {
           return res.status(201).json({data: data})
        }
    })
}

export const listById = async function (req, res) {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ error: "Algo errado com o identicador" });
    }

    await Book.findById({ _id: id }).exec((err, data) => {
        if (err) {
            return res.status(400).json({error: err})
        } else {
            return res.status(200).json({data: data})
        }
    })
}

export const registerBook = async function (req, res) {

    const book = new Book({
        themebook: req.body.themebook,
        author: req.body.author,
        year: req.body.year,
        specialty: req.body.specialty,
        book: req.file.filename
    });

    book.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }else {
            return res.status(201).json({data: data})
        }
    })
}

export const deleteBook = async function (req, res) {
    const id = req.params.id;

    if (!req.params.id) {
        res.status(400).json({error: "Algo errado com o identificador"})
    }

    const user = await Book.findById(req.params.id);

    if (!user) {
        return res.status(400).json({error: "Este identificador não correspode com nenhum identicador cadastrado"})
    }

    await user.remove();
    res.status(200).json({data: "Data eliminado com sucesso"})

}


export const updatebook = async function (req, res) {
    
    const { themebook, author, year, specialty } = req.body;
    
    const { id } = req.params;
    //console.log(id)
    Book.findOne({ _id: id }, async (err, bookData) => {
        if (err || !bookData) {
            return res.status(400).json({ error: err });
        }

        if (!themebook) {
            return res.status(400).json({ error: "Tema o livro não pode estar vázio" });
        } else{
            bookData.themebook = themebook;
        }

        if (!author) {
            return res.status(400).json({ error: "Autor é um campo obrigatório, não pode estar vázio" });
        } else {
            bookData.author = author;
        }
        if (!year) {
            bookData.year = Date.now()
        } else {
            bookData.year = year;
        }
        

        if (!specialty) {
            return res.status(400).json({ error: "Especialidade é um campo obrigatório, não pode estar vázio" });
        } else {
            bookData.specialty = specialty;
        }

        if (!req.file.filename) {
            return res.status(400).json({ error: "Parece que nenhum livro foi carregado" });
        } else {
            bookData.book = req.file.filename;
        }

        await bookData.save((err, data) => {
            if (err) {
                return res.status(400).json({error: "Ocorreu erro, por favor tente novamente"})
            } else {
                return res.status(200).json({ data: data });
            }
        })


    })
}
