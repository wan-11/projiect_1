//每次调用$.get()或$.post()或$.ajax()的时候
//会先调用jaxPrefilter这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象
//页面中要引入这个文件，必须放在自己的js之前，jquery之后
$.ajaxPrefilter(function(options) {
    //在发起真正的ajax的请求前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
        //console.log(options.url);

    //统一为有权限的接口，设置headers请求头配置对象
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一挂载complete回调函数，无论成功还是失败，最终都会调用这个complete回调函数
    options.complete = function(res) {
        //console.log('执行力回调函数');
        //console.log(res);
        //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1强制清空token
            localStorage.removeItem('token')
                //2强制跳转到登录页面
            location.href = 'login.html'

        }
    }



})