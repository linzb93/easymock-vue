<template>
  <div class="wrapper">
    <div class="table-filter" style="text-align: left;">
      <el-button type="primary" @click="changeModalVisible('create', true)">添加项目</el-button>
      <el-button type="primary" @click="changeModalVisible('import', true)">导入项目</el-button>
    </div>
    <el-table
      style="width: 100%"
      :border="true"
      :data="tableData">
      <el-table-column
        prop="name"
        label="名称"
      >
        <template slot-scope="scope">
          <router-link :to="`/project/${scope.row.id}`" style="text-decoration: none;">
            <el-link type='primary'>{{scope.row.name}}</el-link>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="prefix"
        label="接口地址"
      />
      <el-table-column
        prop="count"
        label="接口数"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <div class="table-opr-wrap">
            <el-button type="primary" size="small" @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteItem(scope.row.id)">删除</el-button>
          </div>
      </template>
      </el-table-column>
    </el-table>
    <create-modal
      :id="id"
      v-if="createModalVisible"
      @close="submitted => closeModal(submitted, 'create')"
    />
    <import-modal
      v-if="importModalVisible"
      @close="submitted => closeModal(submitted, 'import')"
    />
  </div>
</template>

<script>
import {getProjectList, deleteProject} from '@/services/project';
import CreateModal from './Components/Create.vue';
import ImportModal from './Components/Import.vue';

export default {
  name: 'Index',
  components: {
    CreateModal,
    ImportModal
  },
  data() {
    return {
      tableData: [],
      createModalVisible: false, // 创建/更新项目 弹窗显示
      importModalVisible: false, // 导入项目 弹窗显示
      id:'' // 当前操作的项目id
    };
  },
  
  mounted() {
    this.loadProjectList();
  },

  methods: {
    // 加载项目列表
    loadProjectList() {
      getProjectList()
      .then(res => {
        this.tableData = res.data.data;
      });
    },
    // 改变弹窗显隐
    changeModalVisible(name, visible, curId) {
      if (name === 'create') {
        this.createModalVisible = visible;
        if (visible === true && curId) {
          this.id = curId;
        }
      } else if (name === 'import') {
        this.importModalVisible = visible;
      }
    },
    // 关闭弹窗
    closeModal(submitted, name) {
      this.changeModalVisible(name, false);
      if (submitted) {
        this.loadProjectList();
      }
    },
    // 编辑
    edit(id) {
      this.changeModalVisible('create', true, id);
    },
    // 删除项目
    deleteItem(id) {
      deleteProject({
        id
      })
      .then(() => {
        this.$message.success('删除成功');
        this.loadProjectList();
      });
    }
  }
}
</script>
