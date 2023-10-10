<template>
	<div class="header">
		<router-link :to="'/fishMain'">首页</router-link>
	</div>
</template>

<script>
	export default{
		name: "Header",
	}
</script>

<style scoped>
	/* 底部样式 */
	.header {
		background-color: #383847;
		/* text-align: center; */
		color: #FFFFFF;
		padding: 20px 80px;
		font-size: 20px;
	}
</style>