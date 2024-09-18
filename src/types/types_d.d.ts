//登录页面Login页面所需要的IUer接口

//定义用户类型接口
export interface ILoginUser {
    userPhone: string;
    smsCode: string;
    token: string;
    code: number;
    errMsg: string;
    reset(): void;
}

//用于限定手机号长度


export interface IGeetItemList {

    userPhone: number | string ;//必填且数字长度仅为11

    itemStatus: 0 | 1 | 2;   //0:待办 1:已办 2:我发起
}



