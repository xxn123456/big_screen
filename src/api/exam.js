import request from '@/utils/request'

// 获取所有模板
export function getExam(data) {
  return request({
    url: '/manage/pc/model/getPcModelListPage', // 假地址 自行替换
    method: 'post',
    data
  })
}

// 添加模板

export function addExam(data) {
    return request({
      url: '/manage/pc/model/insertPcModel', // 假地址 自行替换
      method: 'post',
      data
    })
  }
// 修改模板

  export function editExam(data) {
    return request({
      url: '/manage/pc/model/updatePcModel', // 假地址 自行替换
      method: 'post',
      data
    })
  }
  //删除模板
  export function delExam(data) {
    return request({
      url: '/manage/pc/model/deletePcModel', // 假地址 自行替换
      method: 'post',
      data
    })
  }
// 模板图片上传
  export function uploadExamImg(data) {
    return request({
        url: '/manage/pc/file/fileUpload ',
        //此处admin是代理
        method: 'post',
        headers: {
            'Content-Type':'multipart/form-data'
        },
        data
        
    })
  }
  
// 根据模板id查询对应模板消息
  export function queryExam(data) {
    return request({
      url: '/manage/pc/model/getPcModelById', // 假地址 自行替换
      method: 'post',
      data
    })
  }