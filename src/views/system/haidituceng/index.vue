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

      <el-form-item label="水域类型" prop="waters">
        <el-select v-model="queryParams.waters" placeholder="请选择水域类型" clearable>
          <el-option
            v-for="dict in dict.type.water_type2"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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
          v-hasPermi="['system:haidituceng:remove']"
        >删除</el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="haiditucengList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index"  label="序号" />

      <el-table-column label="姓名" align="center" prop="name" />

      <el-table-column label="手机号码" align="center" prop="phone" />
      <el-table-column label="省" align="center" prop="province" />
      <el-table-column label="市" align="center" prop="city" />
      <el-table-column label="区" align="center" prop="area" />
      <el-table-column label="水域类型" align="center" prop="waters">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.water_type2" :value="scope.row.waters"/>
        </template>
      </el-table-column>
      <el-table-column label="面积" align="center" prop="extent" />

      <el-table-column label="增养殖物种类1" align="center" prop="breedingSpecies" />
      <el-table-column label="增养殖物种类2" align="center" prop="fish">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.breed_type" :value="scope.row.fish"/>
        </template>
      </el-table-column>
      <el-table-column label="年产量" align="center" prop="annualOutput" />

      <el-table-column label="销售规格" align="center" prop="annualOutputType" />
      <el-table-column label="销售平均价格" align="center" prop="sellingPrice" />
      <el-table-column label="主要产品的比例" align="center" prop="annualOutputProportion" />
      <el-table-column label="年投放量" align="center" prop="annualRelease" />
      <el-table-column label="投放规格" align="center" prop="annualReleaseType" />
      <el-table-column label="苗种平均价格" align="center" prop="seedlingPrice" />
      <el-table-column label="苗种中鲢：鳙：其他比例" align="center" prop="annualReleaseProportion" />
      <el-table-column label="备注" align="center" prop="remark" />
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
            v-hasPermi="['system:reservoir:edit']"
          >审核</el-button>



          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:haidituceng:remove']"
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

    <!-- 添加或修改 海底滩涂增养殖技术经济资源信息共享系统对话框 -->
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
import { listHaidituceng, getHaidituceng, delHaidituceng, addHaidituceng, updateHaidituceng } from "@/api/system/haidituceng";

export default {
  name: "Haidituceng",
  dicts: ['water_type2', 'area_unit', 'breed_type','sys_check_status','fish_type', 'unit_type','unit_type2','water_type'],
  data() {
    return {
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
      //  海底滩涂增养殖技术经济资源信息共享系统表格数据
      haiditucengList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        userLevel: null,
        phone: null,
        province: null,
        city: null,
        area: null,
        waters: null,
        extent: null,
        extentDanwei: null,
        breedingSpecies: null,
        fish: null,
        annualOutput: null,
        annualOutputDanwei: null,
        annualOutputType: null,
        sellingPrice: null,
        annualOutputProportion: null,
        annualRelease: null,
        annualReleaseType: null,
        seedlingPrice: null,
        annualReleaseProportion: null,
        type: null,
        userId: null
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
    /** 查询 海底滩涂增养殖技术经济资源信息共享系统列表 */
    getList() {
      this.loading = true;
      listHaidituceng(this.queryParams).then(response => {
        this.haiditucengList = response.rows;
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
        userLevel: null,
        phone: null,
        province: null,
        city: null,
        area: null,
        waters: null,
        extent: null,
        extentDanwei: null,
        breedingSpecies: null,
        fish: null,
        annualOutput: null,
        annualOutputDanwei: null,
        annualOutputType: null,
        sellingPrice: null,
        annualOutputProportion: null,
        annualRelease: null,
        annualReleaseType: null,
        seedlingPrice: null,
        annualReleaseProportion: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        type: null,
        userId: null
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
      this.title = "添加 海底滩涂增养殖技术经济资源信息共享系统";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getHaidituceng(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改 海底滩涂增养殖技术经济资源信息共享系统";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateHaidituceng(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addHaidituceng(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除 海底滩涂增养殖技术经济资源信息共享系统编号为"' + ids + '"的数据项？').then(function() {
        return delHaidituceng(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/haidituceng/export', {
        ...this.queryParams
      }, `haidituceng_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
