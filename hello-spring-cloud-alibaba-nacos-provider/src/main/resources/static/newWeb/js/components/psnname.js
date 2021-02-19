//数据中心人员
Vue.component("psnname", {
  template: "\
   <el-select v-model='svalue' filterable clearable  placeholder='请选择' :style='cstyle'>\
   				<el-option\
   				  v-for='item in options'\
   				  :key='item.pkPsnbasdoc'\
   				  :label='item.psnname'\
   				  :value='item.pkPsnbasdoc'>\
   				</el-option>\
 </el-select>\
  ",
  data () {
	return {
	   svalue:'',
	   options: [],
	}
  },
  props: {
      value: {
        type: String
      },//接受外部v-model传入的值
      cstyle:{
        default: 'width: 100%'
      }
  },
  mounted(){
	   //初始话下拉框的值
	  this.svalue=this.value
	  
	  ly.http.get('/problem/psndoc/list',{params:{pkDeptdoc:'1004B2100000002DU0YG'}})
	  .then(resp =>{
	  	this.options = resp.result;
	  })
  },
  watch:{
      //判断下拉框的值是否有改变
      svalue(val, oldVal) {
        if(val!=oldVal){
          this.$emit('input', this.svalue);
        }
      },
      value(val){
        this.svalue = val;
      }
  }
})