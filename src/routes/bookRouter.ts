import {Router} from "express"
import { getBooks,addBooks, updateBooks,deleteBook } from "../controllers/bookController"
import { verifyToken } from "../utils/middleware"

const router = Router()

router.get("/get-books",verifyToken,getBooks)
router.post("/add-books",verifyToken,addBooks)
router.put("/update-books/:id",verifyToken,updateBooks)
router.delete("/delete-books/:id",deleteBook)

export default router