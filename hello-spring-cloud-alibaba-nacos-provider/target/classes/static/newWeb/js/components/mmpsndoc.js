//自定义数据
Vue.component("mmpsndoc", {
  template: "\
   <el-select v-model='svalue' filterable remote value-key='pk_psnbasdoc'  placeholder='请输入工号' :style='cstyle' :remote-method='remoteMethod'  :disabled='enabled'>\
   				<el-option\
   				  v-for='item in options'\
   				  :key='item.pk_psnbasdoc'\
   				  :label='item.psnname'\
   				  :value='item'>\
				  <span style='float: left'>{{ item.psncode }}</span>\
				  <span style='padding-left:20px;font-size: 13px'>{{ item.psnname }}</span>\
   				</el-option>\
 </el-select>\
  ",
  data () {
	return {
	   svalue:{},
	   options: []
	}
  },
  watch:{
      //判断下拉框的值是否有改变
      svalue(val, oldVal) {		 
        if(val!=oldVal){
          this.$emit('input', this.svalue.pk_psnbasdoc);
		  this.$emit("selected",this.svalue)
        }
      },
      value(val){	
		  console.log(val)
        this.svalue.pk_psnbasdoc = val;
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
	  },
	  psncode:{
		 type: String  
	  }
  },
  mounted(){
	   //初始话下拉框的值
	//    if(this.psncode!=undefined && this.psncode!='')
	//  ly.http.get('/person/user/listPsndocByCode',{params:{psncode:this.psncode,pkcorp:'1001'}})
	// .then(resp =>{
	// 	if(resp.result!=undefined){
	// 		resp.result.forEach((val,index)=>{
	// 			if(val.pk_psnbasdoc==this.value){
	// 				 this.svalue=val
	// 			}
	// 		})
	// 	}
	// })
      this.svalue.pk_psnbasdoc=this.value;
  },
	methods: {
		remoteMethod(query) {
			if (query !== '') {
				console.log(query)
				this.options = [];
				ly.http.get('/person/user/listPsndocByCode', { params: { psncode: query, pkcorp: '1001' } })
					.then(resp => {
						this.options = resp.result;
					})
			} else {
				this.options = [];
			}
		}
	}
})
