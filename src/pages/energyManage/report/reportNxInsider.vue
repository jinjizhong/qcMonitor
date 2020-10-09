<template>
  <div class="report_nx_content">
    <div class="top_header flex_row_yCenter">
      <div class="select_box flex_row_yCenter">
        <p class="p_title">客户名称</p>
        <el-select class="common_input" v-model="companyId" placeholder="请选择" @change="handleCompany">
          <el-option v-for="item in companyList" :key="item.clientId" :label="item.clientName" :value="item.clientId">
          </el-option>
        </el-select>
      </div>
      <div class="select_box flex_row_yCenter">
        <p class="p_title">厂站名称</p>
        <el-select class="common_input2" v-model="siteId" placeholder="请选择" @change="handleSite">
          <el-option v-for="item in siteList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="select_box flex_row_yCenter">
        <p class="p_title">报告状态</p>
        <el-select class="common_input3" v-model="reportState" placeholder="请选择" @change="handleReportState">
          <el-option v-for="item in reportStateList" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="select_box flex_row_yCenter">
        <p class="p_title">时间类型</p>
        <el-select class="common_input3" v-model="timeType" placeholder="请选择" @change="handleType">
          <el-option v-for="(item, index) in dateHoursList" :key="index" :label="item.name" :value="item.value" />
        </el-select>
      </div>
      <div class="select_box flex_row_yCenter">
        <p class="p_title">时间范围</p>
        <el-date-picker v-model="dateTime" type="datetimerange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" value-format="yyyy-mm-dd hh:mm:ss" @change="handleDateRange">
        </el-date-picker>
      </div>
      <div class="select_box flex_row_yCenter">
        <el-button @click="inquire()" type="primary">查询</el-button>
        <el-button @click="reset()" type="primary">重置</el-button>
      </div>
    </div>
    <div class="flex_row" style="justify-content: flex-end;">
      <p @click="createReport" class="create_report_btn">生成报告</p>
    </div>
    <div class="table_content">
      <el-table class="table_report" :header-cell-style="{ background: '#F8F8F9' }" :data="reportData">
        <el-table-column width="160" prop="reportCode" label="报告编号" />
        <el-table-column prop="reportTitle" label="报告名称" />
        <el-table-column width="100" prop="timeTypeName" label="时间类型" />
        <el-table-column width="120" prop="reportTime" label="报告日期" />
        <el-table-column width="180" prop="createTime" label="生成时间" />
        <el-table-column width="100" prop="buildTypeName" label="生成方式" />
        <el-table-column width="100" prop="reportState" label="报告状态" />
        <el-table-column width="180" prop="sendTime" label="发送记录" />
        <el-table-column width="165" label="接收人">
          <template slot-scope="scope">
            <p class="receive_people">{{scope.row.recivers}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.reportStatus=='2' || scope.row.reportStatus=='1'" @click="toDetail(scope.row)"
              type="text">详情</el-button>
            <el-button v-if="scope.row.reportStatus=='2' || scope.row.reportStatus=='1'" @click="toSee(scope.row)"
              type="text">查看</el-button>
            <el-button v-if="scope.row.reportStatus=='1'" @click="editReport(scope.row)" type="text">编辑报告</el-button>
            <el-button v-if="scope.row.reportStatus=='0'" @click="edit(scope.row)" type="text">编辑</el-button>
            <el-button v-if="scope.row.reportStatus=='1'" @click="send(scope.row)" type="text">发送</el-button>
            <el-button v-if="scope.row.reportStatus=='2'" @click="reSend(scope.row)" type="text">再次发送</el-button>
            <el-button style="color: #FF1B1B;" v-if="scope.row.reportStatus=='0' || scope.row.reportStatus=='1'"
              @click="deleteReport(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page_box">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize"
        :total="total" layout="total, prev, pager, next">
      </el-pagination>
    </div>
    <!--------------------------- （生成/编辑）报告 ------------------------------>
    <el-dialog :title="createTitle" :visible.sync="createReportVisible" width="35%" :before-close="createReportClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <div class="flex_row">
          <el-form-item class="flex_row" label="客户名称" prop="clientId" style="margin-right:10px;">
            <el-select class="common_input" v-model="ruleForm.clientId" placeholder="请选择客户名称"
              @change="handleCompanyDialog">
              <el-option v-for="item in companyListDialog" :key="item.clientId" :label="item.clientName"
                :value="item.clientId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="flex_row" label="厂站名称" prop="siteId">
            <el-select class="common_input" v-model="ruleForm.siteId" placeholder="请选择厂站名称" @change="handleSiteDialog">
              <el-option v-for="item in siteListDialog" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="flex_row">
          <el-form-item class="flex_row" label="时间类型" prop="timeType" style="margin-right:10px;">
            <el-select class="common_input" v-model="ruleForm.timeType" placeholder="请选择时间类型"
              @change="handleTimeTypeDialog">
              <el-option v-for="item in timeTypeDialog" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="flex_row" label="报告时间" prop="reportTime">
            <el-date-picker style="min-width: 230px;" v-model="ruleForm.reportTime" :type="typeReport"
              :value-format="valueFormat" placeholder="请选择报告时间" @change="handleReportTimeDialog">
            </el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item class="flex_row" label="报告名称" prop="reportTitle">
            <el-input style="min-width: 230px;" v-model="ruleForm.reportTitle"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item style="margin-left:38px;" class="flex_row" label="备注">
            <el-input style="min-width: 550px;" type="textarea" v-model="ruleForm.remarks"></el-input>
          </el-form-item>
        </div>
        <div class="flex_row_xCenter">
          <el-button @click="closeCreateDialog">关闭</el-button>
          <el-button class="btn_create" @click="creatReportDialog('ruleForm')">生成</el-button>
          <el-button type="primary" @click="saveReportDialog('ruleForm')">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!------------------------------- 报告详情信息 ----------------------------------->
    <el-dialog title="报告详情信息" :visible.sync="reportDetailVisible" width="50%" :before-close="reportDetailClose">
      <div>
        <p class="rd_common_title">报告基本信息</p>
        <div class="rd_common_pd flex_row">
          <p class="rd_common_label">报告编号：BGSH1004</p>
          <p class="rd_common_label">客户名称：全程智能上海</p>
        </div>
        <div class="rd_common_pd flex_row">
          <p class="rd_common_label">厂站名称：上海加枫路</p>
          <p class="rd_common_label">报告名称：2020全程智能上海运维报告</p>
        </div>
        <div class="rd_common_pd flex_row">
          <p class="rd_common_label">报告类型：运维报告</p>
          <p class="rd_common_label">时间类型：年报告</p>
        </div>
        <div class="rd_common_pd flex_row">
          <p class="rd_common_label">报告时间：2019年</p>
        </div>
        <div class="rd_common_pd flex_row">
          <p class="rd_common_label">报告备注：xxxxxxxxxxxxxx</p>
        </div>
      </div>
      <div>
        <p class="rd_common_title">报告状态</p>
        <div class="rd_common_pd flex_row">
          <p class="rd_common_label">报告状态：已发送</p>
          <p class="rd_common_label">接收人：1#用户账号名，2#用户账号名</p>
        </div>
      </div>
      <div>
        <p class="rd_common_title">历史进度</p>
        <div style="margin:20px 0 0 10px;">
          <el-timeline :reverse="reverse">
            <el-timeline-item v-for="(activity, index) in activities" :key="index" :color="activity.color">
              <p class="flex_row">
                <span style="flex:1;">{{activity.status}}</span>
                <span style="flex:1;">{{activity.name}}</span>
                <span style="flex:1;">{{activity.job}}</span>
                <span style="flex:1;">{{activity.timestamp}}</span>
              </p>
            </el-timeline-item>
          </el-timeline>
        </div>

      </div>
    </el-dialog>
    <!------------------------------- （发送/再次发送)报告 ----------------------------------->
    <el-dialog title="发送报告" :visible.sync="receiveReportVisible" width="25%" :before-close="receiveReportlClose">
      <div>
        <p style="margin-bottom:8px;">报告名称：{{receiveReportName}}</p>
        <div class="select_box flex_row_yCenter">
          <p>接收人：</p>
          <el-cascader style="width: 250px;" v-model="receiveReportList" :options="receiveReportOptions"
            :show-all-levels="false" :props="reportProps" @change="rpChange">
            <template slot-scope="{ node, data }">
              <span>{{ data.label }} <span v-if="data.isReceive">（已发送）</span></span>
            </template>
          </el-cascader>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="receiveReportlClose">取 消</el-button>
        <el-button type="primary" @click="receiveReportVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!------------------------------- 编辑报告 ----------------------------------->
    <el-dialog top="2vh" style="height:98vh;" title="编辑报告" :visible.sync="editReportVisible" width="70%"
      :before-close="editReportClose">
      <el-form class="edit_form_box" ref="editForm" :model="editForm">
        <div class="ed_common_pd flex_row_center">
          <p style="font-size: 18px; font-weight:bold;" class="ed_common_label">2020年5月裕安大厦能效报告</p>
        </div>
        <div class="flex_row">
          <el-form-item class="editReport_mr_bottom flex_row" label="总容量(kVA)：">
            <el-input size="small" style="width: 80%;" v-model="editForm.reportName"></el-input>
          </el-form-item>
          <el-form-item class="editReport_mr_bottom flex_row" label="电压等级(kV)：">
            <el-input size="small" style="width: 80%;" v-model="editForm.reportName"></el-input>
          </el-form-item>
          <el-form-item class="editReport_mr_bottom flex_row" label="主变台数(台)：">
            <el-input size="small" style="width: 80%;" v-model="editForm.reportName"></el-input>
          </el-form-item>
          <el-form-item class="editReport_mr_bottom flex_row" label="监测点数(个)：">
            <el-input size="small" style="width: 80%;" v-model="editForm.reportName"></el-input>
          </el-form-item>
        </div>
        <p class="editReport_p rd_common_pd">一、 能效报告摘要</p>
        <div class="flex_row_yCenter ed_bottom">
          <el-input type="textarea" size="small" v-model="editForm.reportName"></el-input>
        </div>
        <p class="editReport_p rd_common_pd">二、 电费分析</p>
        <p class="ed_common_pd">分时段电度与电费</p>
        <div>
          <el-table :data="editForm.fsdFeedList" :header-cell-style="{ background: '#F8F8F9' }"
            style="width: 100%;height: 200px; overflow:scroll;">
            <el-table-column label="时间（日）">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.time"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="峰时段电量（kWh）">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.fdl"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="平时段电量（kWh）">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.pdl"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="谷时段电量（kWh）">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.gdl"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="电费（元）">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.feed"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <p class="ed_common_pd">月分时段电量占比</p>
        <div class="flex_row">
          <el-form-item class="editReport_mr_bottom flex_row" label="峰时段电量(kWh)：">
            <el-input size="small" style="width: 80%;" v-model="editForm.reportName"></el-input>
          </el-form-item>
          <el-form-item class="editReport_mr_bottom flex_row" label="平时段电量(kWh)：">
            <el-input size="small" style="width: 80%;" v-model="editForm.reportName"></el-input>
          </el-form-item>
          <el-form-item class="editReport_mr_bottom flex_row" label="谷时段电量(kWh)：">
            <el-input size="small" style="width: 80%;" v-model="editForm.reportName"></el-input>
          </el-form-item>
        </div>
        <p class="ed_common_pd">月分时段电费占比</p>
        <div class="flex_row">
          <el-form-item class="editReport_mr_bottom flex_row" label="峰时段电费(元)：">
            <el-input size="small" style="width: 80%;" v-model="editForm.reportName"></el-input>
          </el-form-item>
          <el-form-item class="editReport_mr_bottom flex_row" label="平时段电费(元)：">
            <el-input size="small" style="width: 80%;" v-model="editForm.reportName"></el-input>
          </el-form-item>
          <el-form-item class="editReport_mr_bottom flex_row" label="谷时段电费(元)：">
            <el-input size="small" style="width: 80%;" v-model="editForm.reportName"></el-input>
          </el-form-item>
        </div>
        <p class="editReport_p rd_common_pd">三、 损耗分析</p>
        <p class="ed_common_pd">3.1总线损与总线损率</p>
        <div class="flex_row">
          <el-form-item class="editReport_mr_bottom flex_row" label="总线损(kWh)：">
            <el-input size="small" style="width: 80%;" v-model="editForm.reportName"></el-input>
          </el-form-item>
          <el-form-item class="editReport_mr_bottom flex_row" label="总有效电量(kWh)">
            <el-input size="small" style="width: 80%;" v-model="editForm.reportName"></el-input>
          </el-form-item>
        </div>
        <p class="ed_common_pd">3.2经济运行区间</p>
        <div v-for="(item,key) in editForm.area" :key="key">
          <p class="ed_common_pd">{{item.name}}</p>
          <div class="flex_row">
            <div style="margin-right: 15px;" class="flex_row_yCenter ed_bottom">
              <p style="width: 55px;">空载(h)</p>
              <el-input style="width: 80px;" size="small" v-model="item.kongzai"></el-input>
            </div>
            <div style="margin-right: 15px;" class="flex_row_yCenter ed_bottom">
              <p style="width: 55px;">轻载(h)</p>
              <el-input style="width: 80px;" size="small" v-model="item.qinzai"></el-input>
            </div>
            <div style="margin-right: 15px;" class="flex_row_yCenter ed_bottom">
              <p style="width: 55px;">经济(h)</p>
              <el-input style="width: 80px;" size="small" v-model="item.jinji"></el-input>
            </div>
            <div style="margin-right: 15px;" class="flex_row_yCenter ed_bottom">
              <p style="width: 55px;">重载(h)</p>
              <el-input style="width: 80px;" size="small" v-model="item.zhongzai"></el-input>
            </div>
            <div style="margin-right: 15px;" class="flex_row_yCenter ed_bottom">
              <p style="width: 55px;">超载(h)</p>
              <el-input style="width: 80px;" size="small" v-model="item.chaozai"></el-input>
            </div>
          </div>
        </div>
        <p class="editReport_p rd_common_pd">四、电能质量</p>
        <p class="ed_common_pd">4.1 电压偏差</p>
        <div class="flex_row">
          <el-form-item class="editReport_mr_bottom flex_row" label="10kV母线电压偏差合格率(%)：">
            <el-input size="small" style="width: 80%;" v-model="editForm.reportName"></el-input>
          </el-form-item>
          <el-form-item class="editReport_mr_bottom flex_row" label="0.4kV母线电压偏差合格率(%)">
            <el-input size="small" style="width: 80%;" v-model="editForm.reportName"></el-input>
          </el-form-item>
        </div>
        <p class="ed_common_pd">4.2 三相电压不平衡</p>
        <div class="flex_row">
          <el-form-item class="editReport_mr_bottom flex_row" label="10kV母线三相电压不平衡合格率(%)：">
            <el-input size="small" style="width: 80%;" v-model="editForm.reportName"></el-input>
          </el-form-item>
          <el-form-item class="editReport_mr_bottom flex_row" label="0.0.4kV母线三相电压不平衡合格率(%)">
            <el-input size="small" style="width: 80%;" v-model="editForm.reportName"></el-input>
          </el-form-item>
        </div>
        <div class="flex_row_yCenter ed_bottom">
          <p style="width: 80px;">技术标准：</p>
          <el-input type="textarea" size="small" v-model="editForm.reportName"></el-input>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editReportVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditReport">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'reportClientNxInsider',
  components: {
  },
  data () {
    return {
      companyId: '',
      companyList: [{
        clientId: '',
        clientName: '全部'
      }],
      siteId: '',
      siteList: [],
      reportState: '',
      reportStateList: [
        {
          name: '全部',
          value: ''
        },
        {
          name: '待生成',
          value: '0'
        },
        {
          name: '未发送',
          value: '1'
        },
        {
          name: '已发送',
          value: '2'
        },
      ],
      timeType: '2',
      dateHoursList: [
        {
          id: 0,
          name: '全部',
          value: '2'
        },
        {
          id: 1,
          name: '月报告',
          value: '0'
        },
        {
          id: 2,
          name: '年报告',
          value: '1'
        }
      ],
      dateTime: '',
      currentPage: 1,
      pageSize: 8,
      total: 0,
      reportData: [],
      startTime: '',
      endTime: '',
      createTitle: '生成报告',
      typeReport: 'month',
      valueFormat: 'yyyy-MM',
      createReportVisible: false,
      companyListDialog: [],
      siteListDialog: [],
      timeTypeDialog: [{ name: '月报告', value: '0' }, { name: '年报告', value: '1' }],
      ruleForm: {
        clientId: '',
        siteId: '',
        timeType: '',
        reportTime: '',
        reportTitle: '',
        remarks: ''
      },
      rules: {
        clientId: [
          { required: true, message: '请选择客户名称', trigger: 'change' }
        ],
        siteId: [
          { required: true, message: '请选择厂站名称', trigger: 'change' }
        ],
        timeType: [
          { required: true, message: '请选择时间类型', trigger: 'change' }
        ],
        reportTime: [
          { required: true, message: '请选择报告时间', trigger: 'change' }
        ],
        reportTitle: [
          { required: true, message: '请输入报告名称', trigger: 'blur' }
        ]
      },
      reportDetailVisible: false,
      editReportVisible: true,
      importList: {},
      ImportRules: {},
      fileList: [],
      xlsxJson: {},
      reverse: false,
      activities: [
        {
          status: '报告生成',
          name: '张胜男',
          job: '能效工程师',
          timestamp: '2018-04-15',
          color: '#4BBD6B'
        }, {
          status: '报告编辑',
          name: '张胜男',
          job: '能效工程师',
          timestamp: '2018-04-13',
          color: '#4BBD6B'
        }, {
          status: '报告首次发送',
          name: '张胜男',
          job: '能效工程师',
          timestamp: '2018-04-11',
          color: '#4BBD6B'
        }
      ],
      receiveReportVisible: false,
      receiveReportOptions: [
        {
          value: 'qc',
          label: '全程智能',
          children: [{
            value: '薛玉龙',
            label: '薛玉龙',
            isReceive: true
          }, {
            value: '贾豫',
            label: '贾豫',
            isReceive: false
          }, {
            value: '贾豫',
            label: '贾豫',
            isReceive: true
          }, {
            value: '贾豫',
            label: '贾豫',
            isReceive: false
          }, {
            value: '贾豫',
            label: '贾豫',
            isReceive: false
          }, {
            value: '贾豫',
            label: '贾豫',
            isReceive: false
          }]
        }
      ],
      receiveReportList: [],
      reportProps: { multiple: true, emitPath: false },
      receiveReportName: '',
      editForm: {
        reportName: '',
        fsdFeedList: [
          {
            time: '1',
            fdl: '1000',
            pdl: '2000',
            gdl: '800',
            feed: '3000'
          },
          {
            time: '2',
            fdl: '1000',
            pdl: '2000',
            gdl: '800',
            feed: '3000'
          },
          {
            time: '3',
            fdl: '1000',
            pdl: '2000',
            gdl: '800',
            feed: '3000'
          }
        ],
        area: [
          {
            name: '1#变压器经济运行区间',
            kongzai: '10',
            qinzai: '30',
            jinji: '10',
            zhongzai: '100',
            chaozai: '100'
          },
          {
            name: '2#变压器经济运行区间',
            kongzai: '10',
            qinzai: '30',
            jinji: '10',
            zhongzai: '100',
            chaozai: '100'
          },
          {
            name: '3#变压器经济运行区间',
            kongzai: '10',
            qinzai: '30',
            jinji: '10',
            zhongzai: '100',
            chaozai: '100'
          }
        ],
        transfomerList: [
          {
            name: '1#变压器',
            fuhe: '本月平均有功功率88.82kW；单日最大有功功率207kW，单日最小有功功率0kW。',
            fuzailv: '经济时长0h，占0%；超载时长0h，占0%;重载时长0h，占0%；轻载时长686h，占100%；空载时2h，占0.292%。',
            temperature: '1#变压器A相最高温度67℃，B相最高温76℃，C相最高温64℃。',
            remark: '变压器变压原理首先由法拉第发现，但是直到十九世纪80年代才开始实际应用。在发电场应该输出直流电和交流电的竞争中，交流电能够使用变压器是其优势之一。变压器可以将电能转换成高电压低电流形式，然后再转换回去，因此大大减小了电能在输送过程中的损失，使得电能的经济输送距离达到更远。'
          },
          {
            name: '2#变压器',
            fuhe: '本月平均有功功率88.82kW；单日最大有功功率207kW，单日最小有功功率0kW。',
            fuzailv: '经济时长0h，占0%；超载时长0h，占0%;重载时长0h，占0%；轻载时长686h，占100%；空载时2h，占0.292%。',
            temperature: '1#变压器A相最高温度67℃，B相最高温76℃，C相最高温64℃。',
            remark: '变压器变压原理首先由法拉第发现，但是直到十九世纪80年代才开始实际应用。在发电场应该输出直流电和交流电的竞争中，交流电能够使用变压器是其优势之一。变压器可以将电能转换成高电压低电流形式，然后再转换回去，因此大大减小了电能在输送过程中的损失，使得电能的经济输送距离达到更远。'
          },
          {
            name: '3#变压器',
            fuhe: '本月平均有功功率88.82kW；单日最大有功功率207kW，单日最小有功功率0kW。',
            fuzailv: '经济时长0h，占0%；超载时长0h，占0%;重载时长0h，占0%；轻载时长686h，占100%；空载时2h，占0.292%。',
            temperature: '1#变压器A相最高温度67℃，B相最高温76℃，C相最高温64℃。',
            remark: '变压器变压原理首先由法拉第发现，但是直到十九世纪80年代才开始实际应用。在发电场应该输出直流电和交流电的竞争中，交流电能够使用变压器是其优势之一。变压器可以将电能转换成高电压低电流形式，然后再转换回去，因此大大减小了电能在输送过程中的损失，使得电能的经济输送距离达到更远。'
          },
          {
            name: '4#变压器',
            fuhe: '本月平均有功功率88.82kW；单日最大有功功率207kW，单日最小有功功率0kW。',
            fuzailv: '经济时长0h，占0%；超载时长0h，占0%;重载时长0h，占0%；轻载时长686h，占100%；空载时2h，占0.292%。',
            temperature: '1#变压器A相最高温度67℃，B相最高温76℃，C相最高温64℃。',
            remark: '变压器变压原理首先由法拉第发现，但是直到十九世纪80年代才开始实际应用。在发电场应该输出直流电和交流电的竞争中，交流电能够使用变压器是其优势之一。变压器可以将电能转换成高电压低电流形式，然后再转换回去，因此大大减小了电能在输送过程中的损失，使得电能的经济输送距离达到更远。'
          }
        ],
        defectTable: [
          {
            defectName: '有缺陷',
            relevanceEquip: '1#变压器',
            defectLevel: 'T1',
            planDate: '2020-05-25',
            finishStatus: '已完成',
            implementation: '已完成'
          },
          {
            defectName: '看看',
            relevanceEquip: '2#变压器',
            defectLevel: 'T2',
            planDate: '2020-05-29',
            finishStatus: '未完成',
            implementation: '已完成'
          }
        ],
        repairTable: [
          {
            faultFunc: '有缺陷',
            relevanceEquip: '1#变压器',
            faultTime: 'T1',
            planDate: '2020-05-25',
            presentTime: '2020-05-25 12:00:00',
            faultRecoverTime: '2020-05-25 08:00:00',
            finishStatus: '已完成',
            accidentAnalyze: '未知'
          },
          {
            faultFunc: '有缺陷',
            relevanceEquip: '1#变压器',
            faultTime: 'T1',
            planDate: '2020-05-25',
            presentTime: '2020-05-29 12:00:00',
            faultRecoverTime: '2020-05-29 08:00:00',
            finishStatus: '已完成',
            accidentAnalyze: '未知'
          }
        ]
      },

    }
  },
  created () {
    this.getInfo()
    this.getReportList()
  },
  mounted () {
  },
  computed: mapState([
    'userClients',
    'myCompanyId',
    'curuserId',
    'headerSite'
  ]),
  // watch: {
  //   ruleForm: {
  //     handler (e) {
  //       if (e.companyId !== '' && e.siteId !== '' && e.timeType !== '' && e.reportTime !== '') {
  //         let reportTime = e.reportTime.split('-')
  //         let siteName = this.siteListDialog.filter(i => i.value == e.siteId)
  //         let timeName = e.timeType == '1' ? `${reportTime[0]}年` : `${reportTime[0]}年${reportTime[1]}月`
  //         this.ruleForm.reportName = `${timeName}${siteName[0].label}运维报告`
  //       }
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    // 获取筛选数据
    async getInfo () {
      const that = this
      that.companyList = that.companyList.concat(that.userClients)
      that.companyListDialog = that.userClients
      // await that.$store.dispatch('getCuruserId')
      // that.companyId = that.myCompanyId == '' ? that.userClients[0].clientId : that.myCompanyId
      let siteData = {
        userId: that.curuserId,
        clientFid: that.companyId
      }
      that.siteList = [{
        label: '全部',
        value: ''
      }]
      that.$store.dispatch('getSite', siteData).then(res => {
        that.siteList = that.siteList.concat(res.options)
        that.siteId = that.siteList[0].value
      })
    },
    // 获取报告列表
    getReportList () {
      let reportData = {
        userId: this.curuserId,
        reportType: 1,   // 1运维0能效
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        siteId: this.siteId, // 全部
        companyId: this.companyId,
        timeType: this.timeType, //月报告1年报告2全部
        reportState: this.reportState,
        startTime: this.startTime,
        endTime: this.endTime
      }
      this.$store.dispatch('ZNYW/findAllReports', reportData).then(res => {
        this.reportData = res.report.reports
        this.total = res.report.totalNum
      })
    },
    // 查询
    inquire () {
      this.getReportList()
    },
    // 重置
    reset () {
      this.companyId = ''
      this.siteId = ''
      this.reportState = ''
      this.dateTime = ''
      this.startTime = ''
      this.endTime = ''
      this.timeType = '2'
      this.getReportList()
    },
    // 选择客户筛选
    async handleCompany (e) {
      this.companyId = e
      this.siteId = ''
      let siteData = {
        userId: this.curuserId,
        clientFid: this.companyId
      }
      await this.$store.dispatch('getSite', siteData)
      this.siteList = [{
        label: '全部',
        value: ''
      }]
      this.siteList = this.siteList.concat(this.headerSite)
    },
    // 选择厂站筛选
    handleSite (e) {
      this.siteId = e
    },
    // 选择报告状态筛选
    handleReportState (e) {
      this.reportState = e
    },
    // 时间类型筛选
    handleType (e) {
      this.timeType = e
    },
    // 时间范围筛选
    handleDateRange (e) {
      this.startTime = e[0] || ''
      this.endTime = e[1] || ''
    },
    // 查看报告详情
    handleClick (item) {
      let propsData = {
        name: 'ReportDetail',
        params: `?id=${item.reportId}`
      }
      this.$store.dispatch('propsRouteData', propsData)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getReportList()
    },
    // 选择客户弹窗筛选
    async handleCompanyDialog (e) {
      this.ruleForm.companyId = e
      this.ruleForm.siteId = ''
      let siteData = {
        userId: this.curuserId,
        clientFid: this.ruleForm.companyId
      }
      await this.$store.dispatch('getSite', siteData)
      this.siteListDialog = this.headerSite
      this.writeReportName()
    },
    // 选择厂站弹窗筛选
    handleSiteDialog (e) {
      this.ruleForm.siteId = e
      this.writeReportName()
    },
    // 选择时间类型弹窗筛选
    handleTimeTypeDialog (e) {
      this.ruleForm.timeType = e
      this.ruleForm.reportTime = ''
      if (this.ruleForm.timeType == '1') {
        this.typeReport = 'year'
        this.valueFormat = 'yyyy'
      } else {
        this.typeReport = 'month'
        this.valueFormat = 'yyyy-MM'
      }
      this.writeReportName()
    },
    // 选择日期弹窗筛选
    handleReportTimeDialog (e) {
      this.ruleForm.reportTime = e
      this.writeReportName()
    },
    // 选择接收人时
    rpChange (e) {
      console.log(e, 'rpChange')
    },
    // 生成报告
    createReport () {
      this.createTitle = '生成报告'
      this.createReportVisible = true
    },
    // 填写报告名称
    writeReportName () {
      let { clientId, siteId, timeType, reportTime } = this.ruleForm
      if (clientId !== '' && siteId !== '' && timeType !== '' && reportTime !== '') {
        let rt = reportTime.split('-')
        let siteName = this.siteListDialog.filter(i => i.value == siteId)
        let timeName = timeType == '1' ? `${rt[0]}年` : `${rt[0]}年${rt[1]}月`
        this.ruleForm.reportTitle = `${timeName}${siteName[0].label}运维报告`
      }
    },
    // 重置（生成/编辑）报告
    resetCreateDialog () {
      this.$refs['ruleForm'].resetFields()
    },
    closeCreateDialog () {
      this.createReportVisible = false
      this.resetCreateDialog()
    },
    // 生成报告生成
    creatReportDialog (formName) {
      const that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          let { clientId, siteId, timeType, reportTime, reportTitle, remarks } = this.ruleForm
          let data = {
            reportType: 1,
            clientId,
            siteId,
            timeType,
            reportTime,
            reportTitle,
            remarks
          }
          that.$store.dispatch('ZNYW/saveReport', data).then(res => {
            if (res) {
              console.log(res, 'res')
              that.$message({
                message: '生成成功！',
                type: 'success'
              });
            } else {
              that.$message.error('生成失败！')
            }
          })
        } else {
          // console.log('error submit!!')
          return false;
        }
      })
      // this.createReportVisible = false
      // this.resetCreateDialog()
    },
    // 生成报告保存
    saveReportDialog (formName) {
      const that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          let { clientId, siteId, timeType, reportTime, reportTitle, remarks } = this.ruleForm
          let data = {
            userId: that.curuserId,
            reportType: 1,
            clientId,
            siteId,
            timeType,
            reportTime,
            reportTitle,
            remarks
          }
          that.$store.dispatch('ZNYW/saveReport', data).then(res => {
            if (res.result == 'success') {
              that.$message({
                message: '保存成功！',
                type: 'success'
              })
              that.createReportVisible = false
              that.resetCreateDialog()
              that.getReportList()
            } else {
              that.$message.error('保存失败！')
            }
          })
        } else {
          // console.log('error submit!!')
          return false;
        }
      })

    },
    createReportClose () {
      this.createReportVisible = false
      this.$refs['ruleForm'].resetFields()
    },
    // 报告详情弹窗关闭
    reportDetailClose () {
      this.reportDetailVisible = false
    },
    // 编辑报告弹窗关闭
    editReportClose () {
      this.editReportVisible = false
    },
    // 查看详情
    toDetail (item) {
      console.log(item.reportId, 'reportId')
      const that = this
      let data = {
        reportId: item.reportId
      }
      that.$store.dispatch('ZNYW/findReportDetail', data).then(res => {
        console.log(res, ' res')
      })
      this.reportDetailVisible = true
    },
    // 查看报告
    toSee (item) {
      let propsData = {
        name: 'ReportDetail',
        params: `?id=${item.reportId}`
      }
      this.$store.dispatch('propsRouteData', propsData)
    },
    // 编辑报告
    editReport () {
      this.editReportVisible = true
    },
    // 编辑
    edit (item) {
      this.createTitle = '编辑报告'
      this.createReportVisible = true
      // let data = {
      //   name: 'ReportDetail',
      //   params: `?id=${item.reportId}`
      // }
      // this.$store.dispatch('propsRouteData', propsData)
      console.log(item, 'item')
    },
    // 计划消缺编辑报告删除行
    handleEditDelete (index) {
      const that = this
      that.editForm.defectTable.splice(index, 1)
    },
    // 计划消缺编辑报告新增行
    addNewLine () {
      const that = this
      let data = {
        defectName: '',
        relevanceEquip: '',
        defectLevel: '',
        planDate: '',
        finishStatus: '',
        implementation: ''
      }
      that.editForm.defectTable.push(data)
    },
    // 故障抢修编辑报告删除行
    handleEditDeleteRepair (index) {
      const that = this
      that.editForm.repairTable.splice(index, 1)
    },
    // 故障抢修编辑报告新增行
    addNewLineRepair () {
      const that = this
      let data = {
        defectName: '',
        relevanceEquip: '',
        defectLevel: '',
        planDate: '',
        finishStatus: '',
        implementation: ''
      }
      that.editForm.repairTable.push(data)
    },
    // 确认编辑报告
    confirmEditReport () {
      console.log(this.editForm, 'editForm')
      this.editReportVisible = false
    },
    // 发送按钮
    send (item) {
      this.receiveReportVisible = true
      this.receiveReportName = item.title
    },
    receiveReportlClose () {
      this.receiveReportVisible = false
      this.receiveReportList = []
    },
    // 再次发送按钮
    reSend (item) {
      this.receiveReportVisible = true
      this.receiveReportName = item.title
    },
    // 删除报告按钮
    deleteReport () {
      this.$confirm('此操作将永久删除报告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {

        }
        this.$store.dispatch('ZNYW/deleteReportById', data).then(res => {
          console.log(res, 'res')
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    submitUpload () {
      this.$refs.upload.submit();
    }
  }
}
</script>

<style lang="scss" scoped>
.create_report_btn {
  width: 90px;
  height: 34px;
  line-height: 34px;
  background: rgba(255, 142, 41, 1);
  border-radius: 3px;
  text-align: center;
  color: #ffffff;
  margin-right: 39px;
  font-size: 14px;
}
.create_report_btn:hover {
  cursor: pointer;
  transition: all ease 0.5s;
  opacity: 0.8;
}
.receive_people {
  height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.report_nx_content {
  // min-height: calc(100vh - 200px);
  background-color: #ffffff;
}
.btn_create {
  color: #ffffff;
  background-color: #ff8e29;
  border: 1px solid #ff8e29;
}
.rd_common_title {
  height: 32px;
  line-height: 32px;
  background: rgba(240, 242, 245, 1);
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  padding-left: 15px;
}
.rd_common_label {
  flex: 1;
}
.rd_common_pd {
  padding: 10px 12px;
}
.top_header {
  height: 60px;
  padding-left: 39px;
  padding-top: 10px;
}
.select_box {
  margin-right: 15px;
}
.common_input {
  width: 230px;
}
.common_input2 {
  width: 150px;
}
.common_input3 {
  width: 100px;
}
.p_title {
  font-size: 14px;
  color: #333;
  margin-right: 10px;
}
.table_content {
  display: flex;
  padding: 10px 39px 30px 39px;
  .table_report {
    max-height: 660px;
  }
}
.page_box {
  display: flex;
  background-color: #ffffff;
  justify-content: flex-end;
  padding-bottom: 10px;
}
.editReport_p {
  font-weight: bold;
}
.editReport_mr_bottom {
  margin-bottom: 0;
}
.ed_common_pd {
  padding: 10px 0px;
}
.ed_bottom {
  margin-bottom: 8px;
}
.edit_form_box {
  height: 95vh;
  background-color: #ffffff;
  overflow: scroll;
}
.add_new_line {
  margin-top: 5px;
}
.add_new_line:hover {
  cursor: pointer;
  transition: all ease 0.3s;
  opacity: 0.8;
}
</style>
