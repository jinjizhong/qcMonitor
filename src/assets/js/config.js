module.exports = {
	// 设备信息参数mock
	deviceInfoList: [
		{
			AttrName: '设备名称: ',
			AttrValue: ''
		},
		{
			AttrName: '设备型号: ',
			AttrValue: ''
		},
		{
			AttrName: '投运日期: ',
			AttrValue: ''
		},
		{
			AttrName: '执行标准: ',
			AttrValue: ''
		},
		{
			AttrName: '温控范围: ',
			AttrValue: ''
		}
	],
	dateMonthList: [
		{
			id: '0',
			name: '全部',
			value: 'all'
		},
		{
			id: '1',
			name: '1月',
			value: '01'
		},
		{
			id: '2',
			name: '2月',
			value: '02'
		},
		{
			id: '3',
			name: '3月',
			value: '03'
		},
		{
			id: '4',
			name: '4月',
			value: '04'
		},
		{
			id: '5',
			name: '5月',
			value: '05'
		},
		{
			id: '6',
			name: '6月',
			value: '06'
		},
		{
			id: '7',
			name: '7月',
			value: '07'
		},
		{
			id: '8',
			name: '8月',
			value: '08'
		},
		{
			id: '9',
			name: '9月',
			value: '09'
		},
		{
			id: '10',
			name: '10月',
			value: '10'
		},
		{
			id: '11',
			name: '11月',
			value: '11'
		},
		{
			id: '12',
			name: '12月',
			value: '12'
		}
	],
	// 路由跳转配置
	routeJson: {
		Gaojingjc: 'Gaojingjc'
	},
	unitData: {
		温度: '(摄氏度/°C)',
		电流: '(电流/A)',
		相电流: '(电流/A)',
		线电流: '(电流/A)',
		电压: '(电压/V)',
		相电压: '(电压/V)',
		线电压: '(电压/V)',
		功率: 'kW',
		分相有功功率: 'kW',
		分相无功功率: 'kVar',
		分相视在功率: 'kVar',
		频率: 'Hz',
		功率因数: '',
		有功电量: 'kWh',
		无功电量: 'kVarh'
	},
	menuIcon: {
		首页: require("../image/home/shouye.png"),
		全站监测: require("../image/home/dianlijiance.png"),
		设备监测: require("../image/home/shebeijiance.png"),
		运行监测: require("../image/home/yunhangjiance.png"),
		运维分析: require("../image/home/yunweifenxi.png"),
		动环监控: require("../image/home/donghuanjiankong.png"),
		智能安防: require("../image/home/zhinenganfang.png"),
		报告: require("../image/home/baogao.png"),
		运维报告: require("../image/home/baogao.png"),
		能效报告: require("../image/home/baogao.png"),
		情景智能: require("../image/home/qingjingzhineng.png"),
		运维管理: require("../image/home/yunyingguanli.png"),
		客户首页: require("../image/home/shouye.png"),
		运维首页: require("../image/home/shouye.png"),
		能效统计: require("../image/home/nengxiaotongji.png"),
		损耗分析: require("../image/home/sunhaofenxi.png"),
		电费分析: require("../image/home/dianfeifenxi.png"),
		电能质量: require("../image/home/diannengzhiliang.png"),
		设备资产: require("../image/home/yunyingzichanguanli.png"),
		工器具: require("../image/home/gongqiju.png"),
		备品管理: require("../image/home/beipinguanli.png"),
		车辆管理: require("../image/home/cheliangguanli.png"),
		客户服务: require("../image/home/kehufuwu.png"),
		运维实施: require("../image/home/yunweishishi.png"),
		运营管理: require("../image/home/yunweiguanli.png"),
		配置管理: require("../image/home/shenhepeizhi.png"),
		字典管理: require("../image/home/zidianguanli.png"),
		日志管理: require("../image/home/caozuorizhi.png"),
		我的平台: require("../image/home/wodepingtai.png"),
		角色管理: require("../image/home/jueseguanli.png"),
		用户管理: require("../image/home/yonghuguanli.png"),
		调度中心: require("../image/login/icon_diaoduzhongxin.png"),
		车载系统: require("../image/login/icon_chezaixitong.png"),
		运维平台: require("../image/login/icon_yunweipingtai.png"),
		全程大学: require("../image/login/icon_quanchengdaxue.png"),
		仿真系统: require("../image/login/icon_fangzhenxitong.png"),
	},
	menuJson: [
		{
			id: 'menu_znyw',
			name: '智能运维',
			checked: true,
			items: [
				{
					name: '首页',
					href: null,
					routeName: 'AdminHome',
					showChild: false,
					children: [],
				},
				{
					name: '电力监控',
					href: null,
					routeName: 'Dianlijiankong',
					showChild: false,
					children: [],
				},
				{
					name: '测试',
					href: 'http://127.0.0.1/index.html',
					routeName: null,
					showChild: false,
					children: [],
				},
				{
					name: '设备监测',
					href: null,
					routeName: null,
					showChild: false,
					children: [
						{ name: '电容器', routeName: 'Dianrongqi', href: null },
						{ name: '变压器', routeName: 'Bianyaqi', href: null },
						{ name: '断路器', routeName: 'Duanluqi', href: null }
					]
				},
				{
					name: '运行监测',
					href: null,
					routeName: null,
					showChild: false,
					children: [
						{ name: '电压监测', routeName: 'Dianyajc', href: null },
						{ name: '电流监测', routeName: 'Dianliujc', href: null },
						{ name: '功率监测', routeName: 'Gonglvjc', href: null },
						{ name: '需量监测', routeName: 'Xuliangjc', href: null },
						{ name: '功率因数监测', routeName: 'Gonglvysjc', href: null },
						{ name: '告警监测', routeName: 'Gaojingjc', href: 'https://e.intellqc.com/bukong/hisdata.aspx' }
					]
				},
				{
					name: '运维分析',
					href: null,
					routeName: null,
					showChild: false,
					children: [
						{ name: '工单分析', routeName: 'Gongdanfx', href: null },
						{ name: '运维报警分析', routeName: 'Yunweibaojingfx', href: null },
						{ name: '客户报警分析', routeName: 'Kehubaojingfx', href: null },
						{ name: '健康度分析', routeName: 'Jiankangdufx', href: null }
					]
				},
				{
					name: '动环监控',
					href: null,
					routeName: null,
					showChild: false,
					children: [
						{ name: '站点监测', routeName: 'Zhandianjc', href: null },
						{ name: 'UPS监控', routeName: null, href: '/ana/donghuanjc/UPSjiance.aspx' },
						{ name: '蓄电池监控', routeName: null, href: '/ana/donghuanjc/xudianchijiance.aspx' },
						{ name: '空调监控', routeName: null, href: '/ana/donghuanjc/kongtiaojiance .aspx' },
						{ name: 'SF6监测', routeName: null, href: '/ana/donghuanjc/SF6jiance.aspx' },
						{ name: '通讯线缆监测', routeName: null, href: '/ana/donghuanjc/tongxunxianlanjiance.aspx' },
						{ name: '风机监控', routeName: null, href: '/ana/donghuanjc/FengJiJianCe.aspx' },
						{ name: '消防监控', routeName: null, href: '/ana/donghuanjc/xiaofangjiance.aspx' },
						{ name: '给排水监控', routeName: null, href: '/ana/donghuanjc/jipaishuiJianCe.aspx' },
						{ name: '门禁监控', routeName: null, href: '/ana/donghuanjc/MenJinJianCe.aspx' }
					]
				},
				{
					name: '智能安防',
					href: null,
					routeName: null,
					showChild: false,
					children: [
						{ name: '实时视频', routeName: 'Shishishipin', href: null },
						{ name: '历史录像', routeName: null, href: '/_temp/智能安防_录像回放.png' }
					]
				},
				{
					name: '运维管理',
					href: null,
					routeName: null,
					showChild: false,
					children: [
						{ name: '工单管理', routeName: null, href: '/yunwei/workorder.aspx' },
						{ name: '业扩管理', routeName: null, href: '/yunwei/yekuo_Man.aspx' },
						{ name: '智能巡检', routeName: 'Zhinengxunjian', href: null },
						{ name: '巡检管理', routeName: null, href: '/yunwei/xunjian_plan.aspx' },
						{ name: '操作票', routeName: null, href: '/yunwei/ticket_Man.aspx' }
					]
				}
			]
		},
		{
			id: 'menu_nxgl',
			name: '能效管理',
			checked: false,
			items: [
				{
					name: '客户首页',
					href: null,
					routeName: 'Nengxiaoshouye',
					showChild: false,
					children: [],
				},
				{
					name: '运维首页',
					href: null,
					routeName: 'Nengxiaoyunweishouye',
					showChild: false,
					children: [],
				},
				{
					name: '电费分析',
					href: null,
					routeName: 'Dianfeifx',
					showChild: false,
					children: [],
				},
				{
					name: '变压器损耗分析',
					href: null,
					routeName: 'Bianyaqifx',
					showChild: false,
					children: [],
				},
				{
					name: '电能质量',
					href: null,
					routeName: null,
					showChild: false,
					children: [
						{ name: '电压偏差', routeName: 'Dianyapiancha', href: null },
						{ name: '三相不平衡监测', routeName: 'Sangxiangbupingheng', href: null },
						{ name: '谐波分析', routeName: 'Xiebofx', href: null }
					]
				},

				{
					name: '报告',
					href: '/xxx',
					routeName: null,
					showChild: false,
					children: []
				}
			]
		},
		{
			id: 'menu_xtgl',
			name: '资产管理',
			checked: false,
			items: []
		},
		{
			id: 'menu_khfw',
			name: '客户服务',
			checked: false,
			items: [
				{
					name: '客户服务',
					href: '/xxxxxx',
					routeName: null,
					showChild: false,
					children: [],
				}
			]
		},
		{
			id: 'menu_xtgl',
			name: '系统管理',
			checked: false,
			items: [
				{
					name: '运维实施',
					href: '/xxxxxx',
					routeName: null,
					showChild: false,
					children: [],
				}
			]
		}
	],
	// anaType维护表
	anaTypeData: {
		AdminHome: 'AdminHome',
		Bianyaqi: 'SheBei-BianYaQi',
		Duanluqi: 'SheBei-DuanLuqi',
		Dianrongqi: 'SheBei-DianRongQi',
		Dianliujc: 'Jiance_Dianliu',
		Dianyajc: 'Jiance_Dianya',
		Gonglvjc: 'Jiance_Gonglv',
		Gonglvysjc: 'Jiance_Gonglvys',
		Shishishipin: 'Anfang-Shipin',
		Dianfeifx: 'NengXiao-Dianfei',
		Bianyaqifx: 'NengXiao-Byqsh',
		Sangxiangbupingheng: 'NengXiao-Sanxiang'
	},
	qy: require("../image/customerBig/icon_map_zdynqy.png"),
	jz: require("../image/customerBig/icon_map_syjz.png"),
	yq: require("../image/customerBig/icon_map_gyyq.png"),
	gf: require("../image/customerBig/icon_map_gf.png"),
	//客户参观版右屏点位数据
	rightScreenPointAction: [
		{
			top: '55px',
			left: '420px',
			type: 'yq',
			color: '#F79F00',
			pointIcon: require("../image/secondBig/icon_gongchangyuanqu.png"),
			pointWord: '电子制造工厂',
			data: {
				zrl: '8000',
				fh: '5600',
				num: '0'
			}
		},
		{
			top: '255px',
			left: '750px',
			type: 'yq',
			color: '#F79F00',
			pointIcon: require("../image/secondBig/icon_gongchangyuanqu.png"),
			pointWord: '电子制造工厂',
			data: {
				zrl: '8000',
				fh: '5600',
				num: '0'
			}
		},
		{
			top: '500px',
			left: '339px',
			type: 'yq',
			color: '#F79F00',
			pointIcon: require("../image/secondBig/icon_gongchangyuanqu.png"),
			pointWord: '电子制造工厂',
			data: {
				zrl: '8000',
				fh: '5600',
				num: '0'
			}
		},
		{
			top: '100px',
			left: '339px',
			type: 'yq',
			color: '#F79F00',
			pointIcon: require("../image/secondBig/icon_gongchangyuanqu.png"),
			pointWord: '电子制造工厂',
			data: {
				zrl: '8000',
				fh: '5600',
				num: '0'
			}
		},
		{
			top: '300px',
			left: '539px',
			type: 'yq',
			color: '#F79F00',
			pointIcon: require("../image/secondBig/icon_gongchangyuanqu.png"),
			pointWord: '电子制造工厂',
			data: {
				zrl: '8000',
				fh: '5600',
				num: '0'
			}
		},
		{
			top: '45px',
			left: '800px',
			type: 'qy',
			color: 'rgb(22, 230, 255)',
			pointIcon: require("../image/secondBig/icon_qiye.png"),
			pointWord: '东利科技',
			data: {
				zrl: '8000',
				fh: '5600',
				num: '0'
			}
		},
		{
			top: '505px',
			left: '760px',
			type: 'qy',
			color: 'rgb(22, 230, 255)',
			pointIcon: require("../image/secondBig/icon_qiye.png"),
			pointWord: '东利科技',
			data: {
				zrl: '8000',
				fh: '5600',
				num: '0'
			}
		},
		{
			top: '255px',
			left: '300px',
			type: 'qy',
			color: 'rgb(22, 230, 255)',
			pointIcon: require("../image/secondBig/icon_qiye.png"),
			pointWord: '东利科技',
			data: {
				zrl: '8000',
				fh: '5600',
				num: '0'
			}
		},
		{
			top: '275px',
			left: '350px',
			type: 'qy',
			color: 'rgb(22, 230, 255)',
			pointIcon: require("../image/secondBig/icon_qiye.png"),
			pointWord: '东利科技',
			data: {
				zrl: '8000',
				fh: '5600',
				num: '0'
			}
		},
		{
			top: '355px',
			left: '500px',
			type: 'qy',
			color: 'rgb(22, 230, 255)',
			pointIcon: require("../image/secondBig/icon_qiye.png"),
			pointWord: '东利科技',
			data: {
				zrl: '8000',
				fh: '5600',
				num: '0'
			}
		}, {
			top: '85px',
			left: '560px',
			type: 'gf',
			color: '#018AF4',
			pointIcon: require("../image/secondBig/icon_guangfu.png"),
			pointWord: '屋顶分布式光伏发电站',
			data: {
				zrl: '600',
				fdl: '9835'
			}
		},
		{
			top: '260px',
			left: '620px',
			type: 'gf',
			color: '#018AF4',
			pointIcon: require("../image/secondBig/icon_guangfu.png"),
			pointWord: '屋顶分布式光伏发电站',
			data: {
				zrl: '600',
				fdl: '9835'
			}
		},
		{
			top: '395px',
			left: '260px',
			type: 'gf',
			color: '#018AF4',
			pointIcon: require("../image/secondBig/icon_guangfu.png"),
			pointWord: '屋顶分布式光伏发电站',
			data: {
				zrl: '600',
				fdl: '9835'
			}
		}, {
			top: '350px',
			left: '560px',
			type: 'jz',
			color: '#FF2323',
			pointIcon: require("../image/secondBig/icon_shangyejianzhu.png"),
			pointWord: '商业综合体楼宇',
			data: {
				zrl: '5000',
				fh: '1250',
				num: '1'
			}
		}, {
			top: '530px',
			left: '160px',
			type: 'jz',
			color: '#FF2323',
			pointIcon: require("../image/secondBig/icon_shangyejianzhu.png"),
			pointWord: '商业综合体楼宇',
			data: {
				zrl: '5000',
				fh: '1250',
				num: '1'
			}
		}, {
			top: '520px',
			left: '660px',
			type: 'jz',
			color: '#FF2323',
			pointIcon: require("../image/secondBig/icon_shangyejianzhu.png"),
			pointWord: '商业综合体楼宇',
			data: {
				zrl: '5000',
				fh: '1250',
				num: '1'
			}
		}, {
			top: '120px',
			left: '660px',
			type: 'jz',
			color: '#FF2323',
			pointIcon: require("../image/secondBig/icon_shangyejianzhu.png"),
			pointWord: '商业综合体楼宇',
			data: {
				zrl: '5000',
				fh: '1250',
				num: '1'
			}
		}, {
			top: '320px',
			left: '325px',
			type: 'jz',
			color: '#FF2323',
			pointIcon: require("../image/secondBig/icon_shangyejianzhu.png"),
			pointWord: '商业综合体楼宇',
			data: {
				zrl: '5000',
				fh: '1250',
				num: '1'
			}
		}],
	//客户参观版右屏点位数据
	rightScreenPoint: [{
		top: '45px',
		left: '360px',
		type: 'yq',
		pointIcon: require("../image/customerBig/icon_map_gyyq.png"),
		pointWord: '电子制造工厂',
		data: {
			zrl: '8000',
			fh: '5600',
			num: '0'
		}
	}, {
		top: '150px',
		left: '180px',
		type: 'yq',
		pointIcon: require("../image/customerBig/icon_map_gyyq.png"),
		pointWord: '电子制造工厂',
		data: {
			zrl: '8000',
			fh: '5600',
			num: '0'
		}
	}, {
		top: '300px',
		left: '260px',
		type: 'yq',
		pointIcon: require("../image/customerBig/icon_map_gyyq.png"),
		pointWord: '电子制造工厂',
		data: {
			zrl: '8000',
			fh: '5600',
			num: '0'
		}
	}, {
		top: '550px',
		left: '300px',
		type: 'yq',
		pointIcon: require("../image/customerBig/icon_map_gyyq.png"),
		pointWord: '电子制造工厂',
		data: {
			zrl: '8000',
			fh: '5600',
			num: '0'
		}
	}, {
		top: '350px',
		left: '500px',
		type: 'yq',
		pointIcon: require("../image/customerBig/icon_map_gyyq.png"),
		pointWord: '电子制造工厂',
		data: {
			zrl: '8000',
			fh: '5600',
			num: '0'
		}
	}, {
		top: '50px',
		left: '500px',
		type: 'jz',
		pointIcon: require("../image/customerBig/icon_map_syjz.png"),
		pointWord: '商业综合体楼宇',
		data: {
			zrl: '5000',
			fh: '1250',
			num: '1'
		}
	}, {
		top: '120px',
		left: '300px',
		type: 'jz',
		pointIcon: require("../image/customerBig/icon_map_syjz.png"),
		pointWord: '商业综合体楼宇',
		data: {
			zrl: '5000',
			fh: '1250',
			num: '1'
		}
	}, {
		top: '250px',
		left: '300px',
		type: 'jz',
		pointIcon: require("../image/customerBig/icon_map_syjz.png"),
		pointWord: '商业综合体楼宇',
		data: {
			zrl: '5000',
			fh: '1250',
			num: '1'
		}
	}, {
		top: '335px',
		left: '300px',
		type: 'jz',
		pointIcon: require("../image/customerBig/icon_map_syjz.png"),
		pointWord: '商业综合体楼宇',
		data: {
			zrl: '5000',
			fh: '1250',
			num: '1'
		}
	}, {
		top: '170px',
		left: '200px',
		type: 'jz',
		pointIcon: require("../image/customerBig/icon_map_syjz.png"),
		pointWord: '商业综合体楼宇',
		data: {
			zrl: '5000',
			fh: '1250',
			num: '1'
		}
	}, {
		top: '270px',
		left: '390px',
		type: 'jz',
		pointIcon: require("../image/customerBig/icon_map_syjz.png"),
		pointWord: '商业综合体楼宇',
		data: {
			zrl: '5000',
			fh: '1250',
			num: '1'
		}
	}, {
		top: '370px',
		left: '175px',
		type: 'jz',
		pointIcon: require("../image/customerBig/icon_map_syjz.png"),
		pointWord: '商业综合体楼宇',
		data: {
			zrl: '5000',
			fh: '1250',
			num: '1'
		}
	}, {
		top: '570px',
		left: '190px',
		type: 'jz',
		pointIcon: require("../image/customerBig/icon_map_syjz.png"),
		pointWord: '商业综合体楼宇',
		data: {
			zrl: '5000',
			fh: '1250',
			num: '1'
		}
	}, {
		top: '570px',
		left: '390px',
		type: 'jz',
		pointIcon: require("../image/customerBig/icon_map_syjz.png"),
		pointWord: '商业综合体楼宇',
		data: {
			zrl: '5000',
			fh: '1250',
			num: '1'
		}
	}, {
		top: '570px',
		left: '590px',
		type: 'jz',
		pointIcon: require("../image/customerBig/icon_map_syjz.png"),
		pointWord: '商业综合体楼宇',
		data: {
			zrl: '5000',
			fh: '1250',
			num: '1'
		}
	}, {
		top: '370px',
		left: '290px',
		type: 'jz',
		pointIcon: require("../image/customerBig/icon_map_syjz.png"),
		pointWord: '商业综合体楼宇',
		data: {
			zrl: '5000',
			fh: '1250',
			num: '1'
		}
	}, {
		top: '170px',
		left: '690px',
		type: 'jz',
		pointIcon: require("../image/customerBig/icon_map_syjz.png"),
		pointWord: '商业综合体楼宇',
		data: {
			zrl: '5000',
			fh: '1250',
			num: '1'
		}
	}, {
		top: '180px',
		left: '720px',
		type: 'gf',
		pointIcon: require("../image/customerBig/icon_map_gf.png"),
		pointWord: '屋顶分布式光伏发电站',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '280px',
		left: '620px',
		type: 'gf',
		pointIcon: require("../image/customerBig/icon_map_gf.png"),
		pointWord: '屋顶分布式光伏发电站',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '280px',
		left: '320px',
		type: 'gf',
		pointIcon: require("../image/customerBig/icon_map_gf.png"),
		pointWord: '屋顶分布式光伏发电站',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '100px',
		left: '620px',
		type: 'gf',
		pointIcon: require("../image/customerBig/icon_map_gf.png"),
		pointWord: '屋顶分布式光伏发电站',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '100px',
		left: '520px',
		type: 'gf',
		pointIcon: require("../image/customerBig/icon_map_gf.png"),
		pointWord: '屋顶分布式光伏发电站',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '130px',
		left: '500px',
		type: 'gf',
		pointIcon: require("../image/customerBig/icon_map_gf.png"),
		pointWord: '屋顶分布式光伏发电站',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '130px',
		left: '560px',
		type: 'gf',
		pointIcon: require("../image/customerBig/icon_map_gf.png"),
		pointWord: '屋顶分布式光伏发电站',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '130px',
		left: '360px',
		type: 'gf',
		pointIcon: require("../image/customerBig/icon_map_gf.png"),
		pointWord: '屋顶分布式光伏发电站',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '530px',
		left: '560px',
		type: 'gf',
		pointIcon: require("../image/customerBig/icon_map_gf.png"),
		pointWord: '屋顶分布式光伏发电站',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '530px',
		left: '260px',
		type: 'gf',
		pointIcon: require("../image/customerBig/icon_map_gf.png"),
		pointWord: '屋顶分布式光伏发电站',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '530px',
		left: '120px',
		type: 'gf',
		pointIcon: require("../image/customerBig/icon_map_gf.png"),
		pointWord: '屋顶分布式光伏发电站',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '450px',
		left: '180px',
		type: 'gf',
		pointIcon: require("../image/customerBig/icon_map_gf.png"),
		pointWord: '屋顶分布式光伏发电站',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '450px',
		left: '580px',
		type: 'gf',
		pointIcon: require("../image/customerBig/icon_map_gf.png"),
		pointWord: '屋顶分布式光伏发电站',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '350px',
		left: '380px',
		type: 'qy',
		pointIcon: require("../image/customerBig/icon_map_zdynqy.png"),
		pointWord: '东利科技',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '350px',
		left: '380px',
		type: 'qy',
		pointIcon: require("../image/customerBig/icon_map_zdynqy.png"),
		pointWord: '东利科技',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '150px',
		left: '180px',
		type: 'qy',
		pointIcon: require("../image/customerBig/icon_map_zdynqy.png"),
		pointWord: '东利科技',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '250px',
		left: '230px',
		type: 'qy',
		pointIcon: require("../image/customerBig/icon_map_zdynqy.png"),
		pointWord: '东利科技',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '390px',
		left: '222px',
		type: 'qy',
		pointIcon: require("../image/customerBig/icon_map_zdynqy.png"),
		pointWord: '东利科技',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '230px',
		left: '422px',
		type: 'qy',
		pointIcon: require("../image/customerBig/icon_map_zdynqy.png"),
		pointWord: '东利科技',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '390px',
		left: '322px',
		type: 'qy',
		pointIcon: require("../image/customerBig/icon_map_zdynqy.png"),
		pointWord: '东利科技',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '290px',
		left: '222px',
		type: 'qy',
		pointIcon: require("../image/customerBig/icon_map_zdynqy.png"),
		pointWord: '东利科技',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '270px',
		left: '522px',
		type: 'qy',
		pointIcon: require("../image/customerBig/icon_map_zdynqy.png"),
		pointWord: '东利科技',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '230px',
		left: '550px',
		type: 'qy',
		pointIcon: require("../image/customerBig/icon_map_zdynqy.png"),
		pointWord: '东利科技',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '580px',
		left: '652px',
		type: 'qy',
		pointIcon: require("../image/customerBig/icon_map_zdynqy.png"),
		pointWord: '东利科技',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}, {
		top: '580px',
		left: '80px',
		type: 'qy',
		pointIcon: require("../image/customerBig/icon_map_zdynqy.png"),
		pointWord: '东利科技',
		data: {
			zrl: '600',
			fdl: '9835'
		}
	}],
	// 工单状态
	orderStatuList: [
		{
			label: '全部',
			value: ''
		},
		{
			label: '未提交',
			value: '{"flow": 0,"state": ""}'
		},
		{
			label: '待审批',
			value: '{"flow": 1,"state": ""}'
		},
		{
			label: '已驳回',
			value: '{"flow": 99,"state": ""}'
		},
		{
			label: '待接收',
			value: '{"flow": 10,"state": ""}'
		},
		{
			label: '异常',
			value: '{"flow": 10,"state": 99}'
		},
		{
			label: '待到场',
			value: '{"flow": 10,"state": 4}'
		},
		{
			label: '待完成',
			value: '{"flow": 10,"state": 3}'
		},
		{
			label: '待验收',
			value: '{"flow": 10,"state": 1}'
		},
		{
			label: '已验收',
			value: '{"flow": 10,"state": 2}'
		},
		{
			label: '终止',
			value: '{"flow": 10,"state": 98}'
		}
	],
	// 设备类型选项维护
	equipTypeList: [
		{
			name: '全部',
			value: ''
		},
		{
			name: '断路器',
			value: '01'
		},
		{
			name: '电容器',
			value: '02'
		},
		{
			name: '变压器',
			value: '03'
		},
		{
			name: '开关柜',
			value: '04'
		},
		{
			name: '保护设备',
			value: '05'
		},
		{
			name: 'UPS',
			value: '06'
		},
		{
			name: '电缆',
			value: '07'
		},
		{
			name: '蓄电池',
			value: '08'
		},
		{
			name: '直流屏',
			value: '09'
		},
		{
			name: '网关设备',
			value: '10'
		}
	],
	// 报警类型选项维护
	bjTypeList: [
		{
			name: '全部',
			value: ''
		},
		{
			name: '开关变位',
			value: '01'
		},
		{
			name: '保护信号',
			value: '02'
		},
		{
			name: '遥信变位',
			value: '03'
		},
		{
			name: '遥测越限',
			value: '04'
		},
		{
			name: '未着工装',
			value: '05'
		},
		{
			name: '禁区入侵',
			value: '06'
		},
		{
			name: '拌线越界',
			value: '07'
		},
		{
			name: '通信故障',
			value: '08'
		},
		{
			name: '平台事件',
			value: '09'
		}
	],
	// 确认状态选项维护
	confirmStateList: [
		{
			name: '全部',
			value: ''
		},
		{
			name: '未确认',
			value: '0'
		},
		{
			name: '人为动作',
			value: '1'
		},
		{
			name: '转发工单',
			value: '2'
		},
		{
			name: '可忽略',
			value: '3'
		},
		{
			name: '误发',
			value: '4'
		},
		{
			name: '系统确认',
			value: '5'
		},
		{
			name: '违规通知',
			value: '6'
		},
		{
			name: '违规提示',
			value: '7'
		}
	],
}