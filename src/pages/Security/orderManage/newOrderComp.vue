<template>
  <div class="newForm">
    <el-form :inline="true" :model="formNew" size="mini" :rules="rules" ref="formNew">
      <el-form-item label="工单类别:" prop="orderType" :label-width="formLabelWidth">
        <el-select v-model="formNew.orderType" placeholder="请选择工单类型" @change="orderChange">
          <el-option v-for="(item,index) in typeList" :label="item.label" :value="item.value" :key="index" />
        </el-select>
      </el-form-item>
      <el-form-item label="工单等级:" prop="orderLeval" :label-width="formLabelWidth">
        <el-select v-model="formNew.orderLeval" placeholder="请选择工单等级">
          <el-option v-for="(item,index) in levList" :label="item.label" :value="item.value" :key="index" />
        </el-select>
      </el-form-item>
      <el-form-item label="客户名称:" prop="kehuName" :label-width="formLabelWidth">
        <el-select v-model="formNew.kehuName" placeholder="请选择客户名称" @change="customClick">
          <el-option v-for="(item,index) in customList" :label="item.label" :value="item.value" :key="index" />
        </el-select>
      </el-form-item>
      <el-form-item label="厂站名称:" prop="siteName" :label-width="formLabelWidth">
        <el-select v-model="formNew.siteName" placeholder="请选择厂站名称" @change="sClick">
          <el-option v-for="(item,index) in sList" :label="item.label" :value="item.value" :key="index" />
        </el-select>
      </el-form-item>
      <el-form-item label="运维班组:" prop="teamName" :label-width="formLabelWidth">
        <el-select v-model="formNew.teamName" placeholder="请选择运维班组" @change="tClick">
          <el-option v-for="(item,index) in teamsList" :label="item.label" :value="item.value" :key="index" />
        </el-select>
      </el-form-item>
      <el-form-item label="负责人:" prop="responser" :label-width="formLabelWidth">
        <el-select v-model="formNew.responser" placeholder="请选择负责人">
          <el-option v-for="(item,index) in resList" :label="item.label" :value="item.value" :key="index" />
        </el-select>
      </el-form-item>
      <el-form-item label="工单名称:" prop="orderName" :label-width="formLabelWidth">
        <el-input style="width:516px" v-model="formNew.orderName" />
      </el-form-item>
      <el-form-item label="关联设备:" prop="equip" :label-width="formLabelWidth">
        <el-cascader style="width:516px" v-model="formNew.equip" :options="equipList" :show-all-levels="false"
          :props="{ multiple: true,emitPath: false}" @change='equipChange' collapse-tags />
      </el-form-item>
      <el-form-item v-if="planBool=='001'" label="典型操作票:" :label-width="formLabelWidth">
        <el-cascader style="width:516px" v-model="formNew.tickets" :options="ticketsList"
          :props="{ multiple: true,emitPath: false}" />
      </el-form-item>
      <el-form-item :label="planBool=='001'?'计划时间:':'抢修时间:'" prop="time" :label-width="formLabelWidth">
        <el-date-picker style="width:516px" v-model="formNew.time" type="daterange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工单描述:" prop="orderDescript" :label-width="formLabelWidth">
        <el-input style="width:516px" v-model="formNew.orderDescript" />
      </el-form-item>
    </el-form>
    <el-form size="mini">
      <el-form-item label="工单备注:" :label-width="formLabelWidth">
        <el-input style="width:516px" v-model="formNew.orderRemark" />
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item label="工单附件:" :label-width="formLabelWidth">
        <el-upload class="upload-demo" ref="upload" :action="formNew.uploadUrl" :on-preview="handlePreview"
          :http-request="uploadServe" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3"
          :on-exceed="handleExceed" :file-list="formNew.fileList" :auto-upload="false" :on-change="handleChange">
          <el-button size="small" type="primary">点击上传附件</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="flex_row_xCenter">
      <el-button @click="$emit('quxiao')">取 消</el-button>
      <el-button class="submitStyle" @click="submitNew('formNew',1)">提 交</el-button>
      <el-button type="primary" @click="submitNew('formNew',0)">保 存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formOrder: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      newOrderId: '',//新建工单返回的fid
      pageStatu: 0,//0表示新建，1表示编辑
      nowExFileList: [],//当前剩余附件
      planBool: '001',
      typeList: [
        { label: '计划', value: '001' },
        { label: '抢修', value: '002' }],
      levList: [
        { label: 'T1', value: '001' },
        { label: 'T2', value: '002' },
        { label: 'T3', value: '003' }],
      customList: [],//客户list
      sList: [],//厂站list
      teamsList: [],//运维班组list
      resList: [],//负责人list
      equipList: [],//设备list
      ticketsList: [],//操作票list
      formLabelWidth: '120px',
      formNew: {//新建工单表单提交
        orderType: '',
        orderLeval: '',
        kehuName: '',
        siteName: '',
        teamName: '',
        responser: '',
        orderName: '',
        equip: [],
        tickets: [],
        time: '',
        orderDescript: '',
        orderRemark: '',
        uploadUrl: '',//上传地址
        fileList: [],
      },
      rules: {
        orderType: [
          { required: true, message: '请选择工单类型', trigger: 'change' }
        ],
        orderLeval: [
          { required: true, message: '请选择工单等级', trigger: 'change' }
        ],
        kehuName: [
          { required: true, message: '请选择客户名称', trigger: 'change' }
        ],
        siteName: [
          { required: true, message: '请选择厂站名称', trigger: 'change' }
        ],
        teamName: [
          { required: true, message: '请选择运维班组', trigger: 'change' }
        ],
        responser: [
          { required: true, message: '请选择负责人', trigger: 'change' }
        ],
        orderName: [
          { required: true, message: '工单名称不能为空', trigger: 'blur' }
        ],
        equip: [
          { type: 'array', required: true, message: '请选择关联设备', trigger: 'change' }
        ],
        time: [
          { required: true, message: '时间不能为空', trigger: 'change' }
        ],
        orderDescript: [
          { required: true, message: '工单描述不能为空', trigger: 'blur' }
        ]
      },
      rankList: []
    }
  },
  created () {
    // 获取客户筛选的list
    for (let it of this.$store.state.userClients) {
      let item = {
        "value": it.clientId,
        "label": it.clientName
      }
      this.customList.push(item)
    }
    //this.formNew.equip = ['11b05407_a0b8_4014_8d0a_ab1e00f901ef', '63b8e6ed_49c2_4196_ab41_ab1e00f90215', '8eae2dca_0f32_41f6_8489_ab1e00f90202']
    this.formOrderData(this.formOrder)
    this.getTicketsList()
  },
  methods: {
    orderChange (e) {
      this.planBool = e
    },
    // 操作票获取
    getTicketsList () {
      this.$store.dispatch('getTickets').then(res => {
        if (res) {
          this.ticketsList = res.ticketTemplateList
        }
      })
    },
    customClick (e) {
      let params = {
        userId: this.$store.state.curuserId,
        clientFid: e
      }
      this.sList = []
      this.teamsList = []
      this.resList = []
      //客户筛选关联到厂站
      this.$store.dispatch('getSite', params).then(res => {
        if (res) {
          for (let it of res.options) {
            let item = {
              "value": it.value,
              "label": it.label
            }
            this.formNew.siteName = ''
            this.formNew.teamName = ''
            this.formNew.responser = ''
            this.sList.push(item)
          }
        }
      });
    },
    sClick (e) {
      let params = {
        siteFid: e
      }
      this.getEquipAndType(e)
      // 根据厂站筛选关联到运维班组
      this.teamsList = []
      this.resList = []
      this.$store.dispatch('getYwTeam', params).then(res => {
        if (res) {
          for (let it of res.options) {
            let item = {
              "value": it.fid,
              "label": it.teamName
            }
            this.formNew.teamName = ''
            this.formNew.responser = ''
            this.teamsList.push(item)
          }
        }
      })
    },
    tClick (e) {
      let params = {
        teamId: e
      }
      // 根据运维班组筛选关联到负责人
      this.resList = []
      this.$store.dispatch('teamManager', params).then(res => {
        if (res) {
          for (let it of res.options) {
            let item = {
              "value": it.fid,
              "label": it.realName
            }
            this.formNew.responser = ''
            this.resList.push(item)
          }
        }
      })
    },
    getEquipAndType (siteId) {
      this.equipList = []
      let params = {
        siteId: siteId
      }
      this.$store.dispatch('getEquipAndType', params).then(res => {
        if (res) {
          this.equipList = res.options
        }
      })
    },
    equipChange (e) {
      if (e.length > 5) {
        alert('设备选择最多只能选择5个')
      }
    },
    // 提交新建工单
    submitNew (formName, no) {

      let self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //console.log(JSON.stringify(self.formNew))
          if (self.formNew.equip.length > 5) {
            alert('关联设备最多5个')
          } else {
            self.toNewOrder(no)
          }
        } else {
          return false;
        }
      });
    },

    // 上传文件
    uploadServe (file) {

      let params = {
        woId: this.newOrderId,
        files: file.file
      }
      this.$store.dispatch('orderUpload', params).then()
    },
    // 新建工单
    toNewOrder (no) {

      let params = {
        userId: this.$store.state.curuserId,
        fid: this.newOrderId,//新建工单为''
        woType: this.formNew.orderType,
        woLevel: this.formNew.orderLeval,
        title: this.formNew.orderName,
        clientFid: this.formNew.kehuName,
        siteFid: this.formNew.siteName,
        startTime: this.formNew.time[0],
        endTime: this.formNew.time[1],
        equips: JSON.stringify(this.formNew.equip),
        ticketTemplates: JSON.stringify(this.formNew.tickets),
        description: this.formNew.orderDescript,
        remarks: this.formNew.orderRemark,
        attachment: this.pageStatu == 0 ? '' : JSON.stringify(this.rankList),
        flow: no
      }
      this.$store.dispatch('submitOrder', params).then(res => {
        // console.log(JSON.stringify(res))
        if (res) {
          this.newOrderId = res.result.data
          this.$emit('newOrderReload')

          //console.log('this.formNew.fileListthis.formNew.fileList', JSON.stringify(this.formNew.fileList))
          this.$refs.upload.submit();//上传文件提交
        }
      });
    },

    handleRemove (file, fileList) {
      // eslint-disable-next-line no-console
      //console.log('file', JSON.stringify(fileList), JSON.stringify(this.formNew.fileList))
      if (this.pageStatu == 1) {
        this.nowExFileList = fileList
      }
      // console.log(file, fileList);
    },
    handlePreview (file) {
      // eslint-disable-next-line no-console
      console.log(file);
    },
    handleExceed (files, fileList) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(fileList))
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove (file) {
      //console.log(fileList)
      let self = this
      return this.$confirm(`确定移除 ${file.name}？`).then(res => {
        if (res == 'confirm') {
          if (file.rank) {
            self.rankList.push(file.rank)
          }
        }
      });
    },
    //监控上传文件列表
    handleChange (file, fileList) {
      let existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name);
      if (existFile) {
        this.$message.error('当前文件已经存在!');
        fileList.pop();
      }
      this.formNew.fileList = fileList;
    },
    // 新建工单清空，编辑工单赋值
    async formOrderData (form) {
      if (form != null) {
        // 编辑工单
        this.pageStatu = 1
        this.planBool = form.woInfo[0].woType

        await this.conSiteToResponse(form.woInfo[0].ClientFid, form.woInfo[0].siteFid, form.woInfo[0].TeamFid)
        let startTime = form.woInfo[0].startTime
        let endTime = form.woInfo[0].endTime
        this.newOrderId = form.woInfo[0].fid
        this.formNew = {
          orderType: form.woInfo[0].woType,
          orderLeval: form.woInfo[0].woLevel,
          kehuName: form.woInfo[0].ClientFid,
          siteName: form.woInfo[0].siteFid,
          teamName: form.woInfo[0].TeamFid,
          responser: form.woInfo[0].teamManager,
          orderName: form.woInfo[0].title,
          equip: form.equips,
          tickets: form.tickets,
          time: [startTime == null ? '' : startTime.split('T')[0], endTime == null ? '' : endTime.split('T')[0]],
          orderDescript: form.woInfo[0].description,
          orderRemark: form.woInfo[0].remarks,
          uploadUrl: '',//上传地址
          fileList: form.attachments,
        }
      } else {
        // 新建工单
        this.pageStatu = 0
        this.planBool = '001'
        this.formNew = {
          orderType: '',
          orderLeval: '',
          kehuName: '',
          siteName: '',
          teamName: '',
          responser: '',
          orderName: '',
          equip: [],
          tickets: [],
          time: '',
          orderDescript: '',
          orderRemark: '',
          uploadUrl: '',
          fileList: []
        }
      }
    },
    // 客户关联厂站=》运维班组==》负责人
    conSiteToResponse (cId, sId, tId) {
      let params1 = {
        userId: this.$store.state.curuserId,
        clientFid: cId
      }
      this.sList = []
      this.teamsList = []
      this.resList = []
      this.$store.dispatch('getSite', params1).then(res1 => {
        if (res1) {
          for (let it of res1.options) {
            let item = {
              "value": it.value,
              "label": it.label
            }
            this.sList.push(item)
          }

          let params2 = {
            siteFid: sId
          }
          this.getEquipAndType(sId)
          this.$store.dispatch('getYwTeam', params2).then(res => {
            if (res) {
              for (let it of res.options) {
                let item = {
                  "value": it.fid,
                  "label": it.teamName
                }
                this.teamsList.push(item)
              }

              let params3 = {
                teamId: tId
              }
              // 根据运维班组筛选关联到负责人
              this.$store.dispatch('teamManager', params3).then(res => {
                if (res) {
                  for (let it of res.options) {
                    let item = {
                      "value": it.fid,
                      "label": it.realName
                    }
                    this.resList.push(item)
                  }
                }
              })

            }
          })
        }
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.newForm {
}

.submitStyle {
  background-color: #ff8e29;
  color: #ffffff;
  border-color: #ff8e29;
}
</style>