Vue.component("corp", {
  template: "\
   <el-select v-model='svalue' clearable placeholder='请选择公司' :style='cstyle'>\
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
	   options: [{
	  		value: '1001',
	  		label: '江苏兴达'
	   }, {
	  		value: '1003',
	  		label: '山东兴达'
	   },
	    {
	   	  		value: '1010',
	   	  		label: '泰国兴达'
	   }],
	}
  },
  props: {
      value: {
        type: String
      },//接受外部v-model传入的值
      cstyle:{
        default: 'width: 100%'
      },
	    
  },
  mounted(){
	   //初始话下拉框的值
       this.svalue=this.value
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
      },
	    
  }
})