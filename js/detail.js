$(document).ready(function () {
    getDetail()
  });

  /**
 * 获取博客详情
 */
function getDetail() {
    // 接收URL中的参数
    const blogsId = getUrlParam('blogsId');
    // console.log('worksId:' + worksId);
   
    $.ajax({
      type: 'get',
      url: `http://localhost:8080/api/v1/blogs/detail/${blogsId}`,
      async: true,
      success: function (res) {
        // console.log(res);
        const Datas = res.data;
  
        console.log(Datas);
        $("#blog-title").text(`${Datas.blogsTitle}`);
        console.log(Datas.blogsTitle);
        $("#blog-description").text(`${Datas.blogsDescription}`);
        $("#blog-time").text(`${Datas.blogsTime}`);
        const num = Datas.blogsDescription.indexOf("。");
        const short = Datas.blogsDescription.substr(0,num+1);
        $("#blog-short").text(short);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(textStatus);
      }
    });
  }

  /**
 * 获取url中的参数
 * @param {参数名称} name 
 * @returns 
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
  }

  