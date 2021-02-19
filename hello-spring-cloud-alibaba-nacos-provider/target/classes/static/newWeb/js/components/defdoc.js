//自定义数据
Vue.component("defdocselect", {
  template: "\
   <el-select v-model='svalue' clearable filterable  placeholder='请选择' :style='cstyle'>\
   				<el-option\
   				  v-for='item in options'\
   				  :key='item.pk_defdoc'\
   				  :label='item.docname'\
   				  :value='item.pk_defdoc'>\
   				</el-option>\
 </el-select>\
  ",
  data () {
	return {
	   svalue:'',
	   options: [],
	}
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
    },
  props:{
	  value: {
        type: String
      },
      deflist:{
        type:String
      },
	  cstyle:{
	    default: 'width: 100%'
	  }
  },
  mounted(){
	   //初始话下拉框的值
      this.svalue=this.value;
	  ly.http.get('/ncbase/ncbase/listDefdoc',{params:{pk_defdoclist:this.deflist}})
	  .then(resp =>{
	  	this.options = resp.result;
	  })
  }
})
