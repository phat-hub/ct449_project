const BookService = require("../services/book.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the book"));
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const bookService = new BookService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await bookService.findByName(name);
        } else {
            documents = await bookService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving books"));
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Book not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving book with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Book not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error updating book with id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Book not found"));
        }
        return res.send({ message: "Book was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Could not delete book with id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const deletedCount = await bookService.deleteAll();
        return res.send({
            message: `${deletedCount} books were deleted successfully`,
        });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while removing all books"));
    }
};

exports.checkMasach = async (req, res, next) => {
    try {
        const { masach } = req.body;
        if (!masach) {
            return next(new ApiError(400, "Thiếu mã sách"));
        }

        const bookService = new BookService(MongoDB.client);
        const exists = await bookService.checkMasach(masach);

        return res.send({
            exists,
            message: exists ? "Mã sách đã tồn tại" : "Mã sách chưa tồn tại",
        });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while checking masach"));
    }
};
exports.checkManxb = async (req, res, next) => {
    try {
        const { manxb } = req.body;
        if (!manxb) {
            return next(new ApiError(400, "Thiếu mã nhà xuất bản"));
        }

        const bookService = new BookService(MongoDB.client);
        const exists = await bookService.checkManxbInBooks(manxb);

        return res.send({
            exists,
            message: exists ? "Mã nhà xuất bản này đã được sử dụng trong mã sách" : "Mã nhà xuất bản này chưa được sử dụng",
        });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while checking manxb"));
    }
};
