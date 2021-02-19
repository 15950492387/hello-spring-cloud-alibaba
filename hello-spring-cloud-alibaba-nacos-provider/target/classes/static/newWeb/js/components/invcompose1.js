//物料单选
Vue.component("invcompose1", {
    template: "<div>\
  	<el-autocomplete :popper-append-to-body='false' ref='selectionref' :placeholder='inputinvcode' v-model='invname' :popper-class='selectionoption'  @select='handleSelect'   class='input-with-select' :fetch-suggestions='querySearch' :style='cstyle' clearable>\
	    <template slot-scope='{ item }' style='width: 700px'>\	 <span style='display: inline-block;width: 200px;line-height: 30px;text-align: center;padding-left: 20px;'>{{ item.invcode }}</span>\
		    <span style='display: inline-block;width: 200px;line-height: 30px;text-align: center;padding-left: 20px;'>{{ item.invname }}</span>\
		    <span style='display: inline-block;width: 200px;line-height: 30px;text-align: center;padding-left: 20px;'>{{ item.invspec }}</span>\
	    </template>\
	</el-autocomplete>\
		<div @click='myfocus' class='el-icon-search' style='display: inline-block;height: 30px;line-height: 30px;border: 1px solid #DCDFE6;min-width: 4%;text-align: center;margin-left: -6px;border-top-right-radius: 4px;border-bottom-right-radius: 4px;background-color: #F5F7FA;cursor: pointer;'></div>\
  	<el-dialog :title='invdoc' :visible.sync='dialogVisible' width='70%' :modal='false'>\
  		<el-container style='height: 500px; border: 1px solid #eee'>\
  			<el-aside width='150px' style='background-color: rgb(238, 241, 246);margin-top:40px'>\
  				<el-tree :props='props' :load='loadNode' lazy accordion @node-click='handleNodeClick'>\
  				</el-tree>\
  			</el-aside>\
  			<el-container>\
  				 <el-header style='text-align: right; font-size: 12px;height: 25px;padding-top: 3px;padding-bottom: 5px;'>\
  					  <el-select v-model='selvalue' :placeholder='pleaseselect' style='width:100px'><el-option v-for='item in options':key='item.value' :label='item.label' :value='item.value'></el-option></el-select>\
					  <el-input :placeholder='searchall' v-model='condtion'  class='input-with-select' style='width: 230px;'>\
  						<el-button slot='append' icon='el-icon-search' @click='queryinv'></el-button>\
  					  </el-input>\
  				 </el-header>\
  				 <el-main>\
  					<el-table :data='tableData' @row-dblclick='dblclick'   height='400' border  highlight-current-row    @current-change='handleCurrentChange'>\
  					  				<el-table-column prop='invcode' :label='invcode' width='150'>\
  					  				</el-table-column>\
  					  				<el-table-column prop='invname' :label='invallname' >\
  					  				</el-table-column>\
  					  				<el-table-column prop='invshortname' :label='invshortname' width='100'>\
  					  				</el-table-column>\
  					  				<el-table-column prop='invspec' :label='spec' width='150'>\
  					  				</el-table-column>\
  					</el-table>\
  				   <el-footer style='text-align: right;height: 25px;padding-top: 5px;'>\
  					<el-button type='primary' @click='selected'>{{suresel}}</el-button>\
  					<el-button type='warning' @click='unselected'>{{canelsel}}</el-button>\
  					</el-footer>\
  				 </el-main>\
  			</el-container>\
  		</el-container>\
  	</el-dialog></div>",
    data() {
        return {
            dialogVisible: false,
            props: {
                label: 'label',
                isLeaf: 'leaf'
            },
            tableData: [],
            condtion: '',
            currentSelectItem: {},
            invname: '',
            options: [{
                value: 'bm',
                label: '按编码'
            }, {
                value: 'mc',
                label: '按名称'
            }],
            selvalue: 'mc',
            inputinvcode: commessages[this.lan]["inputinvcode"], //请输入物料编码
            invdoc: commessages[this.lan]["invdoc"], //存货档案
            pleaseselect: commessages[this.lan]["pleaseselect"], //请选择
            searchall: commessages[this.lan]["searchall"], //搜索全部
            invcode: commessages[this.lan]["invcode"], //存货编码
            invallname: commessages[this.lan]["invname"], //存货名称
            invshortname: commessages[this.lan]["invshortname"], //存货简称
            spec: commessages[this.lan]["spec"], //规格
            suresel: commessages[this.lan]["suresel"], //确定选择
            canelsel: commessages[this.lan]["canelsel"] //取消选择
        }
    },
    props: {
        invclcode: {
            type: String,
            default: ''
        },
        cstyle: {
            default: 'width: 100%'
        },
        selectionoption: {
            'div': {
                width: '350px'
            },
        },
        value: {
            type: String
        }, //接受外部v-model传入的值
        lan: {
            type: String,
            default: 'zh'
        }
    },
    mounted() {
        if (typeof (this.value) != "undefined" && this.value != "") {
            this.loadinvpk()
        }
    },
    watch: {
        //判断下拉框的值是否有改变
        invname(val, oldVal) {
            if (val != oldVal) {
                if (typeof (this.currentSelectItem.pk_invbasdoc) != "undefined") {
                    this.$emit('invselect', this.currentSelectItem);
                } else {
                    this.$emit('invselect', {});
                }
                if (this.invname == '') {
                    this.$emit('invselect', {});
                }
            }
        }
    },
    methods: {
        handleSelect(item) {
            this.currentSelectItem = item
            this.$emit('invselectitem', item);
        },
        loadinvpk() {
            ly.http.get('/ncbase/ncbase/loadInvbasdoc', {
                params: {
                    pk_invbasdoc: this.value
                }
            })
                .then(resp => {
                    if (resp.result != null) {
                        this.currentSelectItem = resp.result
                        this.invname = this.currentSelectItem.invname
                    }
                })
        },
        loadNode(node, resolve) {
            if (node.level === 0) {
                ly.http.get('/ncbase/ncbase/leafInvcl', {
                    params: {
                        invclasscode: this.invclcode
                    }
                })
                    .then(resp => {
                        return resolve(resp.result);
                    })
            } else {
                ly.http.get('/ncbase/ncbase/leafInvcl', {
                    params: {
                        pkInvcl: node.data.value
                    }
                })
                    .then(resp => {
                        let resultdata = resp.result
                        return resolve(resultdata);
                    })
            }
        },
        myfocus() {
            if (!!this.invname && this.invname != '') {
                this.condtion = this.invname;
                let querydata = {};
                querydata["likeFactor"] = this.condtion;
                this.listinv(querydata)
            }
            this.dialogVisible = true
        },
        listinv(querydata) {
            ly.http.post("/ncbase/ncbase/listInv", querydata).then(response => {
                let resdata = response.result
                resdata.forEach(item => {
                    item.checked = false
                })
                this.tableData = resdata
            })
        },
        handleNodeClick(data) {
            if (typeof (data.leaf) != "undefined" && data.leaf == true) {
                let querydata = {};
                querydata["pk_invcl"] = data.value
                this.listinv(querydata)
            }
        },
        queryinv() {
            if (this.condtion != "") {
                let querydata = {};
                if (this.selvalue == 'mc') {
                    querydata["likeInvname"] = this.condtion;
                } else {
                    querydata["likeInvcode"] = this.condtion;
                }

                if (this.invclcode != "") {
                    querydata["invclasscode"] = this.invclcode
                }
                this.listinv(querydata)
            }
        },
        querySearch(val, cb) {
            let querydata = {};
            if (!!val) {
                querydata["likeFactor"] = val;
            }

            if (this.invclcode != "") {
                querydata["invclasscode"] = this.invclcode
            }
            ly.http.post("/ncbase/ncbase/pageInv", {
                'query': querydata,
                "limit": 10,
                "offset": 1
            }).then(response => {

                let resdata = []
                resdata[0] = {
                    invcode: '存货编码',
                    invname: '存货名称',
                    invshortname: '存货简称',
                    invspec: '规格'
                }
                // let resdata = response.result
                response.result.list.forEach(item => {
                    item.value = item.invname;
                    item.checked = false;
                    resdata.push(item)
                })
                cb(resdata)
                // this.cusnameList=resdata

            })
        },
        handleCurrentChange(val) {
            this.currentSelectItem = val
        },
        selected() {
            if (JSON.stringify(this.currentSelectItem) != "{}") {
                this.invname = this.currentSelectItem.invname
            }
            this.dialogVisible = false
        },
        unselected() {
            this.currentSelectItem = {};
            this.invname = "";
            this.dialogVisible = false
        },
        loadinvcode() {
            if (this.invname != "") {
                ly.http.get('/ncbase/ncbase/loadInvbasdocBycode', {
                    params: {
                        invcode: this.invname
                    }
                })
                    .then(resp => {
                        this.currentSelectItem = resp.result
                        this.invname = this.currentSelectItem.invname
                    })
            }
        },
        dblclick(row, column, event) {
            this.currentSelectItem = row
            this.invname = this.currentSelectItem.invname
            this.dialogVisible = false
        }
    }
})