import connectDatabase from "../database.js";
import { Wishlist } from "../entities/Wishlist.js";
import { Book } from "../entities/Book.js";

const dataSource = await connectDatabase();
const wishlistRepository = dataSource.getRepository(Wishlist);
const bookRepository = dataSource.getRepository(Book);

const addToWishlist = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.body;

  try {
    const book = await bookRepository.findOne({ where: { id: bookId } });
    if (!book) return res.status(404).json({ message: "Book not found" });

    const alreadyInWishlist = await wishlistRepository.findOne({
      where: { user: { id: userId }, book: { id: bookId } },
    });

    if (alreadyInWishlist) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    const wishlistItem = wishlistRepository.create({
      user: { id: userId },
      book: { id: bookId },
    });

    await wishlistRepository.save(wishlistItem);
    res.status(201).json({ message: "Book added to wishlist" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getWishlist = async (req, res) => {
  const userId = req.user.id;
  try {
    const wishlist = await wishlistRepository.find({
      where: { user: { id: userId } },
      relations: ["book"],
    });
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeFromWishlist = async (req, res) => {
  const userId = req.user.id;
  const bookId = parseInt(req.params.bookId, 10);

  try {
    await wishlistRepository.delete({ user: { id: userId }, book: { id: bookId } });
    res.status(200).json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { addToWishlist, getWishlist, removeFromWishlist };
