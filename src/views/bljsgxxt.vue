<template>
	<div class="app-container bg">
		<!-- <Header></Header> -->
		<div style="display: flex; justify-content: space-between; font-weight: 600;">
			<div>捕捞技术经济资源信息共享系统</div>
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
						<el-form-item label="捕捞水域" prop="fishingArea">
							<el-input v-model="form.fishingArea" placeholder="请输入捕捞水域" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="船籍港" prop="homePort">
							<el-input v-model="form.homePort" placeholder="请输入船籍港" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="作业方式" prop="jobWay">
							<el-select v-model="form.jobWay" placeholder="请选择作业方式">
								<el-option v-for="dict in dict.type.job_type" :key="dict.value" :label="dict.label"
									:value="dict.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="捕捞种类" prop="fishingSpecies">
							<el-input v-model="form.fishingSpecies" placeholder="请输入捕捞种类" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="年产量及毛收入" prop="annualOutput">
							<el-input v-model="form.annualOutput" placeholder="请输入年产量" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="年油耗" prop="annualFuel">
							<el-input v-model="form.annualFuel" placeholder="请输入年油耗" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="燃油价值" prop="fuelValue">
							<el-input v-model="form.fuelValue" placeholder="请输入燃油价值" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="船长" prop="shipLength">
							<el-input v-model="form.shipLength" placeholder="请输入船长" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="主机功率" prop="hostPower">
							<el-input v-model="form.hostPower" placeholder="请输入主机功率" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="年人工费" prop="annualLaborCost">
							<el-input v-model="form.annualLaborCost" placeholder="请输入年人工费" />
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
		addFishing,
	} from "@/api/system/fishing";
	export default {
		name: "bljsgxxt",
		components: {
			Foot,
			Header
		},
		dicts: ['job_type', 'sys_level'],
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
					fishingArea: [{
						required: true,
						message: "捕捞水域不能为空",
						trigger: "blur"
					}],
					homePort: [{
						required: true,
						message: "船籍港不能为空",
						trigger: "blur"
					}],
					jobWay: [{
						required: true,
						message: "作业方式不能为空",
						trigger: "change"
					}],
					fishingSpecies: [{
						required: true,
						message: "捕捞种类不能为空",
						trigger: "blur"
					}],
					annualOutput: [{
						required: true,
						message: "年产量不能为空",
						trigger: "blur"
					}],
					annualFuel: [{
						required: true,
						message: "年油耗不能为空",
						trigger: "blur"
					}],
					fuelValue: [{
						required: true,
						message: "燃油价值不能为空",
						trigger: "blur"
					}],
					shipLength: [{
						required: true,
						message: "船长不能为空",
						trigger: "blur"
					}],
					hostPower: [{
						required: true,
						message: "主机功率不能为空",
						trigger: "blur"
					}],
					annualLaborCost: [{
						required: true,
						message: "年人工费不能为空",
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
							addFishing(this.form).then(response => {
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
