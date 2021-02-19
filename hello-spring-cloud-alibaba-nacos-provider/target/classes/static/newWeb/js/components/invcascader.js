//产品分类选择
Vue.component("invcascader", {
  template: "\
   <el-cascader\
      :options='options'\
      v-model='optionvalue' :show-all-levels='false' @change='handleChange' clearable  @active-item-change='handleItemChange'\
      placeholder='请选择' filterable :style='cstyle'>\
    </el-cascader>\
  ",
  data () {
	return {
	    options: [],
        optionvalue:[],
        svalue:''
	}
  },
  props: {
      value: {
        type: String
      },//接受外部v-model传入的值
      invcode:{
        type:String
      },
      cstyle:{
        default: 'width: 100%'
      }
  },
  mounted(){
	   //初始话下拉框的值
	  this.svalue=this.value
	  
	  ly.http.get('/ncbase/ncbase/listInvdocByInvcl',{params:{invclasscode:'03'}})
	  .then(resp =>{
	  	this.options = resp.result;
	  })
  },
  watch:{
      //判断下拉框的值是否有改变
      svalue(val, oldVal) {
        if(val!=oldVal){
          console.log(val)
          this.$emit('input', this.svalue);
        }
      }
  },
  methods:{
	  handleChange(value) {
        this.svalue = value[1];
      },
	  handleItemChange(value){
		ly.http.get('/ncbase/ncbase/listInvdocByInvcl',{params:{invclasscode:value[0]}})
		.then(resp =>{
			this.options.forEach(function(c){
			  if(c.value==value[0]){
			    c.children = resp.result;
			  }
			
			})
		})
      }
  }
})