<template>
  <div class="container">
    <Header></Header>
    <div class="top">
      <h2 style="font-weight: 600;">渔业技术经济资源信息共享平台</h2>
    </div>
    <div class="main">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <router-link :to="'/skgxxt?type=0'">
            <div class="link_type">
              水库等大水面渔业技术经济资源信息共享系统
            </div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link :to="'/skgxxt?type=1'">
            <div class="link_type">
              海底滩涂增养殖技术经济资源信息共享系统
            </div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link :to="'/skgxxt?type=2'">
            <div class="link_type">
              工厂化育苗、养殖技术经济资源信息共享系统
            </div>
          </router-link>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <router-link :to="'/skgxxt?type=3'">
            <div class="link_type">
              网箱育苗、养殖技术经济资源信息共享系统
            </div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link :to="'/skgxxt?type=4'">
            <div class="link_type">
              池塘育苗、养殖技术经济资源信息共享系统
            </div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link :to="'/skgxxt?type=5'">
            <div class="link_type">
              特种育苗、养殖技术经济资源信息共享系统
            </div>
          </router-link>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <router-link :to="'/bljsgxxt'">
            <div class="link_type">
              捕捞技术经济资源信息共享系统
            </div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link :to="'/yycbgxxt'">
            <div class="link_type">
              渔业船舶技术经济资源信息共享系统
            </div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link :to="'/yyscfwxt'">
            <div class="link_type">
              渔业生产、事故在线技术咨询、服务系统
            </div>
          </router-link>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <router-link :to="'/yzzjgxxt'">
            <div class="link_type">
              业主、专家、涉渔机构、在线交流共享系统
            </div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link :to="'/yyzypgxt'">
            <div class="link_type">
              渔业资源资产价值评估系统
            </div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link :to="'/sykjgxxt'">
            <div class="link_type">
              涉渔科技成果转化、推广共享系统
            </div>
          </router-link>
        </el-col>
      </el-row>

    </div>
    <Foot></Foot>
  </div>
</template>

<script>
  import Foot from '@/components/Foot'
  import Header from '@/components/Header'
  export default {
    name: "fishMain",
    components: {
      Foot,
      Header
    },
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
    background-color: #f9fafc;
  }

  .link_type {
    background-color: #2298e5;
    color: #FFFFFF;
    text-align: center;
    padding: 30px 0px;
    border-radius: 8px;
    font-size: 20px;
    font-weight: 600;
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
</style>
