//封装用户讲求的模块
import {request} from '@/utils/request';
import { User } from '../types/types';
import type { AxiosResponse } from 'axios';
export const onLogin = (data:User):Promise<AxiosResponse<User>>  =>{
    return request({
        url: '/user/login',
        method: 'post',
        data,
    });
};


export const getCode = (data:String):Promise<AxiosResponse<User>>  =>{
    return request({
        url: `/user/getsmscode?userphone=${data}`,
        method: 'get', 
    });
};