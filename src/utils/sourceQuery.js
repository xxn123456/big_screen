class Query {
  constructor(source_type,source_config,sql_order) { 
    this.source_type= source_type;
    this.source_config = source_config;
    this.sql_order =sql_order;
    this.bb="aaa"

  }

  conect_source(){

      

      console.log("-----------连接数据源");

      if(this.source_type=="mysql"){

        return this.query_mysql();

      }

      

    

  }
  query_mysql(){
      

    console.log("查询mysql","bb");

    return "bb"


    

  }
  query_mongose(){
    console.log("查询mongose")

  }

}

export default Query


