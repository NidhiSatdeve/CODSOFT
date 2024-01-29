import { query } from "express";
import jobModel from "../models/jobModel.js";
import mongoose from "mongoose";
//==========CREATE JOB=========
export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;

  if (!company || !position) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  req.body.createdBy = req.user.userId;

  try {
    const job = await jobModel.create(req.body);
    res.status(201).json({ job });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};
//======= GET JOB========
export const getAllJobsController = async(req,res, next) => {
  const {status, workType, search} = req.query
  //conditions for searching filters
  const queryObject = {
    createdBy : req.user.userId
  }
//logic filters
if(status && status !=='all')
{
queryObject.status = status;
}
if(workType && workType !== 'all')
{
  queryObject.workType = workType;
}
if(search )
{
  queryObject.position = {$regrex: search, $options: 'i'};
}
let  queryResult = jobModel.find(queryObject);
//sort
if(sort === 'latest')
{
  queryResult = queryResult.sort('-createrAt')
}
if(sort === 'oldest')
{
  queryResult = queryResult.sort('createrAt')
}
if(sort === 'a-z')
{
  queryResult = queryResult.sort('position')
}
if(sort === 'A-Z')
{
  queryResult = queryResult.sort('-position')
}
//pagination
const page = Number(req.query.page) || 1
const limit = Number(req.query.limits) || 10
const skip = (page - 1)* limit
queryResult = queryResult.skip(skip).limit(limit)
//jobs count
const totalJobs = await jobModel.countDocuments(queryResult)
const numOfPage = Math.ceil(totalJobs/limit)





const jobs = await queryResult;
   // const jobs = await jobModel.find({createdBy:req.user.userId })
    res.status(200).json({
        totalJobs,
        jobs,
        numOfPage,
    });
};
//========UPDATE JOBS=======
// export const updateJobController = async (req,res,next) =>
// {
// const {id} = req.params
// const  {company,position} = req.body
// //validation
// if(!company || !position)
// {
//   next('Please provide all fields')
// }
// //find job
// const job = await jobModel.findOne({_id:id},req.body,
// {
//   new : true,
//   runValidators: true,
// });
// res.status(200).json({updateJob});
// }
// Import necessary modules and models

export const updateJobController = async (req, res, next) => {
  try {
    // Retrieve job ID from request parameters
    const jobId = req.params.id;

    // Check if jobId is valid (you should validate it according to your use case)

    // Retrieve updated data from request body
    const updatedData = req.body;

    // Update the job using the job model and jobId
    const updatedJob = await jobModel.findByIdAndUpdate(jobId, updatedData, { new: true });

    // Check if the job was found and updated
    if (!updatedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Send a success response with the updated job data
    res.status(200).json({ success: true, updatedJob });
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//======== DELETE JOB========
// export const deleteJobController = async(req,res,next) =>
// {
// const {id} = req.params;
// const job = await jobModel.findOne({_id: id});
// if(!job)
// {
//   next(`No job found with this Id ${id}`);
// }
// if(req.user.userId !== job.createdBy.toString())
// {
//   next("You are not Authorized to delete thisjob");
//   return;
// }
// await job.deleteOne();
// res.status(200).json({message: "Success, Job Deleted"});
// };
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const job = await jobModel.findOne({ _id: id });

    if (!job) {
      return res.status(404).json({ error: `No job found with this Id ${id}` });
    }

    if (req.user.userId !== job.createdBy.toString()) {
      return res.status(403).json({ error: "You are not authorized to delete this job" });
    }

    await job.deleteOne();
    res.status(200).json({ message: "Success, Job Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//===========JOB STATS $ FILTERS ===========
export const jobStatsController = async(req,res)=>
{
const stats = await jobModel.aggregate([
  {
   $match:
   {
    createdBy: new mongoose.Types.ObjectId(req.user.userId),
   },
   
  },
  {
    $group:
   {
    _id: "$status",
    count: {$sum: 1},
   },
  },
]);
//default stats
const defaultStats = 
{
  pending: stats.pending || 0,
  reject: stats.reject || 0,
  interview: stats.interview || 0,
};
// monthly yearly stats
let monthlyApplication = await jobModel.aggregate
(
[
  {
    $match:
    {
      createdBy: new mongoose.Types.ObjectId(req.user.userId)
    }
  },
  {
    $group:
    {
      _id:{
        year: {$year: '$createdAt'},
        month:{$month: '$createdAt'},
      },
      count:
      {
        $sum: 1,
      },
    },
  },
]
);
monthlyApplication = monthlyApplication.map(item =>
  {
    const {_id:{year,month},count} = item
    const date = moment()
    .month(month - 1)
    .year(year)
    .format('MMM y')
    return {date,count};
  })
  .reverse();
res.status(200).json({totalJob: stats.length,defaultStats,monthlyApplication});
}
