//每次调用$.get()或$.post()或$.ajax()的时候
//会先调用jaxPrefilter这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象
//页面中要引入这个文件，必须放在自己的js之前，jquery之后
$.ajaxPrefilter(function(options) {
    //在发起真正的ajax的请求前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
        //console.log(options.url);
})