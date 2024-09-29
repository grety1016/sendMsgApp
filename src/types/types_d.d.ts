//登录页面Login页面所需要的IUer接口

//定义http请求用户类型接口
export interface ILoginUser {
    userPhone: string;
    smsCode: string;
    token: string;
    code: number;
    errMsg: string;
    reset(): void;
}

//定义获取待办事项列表所需要的IItem接口
export interface IGeetItemList {

    userPhone: number | string;//必填且数字长度仅为11

    itemStatus: 0 | 1 | 2;   //0:待办 1:已办 2:我发起
}

export interface IFlowItemList {
    eventName: string;
    rn: number;
    fStatus: string;
    fNumber: string;
    fFormType: string;
    fDisplayName: string;
    todoStatus: string;
    fName: string;
    senderPhone: string;
    fReceiverName: string;
    fPhone: string;
    fProcinstID: string;
    fCreateTime: string;
}



