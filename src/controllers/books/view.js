import Book from "../../models/book";
export const view = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({
                message: 'Book not found',
            });
        }
        return res.status(200).json({
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
};
