// import express from "express";
// import { testPostcontroller } from "../controller/testController.js";
// import userAuth from "../middelwares/authMiddleware.js";


// // router object 
// const router = express.Router();

// router.post("/test-post",testPostcontroller);

// export default router;
import express from 'express';
import { testPostcontroller } from '../controller/testController.js';
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: test
 *   description: API endpoints for testing
 */

/**
 * @swagger
 * /test/test-post:
 *   post:
 *     summary: Test post endpoint
 *     tags: [test]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Test post endpoint successful
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.post('/test-post', userAuth, testPostcontroller);

export default router;
