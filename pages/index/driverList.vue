<template>
  <view class="">
  	<u-cell-group>
  		<u-cell-item  v-for="(driver,index) in driverList" :key="index" :arrow="arrow" :title="driver.driverName" :value="driver.vehTypeStr" :label="driver.driverPhone"/>
  	</u-cell-group>
	<u-loadmore @loadmore="loadmoreInfo" :status="status" />
	<u-back-top :scroll-top="scrollTop"></u-back-top>
  </view>
</template>

<script>
export default {
	name:"",
	data(){
		return{
			scrollTop:0,
		arrow:false,
		searchForm:{
			current: 1,
			sex: '',
			cityCode: '',
			service: '',
			driverName: '',
			driverPhone: '',
			officeId: '',
			vehNo: '',
			vehicleTeam: '',
			driverType: '',
			accountStatus: '',
			pageSize: 10,
			acceptancOrderStatus: '',
		},
		driverList:[],
		status:'loadmore',
		lastStatus:false
			}
	},
	methods:{
		getDriver(){
			this.$u.api.getDriver(this.searchForm).then(res=>{
				// console.log(res);
				if(res.data.records.length==10){
					this.driverList=[...this.driverList,...res.data.records]
					this.status='loadmore'
				}else if(res.data.records.length>0&&res.data.records.length<10){
					this.driverList=[...this.driverList,...res.data.records]
					this.lastStatus=true
					this.status='nomore'
				}else{
					// this.driverList=[]
					this.lastStatus=true
					this.status='nomore'
				}
			}).catch(err=>this.driverList=[])
		},
		loadmoreInfo(){
			if(this.lastStatus){
				this.$u.toast("没有更多啦！")
			}else{
				this.status='loading'
				this.searchForm.current+=1
				this.getDriver()
			}
		}
	},
	onReachBottom(){
		// console.log('loadmore');
		if(this.lastStatus){
			this.$u.toast("没有更多啦！")
		}else{
			this.status='loading'
			this.searchForm.current+=1
			this.getDriver()
		}
	},
	onLoad() {
		this.getDriver()
	},
	onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
}

</script>
<style lang='scss' scoped>
</style>
