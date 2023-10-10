<template>
  <div class="app-container bg">
    <!-- <Header></Header> -->
    <div style="display: flex; justify-content: space-between;font-weight: 600;">
      <div>渔业生产、事故在线技术咨询、服务系统</div>
      <div>客服电话：18834050175</div>
    </div>
    <div style="margin: 50px 30px 30px 30px">
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" :disabled="true">
                <template slot="append">
                  <dict-tag :options="dict.type.sys_level" :value="form.userLevel" />
                </template>
              </el-input>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="form.phone" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="省市区" prop="province">
              <el-cascader v-model="selectedOptions" :options="options" size="large"
                           @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事故概述" prop="accidentOverview">
              <el-input v-model="form.accidentOverview" placeholder="请输入事故概述" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="寻求何种帮助" prop="helpSeek">
              <el-select v-model="form.helpSeek" placeholder="请选择寻求何种帮助">
                <el-option v-for="dict in dict.type.help_type" :key="dict.value" :label="dict.label"
                           :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">



            <el-form-item label="关键影像资料">




              <video-upload v-model="form.imageData" :limit="1">

              </video-upload>





            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer" style="float: right; margin-top: 20px;">
        <el-button type="primary" @click="submitForm">提交</el-button>
      </div>
    </div>
    <!-- <Foot></Foot> -->
  </div>
</template>

<script>
  import Foot from '@/components/Foot'
  import Header from '@/components/Header'
  import {
    regionData,
    CodeToText,
    TextToCode
  } from 'element-china-area-data';
  import {
    addProduction
  } from "@/api/system/production";
  import{getQiNiuToken} from "@/api/withouttoken";

  export default {
    name: "yyscfwxt",
    components: {
      Foot,
      Header
    },
    dicts: ['help_type', 'sys_level'],
    data() {
      return {
        uploadData: { key: "", token: "" },
        type: '',
        options: regionData,
        selectedOptions: null,
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          name: [{
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          }],
          phone: [{
            required: true,
            message: "手机号码不能为空",
            trigger: "blur"
          }],
          accidentOverview: [{
            required: true,
            message: "事故概述不能为空",
            trigger: "blur"
          }],
          helpSeek: [{
            required: true,
            message: "寻求何种帮助不能为空",
            trigger: "change"
          }],
        },
        field101Action: 'https://jsonplaceholder.typicode.com/posts/',
        field101fileList: [],
      }
    },
    created() {
      //获取用户信息填充到页面上去
      let user = this.$store.getters.user
      this.form.userId = user.userId;
      this.form.name = user.nickName;
      this.form.phone = user.phonenumber;
      this.form.userLevel = user.userLevel;

    },
    methods: {

      handleUploadError() {
        this.$modal.msgError("上传图片失败，请重试");
        console.log('上传失败!')
      },



      handleUploadSuccess(res) {

        console.log( this.uploadData)
        console.log({res})
        if (res.key) {
          this.form.imageData="http://io.louis56.com/" + res.key;	// https://xxxx.com 为回显图片的地址，在七牛上配置的映射地址
        } else {
          this.$message({
            type: "error",
            message: res.msg,
          });
        }
      },
      async beforeUpload(file) {
        try {
          // 通过请求后端获取七牛token
          const res = await getQiNiuToken();

          if (res.code == 200) {
            this.uploadData.key = file.uid + file.name;
            this.uploadData.token = res.msg;
          } else {
            this.uploadData.key = "";
            this.uploadData.token = "";
          }
          console.log(this.uploadData)
          const isJPG = file.type === "image/jpeg";
          const isPNG = file.type === "image/png";

          if (!isJPG && !isPNG) {
            this.$message.error("上传图片只能是 JPG/JPEG/PNG 格式!");
            return Promise.reject();
          }

          return isJPG || isPNG;
        } catch (error) {
          console.log(error);
          this.$message.error("上传失败");
        }
      },







      //省市区级联
      handleChange() {
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
      // 表单重置
      reset() {
        this.selectedOptions = null
        this.form = {
          id: null,
          name: this.form.name,
          userLevel: this.form.userLevel,
          phone: this.form.phone,
          province: null,
          city: null,
          area: null,
          accidentOverview: null,
          helpSeek: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
          remark: null,
          type: null,
          userId: this.form.userId,
          imageData: null
        };
        this.resetForm("form");
      },
      field101BeforeUpload(file) {
        let isRightSize = file.size / 1024 / 1024 < 2
        if (!isRightSize) {
          this.$message.error('文件大小超过 2MB')
        }
        return isRightSize
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.selectedOptions == null) {
              alert("请选择省市区")
            } else {
              addProduction(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.reset();
              });
            }
          }
        });
      },
    }

  }
</script>

<style scoped>

</style>
