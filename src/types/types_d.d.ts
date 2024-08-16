//登录页面Login页面所需要的IUer接口

//定义用户类型接口
export interface ILoginUser {
    userPhone: string;
    smsCode: string;
    token:string;
    code:number;
    errMsg:string;
    reset(): void;
}

 

 