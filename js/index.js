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
      $('.me-block').attr('style', 'display: none;');

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
  