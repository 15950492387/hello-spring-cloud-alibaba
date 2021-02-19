//工字轮
Vue.component("rellselect", {
  template: "\
   <el-select v-model='svalue' clearable filterable  placeholder='请选择工字轮' :style='cstyle'>\
   				<el-option\
   				  v-for='item in options'\
   				  :key='item.docname'\
   				  :label='item.docname'\
   				  :value='item.docname'>\
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
	  
	  ly.http.get('/ncbase/ncbase/listDefdoc',{params:{pk_defdoclist:'0001B2100000000476KE'}})
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