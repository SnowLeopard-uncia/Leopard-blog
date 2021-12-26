$(document).ready(function () {
    goToPublic()
  });

/**
 * 导航栏 - 已发布
 */
 function goToPublic() {
   
  
      $('.public').addClass('active');
      $('.write').removeClass('active');
      $('.draft').removeClass('active');
    //   $('.banner').removeClass('active');
      $('.me').removeClass('active');
  
      if ($(".public").hasClass('active')) {
        $('.public-block').attr('style', 'display: block;');
  
        // $('.banner-block').attr('style', 'display: none;');
        // $('.categories-block').attr('style', 'display: none;');
        $('.write-block').attr('style', 'display: none;');
      }
    
  }
  function goToWrite() {
  
      $('.write').addClass('active');
      $('.public').removeClass('active');
      $('.draft').removeClass('active');
    //   $('.banner').removeClass('active');
      $('.me').removeClass('active');
  
      if ($(".write").hasClass('active')) {
        $('.write-block').attr('style', 'display: block;');
  
        // $('.banner-block').attr('style', 'display: none;');
        // $('.categories-block').attr('style', 'display: none;');
        $('.public-block').attr('style', 'display: none;');
      }
    
  }
/**
 * 发表博客
 */
  function publicBlog() {
    var title = document.getElementById("blog-title").value;
    var content = document.getElementById("blog-content").value;
  
    if (title === "") {
        alert("标题不能为空！");
      } else if (content === "") {
        alert("内容不能为空！");
      } else if (title !== "" && content !== "") {
        var params = {
            blogsTitle: title,
            blogsDescription: content,
            isPost: 1,
            draft: 0
        }
  
        $.ajax({
          type: 'post',
          url: 'http://192.168.180.167:8080/manage-api/v1/blogs/blog',
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(params),
          async: true,
          
          success: function (res) {
  
            // console.log(res);
            if (res.resultCode === 200) {
              console.log('发布成功！');
              Toast('发布成功！');
        
                // window.location.href = `./admin.html?usersId=${res.data.usersId}&usersName=${res.data.usersName}`;
       
              // window.location.href = './index.html?msg="login success"';
            } else {
              console.log(`发布失败！${res.message}！`);
              Toast('发布失败！')
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
          }
        });
      }


  
}