<template>
  <view class="">
  	<view class="icon-box">
  		<u-image width="268rpx" height="256rpx" src="../../static/image/icon.png"></u-image>
		<text>水果销售管理系统</text>
		<text>版本号：1.0.0</text>
  	</view>
	<view class="">
		<u-button plain type="info">检查更新</u-button>
	</view>
  </view>
</template>

<script>
export default {
	name:"",
	data(){
		return{
		
			}
	},
	methods:{}
}

</script>
<style lang='scss' scoped>
	.icon-box{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 10% 0;
	}
</style>
