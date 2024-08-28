//封装用户讲求的模块
import { request } from '@/utils/request';
import { User } from '../types/types';
export const onLogin = (data: User) => {
    return request({
        url: '/user/login',
        method: 'post',
        data,
    });
};


export const getCode = (data: String) => {
    return request({
        url: `/user/getsmscode?userphone=${data}`,
        method: 'get',
    });
};