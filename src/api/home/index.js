import vue from 'vue';
const vm = new vue();

export default {
  // 获取课程列表
  getCourse(params) {
    return vm.$getRequest('get', '/course', params);
  },

  // 获取学生列表
  getStudent(params) {
    return vm.$getRequest('get', '/student', params);
  },

  // 新增课程
  addCourse(params) {
    return vm.$getRequest('post', '/savecourse', params);
  },

  // 新增学生
  addStudent(params) {
    return vm.$getRequest('post', '/savestudent', params);
  },

  // 移除指定课程
  deleteCourse(params) {
    return vm.$getRequest('delete', '/deleteCourse/{id}', params);
  },

  // 获取指定课程详情
  getCourseDetail(params) {
    return vm.$getRequest('get', '/getCourseDetail/{id}', params);
  },
};