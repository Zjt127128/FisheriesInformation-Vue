<template>
	<div class="app-container bg">
		<!-- <Header></Header> -->
		<div style="display: flex; justify-content: space-between; font-weight: 600;">
			<div>网箱育苗、养殖技术经济资源信息共享系统</div>
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
						<el-form-item label="水域类型" prop="waters">
							<el-select v-model="form.waters" placeholder="请选择水域类型">
								<el-option v-for="dict in dict.type.water_type3" :key="dict.value" :label="dict.label"
									:value="dict.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="水体规模" prop="extent">
							<el-input v-model="form.extent" placeholder="请输入水体规模" class="input-with-select">
								<template slot="append">立方米</template>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="育苗、养殖种类1" prop="breedingSpecies">
							<el-input v-model="form.breedingSpecies" placeholder="请输入育苗、养殖种类1" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="育苗、养殖种类2" prop="fish">
							<el-select v-model="form.fish" placeholder="请输入育苗、养殖种类2">
								<el-option v-for="dict in dict.type.breed_type" :key="dict.value" :label="dict.label"
									:value="dict.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="年产量" prop="annualOutput">
							<el-input v-model="form.annualOutput" placeholder="请输入年产量">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="销售规格" prop="annualOutputType">
							<el-input v-model="form.annualOutputType" placeholder="请输入销售规格" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="销售平均价格" prop="sellingPrice">
							<el-input v-model="form.sellingPrice" placeholder="请输入销售平均价格" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="主要产品比例" prop="annualOutputProportion">
							<el-input v-model="form.annualOutputProportion" placeholder="请输入主要产品比例" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="年投放量" prop="annualRelease">
							<el-input v-model="form.annualRelease" placeholder="请输入年投放量">
								<el-select style="width: 100px;" v-model="form.annualOutputDanwei" slot="append"
									placeholder="请选择">
									<el-option v-for="dict in dict.type.annual_output_unit2" :key="dict.value"
										:label="dict.label" :value="dict.value"></el-option>
								</el-select>
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="投放成本或苗种规格" prop="annualReleaseType">
							<el-input v-model="form.annualReleaseType" placeholder="请输入投放成本或苗种规格" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="苗种或成品销售价格" prop="seedlingPrice">
							<el-input v-model="form.seedlingPrice" placeholder="请输入苗种或成品销售价格">
								<el-select style="width: 100px;" v-model="form.annualReleaseProportion" slot="append"
									placeholder="请选择">
									<el-option v-for="dict in dict.type.price_unit" :key="dict.value"
										:label="dict.label" :value="dict.value"></el-option>
								</el-select>
							</el-input>
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
		addWangxiangyumiao
	} from "@/api/system/wangxiangyumiao";
	export default {
		name: "skgxxt",
		components: {
			Foot,
			Header
		},
		dicts: ['water_type3', 'breed_type', 'water_body_unit', 'annual_output_unit2', 'price_unit', 'sys_level'],
		data() {
			return {
				type: '',
				options: regionData,
				selectedOptions: null,
				// 表单参数
				form: {
					annualOutputDanwei: '1',
					annualReleaseProportion: '1'
				},
				// 表单校验
				rules: {
					waters: [{
						required: true,
						message: "水域类型不能为空",
						trigger: "blur"
					}],
					extent: [{
						required: true,
						message: "水体规格不能为空",
						trigger: "blur"
					}],
					breedingSpecies: [{
						required: true,
						message: "育苗养殖种类1不能为空",
						trigger: "blur"
					}],
					fish: [{
						required: true,
						message: "育苗养殖种类2不能为空",
						trigger: "blur"
					}],
					annualOutput: [{
						required: true,
						message: "年产量不能为空",
						trigger: "blur"
					}],
					annualOutputType: [{
						required: true,
						message: "销售规格不能为空",
						trigger: "change"
					}],
					sellingPrice: [{
						required: true,
						message: "销售平均价格不能为空",
						trigger: "blur"
					}],
					annualOutputProportion: [{
						required: true,
						message: "主要产品比例不能为空",
						trigger: "blur"
					}],
					annualRelease: [{
						required: true,
						message: "年投放量不能为空",
						trigger: "blur"
					}],
					annualReleaseType: [{
						required: true,
						message: "投放成本或苗种规格不能为空",
						trigger: "change"
					}],
					seedlingPrice: [{
						required: true,
						message: "苗种或成员平均价格不能为空",
						trigger: "blur"
					}],
				}
			}
		},
		created() {
			// this.type = this.$route.query.type
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
					waters: null,
					extent: null,
					extentDanwei: null,
					breedingSpecies: null,
					fish: null,
					annualOutput: null,
					annualOutputType: null,
					sellingPrice: null,
					annualOutputProportion: null,
					annualRelease: null,
					annualOutputDanwei: "1",
					annualReleaseType: null,
					seedlingPrice: null,
					annualReleaseProportion: "1",
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
				// this.form.type = this.$route.query.type
				this.$refs["form"].validate(valid => {
					if (valid) {
						if (this.selectedOptions == null) {
							alert("请选择省市区")
						} else {
							addWangxiangyumiao(this.form).then(response => {
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
