<template>
	<div class="foot">
		<p class="foot-p">
			<span class="span">Copyright © 2018-2022 xxxxxx公司 版权所有</span>
			<span> 浙ICP备xxxxxx号 </span>
		</p>
	</div>
</template>

<script>
	export default{
		name: "Foot",

	}
</script>

<style scoped>
	/* 底部样式 */
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
	
	.span {
		margin-right: 30%;
	}
</style>