import connectDatabase from "../database.js";
import { Book } from "../entities/Book.js";

const dataSource = await connectDatabase();
var bookRepository = dataSource.getRepository(Book);

const getAllBooks = async (req, res) => {
  try {
    const books = await bookRepository.find();
    return res.json(books);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const book= await bookRepository.save(req.body);
    return res.status(201).json(book.id);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBook = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await bookRepository.findOne({
      where: {
        id: id
      }
    });
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await bookRepository.findOneBy({
      id: req.params.id,
    });

    await bookRepository.merge(book, req.body);
    const result = await bookRepository.save(book);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    await bookRepository.delete(id);
    return res.status(204).json({message: "deleted successfully."});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



export { getAllBooks, createBook, getBook, updateBook, deleteBook };

