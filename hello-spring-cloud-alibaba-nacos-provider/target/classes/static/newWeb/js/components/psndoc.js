//自定义数据
Vue.component("psndoc", {
  template: "\
   <el-select v-model='svalue' filterable remote  placeholder='请输入工号' :style='cstyle' :remote-method='remoteMethod'  :disabled='enabled'>\
   				<el-option\
   				  v-for='item in options'\
   				  :key='item.pk_psnbasdoc'\
   				  :label='item.psnname'\
   				  :value='item.pk_psnbasdoc'>\
				  <span style='float: left'>{{ item.psncode }}</span>\
				  <span style='padding-left:20px;font-size: 13px'>{{ item.psnname }}</span>\
   				</el-option>\
 </el-select>\
  ",
  data () {
	return {
	   svalue:'',
	   options: []
	}
  },
  watch:{
      //判断下拉框的值是否有改变
      svalue(val, oldVal) {
        if(val!=oldVal){
          this.$emit('input', this.svalue);
		   this.$emit('change', this.svalue);
        }
      },
      value(val){
        this.svalue= val;
      }
    },
  props:{
	  value: {
        type: String
      },
	  cstyle:{
	    default: 'width: 100%'
	  },
	   enabled:{
	  	default:false
	  }
  },
  mounted(){
	   //初始话下拉框的值
      this.svalue=this.value;
  },
  methods:{
	  remoteMethod(query){
		if (query !== ''){
			this.options = [];
			 ly.http.get('/person/user/listPsndocByCode',{params:{psncode:query,pkcorp:'1001'}})
			.then(resp =>{
				this.options = resp.result;
			})
		} else {
			this.options = [];
		}
  }
  }
})
