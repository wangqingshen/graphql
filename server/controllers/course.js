const mongoose = require('mongoose');

const Course = mongoose.model('Course');

const saveCourse = async (ctx, next) => {
  const opts = ctx.request.body;

  const course = new Course(opts);
  const saveCourse = await course.save();

  if (saveCourse) {
    ctx.body = {
      success: true,
      data: saveCourse,
      code: 200
    };
  } else {
    ctx.body = {
      success: false
    };
  }
};

const fetchCourse = async (ctx, next) => {
  const courses = await Course.find({});

  if (courses.length) {
    ctx.body = {
      success: true,
      data: courses,
      code: 200
    };
  } else {
    ctx.body = {
      success: false
    };
  }
};

const findCourse = async (ctx, next) => {
  let _id = mongoose.mongo.ObjectId(ctx.params.id);
  const findCourse = await Course.findOne({
    _id
  });
  if (findCourse) {
    ctx.body = {
      success: true,
      data: findCourse,
      code: 200
    };
  } else {
    ctx.body = {
      success: false
    };
  }
};

const deleteCourse = async (ctx, next) => {
  let _id = mongoose.mongo.ObjectId(ctx.params.id);
  const deleteCourse = await Course.deleteOne({
    _id
  });
  if (deleteCourse) {
    ctx.body = {
      success: true,
      code: 200
    };
  } else {
    ctx.body = {
      success: false
    };
  }
};

module.exports = {
  saveCourse,
  fetchCourse,
  findCourse,
  deleteCourse
};