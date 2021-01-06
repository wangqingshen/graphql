<template>
  <div
    id="b"
    class="main-container home"
    name="aaa"
    data-name="dsds"
    data-id="222"
  >
    <h1
      :style="{
        fontSize: '24px',
        textAlign: 'center',
        paddingTop: '15px',
        fontWeight: 'bold'
      }"
    >
      graphql演示
    </h1>
    <a-row :style="{ padding: '20px' }" :gutter="16">
      <a-col :span="12">
        <a-card title="课程列表">
          <a-list
            :loading="courseLoading"
            item-layout="horizontal"
            :data-source="courseList"
          >
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-list-item-meta>
                <div slot="title">
                  <div>{{ `课程名：${item.title}` }}</div>
                  <div>{{ `作者：${item.author}` }}</div>
                </div>
                <p slot="description">
                  {{ item.desc }}
                  <a-button @click="delCourse(item._id)">删除</a-button>
                  <a-button @click="getCourseDetail(item._id)">详情</a-button>
                </p>
                <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="学生列表">
          <a-list
            :loading="studentLoading"
            item-layout="horizontal"
            :data-source="studentList"
          >
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-list-item-meta>
                <div slot="title">
                  <div>{{ `姓名：${item.name}` }}</div>
                  <div>{{ `性别：${item.sex}` }}</div>
                  <div>{{ `年龄：${item.age}岁` }}</div>
                </div>
                <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
    <a-row :style="{ padding: '10px 20px' }" :gutter="16">
      <a-col>
        <a-button type="primary" class="r10" @click="handleAdd(1)">
          添加课程
        </a-button>
        <a-button class="r10" @click="handleAdd(2)"> 添加学生 </a-button>
      </a-col>
    </a-row>
    <a-row :style="{ padding: '5px 20px' }" :gutter="16">
      <a-col>
        <a-button type="primary" class="r10" @click="getCourseList">
          常规获取课程列表
        </a-button>
        <a-button class="r10" @click="getStudentList">
          常规获取学生列表
        </a-button>
        <a-button type="danger" @click="gqlList"> 一键获取所有列表 </a-button>
      </a-col>
    </a-row>
    <a-drawer
      width="400"
      :title="`添加${type === 1 ? '课程' : '学生'}`"
      placement="left"
      :closable="true"
      :visible="visible"
      @close="onClose"
    >
      <a-spin :spinning="gLoading">
        <a-form
          :form="form"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <template v-if="type === 1">
            <a-form-item label="课程名称">
              <a-input
                v-decorator="[
                  'title',
                  {
                    rules: [{ required: true, message: '请输入课程名称' }]
                  }
                ]"
              />
            </a-form-item>
            <a-form-item label="课程描述">
              <a-input
                v-decorator="[
                  'desc',
                  {
                    rules: [{ required: true, message: '请输入课程描述' }]
                  }
                ]"
                type="textarea"
              />
            </a-form-item>
            <a-form-item label="作者">
              <a-input
                v-decorator="[
                  'author',
                  {
                    rules: [{ required: true, message: '请输入作者' }]
                  }
                ]"
              />
            </a-form-item>
            <a-form-item label="课程总页数">
              <a-input
                v-decorator="[
                  'page',
                  {
                    rules: [{ required: true, message: '请输入课程总页数' }]
                  }
                ]"
              />
            </a-form-item>
          </template>
          <template v-else>
            <a-form-item label="学生名称">
              <a-input
                v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: '请输入学生名称' }]
                  }
                ]"
              />
            </a-form-item>
            <a-form-item label="学生性别">
              <a-select
                v-decorator="[
                  'sex',
                  {
                    rules: [{ required: true, message: '请选择学生性别' }]
                  }
                ]"
                placeholder="请选择"
              >
                <a-select-option value="男生"> 男生 </a-select-option>
                <a-select-option value="女生"> 女生 </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="年龄">
              <a-input
                v-decorator="[
                  'age',
                  {
                    rules: [{ required: true, message: '请输入学生年龄' }]
                  }
                ]"
              />
            </a-form-item>
          </template>
          <a-form-item :wrapper-col="{ span: 18, offset: 6 }">
            <a-button type="primary" class="r10" @click="onSubmit(1)">
              常规添加
            </a-button>
            <a-button type="danger" @click="onSubmit(2)"> gql添加 </a-button>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-drawer>
  </div>
</template>
<script>
import gql from 'graphql-tag';
const COURSE_DETAIL = gql`
  query($id: ID!) {
    getCourseDetail(id: $id) {
      title
      page
      desc
      _id
    }
  }
`;
const QUERY_LIST = gql`
  query {
    getCourse {
      page
      author
      desc
      _id
    }
    getStudent {
      name
      sex
      age
      _id
    }
  }
`;
export default {
  name: 'index',
  data() {
    return {
      courseLoading: false,
      studentLoading: false,
      courseList: [],
      studentList: [],
      type: 1,
      drawerTitle: '',
      visible: false,
      gLoading: false
    };
  },
  // apollo: {
  //   getCourse: {
  //     query: QUERY_LIST
  //   }
  // },
  computed: {},
  watch: {},
  created() {},
  beforeMount() {
    this.form = this.$form.createForm(this, { name: 'form' });
  },
  methods: {
    async delCourse(id) {
      this.courseLoading = true;
      try {
        this.$api.deleteCourse({
          id: id
        });
        this.$message.success('删除成功');
        this.getCourseList();
      } catch (e) {}
      this.courseLoading = false;
    },
    async getCourseDetail(id) {
      // this.$api.getCourseDetail({
      //   id: id
      // });
      this.$apollo.query({
        query: COURSE_DETAIL,
        fetchPolicy: 'network-only',
        variables: {
          id: id
        }
      });
    },
    sqlAddCourse(values) {
      let { title, desc, page, author } = values;
      this.$apollo.mutate({
        mutation: gql`
          mutation {
            addCourse (post: {
              title: "${title}"
              desc: "${desc}"
              page: ${page}
              author: "${author}"
            }) {
              title
              desc
              page
              author
            }
          }`
      });
    },

    sqlAddStudent(values) {
      let { name, sex, age } = values;
      this.$apollo.mutate({
        mutation: gql`
          mutation {
            addStudent (post: {
              name: "${name}"
              sex: "${sex}"
              age: ${age}
            }) {
              name
              sex
              age
            }
          }`
      });
    },

    async getCourseList() {
      this.courseLoading = true;
      try {
        let res = await this.$api.getCourse();
        let { data } = res;
        this.courseList = [...data];
      } catch (e) {}
      setTimeout(() => {
        this.courseLoading = false;
      }, 500);
    },

    async getStudentList() {
      this.studentLoading = true;
      try {
        let res = await this.$api.getStudent();
        let { data } = res;
        this.studentList = [...data];
      } catch (e) {}
      setTimeout(() => {
        this.studentLoading = false;
      }, 500);
    },

    onSubmit(type) {
      this.form.validateFields(async (err, values) => {
        if (err) return;
        this.gLoading = true;
        try {
          if (this.type === 1) {
            if (type === 1) {
              await this.$api.addCourse(values);
            } else {
              await this.sqlAddCourse(values);
            }
          } else {
            if (type === 1) {
              await this.$api.addStudent(values);
            } else {
              await this.sqlAddStudent(values);
            }
          }
          this.$message.success('新增成功');
          this.onClose();
        } catch (e) {}
        this.gLoading = false;
      });
    },

    async gqlList() {
      this.studentLoading = true;
      this.courseLoading = true;
      try {
        let res = await this.$apollo.query({
          query: QUERY_LIST,
          fetchPolicy: 'network-only'
        });
        let { getCourse, getStudent } = res.data;
        this.courseList = [...getCourse];
        this.studentList = [...getStudent];
      } catch (e) {}
      setTimeout(() => {
        this.studentLoading = false;
        this.courseLoading = false;
      }, 500);
    },

    handleAdd(type) {
      this.type = type;
      this.visible = true;
    },

    onClose() {
      this.visible = false;
    }
  }
};
</script>
<style lang="less" scoped>
.r10 {
  margin-right: 10px;
}
.test-span {
  color: @default-color;
}
</style>