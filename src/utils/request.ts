import axios from 'axios'; 
import { useLoginStore } from '@/stores'; 

 

export const request = axios.create({
baseURL: '/sendmsg',
// baseURL: 'http://192.168.0.31:8000',
timeout: 10000,
});

// export const CancelToken = axios.CancelToken;
// export const source = CancelToken.source();



//请求拦截器
request.interceptors.request
.use((config)=>{ //token处理拦截器逻辑
    const LoginStore = useLoginStore();
 
    config.headers['Authorization'] = `${LoginStore.loginUser.token}` ; 
    return config; 
    
},(error) =>{
    console.log(error);
    return Promise.reject(error);
});


//响应拦截器
request.interceptors.response.use((response)=>{
    return response;
},(error) =>{
    console.log(error);
});
