<template>
  <div class="wrapper">
    <p>{{meta.title}}</p>
    <p>接口前缀：{{`http://${window.location.hostname}:${port}/mock/${meta.prefix}`}}</p>
    <p>项目id: {{project_id}}</p>
    <div class="table-filter">
      <el-button type="primary" @click="add">添加接口</el-button>
      <el-button type="primary" @click="exportProject">导出接口</el-button>
    </div>
    <el-table :border="true" :data="tableData">
      <el-table-column label="名称" prop="name" width="25%" />
      <el-table-column label="地址" prop="url" width="25%" />
      <el-table-column label="方法" prop="type" width="10%">
        <template slot-scope="scope">
          <el-tag :color="typeMap[scope.row.type]">{{scope.row.type}}</el-tag>
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
  </div>
</template>

<script>
import copy from 'copy-to-clipboard';
import router from '@/router';
import {cloneApi, deleteApi, getApiPage} from '@/services/api';
import {port} from '@/services/entry';

export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      project_id: this.$route.params.project_id,
      meta: {},
      typeMap: {
        get: 'blue',
        post: 'green',
        delete: 'red',
        patch: 'purple',
        put: 'cyan'
      }
    }
  },

  mounted() {
    this.getPage();
  },

  methods: {
    // 获取api分页
    getPage() {
      getApiPage({
        project_id: this.project_id,
        size: 10,
        page: 1
      })
      .then(res => {
        const {data} = res;
        this.tableData = data.data.list;
      });
    },
    // 复制api
    clone(id) {
      cloneApi({
        id
      })
      .then(() => {
        this.$message.success('复制成功');
      })
    },
    // 复制接口地址
    copyToClipboard(url) {
      copy(`${window.location.hostname}:${port}/mock/${this.meta.prefix}${url}`);
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
    }
  }
}
</script>

<style>

</style>