Vue.component("calbody", {
  template: "\
   <el-select v-model='svalue' clearable placeholder='请选择分厂' :style='cstyle'>\
    				<el-option\
    				  v-for='item in options'\
    				  :key='item.pk_calbody'\
    				  :label='item.bodyname'\
    				  :value='item.pk_calbody'>\
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
	  corp:{
	    type:String,
		default:'1001'
	  },
      cstyle:{
        default: 'width: 100%'
      }
  },
  mounted(){
	this.svalue=this.value
	ly.http.get('/ncbase/ncbase/listCalbody',{params:{pkCorp:this.corp}})
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