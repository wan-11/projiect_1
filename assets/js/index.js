$(function() {
    //调用这个getUserInfo()函数获取用户基本信息
    getUserInfo()

    //第三步点击退出按钮的点击事件
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        //console.log('ok');
        //提示用户是否退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //1.清空本地存储中的token
            localStorage.removeItem('token')
                //2.重新跳转登录页
            location.href = 'login.html'
                // 关闭confirm询问框
            layer.close(index);
        });

    })
});

//第一步获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        /*  //headers就是请求头配置对象
         headers: {
             Authorization: localStorage.getItem('token') || ''
         }, */
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')

            }
            renderAvatar(res.data)
        },

        /*  //无论成功还是失败，最终都会调用这个complete回调函数
         complete: function(res) {
             //console.log('执行力回调函数');
             //console.log(res);
             //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
             if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                 //1强制清空token
                 localStorage.removeItem('token')
                     //2强制跳转到登录页面
                 location.href = 'login.html'

             }
         } */


    })
}

//第二步渲染用户的头像
function renderAvatar(user) {
    //1.获取用户名称
    var name = user.nickname || user.username
        //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //3.按需渲染用户的头像
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user.user_pic).show()
        $('.text-avata').hide()
    } else {
        //3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avata').html(first).show()
    }

}