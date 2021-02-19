//部门
Vue.component("deptdoc", {
  template: "\
   <el-select v-model='svalue' filterable remote clearable :remote-method='remoteMethod'  placeholder='请输入' :style='cstyle'>\
   				<el-option\
   				  v-for='item in options'\
   				  :key='item.pkDeptdoc'\
   				  :label='item.deptname'\
   				  :value='item.pkDeptdoc'>\
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
      },
	  corp:{
	    type:String,
	  		default:'1001'
	  },
  },
  mounted(){
	   //初始话下拉框的值
	 this.svalue=this.value
	  
	  ly.http.get('/problem/deptdoc/list',{params:{pkCorp:this.corp}})
	  .then(resp =>{
	  	this.options = resp.result;
	  })
  },
  methods:{
	  remoteMethod(query){
		    ly.http.get('/problem/deptdoc/list',{params:{deptname_Like:'%'+query+'%',pkCorp:this.corp}})
		  .then(resp =>{
		  	this.options = resp.result;
		  })
	  }
  },
  watch:{
      //判断下拉框的值是否有改变
      svalue(val, oldVal) {
	
        if(val!=oldVal){
          this.$emit('input', this.svalue);
        }
      },
	  corp(val, oldVal){
		
	  		 if(val!=oldVal){
	  			 if(oldVal!=''){
	  			 this.svalue=''
	  			 }
						  
						 ly.http.get('/problem/deptdoc/list',{params:{pkCorp:this.corp}})
						 .then(resp =>{
						 	this.options = resp.result;
						 })
	  		}
	  },
      value(val){
        this.svalue = val;		
      }
  }
})