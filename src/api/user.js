import myAxios from './axios'

//登录请求
export function loginAPI(username,password){
    return myAxios({
        method:'post',
        url:'/users/login',
        data:{
          username:username,
          password:password
        },
        headers:{
          'Content-Type':'application/json'
        }
        }).then(response=>{
          console.log(response)
          return response
          }).catch(error=>{
            //登陆失败提示
          console.log('登录请求失败');
          console.error(error);
        })
}

//注册请求
export function registerAPI(username,password){
    return myAxios({
        method:'post',
        url:'/users/register',
        data:{
          username:username,
          password:password
        },
        headers:{
          'Content-Type':'application/json',
        }
        }).then(response=>{
            console.log('注册成功');
            return response
          }).catch(error=>{
            console.error(error);
          })
}

//登出请求
export function loginOutAPI(){
    return myAxios({
        method:'post',
        url:'/users/logout',
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
        }).then(response=>{
            console.log(response);
            return response;
          }).catch(error=>{
            console.error(error);
          })
}