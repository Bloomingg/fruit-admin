<template>
  <view class="">
  	<u-cell-group>
  		<u-cell-item v-for="(order,index) in orderInfo" :key="index" @click="assignDetails(order)" :title="order.passengerName" :value="order.appointment|dateFilter" :label="order.passengerPhone"/>
  	</u-cell-group>
	<u-loadmore @loadmore="loadmoreInfo" :status="status" />
	<u-back-top :scroll-top="scrollTop"></u-back-top>
  </view>
</template>

<script>
export default {
	name:"",
	filters:{
		dateFilter(val) {
			const date = new Date(val);
			let y = date.getFullYear();
			let m = date.getMonth() + 1;
			m = m < 10 ? "0" + m : m;
			let d = date.getDate();
			d = d < 10 ? "0" + d : d;
			let h = date.getHours();
			h = h < 10 ? "0" + h : h;
			let minute = date.getMinutes();
			let second = date.getSeconds();
			minute = minute < 10 ? "0" + minute : minute;
			second = second < 10 ? "0" + second : second;
			return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
		},
	},
	data(){
		return{
		scrollTop:0,
			status:'loadmore',
			lastStatus:false,
			orderInfo:[],
		// 分页对象
		listQuery: {
			timeList: [],
			cityId: "",
			page: 1,
			pageSize: 10,
			queryType: "first",
			passengerName: "",
			orderStatus: 3,
			driverPhone: "",
			passengerPhone: "",
			driverName: "",
			isRefund: "",
			startAddress: "",
			endAddress: "",
			isChangePrice: "",
			businessType: "",
			orderChannel: "",
			cancelReason: "",
			orderNo: "",
			vehNo: "",
			userOrderId: "",
			sort: "+id",
			didiOrderId: "",
			orderType: "",
			officeId: "",
		},
			}
	},
	methods:{
		assignDetails(order){
			const appointment = this.$options.filters['dateFilter'](order.appointment)
			const str = '?orderNo='+order.orderNo+'&passengerName='+order.passengerName+'&passengerPhone='+order.passengerPhone+'&vehicleTypeStr='+order.vehicleTypeStr+'&startAddress='+order.startAddress+'&endAddress='+order.endAddress+'&appointment='+appointment+'&officeId='+order.officeId
			uni.navigateTo({
				url:'./assignDetails'+str
			})
		},
		getOrder(){
			this.$u.api.getOrder(this.listQuery).then(res => {
				// console.log(res);
				// this.orderInfo=res.data.records
				if(res.data.records.length==10){
					this.orderInfo=[...this.orderInfo,...res.data.records]
					this.status='loadmore'
				}else if(res.data.records.length>0&&res.data.records.length<10){
					this.orderInfo=[...this.orderInfo,...res.data.records]
					this.lastStatus=true
					this.status='nomore'
				}else{
					// this.orderInfo=[]
					this.lastStatus=true
					this.status='nomore'
				}
			}).catch(err => this.$u.toast(err.msg))
		}
	},
	
}

</script>
<style lang='scss' scoped>
</style>
