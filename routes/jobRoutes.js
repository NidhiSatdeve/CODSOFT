
import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import {
  createJobController,
  deleteJobController,
  getAllJobsController,
  jobStatsController,
  updateJobController
} from '../controller/jobController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: API endpoints for job operations
 */

/**
 * @swagger
 * /jobs/create-job:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.post('/create-job', userAuth, createJobController);

/**
 * @swagger
 * /jobs/get-job:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of jobs retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.get('/get-job', userAuth, getAllJobsController);

/**
 * @swagger
 * /jobs/update-job/{id}:
 *   patch:
 *     summary: Update a job by ID
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the job to be updated
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.patch('/update-job/:id', userAuth, updateJobController);

/**
 * @swagger
 * /jobs/delete-job/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the job to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.delete('/delete-job/:id', userAuth, deleteJobController);

/**
 * @swagger
 * /jobs/job-stats:
 *   get:
 *     summary: Get job statistics
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Job statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.get('/job-stats', userAuth, jobStatsController);

export default router;
