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
    $('.msg').removeClass('active');

    if ($(".public").hasClass('active')) {
        $('.public-block').attr('style', 'display: block;');

        $('.draft-block').attr('style', 'display: none;');
        $('.msg-block').attr('style', 'display: none;');
        $('.write-block').attr('style', 'display: none;');
    }
    getBlogs();

}
/**
 * 
 * @param {*} title 博客标题
 * @param {*} content 博客内容
 */
function goToWrite(title, content) {

    document.getElementById("blog-title").value = title;
    document.getElementById("blog-content").innerHTML = content;

    $('.write').addClass('active');
    $('.public').removeClass('active');
    $('.draft').removeClass('active');
    //   $('.banner').removeClass('active');
    $('.msg').removeClass('active');

    if ($(".write").hasClass('active')) {
        $('.write-block').attr('style', 'display: block;');

        $('.msg-block').attr('style', 'display: none;');
        $('.draft-block').attr('style', 'display: none;');
        $('.public-block').attr('style', 'display: none;');
    }

}

function goToDraft() {

    $('.draft').addClass('active');
    $('.public').removeClass('active');
    $('.write').removeClass('active');
    //   $('.banner').removeClass('active');
    $('.msg').removeClass('active');

    if ($(".draft").hasClass('active')) {

        $('.draft-block').attr('style', 'display: block;');

        $('.msg-block').attr('style', 'display: none;');
        $('.write-block').attr('style', 'display: none;');
        $('.public-block').attr('style', 'display: none;');
        getDraft();
    }

}

/**
 * 导航栏 - 留言
 */
function goToMsg() {


    $('.msg').addClass('active');
    $('.write').removeClass('active');
    $('.draft').removeClass('active');
    //   $('.banner').removeClass('active');
    $('.public').removeClass('active');

    if ($(".msg").hasClass('active')) {
        $('.msg-block').attr('style', 'display: block;');

        $('.draft-block').attr('style', 'display: none;');
        $('.public-block').attr('style', 'display: none;');
        $('.write-block').attr('style', 'display: none;');
    }
    getMsgs();

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
                console.log(res);
                // console.log(res);
                if (res.resultCode === 200) {
                    console.log('发布成功！');
                    alert('发布成功！');

                    // window.location.href = `./admin.html?usersId=${res.data.usersId}&usersName=${res.data.usersName}`;

                    // window.location.href = './index.html?msg="login success"';
                    window.location.href = './admin.html';
                } else {
                    console.log(`发布失败！${res.message}！`);
                    alert('发布失败！');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus);
            }
        });
    }

}

/**
 * 博客存草稿
 */
function draftBlog() {
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
            isPost: 0,
            draft: 1
        }

        $.ajax({
            type: 'post',
            url: 'http://192.168.180.167:8080/manage-api/v1/blogs/draft',
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(params),
            async: true,

            success: function (res) {
                console.log(res);
                // console.log(res);
                if (res.resultCode === 200) {
                    console.log('发布成功！');
                    alert('已存草稿');

                    // window.location.href = `./admin.html?usersId=${res.data.usersId}&usersName=${res.data.usersName}`;

                    // window.location.href = './index.html?msg="login success"';
                    window.location.href = './admin.html';
                } else {
                    console.log(`发布失败！${res.message}！`);
                    alert('存草稿失败！');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus);
            }
        });
    }



}

/**
* 获取所有发布的博客
* 
*/
function getBlogs() {

    $.ajax({
        type: 'get',
        url: "http://192.168.180.167:8080/manage-api/v1/blogs/public-blog",
        async: true,
        success: function (res) {
            console.log(res);
            const Datas = res.data;
            console.log(Datas);

            const list = Datas.list[0];
            console.log(list);

            let items = '';
            //里面加的是每个项的HTML
            for (let j = 0; j < list.length; j++) {
                const num = (list[j].blogsId) % 10;
                const index = list[j].blogsDescription.indexOf("。");
                const short = list[j].blogsDescription.substr(0, index + 1);
                items += `
          <div class="list-group">
          <a href="detail.html?blogsId=${list[j].blogsId}" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
            <div class="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 class="mb-0 ">${list[j].blogsTitle}</h6>
                <p class="mb-0 opacity-75">${short}</p>
              </div>
              <small class="opacity-50 text-nowrap">${list[j].blogsTime}</small>
            </div>
            <div class="check-box">
            <input type="checkbox" class="form-check-input" id="same-address" value="${list[j].blogsId}">
          </div>
          </a> 
          `;
            }
            $('.all-blogs-block').html(items); //盒子应该是外面的

        }
    });
}

/**
* 删除博客
*/
function deleteBlogs() {
    let checked = [];

    //$('input:checkbox:checked') 等同于 $('input[type=checkbox]:checked')
    //意思是选择被选中的checkbox
    $.each($('input:checkbox:checked'), function () {
        checked.push(parseInt($(this).val()));
    });
    // console.log('checkedList', checked);
    if (checked.length === 0) {
        alert("请选择要删除的博客！");
    } else {
        const params = checked;
        $.ajax({
            type: 'put',
            url: 'http://192.168.180.167:8080/manage-api/v1/blogs/blog',
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(params),
            async: true,
            success: function (res) {
                // console.log(res);
                if (res.resultCode === 200) {
                    console.log('成功！');
                    alert("删除成功！");
                    getDraft();
                } else {
                    alert("删除失败！");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus);
            }
        });
    }
}

/**
* 获取草稿博客
* 
*/
function getDraft() {

    $.ajax({
        type: 'get',
        url: "http://192.168.180.167:8080/manage-api/v1/blogs/draft-blog",
        async: true,
        success: function (res) {
            console.log(res);
            const Datas = res.data;
            console.log(Datas);

            const list = Datas.list[0];
            console.log(list);

            let items = '';
            //里面加的是每个项的HTML
            for (let j = 0; j < list.length; j++) {
                const num = (list[j].blogsId) % 10;
                const index = list[j].blogsDescription.indexOf("。");
                const short = list[j].blogsDescription.substr(0, index + 1);
                items += `
         <div class="list-group-item list-group-item-action d-flex gap-3  ">
  <a onclick="goToWrite('${list[j].blogsTitle}','${list[j].blogsDescription}')" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                <div class="d-flex gap-2 w-100 justify-content-between">
                  <div>
                    <h6 class="mb-0 ">${list[j].blogsTitle}</h6>
                    <p class="mb-0 opacity-75">${short}</p>
                  </div>
                  <small class="opacity-50 text-nowrap">${list[j].blogsTime}</small>
                </div>
              </a>  
              <div class="check-box">
              <input type="checkbox" class="form-check-input" id="same-address" value="${list[j].blogsId}">
            </div>

            </div>
              `;
            }
            $('.draft-blogs-block').html(items); //盒子应该是外面的

        }
    });
}

/**
* 获取所有留言
* 
*/
function getMsgs() {

    $.ajax({
        type: 'get',

        url: "http://192.168.180.167:8080/manage-api/v1/blogs/allFeedback",
        async: true,
        success: function (res) {
            console.log(res);
            const Datas = res.data;
            console.log(Datas);

            const list = Datas.list[0];
            console.log(list);

            let items = '';
            //里面加的是每个项的HTML
            for (let j = 0; j < list.length; j++) {

                items += `

          <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
          <div class="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h6 class="mb-0 ">${list[j].feedbackContent}</h6>
            </div>
            <small class="opacity-50 text-nowrap">${list[j].feedbackTime}</small>
          </div>
  
        </a>
          `;
            }
            $('.all-msg-block').html(items); //盒子应该是外面的

        }
    });
}