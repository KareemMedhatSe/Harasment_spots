import express from 'express'
import { post_harassment ,get_all_harassments} from '../controllers/harassments.js'
const router =express.Router()
router.post('/',post_harassment)
router.get('/',get_all_harassments)
export default router