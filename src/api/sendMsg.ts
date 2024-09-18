//封装用户讲求的模块
import { request } from '@/utils/request';
import { User } from '../types/types';
import type { IGeetItemList } from '../types/types_d';
export const onLogin = async (data: User) => {
    return request({
        url: '/user/login',
        method: 'post',
        data,
    });
};


export const getCode = async (data: String) => {
    return request({
        url: `/user/getsmscode?userphone=${data}`,
        method: 'get',
    });
};

export const getItemList = async (data: IGeetItemList) => {
    return request({
        url: `/flowform/getitemlist?userPhone=${data.userPhone}&itemStatus=${data.itemStatus}`,
        method: 'get',
    });
};