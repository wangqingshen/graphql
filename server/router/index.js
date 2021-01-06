const {
  saveInfo,
  fetchInfo
} = require('../controllers/info');
const {
  saveStudent,
  fetchStudent,
  fetchStudentDetail
} = require('../controllers/student');
const {
  saveCourse,
  fetchCourse,
  findCourse,
  deleteCourse
} = require('../controllers/course');

const router = require('koa-router')();

router.post('/saveinfo', saveInfo);
router.get('/info', fetchInfo);
router.post('/savestudent', saveStudent);
router.get('/student', fetchStudent);
router.get('/studentInfo', fetchStudentDetail);
router.post('/savecourse', saveCourse);
router.get('/course', fetchCourse);
router.get('/getCourseDetail/:id', findCourse);
router.delete('/deleteCourse/:id', deleteCourse);

module.exports = router;