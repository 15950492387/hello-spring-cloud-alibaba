//成品
Vue.component("invbasdoccp", {
  template: "\
   <el-select v-model='svalue' filterable clearable  placeholder='请选择产品' :style='cstyle'>\
   				<el-option\
   				  v-for='item in options'\
   				  :key='item.value'\
   				  :label='item.label'\
   				  :value='item.value'>\
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
	  
	  ly.http.get('/ncbase/ncbase/listInvdocByInvclcode',{params:{invclasscode:'03'}})
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