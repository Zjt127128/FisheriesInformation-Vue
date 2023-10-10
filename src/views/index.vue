<template>
	<div class="app-container">
		<!-- <Header></Header> -->
		<div class="top">
			<h2 style="font-weight: 600;">渔业资源资产价格评估信息管理系统</h2>
		</div>
		<div class="main">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="(item,index) in urls" :key="index">
          <el-image
            style="width: 100%; height: 100%"
            :src="item.url"></el-image>
        </el-carousel-item>
      </el-carousel>
			<el-row type="flex" class="row-bg" justify="space-around" style="margin-top: 50px">
				<el-col :span="6">
					<router-link :to="'/skdmjgl'">
						<div class="link_type">
							水库等大水面渔业技术经济资源信息共享系统
						</div>
					</router-link>
				</el-col>
				<el-col :span="6">
					<router-link :to="'/integratedaquaculturetable'">
						<div class="link_type">
							海底滩涂增养殖技术经济资源信息共享系统
						</div>
					</router-link>
				</el-col>
				<el-col :span="6">
					<router-link :to="'/information'">
						<div class="link_type">
							工厂化育苗、养殖技术经济资源信息共享系统
						</div>
					</router-link>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg" justify="space-around">
				<el-col :span="6">
					<router-link :to="'/shouye/wangxiangyumiao'">
						<div class="link_type">
							网箱育苗、养殖技术经济资源信息共享系统
						</div>
					</router-link>
				</el-col>
				<el-col :span="6">
					<router-link :to="'/shouye/chitangyumiao'">
						<div class="link_type">
							池塘育苗、养殖技术经济资源信息共享系统
						</div>
					</router-link>
				</el-col>
				<el-col :span="6">
					<router-link :to="'/shouye/tezhongyumiao'">
						<div class="link_type">
							特种育苗、养殖技术经济资源信息共享系统
						</div>
					</router-link>
				</el-col>
			</el-row>

		</div>
		<!-- <Foot></Foot> -->
	</div>
</template>
<script src="https://cdn.jsdelivr.net/npm/halfmoon@1.1.1/js/halfmoon.min.js"></script>
<script>
	import Foot from '@/components/Foot'
	import Header from '@/components/Header'
	export default {
		name: "index",
		components: {
			Foot,
			Header
		},
    data(){
      return{
        urls:[{url:require("../../public/img/lunbo1.jpeg")},{url:require("../../public/img/lunbo2.jpeg")},{url:require("../../public/img/lunbo3.jpeg")}]
      }
    },
    methods:{

      toshuiku(){
        //水库等大水面渔业技术经济资源信息共享系统
        // this.$tab.openPage("水库等大水面渔业技术经济资源信息共享系统", "/skgxxt");
        this.$router.push({ path: "/shouye/skgxxt" });

      }
    }
	}
</script>


<style scoped lang="scss">
	body {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	a {
		text-decoration: none; //没有文本装饰
	}
	.container{

	}

	.top {
		text-align: center;
		//background-color: #383847;
	}

	//中间内容样式
	.main {
		padding-bottom: 110px;
	}

	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #d3dce6;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		padding: 30px 0;
		//background-color: #5f89d1;
	}

	.link_type {
		// background-color: #018efe;
		color: #fcd321;
		text-align: center;
		padding: 30px 0px;
		border-radius: 8px;
		font-size: 20px;
		font-weight: 600;
    background: url("../../public/img/1.png");
	}
  .link_type:hover{
    background: url("../../public/img/2.png");
  }

	// 底部样式
	.foot {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #383847;
		text-align: center;
		color: #FFFFFF;
		padding: 10px 0;
	}

	.foot-p {
		.span {
			margin-right: 30%;
		}
	}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
