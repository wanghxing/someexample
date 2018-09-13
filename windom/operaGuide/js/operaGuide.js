/*嵌入html页面*/
$('#navhtml-og').load('../inc/header.html', function() {
  $('.ellipsis').tips({
    con: '.elliMore',
    ev: 'click',
    className: 'hover'
  });
  $.nav();
  $('#userLetter').tips({
    con: '.userLetter_con',
    clickarea_classname: 'click_bg_col'
  });
  $('#userN').tips({
    con: '.userN_con',
    clickarea_classname: 'click_bg_col'
  });

  $('#nav').find('.userN_con').find('.role').on('click', function() {
    $('#nav').find('.userN_con').find('.role').removeClass('cur');
    $(this).addClass('cur');
  });

});

var tab = 0;
$(function() {
  // 操作指南头部初始状态
  $('.ogtopbarfixedTop').next('.og-container').addClass('mt180');

  /*TAB控制器*/
  $.OGtab = function(tabnav, tabcon, navh, paraIndex) {
    if(paraIndex) {
      $(tabnav + ' li').removeClass(navh);
      $(tabnav + ' li').eq(paraIndex).addClass(navh);
      $(tabcon).hide();
      $(tabcon).eq(paraIndex).show();
    }
    $(tabnav + ' li').click(function() {
      var index = $(this).index();
      $(tabnav + ' li').removeClass(navh);
      $(this).addClass(navh);
      $(tabcon).hide();
      $(tabcon).eq(index).show();

      echo.init({
        offset: 0,
        throttle: 0,
        unload: false,
        callback: function (element, op) {
          // // console.log(element, 'has been', op + 'ed')
        }
      });
      

      var isPointer = $('body').find('.format-g').text();
      if(isPointer){
        tab = index;
        pointer.init();
      }
    });
  };

  //tab切换
  var urlParaSearch = window.location.search,tabIndex;
  if(urlParaSearch){
    var urlParas = urlParaSearch.split('?')[1].split('&');
    $.each(urlParas, function(index, val) {
      var paraArr = val.split('=');
      if(paraArr[0] == "id"){
        tabIndex = paraArr[1]
      }
    });
  }
  $.OGtab('.guideNav', '.guideTabCon', 'cur',tabIndex);

  var pointer = {
    _h: function() {
      $('body').find('.g-step-nav').remove();
      var _html = '<div class="g-step-nav js-step-nav" style="left: 183px;"><div class="order-ico-group">'
      var l = $('.g-con-orderlist').eq(tab).find('li').length;
      for(var i = 1; i < l + 1; i++) {
        _html += '<div href="javascript:;" class="list-icon-link" style="display:none">' + i + '</div>';
      }
      _html += '</div></div>';
      return _html;
    },
    _point: function() {
      $('body').find('.format-g').find('.g-con-orderlist').eq(tab).find('li').each(function(i, m) {
        var $this = $(this);
        (function(i, d, $this) {
        // console.log(d,250);
          if($this.offset().top - d < 50 && $this.offset().top - d > -$this.outerHeight()-200 && d > 250) {
            $('body').find('.list-icon-link').eq(i).show().addClass('list-icon-cur').siblings().removeClass('list-icon-cur');
            $('body').find('.list-icon-link:gt(' + i + ')').hide();
            $this.find('.list-cir').css('visibility', 'hidden');
          } else if($this.offset().top - d < -150){
             $('body').find('.list-icon-link').eq(i).show();
          } else {
            $this.find('.list-cir').css('visibility', 'visible');
          }
          if(d < 250) {
            $this.find('.list-cir').css('visibility', 'visible');
            $('body').find('.list-icon-link').hide();
          }
        })(i, $(window).scrollTop(), $this)
      })
    },
    gPosition: function() {
      if($('.guideBox').text()) {
        // $('.g-step-nav').css('left', $('.guideBox').offset().left + 30);此方法有偏移
        
        var conw = $('.guideBox').outerWidth();
        //console.log(conw,-conw / 2+30);
        $('.g-step-nav').css('left','50%');
        $('.g-step-nav').animate({marginLeft:-conw / 2+30 + 'px'},0);
      }
    },
    init: function() {
      var _this = this;
      $('.g-con-orderlist').eq(tab).append(_this._h());
        _this.gPosition();
      window.onresize = function() {
        _this.gPosition();
      }
      $(document).scroll(function() {
        _this._point();
      })
    }
  };
  $('body').on('click', '.list-icon-link', function() {
    var _index = parseInt($(this).html());
    var _top = $('.g-con-orderlist').eq(tab).find('li').eq(_index - 1).offset().top;
    $('.g-con-orderlist').eq(tab).find('li').eq(_index - 1).find('.list-cir').css('visibility', 'hidden');
    var _pt = parseInt($('.g-con-orderlist').eq(tab).find('li').eq(_index - 1).css('padding-top'));
    var _t = (_index - 1) * 30;
    // console.log(parseInt(_pt));
    $('body').find('.list-icon-link:gt(' + (_index - 1) + ')').hide();
    $("html,body").stop().animate({
      scrollTop: _top + _pt - _t - 10
    }, 300);
  });
    
  pointer.init();

});