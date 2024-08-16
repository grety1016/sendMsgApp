import type { ILoginUser } from '@/types/types_d';

 

//登录页面Login页面所需要的user类型
export class User implements ILoginUser {
    userPhone: string;
    smsCode: string;
    token:string;
    code:number=0;
    errMsg:string;
    constructor() {
        this.userPhone = '';
        this.smsCode = '';
        this.token = '';
        this.errMsg = '';
    }
    reset(): void {
        this.userPhone = '';
        this.smsCode = '';
        this.token = '';
        this.errMsg = '';
    }
}