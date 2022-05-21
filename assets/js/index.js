$(function() {
    getUserInfo()
        // 退出登录
    $('#btnLogout').click(() => {
        layui.layer.confirm('确定退出登录？', { icon: 3, title: '' }, function(index) {
            // 清空本地存储里面的 token
            localStorage.removeItem('token')
                // 重新跳转到登录页面
            location.href = '/login.html'
        })
    })
})

function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: (res) => {
            if (res.status !== 0) return layer.msg('数据请求失败')
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    const name = user.nickname || user.username
    $('#welcome').html(`欢迎 ${name}`)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
        return
    }
    $('.layui-nav-img').hide()
    const firstName = name[0].toUpperCase()
    $('.text-avatar').html(firstName)
}