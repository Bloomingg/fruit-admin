<template>
  <view>
  	<u-toast ref="uToast" />
  	<u-cell-group>
  		<u-cell-item :arrow="true" @click="login" >
			<template slot="title">
				<u-avatar size="large" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-avatar>
				<!-- <u-image width="164rpx" height="164rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg" shape="circle"></u-image> -->
			</template>
			<view v-if="islogin" class="info-filed">
				<text>账号：{{userName}}</text>
				<text>编号：{{userNo}}</text>
				<!-- <text>负责人：{{userName}}</text> -->
			</view>
			<view v-else class="info-filed">
				<text>点击此处登录</text>
			</view>
		</u-cell-item>
  		<u-cell-item  icon="info-circle" @click="modify" title="修改密码" :arrow="true"></u-cell-item>
  		<u-cell-item  icon="info-circle" title="切换用户" :arrow="true"></u-cell-item>
  		<u-cell-item  icon="setting" @click="about" title="关于"  :arrow="true"></u-cell-item>
  		
  	</u-cell-group>
  	<!-- <u-button class="custom-style" @click="logout" ripple :style="{display:display}">退出</u-button> -->
  	<u-button v-if="islogin" class="custom-style" @click="showOut=!showOut" ripple >退出</u-button>
	<u-modal v-model="showOut" show-cancel-button @confirm="confirmOut" content="确定要退出吗？"></u-modal>
  </view>
</template>

<script>
export default {
	name:"",
	data(){
		return{
		userCity:"",
		userName:"17396220460",
		userNo:"1001",
		roleName:"",
		showOut:false,
		islogin:true
			}
	},
	methods:{
		about(){
			uni.navigateTo({
				url:"./about"
			})
		},
		modify(){
			uni.navigateTo({
				url:"./modify"
			})
		},
			// 用户登录
		login(){
			if(!uni.getStorageSync('token')){
				uni.navigateTo({
				    url: '/pages/profile/login'
				});
			}
		},
		confirmOut(){
			uni.clearStorageSync()
			this.islogin=false
			this.$u.toast('退出成功,请重新登录!')
			uni.navigateTo({
			    url: '/pages/profile/login'
			});
		},
		getUserInfo(){
			console.log(111);
			this.userCity=uni.getStorageSync('userCity')
			this.userName=uni.getStorageSync('userName')
			this.roleName=uni.getStorageSync('roleName')
		},
		isLogin(){
			if(uni.getStorageSync('token')){
				this.islogin=true
			}else{
				this.islogin=false
			}
			
		}
	},
	onShow() {
		// this.isLogin()
		// this.getUserInfo()
	}
}

</script>
<style lang='scss' scoped>
	/deep/ .u-cell__value{
		text-align: left;
		margin-left: 36rpx;
		.info-filed{
			display: flex;
			flex-direction:column;
			justify-content: center;
		}
	}
	.custom-style{
		margin:24rpx
	}
</style>
