<template>
  <div class="app-container" v-if="user.admin && user.userId == 1 || isShow">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="苗种规格" prop="seedlingSpecifications">
        <el-input
          v-model="queryParams.seedlingSpecifications"
          placeholder="请输入苗种规格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="养殖方式" prop="cultureMethod">
        <el-input
          v-model="queryParams.cultureMethod"
          placeholder="请输入养殖方式"
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
          v-if="user.admin && user.userId == 1"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:information:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          v-if="user.admin && user.userId == 1"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:information:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          v-if="user.admin && user.userId == 1"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:information:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:information:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
      <el-button
        type="warning"
        plain
        icon="el-icon-house"
        size="mini"
        @click="toHouse"
        v-if="user.userId != 1"
      >返回上一页
      </el-button>
    </el-row>

    <el-table v-loading="loading" :data="informationList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="唯一标识符" align="center" prop="id"/>
      <el-table-column label="水体类型" align="center" prop="waterType"/>
      <el-table-column label="水库名称" align="center" prop="reservoirName"/>
      <el-table-column label="水域面积" align="center" prop="waterArea"/>
      <el-table-column label="苗种规格" align="center" prop="seedlingSpecifications"/>
      <el-table-column label="苗种价格" align="center" prop="seedlingPrice"/>
      <el-table-column label="年投放量" align="center" prop="annualStockingVolume"/>
      <el-table-column label="销售规格" align="center" prop="salesSpecifications"/>
      <el-table-column label="销售平均价格" align="center" prop="averagePricePerSale"/>
      <el-table-column label="年产量" align="center" prop="annualProductionVolume"/>
      <el-table-column label="地理分区" align="center" prop="geographical"/>
      <el-table-column label="养殖方式" align="center" prop="cultureMethod"/>
      <el-table-column label="养殖阶段" align="center" prop="cultureStage"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width"
                       v-if="user.admin && user.userId == 1"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width"
                       v-else
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdateToShow(scope.row)"
          >查看
          </el-button>
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
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" :disabled="isDisabled">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="账号类型:" prop="selectUserType">
              <el-select v-model="selectUserType" placeholder="请选择账号类型" disabled style="width: 150px">
                <el-option
                  v-for="item in userType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地理分区:" prop="geographical">
              <el-input v-model="form.geographical" placeholder="请输入地理分区"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="水库名称:" prop="waterType">
              <el-input v-model="form.reservoirName" placeholder="请输入水域面积"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="水体类型:" prop="mudflatArea">
              <el-select v-model="form.waterType" placeholder="请选择水体类型" style="width: 150px">
                <el-option
                  v-for="item in optionsSYLX"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="水域面积:" prop="cultureMethod">
              <el-input v-model="form.waterArea" placeholder="请输入水域面积">
                <template slot="append">平方米/亩</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="养殖方式:" prop="cultureMethod">
              <el-input v-model="form.cultureMethod" placeholder="请输入养殖方式"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="养殖阶段:" prop="cultureStage">
              <el-input v-model="form.cultureStage" placeholder="请输入养殖阶段"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产业成熟度:" prop="cultureStage">
              <el-input v-model="form.industrialMaturity" placeholder="请输入产业成熟度"/>
            </el-form-item>
          </el-col>

        </el-row>
        <el-form-item label="苗种规格:" prop="seedlingSpecifications">
          <el-input v-model="form.seedlingSpecifications" placeholder="请输入苗种规格" style="width: 250px"/>
          <el-select v-model="form.seedlingSpecificationsUnit" placeholder="请选择" style="width: 100px">
            <el-option
              v-for="item in optionsSeedlingSpecificationsUnit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="苗种价格:" prop="seedlingPrice">
          <el-input v-model="form.seedlingPrice" placeholder="请输入苗种价格" style="width: 250px"/>
          <el-select v-model="form.seedlingPriceUnit" placeholder="请选择" style="width: 100px">
            <el-option
              v-for="item in optionsSeedlingPriceUnit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年投放量:" prop="annualStockingVolume">
          <el-input v-model="form.annualStockingVolume" placeholder="请输入年投放量" style="width: 250px"/>
          <el-select v-model="form.annualStockingVolumeUnit" placeholder="请选择" style="width: 100px">
            <el-option
              v-for="item in optionsAnnualStockingVolumeUnit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售规格:" prop="salesSpecifications">
          <el-input v-model="form.salesSpecifications" placeholder="请输入销售规格" style="width: 250px"/>
          <el-select v-model="form.salesSpecificationsUnit" placeholder="请选择" style="width: 100px">
            <el-option
              v-for="item in optionsSalesSpecificationsUnit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售平均价格:" prop="averagePricePerSale">
          <el-input v-model="form.averagePricePerSale" placeholder="请输入销售平均价格" style="width: 250px"/>
          <el-select v-model="form.averagePricePerSaleUnit" placeholder="请选择" style="width: 100px">
            <el-option
              v-for="item in optionsAveragePricePerSaleUnit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年产量:" prop="annualProductionVolume">
          <el-input v-model="form.annualProductionVolume" placeholder="请输入年产量" style="width: 250px"/>
          <el-select v-model="form.annualProductionVolumeUnit" placeholder="请选择" style="width: 100px">
            <el-option
              v-for="item in optionsAnnualProductionVolumeUnit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
  <div class="app-container" v-else>
    <el-container>
      <el-aside width="500px">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../../../public/img/file.jpg" class="image">
          <div style="padding: 14px;">
            <span>图片</span>
          </div>
        </el-card>
      </el-aside>
      <el-main>
        <el-col>
          <el-card shadow="hover" style="width: 100%">
            <div slot="header" class="clearfix">
              <span>文嘉《明日歌》</span>
            </div>
            <div style="font-size: 18px;text-align: center; margin-top: 35px;">
              明日复明日
            </div>
            <div style="font-size: 18px;text-align: center;">明日何其多</div>
            <div style="font-size: 18px;text-align: center;">我生待明日</div>
            <div style="font-size: 18px;text-align: center;">万事成蹉跎</div>
            <div style="margin-top: 35px;"></div>
          </el-card>
        </el-col>
        <el-row :gutter="24">
          <div style="margin-top: 500px;margin-left: 400px">
            <el-col :span="12">
              <el-button type="primary" round @click="handleAdd">信息收集</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" round @click="changeIsShow">信息共享</el-button>
            </el-col>
          </div>
        </el-row>
      </el-main>
    </el-container>
    <!-- 添加或修改工厂化育苗、养殖技术经济资源信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" :disabled="isDisabled">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="账号类型:" prop="selectUserType">
              <el-select v-model="selectUserType" placeholder="请选择账号类型" disabled style="width: 150px">
                <el-option
                  v-for="item in userType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地理分区:" prop="geographical">
              <el-input v-model="form.geographical" placeholder="请输入地理分区"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="水库名称:" prop="waterType">
              <el-input v-model="form.reservoirName" placeholder="请输入水域面积"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="水体类型:" prop="mudflatArea">
              <el-select v-model="form.waterType" placeholder="请选择水体类型" style="width: 150px">
                <el-option
                  v-for="item in optionsSYLX"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="水域面积:" prop="cultureMethod">
              <el-input v-model="form.waterArea" placeholder="请输入水域面积">
                <template slot="append">平方米/亩</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="养殖方式:" prop="cultureMethod">
              <el-input v-model="form.cultureMethod" placeholder="请输入养殖方式"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="养殖阶段:" prop="cultureStage">
              <el-input v-model="form.cultureStage" placeholder="请输入养殖阶段"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产业成熟度:" prop="cultureStage">
              <el-input v-model="form.industrialMaturity" placeholder="请输入产业成熟度"/>
            </el-form-item>
          </el-col>

        </el-row>
        <el-form-item label="苗种规格:" prop="seedlingSpecifications">
          <el-input v-model="form.seedlingSpecifications" placeholder="请输入苗种规格" style="width: 250px"/>
          <el-select v-model="form.seedlingSpecificationsUnit" placeholder="请选择" style="width: 100px">
            <el-option
              v-for="item in optionsSeedlingSpecificationsUnit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="苗种价格:" prop="seedlingPrice">
          <el-input v-model="form.seedlingPrice" placeholder="请输入苗种价格" style="width: 250px"/>
          <el-select v-model="form.seedlingPriceUnit" placeholder="请选择" style="width: 100px">
            <el-option
              v-for="item in optionsSeedlingPriceUnit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年投放量:" prop="annualStockingVolume">
          <el-input v-model="form.annualStockingVolume" placeholder="请输入年投放量" style="width: 250px"/>
          <el-select v-model="form.annualStockingVolumeUnit" placeholder="请选择" style="width: 100px">
            <el-option
              v-for="item in optionsAnnualStockingVolumeUnit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售规格:" prop="salesSpecifications">
          <el-input v-model="form.salesSpecifications" placeholder="请输入销售规格" style="width: 250px"/>
          <el-select v-model="form.salesSpecificationsUnit" placeholder="请选择" style="width: 100px">
            <el-option
              v-for="item in optionsSalesSpecificationsUnit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售平均价格:" prop="averagePricePerSale">
          <el-input v-model="form.averagePricePerSale" placeholder="请输入销售平均价格" style="width: 250px"/>
          <el-select v-model="form.averagePricePerSaleUnit" placeholder="请选择" style="width: 100px">
            <el-option
              v-for="item in optionsAveragePricePerSaleUnit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年产量:" prop="annualProductionVolume">
          <el-input v-model="form.annualProductionVolume" placeholder="请输入年产量" style="width: 250px"/>
          <el-select v-model="form.annualProductionVolumeUnit" placeholder="请选择" style="width: 100px">
            <el-option
              v-for="item in optionsAnnualProductionVolumeUnit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
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
import {
  listInformation,
  getInformation,
  delInformation,
  addInformation,
  updateInformation
} from '@/api/system/reservoirinformation'
import { getUserProfile } from '@/api/system/user'

export default {
  name: 'Information',
  data() {
    return {
      isDisabled: false,
      optionsSeedlingSpecificationsUnit: [{
        value: '1',
        label: 'g/kg'
      }],
      optionsSeedlingPriceUnit: [{
        value: '1',
        label: '元/尾'
      }, {
        value: '2',
        label: '元/kg'
      }],
      optionsAnnualStockingVolumeUnit: [{
        value: '1',
        label: '尾'
      }, {
        value: '2',
        label: 'kg'
      }],
      optionsSalesSpecificationsUnit: [{
        value: '1',
        label: 'g/kg'
      }],
      optionsAveragePricePerSaleUnit: [{
        value: '1',
        label: '元/尾'
      }, {
        value: '2',
        label: '元/kg'
      }],
      optionsAnnualProductionVolumeUnit: [{
        value: '1',
        label: '尾'
      }, {
        value: '2',
        label: 'kg'
      }],
      selectUserType: '',
      userType: [{
        value: '2',
        label: '普通用户'
      }, {
        value: '1',
        label: '管理员'
      }],
      optionsSYLX: [{
        value: '1',
        label: '海水'
      }, {
        value: '2',
        label: '淡水'
      }, {
        value: '3',
        label: '半咸水'
      }],
      optionsGM: [{
        value: '1',
        label: '立方米'
      }, {
        value: '2',
        label: '平方米'
      }],
      //是否展示列表
      isShow: false,
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
      // 海底滩涂增养殖技术经济资源信息共享系统信息
      informationList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        waterType: null,
        waterScale: null,
        waterScaleType: null,
        seedlingSpecifications: null,
        seedlingPrice: null,
        annualStockingVolume: null,
        salesSpecifications: null,
        averagePricePerSale: null,
        annualProductionVolume: null,
        geographical: null,
        cultureMethod: null,
        cultureStage: null,
        industrialMaturity: null,
        address: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      user: {}
    }
  },
  created() {
    this.getUser()
    this.getList()

  },
  methods: {
    toHouse() {
      this.isShow = false
    },
    changeIsShow() {
      this.isShow = true
    },
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data
        console.log(this.user)
        if (this.user.admin && this.user.userId == 1) {
          this.selectUserType = '1'
        } else {
          this.selectUserType = '2'
        }
      })
    },
    getList() {
      this.loading = true
      listInformation(this.queryParams).then(response => {
        this.informationList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        waterType: null,
        waterScale: null,
        waterScaleType: null,
        seedlingSpecifications: null,
        seedlingPrice: null,
        annualStockingVolume: null,
        salesSpecifications: null,
        averagePricePerSale: null,
        annualProductionVolume: null,
        geographical: null,
        cultureMethod: null,
        cultureStage: null,
        industrialMaturity: null,
        address: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      if (this.isDisabled) {
        this.isDisabled = false
      }
      this.title = '添加水库等大水面渔业技术经济资源信息共享系统信息'
    },
    /** 查看按钮操作 */
    handleUpdateToShow(row) {
      this.reset()
      const id = row.id || this.ids
      getInformation(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '查看水库等大水面渔业技术经济资源信息共享系统信息'
        this.isDisabled = true
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getInformation(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改水库等大水面渔业技术经济资源信息共享系统信息'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateInformation(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addInformation(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$modal.confirm('是否确认删除水库等大水面渔业技术经济资源信息共享系统编号为"' + ids + '"的数据项？').then(function() {
        return delInformation(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/information/export', {
        ...this.queryParams
      }, `information_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
