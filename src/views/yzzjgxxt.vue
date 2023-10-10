<template>
	<div class="app-container bg">
		<!-- <Header></Header> -->
		<div style="display: flex; justify-content: space-between; font-weight: 600;">
			<div>业主、专家、涉渔机构、在线交流共享系统</div>
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
						<el-form-item label="身份类别：" prop="identityCategory">
							<el-select v-model="form.identityCategory" placeholder="请选择身份类别">
								<el-option v-for="dict in dict.type.id_type" :key="dict.value" :label="dict.label"
									:value="dict.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="关注并想获取何种帮助或信息" prop="helpInformation">
							<el-select v-model="form.helpInformation" placeholder="请选择关注并想获取何种帮助或信息">
								<el-option v-for="dict in dict.type.help_type2" :key="dict.value" :label="dict.label"
									:value="dict.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="有无连线相关人员或机构的现实需求" prop="connectionStatus">
							<el-input v-model="form.connectionStatus" placeholder="请输入有无连线相关人员或机构的现实需求" />
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
		addOwner
	} from "@/api/system/owner";
	export default {
		name: "yzzjgxxt",
		components: {
			Foot,
			Header
		},
		dicts: ['id_type', 'help_type2', 'sys_level'],
		data() {
			return {
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
					identityCategory: [{
						required: true,
						message: "身份类别不能为空",
						trigger: "change"
					}],
					helpInformation: [{
						required: true,
						message: "关注并想获取何种帮助或信息不能为空",
						trigger: "blur"
					}],
					connectionStatus: [{
						required: true,
						message: "有无连线相关人员或机构的现实需求不能为空",
						trigger: "blur"
					}],
				}
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
					identityCategory: null,
					helpInformation: null,
					connectionStatus: null,
					createBy: null,
					createTime: null,
					updateBy: null,
					updateTime: null,
					remark: null,
					type: null,
					userId: this.form.userId
				};
				this.resetForm("form");
			},
			/** 提交按钮 */
			submitForm() {
				this.$refs["form"].validate(valid => {
					if (valid) {
						if (this.selectedOptions == null) {
							alert("请选择省市区")
						} else {
							addOwner(this.form).then(response => {
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
