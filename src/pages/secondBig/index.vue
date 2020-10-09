<template>
	<div class="index-all">
		<!-- 大屏顶部-->
		<midTop></midTop>
		<!--下面的echarts图形  -->
		<div class="index-bottom">
			<div class="b-left">
				<screenBox width="334" height="366" title="客户行业分类统计">
					<div class="kehuTotal">
						<Pie3D class="top" width="300" height="300" :dataList="customerTotal" />
						<img class="bottom" src="../../assets/image/secondBig/bg_kehu.png" />
					</div>
				</screenBox>
				<screenBox width="334" height="374" title="区域客户统计" style="margin-top: 26px;">
					<!-- <cateCharts class="areaStyle" width="334" height="327" :chartData="areaCustomer"></cateCharts> -->
					<pieCharts pieWidth="336" pieHeight="322" :dataList="areaCustomer" :isBorder="false" />
				</screenBox>
			</div>
			<div class="mapStyle">
				<Map3D @mapClick="mapClick" mapWidth="1100" mapHeight="790"></Map3D>
			</div>
			<screenBox class="b-right" width="334" height="766" title="客户">
				<div class="list_content">
					<p v-for="(item, index) in compamyList" :key="index" @click="itClick(item)">
						<span>{{ item.name }}</span>
					</p>
				</div>
			</screenBox>
		</div>
	</div>
</template>

<script>
	import Map3D from '../../components/mapCharts/3DMap.vue'
	import Pie3D from '../../components/highCharts/pie3D.vue'
	import midTop from './component/middleTop.vue'
	import screenBox from '../../components/bigScreenBox/index'
	import pieCharts from '../../components/pieCharts/index'
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'secondMiddle',
		computed: {
			...mapState({
				alertInfo: (state) => state.BigScreen.alertInfo,
			}),
		},
		components: {
			Map3D,
			screenBox,
			midTop,
			Pie3D,
			pieCharts
		},

		data() {
			return {
				pageType: 'index', //控制当前页面显示：index表示首页，map表示地图站点,admin表示后台
				weatherUrl: '',
				loginOutTo: false,
				boolBack: false,
				compamyList: [{
						name: '裕安大厦',
						choose: false,
						center: [121.524659, 31.228544],
					},
					{
						name: '众达汽车冲压件有限公司',
						choose: false,
						center: [121.20436, 31.315164],
					},
					{
						name: '仲益大厦',
						choose: false,
						center: [121.465915, 31.231644],
					},
					{
						name: '都会广场',
						choose: false,
						center: [121.471765, 31.170368],
					},
					{
						name: '检测技术有限公司',
						choose: false,
						center: [121.526177, 31.090757],
					},
					{
						name: '上海嘉里食品工业有限公司',
						choose: false,
						center: [121.621896, 31.339923],
					},
					{
						name: '东煌大厦',
						choose: false,
						center: [116.481036, 39.986131],
					},
					{
						name: '美克大厦',
						choose: false,
						center: [121.441217, 31.19394],
					},
					{
						name: '安徽大厦',
						choose: false,
						center: [116.41614, 39.988027],
					},
					{
						name: '碧水大厦',
						choose: false,
						center: [116.282014, 40.117705],
					},
					{
						name: '红星美凯龙北五环商场',
						choose: false,
					},
					{
						name: '东环广场',
						choose: false,
					},
					{
						name: '博雅国际中心',
						choose: false,
					},
					{
						name: '天津永立电梯厂',
						choose: false,
					},
					{
						name: '北京曲美家具厂',
						choose: false,
					},
					{
						name: '北京昆泰嘉禾酒店',
						choose: false,
					},
					{
						name: '北辰时代大厦',
						choose: false,
					},
					{
						name: '博雅国际中心',
						choose: false,
					},
					{
						name: '芜湖中央城商业广场',
						choose: false,
					},
					{
						name: '昆山希瑞造纸',
						choose: false,
					},
					{
						name: '上海安装集团检测中心',
						choose: false,
					},
					{
						name: 'IBM中国开发中心',
						choose: false,
					},
					{
						name: '上安检测中心',
						choose: false,
					},
					{
						name: '上海浦江埃纳迪斯仪表有限公司',
						choose: false,
					},
					{
						name: '上海良友大厦',
						choose: false,
					},
					{
						name: '虹口星游城',
						choose: false,
					},
					{
						name: '海尔集团华北区分公司',
						choose: false,
					},
					{
						name: '山东泰山锅炉厂',
						choose: false,
					},
					{
						name: '天津明德莱茵科技有限公司',
						choose: false,
					},
					{
						name: '天津六力国际学校',
						choose: false,
					},
					{
						name: '上海ABB高压电机有限公司',
						choose: false,
					},
					{
						name: '居然之家西四环商场',
						choose: false,
					},
					{
						name: '万隆汇洋灯饰广场',
						choose: false,
					},
					{
						name: '宏汇广场',
						choose: false,
					},
					{
						name: '生命科技产业园',
						choose: false,
					},
					{
						name: '海洋大学临港校区线上检测试点项目',
						choose: false,
					},
					{
						name: '长海医院线上检测试点项目',
						choose: false,
					},
					{
						name: '临沂大学线上检测试点项目',
						choose: false,
					},
					{
						name: '微创医疗器械(上海)有限公司',
						choose: false,
					},
					{
						name: '上海中优城市广场',
						choose: false,
					},
					{
						name: '上海麦吉丽日用品公司',
						choose: false,
					},
					{
						name: '上海信谊天平药业有限公司',
						choose: false,
					},
					{
						name: '汉泰电气成套设备厂',
						choose: false,
					},
					{
						name: '金沙江大酒店',
						choose: false,
					},
					{
						name: '红星美凯龙西五环商场',
						choose: false,
					},
					{
						name: '上海玛辛电气有限公司',
						choose: false,
					},
					{
						name: '上海良友大厦',
						choose: false,
					},
					{
						name: '芜湖中国人民银行总行线上检测试点项目',
						choose: false,
					},
					{
						name: '上海浦江埃纳迪斯仪表有限公司',
						choose: false,
					},
					{
						name: '康明斯集团（上海）有限公司',
						choose: false,
					},
					{
						name: '中信银行大厦',
						choose: false,
					},
					{
						name: '皖南医学院',
						choose: false,
					},
					{
						name: '芜湖中医院线上检测试点项目',
						choose: false,
					},
					{
						name: '临沂沂南垃圾发电厂',
						choose: false,
					},
					{
						name: '南京江北区垃圾发电厂',
						choose: false,
					},
				],
				customerTotal: [
					['商业楼宇', 12],
					['公共设施', 20],
					['制造', 51]
				],
				areaCustomer: [{
						name: '上海',
						value: 42,
						unit: '',
						color: '#3361F5'
					},
					{
						name: '安徽',
						value: 38,
						unit: '',
						color: '#65FFFF'
					},
					{
						name: '北京',
						value: 20,
						unit: '',
						color: '#F58E33'
					},
				],
			}
		},
		created() {
			let self = this
			window.addEventListener(
				'storage',
				function(event) {
					/*  告警 */
					if (event.key === 'policy') {
						let data = {
							name: 'Gaojingjc',
							params: null,
							type: 1,
						}
						self.$router.push({
							name: 'home',
							params: data,
						})
					} else if (event.key === 'order') {
						//跳转工单
						let data = {
							name: 'Workordergl',
							params: null,
							type: 1,
						}
						self.$router.push({
							name: 'home',
							params: data,
						})
					}
				},
				true
			)
		},

		mounted() {
			// if (this.$route.params.pathName !== 'toHome') {
			//   this.toThree()
			// }
		},
		methods: {
			itClick(item) {
				if (item.center) {
					this.$router.push({
						name: 'secondMap',
						params: {
							name: item.name,
							center: item.center,
							around: '',
						},
					})
				}
			},
			toback() {
				this.pageType = 'index'
				this.boolBack = false
			},
			mapClick(mapParams) {
				this.$router.push({
					name: 'secondMap',
					params: {
						name: mapParams.name,
						center: mapParams.center,
						around: '',
					},
				})
				// 用this.$route.query.name接收参数
			},
			toThree() {
				//三个屏幕打开新的界面
				let leftRoute = this.$router.resolve({
					path: '/left',
					name: 'Left',
					// query: { cpdfId: id },
					// params: { cpdfId: id }
				})
				let rightRoute = this.$router.resolve({
					path: '/right',
					name: 'Right',
					// query: { cpdfId: id },
					// params: { cpdfId: id }
				})
				window.open(
					leftRoute.href,
					'_blank',
					'scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes'
				)
				window.open(
					rightRoute.href,
					'_blank',
					'scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes'
				)
			},
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	img {
		/* 鼠标放上去变成小手 */
		cursor: pointer;
	}

	.flex {
		display: flex;
	}

	.jbt {
		justify-content: space-between;
	}

	.jbc {
		justify-content: center;
	}

	.ac {
		align-items: center;
	}

	.index-all {
		width: 100%;
	}

	.tx-center {
		text-align: center;
	}

	/* 下面图表 */
	.index-bottom {
		display: flex;
		//margin-top: 20px;
		position: absolute;
		top: 290px;

		.b-left {
			width: 334px;
			//height: 766px;
			margin-left: 24px;
			position: relative;
		}

		.kehuTotal {
			height: 300px;

			.top {
				position: absolute;
				z-index: 999;
				top: 20px;
				left: 18px;
			}

			.bottom {
				position: relative;
				z-index: 9;
				top: 180px;
				left: 46px;

			}
		}

		.mapStyle {
			position: relative;
			left: 60px;
		}

		.b-right {
			width: 334px;
			opacity: 0.9;
			position: relative;
			left: 102px;

			p {
				line-height: 40px;
				padding-left: 20px;
				color: rgba(154, 203, 234, 1);
			}

			p:hover {
				cursor: pointer;
				color: rgb(44, 160, 248);
			}

		}
	}

	.areaStyle {
		// position: relative;
		// left: 20px;
	}

	.list_content {
		width: 334px;
		height: 686px;
		overflow-x: hidden;
		overflow-y: scroll;
	}
</style>
