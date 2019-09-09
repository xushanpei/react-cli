import axios from "axios";

/**
 * axios 请求的封装
 */

class ApiRequest {
  constructor() {
    //创建 axios 实例,设置配置默认值
    this.instance = axios.create({
      baseURL: "http://yapi.demo.qunar.com/mock/8403"
    });
  }

  // get 请求
  get(url, params) {
    return new Promise((resolve, reject) => {
      this.instance
        .get(url, { params: { ...params } })
        .then(data => {
          resolve(data);
        })
        .catch(data => {
          reject(data);
        });
    });
  }

  // post 请求
  post(url, params) {
    return new Promise((resolve, reject) => {
      this.instance
        .post(url, { ...params })
        .then(data => {
          resolve(data);
        })
        .catch(data => {
          reject(data);
        });
    });
  }

  //upload 请求
  upload(url, formData) {
    return new Promise((resolve, reject) => {
      this.instance
        .upload(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(data => {
          resolve(data);
        })
        .catch(data => {
          reject(data);
        });
    });
  }
}

export default new ApiRequest();
