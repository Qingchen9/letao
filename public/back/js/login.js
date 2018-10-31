$(function(){

/**
 * 1.进行表单校验配置
 * 校验要求：
 * （1）：用户名不能为空，长度为2-6位
 * （2）：密码不能为空，长度为6-12位
 * 
 */
//使用表单校验插件
$('#form').bootstrapValidator({
 //1. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',//校验成功
    invalid: 'glyphicon glyphicon-remove', //校验失败
    validating: 'glyphicon glyphicon-refresh' //校验中
  },

  //2. 指定校验字段，要先给input 设置name
  fields: {
    //校验用户名，对应name表单的name属性
    username: {
      //配置用户名校验
      validators: {
        //不能为空 非空校验
        notEmpty: {
          //非空提示
          message: '用户名不能为空'
        },
        //长度校验
        stringLength: {
          min: 2,
          max: 6,
          message: '用户名长度必须要2-6位'
        },
        // //正则校验
        // regexp: {
        //   regexp: /^[a-zA-Z0-9_\.]+$/,
        //   message: '用户名由数字字母下划线和.组成'
        // }
        //用于配置ajax回调的提示
        callback:{
          message:"用户名不存在"
        } 
      }
    },

    //配置密码校验
     password:{
      // 配置校验规则
      validators: {
        // 非空校验
        notEmpty: {
          // 非空提示
          message: "密码不能为空"
        },

        // 长度校验
        stringLength: {
          min: 6,
          max: 12,
          message: "密码长度必须是6-12位"
        },

        // 用以配置 ajax 回调的提示
        callback: {
          message: "密码错误"
        }
      }
    },
  }
});


// 2.登录功能
//表单校验插件会在表单提交时进行校验，如果希望通过ajax提交 
//可以注册表单校验成功事件，在事件中，默认阻止的跳转提交，通过ajax提交
//直接引入插件
$("#form").on('success.form.bv', function (e) {
  e.preventDefault();
  //使用ajax提交逻辑
  $.ajax({
    type:"post",
    url:"/employee/employeeLogin",
    //表单序列化
    data:$('#form').serialize(),
    dataType:'json',
    success:function(info){
      if(info.success){
        location.href = "index.html";
      }
      if(info.error === 1000){
        //提示用户名不存在
        //调用插件实例方法，更新校验状态失败
        //updateStatus
        //参数1：校验字段
        //参数2：校验状态 NOT_VALIDATED 未校验 VALIDATING校验中 INVALID 校验失败  VALID 校验成功
        //参数3：配置校验规则，用于配置提示信息
        $("#form").data("bootstrapValidator").updateStatus("username","INVALID",'callback')
      }
      if(info.error === 1001){
        //密码错误
        $('#form').data("bootstrapValidator").updateStatus("password","INVALID",'callback')
      }
    }
  })
});


//3.重置功能完成
$('[type="reset"]').click(function(){

  //调用实例的方法，重置校验状态和内容
  //resetForm 传true，内容和校验内容都重置
              // 不传true，只重置校验状态
$('#form').data("bootstrapValidator").resetForm(true);
})
})