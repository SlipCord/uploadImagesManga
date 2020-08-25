import express from 'express';
import update from './update/update';
const router = express.Router();
router.use("/update",update);
export default router ;