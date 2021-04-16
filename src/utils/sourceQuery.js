import {
  queryMysql
} from '@/api/c_sql.js';


import qs from 'query-string';

class Query {
  constructor(source_type, source_config, sql_order) {
    this.source_type = source_type;
    this.source_config = source_config;
    this.sql_order = sql_order;
  }

  conect_source() {
    if (this.source_type == "mysql") {

      console.log("取到各值", this.source_type, this.source_config, this.sql_order)

      return this.query_mysql();

    }





  }
  async query_mysql() {
    console.log("开始执行查询mysql")
    let msg = qs.stringify({
      source_type: this.source_type,
      source_config: this.source_config,
      sql_order: this.sql_order
    })
    return await queryMysql(msg).then((res) => {
      return res
    })





  }
  query_mongose() {
    console.log("查询mongose")

  }

}

export default Query
