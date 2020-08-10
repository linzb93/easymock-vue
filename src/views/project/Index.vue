<template>
  <div class="wrapper">
    <p>{{meta.title}}</p>
    <p>接口前缀：{{prefix}}</p>
    <p>项目id: {{project_id}}</p>
    <div class="table-filter">
      <el-button type="primary" @click="add">添加接口</el-button>
      <el-button type="primary" @click="exportProject">导出接口</el-button>
    </div>
    <el-table :border="true" :data="tableData">
      <el-table-column label="名称" prop="name" />
      <el-table-column label="地址" prop="url" />
      <el-table-column label="方法" prop="type">
        <template slot-scope="scope">
          <el-tag :color="typeMap[scope.row.type]" effect="dark">{{scope.row.type}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="table-opr-wrap">
            <el-button type="primary" size="small" @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="primary" size="small" @click="clone(scope.row.id)">复制</el-button>
            <el-button type="primary" size="small" @click="copyToClipboard(scope.row.url)">复制接口地址</el-button>
            <el-button type="danger" size="small" @click="deleteApi(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev,pager,next"
      :total="total"
      :page-size="pageSize"
      @current-change="changePage"
      style="margin-top: 10px;"
      />
  </div>
</template>

<script>
import copy from 'copy-to-clipboard';
import router from '@/router';
import {getProjectDetail} from '@/services/project';
import {cloneApi, deleteApi, getApiPage} from '@/services/api';
import {port} from '@/services/entry';

export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      total: 0,
      pageSize: 1,
      project_id: this.$route.params.project_id,
      meta: {},
      typeMap: {
        get: '#409EFF',
        post: '#67C23A',
        delete: '#F56C6C',
        patch: '#E6A23C',
        put: '#909399'
      }
    }
  },

  computed: {
    prefix() {
      return `http://${window.location.hostname}:${port}/mock/${this.project_id}${this.meta.prefix}`;
    }
  },

  mounted() {
    this.getPage(1);
    getProjectDetail({
      id: this.project_id
    })
    .then(({data}) => {
      this.meta = data.data;
    })
  },

  methods: {
    // 获取api分页
    getPage(num) {
      getApiPage({
        project_id: this.project_id,
        size: this.pageSize,
        page: num
      })
      .then(res => {
        const {data} = res;
        this.tableData = data.data.list;
        this.total = data.data.total;
      });
    },
    // 翻页
    changePage(page) {
      this.getPage(page);
    },
    // 复制api
    clone(id) {
      cloneApi({
        id,
        project_id: this.project_id
      })
      .then(() => {
        this.$message.success('复制成功');
      })
    },
    // 复制接口地址
    copyToClipboard(url) {
      copy(`${window.location.hostname}:${port}/mock/${this.project_id}${this.meta.prefix}${url}`);
      this.$message.success('接口复制成功');
    },
    // 删除api
    deleteItem(id) {
      deleteApi({
        id
      })
      .then(() => {
        this.$message.success('删除成功');
      });
    },
    // 添加api
    add() {
      router.push(`/project/${this.project_id}/create`);
    },
    // 编辑api
    edit(id) {
      router.push(`/project/${this.project_id}/update/${id}`);
    },
    // 导出项目
    exportProject() {}
  }
}
</script>

<style>

</style>