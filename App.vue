<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//#ifdef APP-PLUS  
						 var info = plus.push.getClientInfo();
						console.log( JSON.stringify( info ) );
						 /* 5+  push 消息推送 ps:使用:H5+的方式监听，实现推送*/  
						plus.push.addEventListener("click", function(msg) {  
									console.log("click:"+JSON.stringify(msg));  
									console.log(msg.payload);  
									console.log(JSON.stringify(msg));  
									//这里可以写跳转业务代码
									uni.navigateTo({
										url:'pages/index/assign'
									})
								}, false);  
									// 监听在线消息事件    
								plus.push.addEventListener("receive", function(msg) {  
									// plus.ui.alert(2);  
										//这里可以写跳转业务代码
									console.log("recevice:"+JSON.stringify(msg))  
						   }, false);  
			
					   //#endif  
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	page{
		background-color: #f3f4f6;
	}
	uni-tabbar{
		.uni-tabbar-border{
			background-color: rgba(0, 0, 0, 0.1) !important;
		}
		.uni-tabbar__bd{
			.uni-tabbar__icon{
				width: 32rpx;
				height: 32rpx;
			}
		}
	}
	.uni-tabbar__icon{
		width: 32rpx;
		height: 32rpx;
	}
</style>
