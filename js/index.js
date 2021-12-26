$(document).ready(function () {
    goToIndex();

  });
/**
 * 导航栏 - 首页
 */
 function goToIndex() {

      $('.index').addClass('active');
      $('.tag').removeClass('active');
      $('.feedback').removeClass('active');
      $('.me').removeClass('active');
  
      if ($(".index").hasClass('active')) {
        $('.index-block').attr('style', 'display: block;');
  
        getBlogs();
  
        $('.tag-block').attr('style', 'display: none;');
        $('.me-block').attr('style', 'display: none;');
        $('.feedback-block').attr('style', 'display: none;');
      }

  }

  /**
 * 导航栏 - 反馈页面
 * 
 */
 function goToFeedBack() {

    $('.feedback').addClass('active');
    $('.tag').removeClass('active');
    $('.index').removeClass('active');
    $('.me').removeClass('active');

    if ($(".feedback").hasClass('active')) {
      $('.feedback-block').attr('style', 'display: block;');


      $('.index-block').attr('style', 'display: none;');
      $('.tag-block').attr('style', 'display: none;');
      $('.me-block').attr('style', 'display: none;');

    }

}

  /**
 * 导航栏 - 分类
 */
 function goToTag() {

    $('.index').removeClass('active');
    $('.tag').addClass('active');
    $('.feedback').removeClass('active');
    $('.me').removeClass('active');

    if ($(".tag").hasClass('active')) {
      $('.tag-block').attr('style', 'display: block;');

    //   getBlogs();

      $('.index-block').attr('style', 'display: none;');
      $('.feedback-block').attr('style', 'display: none;');
      $('.me-block').attr('style', 'display: none;');

    }

}

/**
 * 导航栏 - 首页
 */
 function goToMe() {

    $('.me').addClass('active');
    $('.tag').removeClass('active');
    $('.feedback').removeClass('active');
    $('.index').removeClass('active');

    if ($(".me").hasClass('active')) {
      $('.me-block').attr('style', 'display: block;');

    //   getBlogs();
    $('.feedback-block').attr('style', 'display: none;');
      $('.tag-block').attr('style', 'display: none;');
      $('.index-block').attr('style', 'display: none;');

    }

}


/**
 * 获取首页博客
 * 
 */
 function getBlogs() {
  
    $.ajax({
      type: 'get',
      url: "http://localhost:8080/api/v1/blogs/blog",
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
          const num =(list[j].blogsId)%10;
          const index = list[j].blogsDescription.indexOf("。");
          const short = list[j].blogsDescription.substr(0,index+1);
          items += `

          <div class="col" style="margin-top:20px;" onclick="window.location='detail.html?blogsId=${list[j].blogsId}'">
          <div class="card">
            <div class="row g-0">
              <div class="col-md-4" style="text-align: center;">
              <img src="../images/${num}.png" class="bd-placeholder-img" width="100%" height="250" style="overflow: hidden; margin: 0 auto;">

              </div>
              <div class="col-md-8" >
                <div class="card-body">
                  <h5 class="card-title">${list[j].blogsTitle}</h5>
                  <p class="card-text">${short}</p>
                  <p class="card-text"><small class="text-muted">${list[j].blogsTime}</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
          `;
        }
        $('.blog-block').html(items); //盒子应该是外面的
  
      }
    });
  }
  
/**
 * 发表留言板
 */
 function feedback() {
   
    var content = document.getElementById("feedback-content").value;
  
    if (content === "") {
        alert("反馈不能为空！");
      } else if (content !== "") {
        var params = {
            feedback: content,
        }

        $.ajax({
          type: 'post',
          url: 'http://localhost:8080/api/v1/blogs/feedback',
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(params),
          async: true,
      
          success: function (res) {
            console.log(res);
            // console.log(res);
            if (res.resultCode === 200) {
              console.log('发布成功！');
              alert('留言成功！');
        
                // window.location.href = `./admin.html?usersId=${res.data.usersId}&usersName=${res.data.usersName}`;
       
              // window.location.href = './index.html?msg="login success"';
              window.location.href = './index.html';
            } else {
              console.log(`发布失败！${res.message}！`);
              alert('留言失败！');
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
          }
        });
      }

}


/**
 * 分类获取
 * 
 */
 function showAnimal() {
  
        let items = '';
          items += `

          <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">

          <div class="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h6 class="mb-0">云豹</h6>
              <p class="mb-0 opacity-75">在猫科尤其是大猫家族里，云豹是比较早期分出来的分支，其他的豹属，比如狮、虎、豹，雪豹，美洲豹之类的都要比它晚。</p>
            </div>
            <small class="opacity-50 text-nowrap">2021-12-26T06:17:32.000+00:00</small>
          </div>
        </a>
        <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">

          <div class="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h6 class="mb-0">鸟类叫声</h6>
              <p class="mb-0 opacity-75">鸟类的叫声虽然多种多样，但大致可以分为两类：鸣唱（song）和鸣叫（call）。</p>
            </div>
            <small class="opacity-50 text-nowrap">2021-12-25T20:48:30.000+00:00</small>
          </div>
        </a>
          `;
        
        $('.tag-all-blog').html(items); //盒子应该是外面的
  
  
  }

  /**
 * 分类获取
 * 
 */
 function showOther() {
  
    let items = '';
      items += `

      <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">

      <div class="d-flex gap-2 w-100 justify-content-between">
        <div>
          <h6 class="mb-0">长荡湖·夏</h6>
          <p class="mb-0 opacity-75">夏末的长荡湖碧波荡漾，藻类不正常的爆发让整个水体呈现一种诡异的质感，像倒入了粘稠绿色染料的染缸，从湖上吹来的褥热的风夹着一阵一阵的腥臭。</p>
        </div>
        <small class="opacity-50 text-nowrap">2021-12-26T07:46:58.000+00:00</small>
      </div>
    </a>
    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">

      <div class="d-flex gap-2 w-100 justify-content-between">
        <div>
          <h6 class="mb-0">云豹的消失</h6>
          <p class="mb-0 opacity-75">曾经，我国有很长一段时间把狩猎换汇这件事情作为国家经济发展的常态，云豹自然没能逃过这一劫，于是它在很多地方都慢慢消失。</p>
        </div>
        <small class="opacity-50 text-nowrap">2021-12-26T06:21:36.000+00:00</small>
      </div>
    </a>
      `;
    
    $('.tag-all-blog').html(items); //盒子应该是外面的


}