<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机号码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:fishing:remove']"
        >删除</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="fishingList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center"  type="index"  />
      <el-table-column label="姓名" align="center" prop="name" />
      <el-table-column label="手机号码" align="center" prop="phone" />
      <el-table-column label="省" align="center" prop="province" />
      <el-table-column label="市" align="center" prop="city" />
      <el-table-column label="区" align="center" prop="area" />
      <el-table-column label="捕捞水域" align="center" prop="fishingArea" />
      <el-table-column label="船籍港" align="center" prop="homePort" />

      <el-table-column label="作业方式" align="center" prop="jobWay">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.job_type" :value="scope.row.jobWay"/>
        </template>
      </el-table-column>
      <el-table-column label="捕捞种类" align="center" prop="fishingSpecies" />
      <el-table-column label="年产量" align="center" prop="annualOutput" />
      <el-table-column label="年油耗" align="center" prop="annualFuel" />
      <el-table-column label="燃油价值" align="center" prop="fuelValue" />
      <el-table-column label="船长" align="center" prop="shipLength" />
      <el-table-column label="主机功率" align="center" prop="hostPower" />
      <el-table-column label="年人工费" align="center" prop="annualLaborCost" />
      <el-table-column label="审核状态" align="center" prop="type" >
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_check_status" :value="scope.row.type"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">

          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            v-if="scope.row.type =='0'"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:fishing:edit']"
          >审核</el-button>


          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:fishing:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改捕捞技术经济资源信息共享系统对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="审核状态" prop="type">
          <el-select v-model="form.type" placeholder="请选择审核状态">
            <el-option
              v-for="dict in dict.type.sys_check_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listFishing, getFishing, delFishing, addFishing, updateFishing } from "@/api/system/fishing";
import { regionData, CodeToText, TextToCode  } from 'element-china-area-data'
export default {
  name: "Fishing",
  dicts: ['job_type','sys_check_status', 'sys_level'],

  data() {
    return {
	  options: regionData,
	  selectedOptions: [],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 捕捞技术经济资源信息共享系统表格数据
      fishingList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        phone: null,
        province: null,
        city: null,
        area: null,
        fishingArea: null,
        homePort: null,
        jobWay: null,
        fishingSpecies: null,
        annualOutput: null,
        annualFuel: null,
        fuelValue: null,
        shipLength: null,
        hostPower: null,
        annualLaborCost: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
	//省市区级联
	handleChange (value) {
	    var self = this;
	    var province = self.selectedOptions[0];
	    var city = self.selectedOptions[1];
	  	var area = self.selectedOptions[2];
	    // CodeToText属性是区域码，属性值是汉字 CodeToText['110000']输出北京市
	    self.form.province = CodeToText[province];
	    self.form.city = CodeToText[city];
	    self.form.area = CodeToText[area];
	    // console.log("选择的省市：", self.form.province, self.form.city ,self.form.area);
		// console.log(value)
	  },
    /** 查询捕捞技术经济资源信息共享系统列表 */
    getList() {
      this.loading = true;
      listFishing(this.queryParams).then(response => {
        this.fishingList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        name: null,
        phone: null,
        province: null,
        city: null,
        area: null,
        fishingArea: null,
        homePort: null,
        jobWay: null,
        fishingSpecies: null,
        annualOutput: null,
        annualFuel: null,
        fuelValue: null,
        shipLength: null,
        hostPower: null,
        annualLaborCost: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加捕捞技术经济资源信息共享系统";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getFishing(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改捕捞技术经济资源信息共享系统";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateFishing(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFishing(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除捕捞技术经济资源信息共享系统编号为"' + ids + '"的数据项？').then(function() {
        return delFishing(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/fishing/export', {
        ...this.queryParams
      }, `fishing_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
