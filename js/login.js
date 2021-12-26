
  /**
   * 登录
   */
  function login() {
 
    var username = document.getElementById("floatingInput").value;
    var password = document.getElementById("floatingPassword").value;
  


    if (username === "") {
      alert("用户名不能为空！");
    } else if (password === "") {
      alert("密码不能为空！");
    } else if (username !== "" && password !== "") {
      var params = {
        usersName: username,
        usersPassword: password
      }

      $.ajax({
        type: 'post',
        url: 'http://192.168.180.167:8080/manage-api/v1/admin/login',
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(params),
        async: true,
        
        success: function (res) {

          // console.log(res);
          if (res.resultCode === 200) {
            console.log('登录成功！');
            alert('登录成功！');
      
              window.location.href = `./admin.html?usersId=${res.data.usersId}&usersName=${res.data.usersName}`;
     
            // window.location.href = './index.html?msg="login success"';
          } else {
            console.log(`登录失败！${res.message}！`);
            alert('登录失败！用户名或密码错误！')
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert(textStatus);
        }
      });
    }
  }
  
