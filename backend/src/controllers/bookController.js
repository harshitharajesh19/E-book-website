import connectDatabase from "../database.js";
import { Book } from "../entities/Book.js";
import { User } from "../entities/User.js"; 
import multer from "multer";

const dataSource = await connectDatabase();
var bookRepository = dataSource.getRepository(Book);
var userRepository = dataSource.getRepository(User);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      console.log("Saving file to uploads");
      cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
      const uniqueName = Date.now() + "-" + file.originalname;
      cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage }).fields([
  { name: "coverImage", maxCount: 1 },
  { name: "bookFile", maxCount: 1 }
]);

// Middleware to handle file upload errors
const uploadMiddleware = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) return res.status(500).json({ message: "File upload failed" });
    next();
  });
};

const getAllBooks = async (req, res) => {
  try {
    const books = await bookRepository.find({ relations: ["owner"] });
    const formatted = books.map(book => ({
      ...book,
      owner_id: book.owner?.id || null,
    }));
    return res.json(formatted);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBooksByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const books = await bookRepository.find({
      where: {
        owner: { id: userId }},
      relations: ["owner"]
    });
    const formattedBooks = books.map(book => ({
      ...book,
      owner_id: book.owner?.id || null
    }));

    return res.status(200).json(formattedBooks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const createBook = async (req, res) => {
  try {
        // Get user ID from authenticated session (req.user is set by middleware)
        const userId = req.user.id;

        const { title, author, description } = req.body;
        const category = req.body.category?.trim();
        if (!title || !author ) {
            return res.status(400).json({ message: "Missing required fields!" });
        }

        // Save book with owner_id automatically assigned to logged-in user
        const coverImage = req.files?.coverImage?.[0]?.path || null;
        const bookFile = req.files?.bookFile?.[0]?.path || null;
        const book = await bookRepository.save({
            title,
            author,
            description, // Automatically set owner_id
            coverImage,
            file_url:bookFile,
            category,
            owner: { id: userId },
        });

        return res.status(201).json({ id: book.id, message: "Book uploaded successfully!" });
    } catch (error) {
        console.error("Error saving book:", error);
        return res.status(500).json({ message: error.message });
    }
};

const getBook = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const book = await bookRepository.findOne({ where: { id }, relations: ["owner"] });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await bookRepository.findOneBy({
      id: req.params.id});
    if (!book) {
      return res.status(404).json({ message: "Book not found" });    
    }
    await bookRepository.merge(book, req.body);
    const result = await bookRepository.save(book);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
      const bookId = req.params.id;
      const userId = req.user.id;
      const book = await bookRepository.findOne({ where: { id: bookId }, relations: ["owner"] });

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      await bookRepository.delete(bookId);
      return res.status(200).json({ message: "Book deleted successfully." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};



export { getAllBooks, getBooksByUserId, createBook, getBook, updateBook, deleteBook, uploadMiddleware };

