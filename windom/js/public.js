/*嵌入html页面*/
$('#navhtml').load('inc/header.html',function() {
    $('.ellipsis').tips({
      con:'.elliMore',
      ev:'click',
      className:'hover'
    });
    $.nav();    
    $('#userLetter').tips({
      con:'.userLetter_con',
      clickarea_classname:'click_bg_col'
    });
    $('#userN').tips({
      con:'.userN_con',
      clickarea_classname:'click_bg_col'
    }); 

    $('#nav').find('.userN_con').find('.role').on('click',function(){
        $('#nav').find('.userN_con').find('.role').removeClass('cur');
        $(this).addClass('cur');
    });

});

/* 学生端头部 */
$('#stunavhtml').load('inc/header-stu.html',function() {
    $('.ellipsis').tips({
      con:'.elliMore',
      ev:'click',
      className:'hover'
    });
    $.nav();    
    $('#userLetter').tips({
      con:'.userLetter_con',
      clickarea_classname:'click_bg_col'
    });
    $('#userN').tips({
      con:'.userN_con',
      clickarea_classname:'click_bg_col'
    }); 

    $('#nav').find('.userN_con').find('.role').on('click',function(){
        $('#nav').find('.userN_con').find('.role').removeClass('cur');
        $(this).addClass('cur');
    });

});

$('#page').load('inc/fullpage.html',function() {
  $('.chosen-select-page,.select-page').chosen({disable_search:true}); 
});


/**
 * 多级树
 * elfTree V1.0  by Darin
 * 
*/
(function($){
    $.fn.extend({
        elfTree:function(options){
            var defaults = {        
                opt:8,
        data:[],
        selectedClass:'bg_ebebeb'
            };
      var options = $.extend(defaults, options);
      var _this=$(this);
      
      
      /*! 渲染json */ 
      
      if(options.data){
      
        var treeData = arrayToTreeFormat({idKey:'id', pIdKey:'parentId'}, options.data);
        _this.append(makeTreeHtml(treeData));
      }
      
      
      function isArray(arr) {
        return Object.prototype.toString.apply(arr) === "[object Array]";
      }
      function arrayToTreeFormat(setting, sNodes) {
        var i,l,
        key = setting.idKey||'id',
        parentKey = setting.pIdKey||'parentId',
        childKey = 'children';
        if (!key || key=="" || !sNodes) return [];
        if (isArray(sNodes)) {
          var r = [];
          var tmpMap = [];
          for (i=0, l=sNodes.length; i<l; i++) {
            tmpMap[sNodes[i][key]] = sNodes[i];
          }
          for (i=0, l=sNodes.length; i<l; i++) {
            if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] != sNodes[i][parentKey]) {
              if (!tmpMap[sNodes[i][parentKey]][childKey])
                tmpMap[sNodes[i][parentKey]][childKey] = [];
              tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);
            } else {
              r.push(sNodes[i]);
            }
          }
          return r;
        }else {
          return [sNodes];
        }
      }
      
      // 构建html
      var htmlFrag = [];
      function makeTreeHtml(treeData){
        if(!treeData || !treeData.length) return '';
        var level  = 1, htmlArr=[];
        htmlArr.push('<div class="level level' + level + '">')
        htmlArr.push('<ul>')
        var nextLevelArr = [];
        for(var i=0;i<treeData.length;i++){
          htmlArr.push('<li value="' + treeData[i].id + '">' + treeData[i].name + '</li>');
        }
        htmlArr.push('</ul></div>');
        _appendNextLevel(htmlArr, treeData, level + 1);
        return htmlArr.join('');
      }

      function _appendNextLevel(htmlArr, pNodes, level){
        if(!pNodes || !pNodes.length) return ;
        var nextLevelNodes = [];
        var tmpHtmlArr = [];
        for(var i=0;i<pNodes.length;i++){
          var pNode=pNodes[i];
          if(!pNode.children){
            continue;
          }
          tmpHtmlArr.push('<ul anchor="' + pNode.id + '">');
          for(var j=0;j<pNode.children.length;j++){
            tmpHtmlArr.push('<li value="' + pNode.children[j].id + '">' + pNode.children[j].name + '</li>');
            nextLevelNodes.push(pNode.children[j]);
          }
          tmpHtmlArr.push('</ul>');
        }
        if(tmpHtmlArr.length){
          htmlArr.push('<div class="level level' + level + '">');
          htmlArr.push(tmpHtmlArr.join(''));
          htmlArr.push('</div>');
        }
        if(nextLevelNodes.length){
          _appendNextLevel(htmlArr, nextLevelNodes, level + 1);
        }
      }
      
      
      /*! 设置宽度 */ 
      
      var _width = _this.width();
      _this.find('ul').width(_width-2);
      
      
      /*! 设置高度 */ 
      
      var _liLength = parseInt(_this.find('ul').eq(0).children('li').size());
      var _ulHeight;
      if(_liLength >  options.opt){
        _ulHeight = parseInt(_this.find('ul').eq(0).children('li').height()) * options.opt;
        _this.find('ul').mCustomScrollbar({scrollInertia:50,theme:'dark-2'});
      }else{
        _ulHeight = parseInt(_this.find('ul').eq(0).children('li').height()) * _liLength; 
      }
      _this.find('ul').each(function(){
        $(this).height(_ulHeight);
      })
      
      /*! 设置位置 */ 
      
      _this.find('.level:not(:first)').each(function(i){
        var _multiple = i + 1,
          _top = $('.showInitial').height();
        $(this).find('ul').css({'left': (_width - 1) * _multiple,'top' : _top})
      })
      
           
          var storageValue =  _this.find('.storage').val();
      setSelected(storageValue);
      
      
            /*! 显示 // 隐藏 */ 
      
      _this.find('.showInitial').click(function(){
        storageValue =  _this.find('.storage').val();
        $('.elfTree ul').hide(); 
        $('.elfTree').removeClass('elfTree-open').css('zIndex','auto');
        if(_this.find('.level:first').children('ul').is(':hidden')){
          _this.find('.level:first ul').show();
          var _anchor=_this.find('li[value="' + storageValue + '"]').parent('ul');
          _anchor.show();
          while(_anchor.length) {         
            _anchor = _this.find('li[value="' + _anchor.attr('anchor') + '"]').addClass(options.selectedClass).parent('ul');    
            _anchor.show();
          }         
          setSelected(storageValue);
          _this.addClass('elfTree-open');
          _this.css('zIndex','30');
          
        }else{
          _this.find('ul').hide();
          _this.removeClass('elfTree-open');
          _this.css('zIndex','auto');
        }
      })
      
      
       /*! 元素事件 */  
       
            $(this).find("li").hover(function(){
                var _value = $(this).attr('value');
        if(_this.find('ul[anchor="' + _value + '"]').length >0){
          _this.find('ul[anchor="' + _value + '"]').show().siblings().hide();
        }else{
          $(this).parents('.level').nextAll().find('ul').hide();
        }
        _this.find('ul').mCustomScrollbar('update');
        var _anchor=_this.find('li[value="' + _value + '"]').parent('ul');
        while(_anchor.length) {
          _anchor = _this.find('li[value="' + _anchor.attr('anchor') + '"]').addClass('parent_col').parent('ul'); 
      
        }
            },function(){
         var _value = $(this).attr('value');
        var _anchor=_this.find('li[value="' + _value + '"]').parent('ul');
        while(_anchor.length) {
          _anchor = _this.find('li[value="' + _anchor.attr('anchor') + '"]').removeAttr('style').parent('ul');  
      
        }
      }).click(function(){
        var _value = $(this).attr('value');
        if(_value && _this.find('ul[anchor="' + _value + '"]').length == 0){        
          _this.find('.storage').val(_value).trigger('change');         
          setSelected(_value);
          _this.find('ul').hide();
          _this.removeClass('elfTree-open');
        }
      })
      
      $(document).bind("click",function(e){ 
        var target = $(e.target); 
        if(target.closest('.elfTree').length == 0){ 
          $('.elfTree ul').hide(); 
          $('.elfTree').removeClass('elfTree-open').css('zIndex','auto');
        } 
      }) 
      
      
      
      /*! 设置选中状态 */
      
      function setSelected(val){
        var  $selectLi = _this.find('li[value="' + val + '"]');
        _this.find('li').removeAttr('class');
        _this.find('li[value="' + val + '"]').addClass(options.selectedClass);
        if($selectLi.length > 0){
          $selectLi.addClass(options.selectedClass);
          _this.find('.showInitial span').text($selectLi.text());
        }
        
        var _anchor=_this.find('li[value="' + val + '"]').parent('ul');
        while(_anchor.length) {
          _anchor = _this.find('li[value="' + _anchor.attr('anchor') + '"]').addClass(options.selectedClass).parent('ul');  
      
        } 
      }
      
        }
    });
})(jQuery);

/*获取链接参数*/
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};

// 判断是否为移动端运行环境
var mob = '';
if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){ 
 if(window.location.href.indexOf("?mobile")<0){ 
  try{ 
      mob = 'true';
  } 
  catch(e){} 
 } 
} 
else{ 
mob = 'false';
};

//获取页面视口宽高
function getViewRect() {
  var pageWidth = window.innerWidth
    ,pageHeight = window.innerHeight;

  if ( typeof pageWidth != 'number' ) {
    if ( document.compatMode == 'CSS1Compat') {
      pageWidth = document.documentElement.clientWidth;
      pageHeight = document.documentElement.clientHeight;
    } else {
      pageWidth = document.body.clientWidth;
      pageHeight = document.body.clientHeight;
    }
  }
  return {
    width: pageWidth,
    height: pageHeight
  };  
};
/*判断横竖屏*/
function hengshuping(){ 
  if(window.orientation==180||window.orientation==0){ 
    var h = getViewRect().height;
    $('html').css('minHeight',h + 'px');    
   } 
  if(window.orientation==90||window.orientation==-90){ 
    var h = getViewRect().height;
    $('html').css('minHeight',h + 'px');          
  } 
};
if(mob == 'true') {
  $(window).on('orientationchange',function() {
    setTimeout(function() {
      hengshuping();
    },600);     
  }); 
};

(function(){
    /*弹窗*/
  $.showOverlay=function() {
    $("#overlay").height(pageHeight());
    //$("#overlay").width(pageWidth());
    $("#overlay").fadeTo(100, 0.8);
  };
  $.hideOverlay=function() {
    $("#overlay").fadeOut(100);
  };
  /* 当前页面高度 */
  function pageHeight() {
    return $(document).height();
  };
  /* 当前页面宽度 */
  function pageWidth() {
    return $(document).width();
  };
    /*头部导航*/
    $.nav = function() {
        var id = getQueryString('id');
        var mid = getQueryString('mid');
        if(id!=null) {
            $('.navUl li').eq(id).addClass('cur');
        };
        if(mid!=null) {
            var mhtml = $('.elliMore li').eq(mid).html();
            $('.navli').html('').append(mhtml).show();
            $('body').find('.navUl').children('li:not(".navli,:has(ul)")').find('a').click(function(event) {
                event.preventDefault();
                $('.navUl li').removeClass('cur');
                $(this).parents('li').addClass('cur');
                var url = $(this).attr('href') + '&mid=' + mid;
                window.location = url;
            });
        };
        $('.navUl li').mouseenter(function() {
            var $that = $(this);
            $(this).find('.subMenu').stop().fadeIn(200);
            setTimeout(function(){
                $that.addClass('hover_bgcol');
            },80);
        }).mouseleave(function() {
            var $that = $(this);
            $(this).find('.subMenu').stop().fadeOut(200);
            setTimeout(function(){ 
               $that.removeClass('hover_bgcol');
            },80);
        });
        var userWidth = $('#userN').width();
        var userConWidth = $('.userN_con').width();
        if(userWidth < userConWidth) {
            $('#userN').css('width',userConWidth-19 + 'px');
        };
    };

    /* 页面顶部下拉框 */
    $.fn.extend({
       tips:function(opts){        
        var begin_color=$(this).hasClass(opts.clickarea_classname) == false ? $(this).addClass(opts.clickarea_classname) : $(this).remjoveClass(opts.clickarea_classname),
            $that=$(this);  
            $that.removeClass(opts.clickarea_classname);          
        return this.each(function(i,n){
            if(opts.ev == 'click') {
                $(n).click(showBox);
                $(opts.con).mouseleave(hideBox);
            } else {
                $(n).hover(
                  showBox,
                  hideBox
                );
                $(opts.con).hover(
                  showBox,
                  hideBox               
                )               
            };
        });
        function showBox(){
          if(opts.ev == 'click') {
            $that.parent().addClass(opts.className);
          };
          $(opts.con).stop().fadeIn(200);
          setTimeout(function(){ 
            // $that.css({'background-color':opts.clickArea});
            $that.addClass(opts.clickarea_classname);
           },80);
        };
        function hideBox(){         
          $(opts.con).stop().fadeOut(200);
          setTimeout(function(){
            // $that.css({'background-color':begin_color});
            $that.removeClass(opts.clickarea_classname);
          },80);
          if(opts.ev == 'click') {
            setTimeout(function(){$that.parent().removeClass(opts.className);},80)
          };                    
        };
       }
    });

    /*活动目录*/
    $.levelMenuCaret = function(box,level,btn,el) {
        $('body').delegate(level + ' ' + btn,"click",function(){
            var isHover = $(this).is('.fa-caret-right');
            if(isHover) {
                $(this).parents(box).find(el).show();
                $(this).removeClass('fa-caret-right').addClass('fa-caret-down');
                if(level == '.oneChapter') {
                    $(this).parents(box).find(btn).removeClass('fa-caret-right').addClass('fa-caret-down');
                    $(this).parents(box).find('.cm_partCon_all').show();
                    $(this).parents(box).find('.threeCon').show();
                };
                if(level == '.twoPart') {
                    $(this).parents(box).find(btn).removeClass('fa-caret-right').addClass('fa-caret-down');
                    $(this).parents(box).find('.threeCon').show();
                };              
            } else {
                $(this).parents(box).find(el).hide();
                $(this).removeClass('fa-caret-right').addClass('fa-caret-right');
            };
            
        });
    };
    $.levelMenuCaretBar = function(box,level,btn,el) {
        $('body').delegate(level,"click",function(){
            var isHover = $(this).find(btn).is('.fa-caret-right');
            if(isHover) {
                $(this).parents(box).find(el).show();
                $(this).find(btn).removeClass('fa-caret-right').addClass('fa-caret-down');
                if(level == '.oneChapter') {
                    $(this).parents(box).find(btn).removeClass('fa-caret-right').addClass('fa-caret-down');
                    $(this).parents(box).find('.cm_partCon_all').show();
                    $(this).parents(box).find('.threeCon').show();
                };
                if(level == '.twoPart') {
                    $(this).parents(box).find(btn).removeClass('fa-caret-right').addClass('fa-caret-down');
                    $(this).parents(box).find('.threeCon').show();
                };
            } else {
                $(this).parents(box).find(el).hide();
                $(this).find(btn).removeClass('fa-caret-down').addClass('fa-caret-right');
            };
            
        });
    };

})(jQuery);

/**
 * IE兼容placeholder属性
 * 
*/
var JPlaceHolder = {
    _check : function(){
        return 'placeholder' in document.createElement('input');
    },
    init : function(){
        if(!this._check()){
            this.fix();
        }
    },
    fix : function(){
        jQuery(':input[placeholder]').each(function(index, element) {
            var self = $(this), txt = self.attr('placeholder');            
            var selfWidth=self.outerWidth(true);
            if(!self.parent().hasClass('placeholderWrap')){
                self.wrap($('<div class="placeholderWrap"></div>').css({display:'inline-block',display:'*inline',position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none',width:selfWidth}));
                var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
                var holder = $('<span></span>').text(txt).css({position:'absolute', left:pos.left, top:pos.top, height:h, lineHeight:h+'px', paddingLeft:paddingleft, color:'#aaa',width:selfWidth}).appendTo(self.parent());
                if(!self.val()==''){
                 holder.hide();
                }
                self.focusin(function(e) {
                       holder.hide();
                   }).focusout(function(e) {
                       if(self.val()==''){
                        holder.show();
                    }else{
                         holder.hide();
                    }
                   });
                holder.click(function(e) {
                       holder.hide();
                    self.focus();
                   });
                
            }   
            
        });
    }
};

/**
 * 过滤name属性
 * 
*/

function filterNameAttr(name){
    return name.replace(/\./g, "\\.").replace(/\[/g, '\\[').replace(/\]/g, '\\]');
}

/**
 * 初始化插件
 * 
*/
function initPlugin(){

    $('.inp,.infoinp,.inputLine').focus(function() {
        $(this).css({borderColor:'#58abe0'});
    }).blur(function() {
        $(this).css({borderColor:'#cccccc'});
    });
    //执行IE兼容placeholder属性
    JPlaceHolder.init();
}

/*单元级活动图标初始化*/
$.fn.resetUpDown = function() {
  var moveElement = $(this);
  if(moveElement.text()) {
    moveElement.find('.whiteMoveDel').show();
    moveElement.children('li').first().find('.moveup').css('display','none');
    moveElement.children('li').last().find('.movedown').css('display','none');
  };
  $('.oneBox .oneContainer').find('.oneLevel').find('.moveright').show();
  $('.oneBox .oneContainer').first().find('.oneLevel').find('.moveright').hide();
};
$.resetNodeMove = function(nodeId,level) {
  var moveNodeElement = $('#Node' + nodeId);
  if(moveNodeElement.text()) {
    moveNodeElement.parents('.oneBox').children('.oneContainer').find('.oneLevel').find('.blueMoveDel').show();
    moveNodeElement.parents('.oneBox').children('.oneContainer').first().find('.oneLevel').find('.moveup').css('display','none');
    moveNodeElement.parents('.oneBox').children('.oneContainer').last().find('.oneLevel').find('.movedown').css('display','none');
    moveNodeElement.parents('.oneCon').find('.twoContainer').find('.twoLevel').find('.blueMoveDel').show();
    moveNodeElement.parents('.oneCon').find('.twoContainer').first().find('.twoLevel').find('.moveup').css('display','none');
    moveNodeElement.parents('.oneCon').find('.twoContainer').last().find('.twoLevel').find('.movedown').css('display','none');
    moveNodeElement.parents('.threeCon').find('.threeContainer').find('.threeLevel').find('.blueMoveDel').show();
    moveNodeElement.parents('.threeCon').find('.threeContainer').first().find('.threeLevel').find('.moveup').css('display','none');
    moveNodeElement.parents('.threeCon').find('.threeContainer').last().find('.threeLevel').find('.movedown').css('display','none');
  };
  $('.oneBox .oneContainer').find('.oneLevel').find('.moveright').show();
  $('.oneBox .oneContainer').first().find('.oneLevel').find('.moveright').hide();
};
/*升降级移动图标初始化*/
  $.moveDel = function() {
    $('.oneBox').each(function() {
      $(this).children('.oneContainer').first().find('.oneLevel').find('.moveup').css('display','none');
      $(this).children('.oneContainer').last().find('.oneLevel').find('.movedown').css('display','none');
    });
    $('.oneCon').each(function() {
      $(this).find('.twoContainer').first().find('.twoLevel').find('.moveup').css('display','none');
      $(this).find('.twoContainer').last().find('.twoLevel').find('.movedown').css('display','none');
    });
    $('.threeCon').each(function() {
      $(this).find('.threeContainer').first().find('.threeLevel').find('.moveup').css('display','none');
      $(this).find('.threeContainer').last().find('.threeLevel').find('.movedown').css('display','none');
    });
    $('.unitLevelList').each(function() {
      $(this).children('li').first().find('.moveup').css('display','none');
      $(this).children('li').last().find('.movedown').css('display','none');
    });
    $('.courselevelList').each(function() {
      $(this).children('li').first().find('.moveup').css('display','none');
      $(this).children('li').last().find('.movedown').css('display','none');
    });
  };  
/*单元级箭头*/
$.unitArrow = function() {
  $('.oneContainer').each(function() {
    var li = $(this).find('.unitLevelList').children('li').length;
    twolevel = $(this).find('.twoContainer').length;
    if(li<1 && twolevel<1) {
      $(this).find('.oneLevel').find('.levelAngle').hide();
    } else {
      $(this).find('.oneLevel').find('.levelAngle').show();
    };
  });
  $('.twoContainer').each(function() {
    var li2 = $(this).find('.unitLevelList').children('li').length;
    threelevel = $(this).find('.threeContainer').length;
    if(li2<1 && threelevel<1) {
      $(this).find('.twoLevel').find('.levelAngle').hide();
    } else {
      $(this).find('.twoLevel').find('.levelAngle').show();
    };
  });
  $('.threeContainer').each(function() {
    var li3 = $(this).find('.unitLevelList').children('li').length;
    if(li3<1) {
      $(this).find('.threeLevel').find('.levelAngle').hide();
    } else {
      $(this).find('.threeLevel').find('.levelAngle').show();
    };
  });
  $('.oneBox .oneContainer').find('.oneLevel').find('.moveright').show();
  $('.oneBox .oneContainer').first().find('.oneLevel').find('.moveright').hide();
};

/*基本信息浮动层*/
$.floatState = function() {
  var mh = $('.layoutInner').height();
  var st = $(window).scrollTop();
  var wh = $(window).height();
  var sh = mh - wh - 45;
  //console.log(mh + ':' + st + ':' + wh);
  if(st>sh) {
    $('.infoFloat').hide();
  } else {
    $('.infoFloat').show();
  };
};


$(function(){
    // 弹窗 
    var sTinit = $(window).scrollTop();
    $.rollFixed = function(scrollTop) {     
      if(scrollTop>200) {
        $('.addTopFloat').show();
      } else {
        $('.addTopFloat').hide(); 
      };    
    };
    $.rollFixed(sTinit);
    // $.popscroll();
    $(window).scroll(function() {
      // $.popscroll();
      var scrollTop = $(window).scrollTop();  
      $.rollFixed(scrollTop);
    }); 
    /*关闭弹窗*/
    $('.ti-close').click(function() {
      // $(this).hidePop();
    }); 
    $('#ol-close').click(function() {
      var tanName = $(this).attr('rel');
      $(tanName).hide();
      $(this).hide();
      $.hideOverlay();
    });

    $('body').append('<div id="overlay"></div><div id="ol-close"></div>');

    //导航交互
    $('.ellipsis').tips({
      con:'.elliMore',
      ev:'click',
      className:'hover',
      navMore:true
    }); 
    $('#userLetter').tips({
      con:'.userLetter_con',
      clickarea_classname:'click_bg_col'
    });
    $('#userN').tips({
      con:'.userN_con',
      clickarea_classname:'click_bg_col'
    });
    $('.js-mystudy').tips({
      con:'.recentexam_con',
      clickarea_classname:'click_bg_col'
    });

    /*点击空白隐藏*/
    $.closestFn = function(btn,box,className) {
        $(document).click(function(e){
            var elem=$(e.target).closest(btn);
            if(!elem.length){
                $(box).hide();
                $(btn).removeClass(className);
            };
        }); 
    };

    // $.closestFn('.other-opera .preMoreBtn','.other-opera .operaMore');

    /*输入框效果*/
    $('.inputText,.multiRowText').focus(function() {
        $(this).addClass('inputFocus');
    }).blur(function() {
        $(this).removeClass('inputFocus');
    });

    // 右侧浮动框    
    // var rFloat = '<div class="r-float">' + '<div class="animateBtn raised clickable icon-bg icon-btn block" title="意见反馈">' + '<input class="toggle" type="checkbox"/>' + '<div class="anim"></div><span class=""><i></i></span>' + '</div>' + '<span class="text block none">意见反馈</span>' + '</div>';  
    // $('.body').append(rFloat);
    
    // 提示信息
    $('.timeTip').tipBox({
        direction: 'bottom',
        skin: 'grayDarkBottom',
        offset: 10,
        textAlign: 'center'

    });
    // 课程辅导 
    $('.topIconBtn').tipBox({
      direction: 'bottom',
      skin: 'grayDarkBottom',
      offset: 5,
      textAlign: 'center'
    });
    // 互评
    $('.commentTip').tipBox({
        direction: 'right',
        skin: 'grayLineBottom',
        offset: 10,
        textAlign: 'center'

    });
    $('.scoreTip').tipBox({
        direction: 'left',
        skin: 'grayLineLeft',
        offset: 10,
        textAlign: 'center'

    });
    $('.last_time, .tasks, .talkBtnDisable').tipBox({
        direction: 'bottom',
        skin: 'grayLineBottom',
        offset: 10,
        textAlign: 'center'

    });
    //单元级活动-时间
    $('.timeIcon, .knowledge').tipBox({
      direction: 'bottom',
      skin: 'grayLineBottom',
      offset: 5,
      textAlign: 'center'
    });
    $('.doHomework, .viewJS').tipBox({
      direction: 'bottom',
      skin: 'grayLineBottom',
      offset: 5,
      textAlign: 'right'
    });
    $('.discusscreatTime').tipBox({
      direction: 'bottom',
      skin: 'grayDarkBottom',
      offset: 5,
      textAlign: 'center'

    });
    /*进入课堂等*/
    $('.enterClass, .publishState, .viewWork, .actShow').tipBox({
      direction: 'bottom',
      skin: 'grayDarkBottom',
      offset: 10,
      textAlign: 'center'

    });    

    // 按钮有提示时，父级去掉类名animateBtn
    if($('.tipHtml').parent().is('.animateBtn')){
      $('.tipHtml').parent().removeClass('animateBtn');
      $('.tipHtml').parent().find('input').hide();
    };


    /*添加资源-高级搜索*/
    $('.js-seniorBtn').on('click',function(){
       if($('.js-hideSearch').is(':visible')){
          $('.js-hideSearch').slideUp(200);
          $(this).find('.andAngle').find('i').addClass('fa-angle-down').removeClass('fa-angle-up');
          return false;
       }else{
          $('.js-hideSearch').slideDown(200).find('.seniorSelect').chosen({disable_search:true});
          $(this).find('.andAngle').find('i').addClass('fa-angle-up').removeClass('fa-angle-down');
          return false;
       }
    });

    /*TAB控制器*/
    $.tab=function(tabnav,tabcon,navh) {
        $(tabnav + ' li').click(function() {
            var index=$(this).index();
            $(tabnav + ' li').removeClass(navh);
            $(this).addClass(navh);
            $(tabcon).hide();
            $(tabcon).eq(index).show();

            // 滚动条
            $('.contentCon').find('.content-tree').eq(index).mCustomScrollbar('update');
            // 签到记录-考勤总览
            $('.totalView-cont .tV-con').find('dl').eq(index).mCustomScrollbar('update');
            // 资源库知识点下拉滚动条
            // $('.resConWrap').find('.multiDrop').eq(index).find('.dropItemCase').mCustomScrollbar('update');

            var tabselect = $(tabcon).find('.select-show,.select-default').text();
            if(tabselect) {
                $(tabcon).find('.select-hide').chosen({disable_search:true});
            };

            var tabscroll = $(tabcon).find('.tabscroll').text();
            if(tabscroll) {
              $(tabcon).eq(index).find('.tabscroll').mCustomScrollbar({
                theme:"dark-2",
                mouseWheelPixels:"1000",
                update:'true'
              });
            };

            // 同伴互评 3.2
            $('body').find('.hptabCon').each(function(){
              if($(this).text()) {
                var cplist_h = $(this).find('.parList').height();
                $(this).find('.parList-socurse').css({'height':(cplist_h+10) + 'px','line-height':(cplist_h+10)+'px'});
                $(window).serialize(function(){
                  $(this).find('.parList-socurse').css({'height':(cplist_h+10) + 'px','line-height':(cplist_h+10)+'px'});
                });
              }
            });
        });
    };

    // $.tab(".subnav","","cur");
    $.tab(".TWTab",".TWTabCon","Cur");

    /*课程学习 "继续学习" 显示隐藏*/
    clearTimeout(timer);
    var timer = setTimeout(function(){
      $('.studyTip').hide();
    }, 50000);

    // 头部切换
    $('.subnav').on('click','li', function(){
       $('.subnav').find('li').removeClass('cur');
       $(this).addClass('cur');
    })

    /*推荐提示*/
    $.recTips = function(rectxt,rectime,recState) {
        var recText;
        if(recState == 'success') {
            recText = '<div class="recTipBox succ"><span class="tspic"><i class="icon-succ"></i>' + rectxt + '！</span></div>'; 
        } else if(recState == 'fail') {
            recText = '<div class="recTipBox fail"><span class="tspic"><i class="icon-fail"></i>' + rectxt + '！</span></div>'; 
        } else {
            recText = '<div class="recTipBox other"><span class="tspic">' + rectxt + '！</span></div>'; 
        };
        $('body').append(recText);
        var recTimer = setTimeout(function () {
            clearTimeout(recTimer);
            $('.recTipBox').remove();
        }, rectime*1000);
    };
    
    /*添加活动*/
    $('body').on('mouseenter','.oneContainer .addActivityBox',function(ev){
      
        $('.addActivity').hide();
        $(this).find('.addActivity').show();

        var ev=ev||event;
        if(document.documentElement.clientHeight>660){
            if($(this).find('.addActivity').height()+ev.clientY>document.documentElement.clientHeight){
                   $(this).find('.addActivity').addClass('addActivityLast');
            }else{
                  $('.addActivityBox').find('.addActivity').removeClass('addActivityLast');
            }
        }else{
            $('.addActivityBox').find('.addActivity').removeClass('addActivityLast');
        }
        

        // 其他隐藏
        $('.levelMoreBox .levelMoreBtn').removeClass('hover');
        $('.levelMore').hide();
   
    });

    $('body').on('mouseleave','.oneContainer .addActivityBox',function(ev){
          $('.addActivity').hide();
    });
    $('body').on('mouseenter','.addactBg .addActivityBox',function(){
        $('.addActivity').hide();
    });

    /*添加活动*/
    // $.activityLast();
    /*升降级*/
    $.moveDel();
    /*单元级箭头*/
    $.unitArrow();
    /*点击空白处隐藏*/
    /*$.closestFn('.addActivityBox .levelBtn','.addActivityBox .addActivity');
    $.closestFn('.courseActivityBox .courseActivity,.ctrAddActivity','.courseActivityBox .addActivity');
    $.closestFn('.levelMoreBox .levelMoreBtn','.levelMoreBox .levelMore','hover');*/
    /*鼠标移开隐藏*/
    $('.oneBox').delegate('.unitLevelBox','mouseleave',function(){
      $('.addActivity').hide();
      $('.addActivityBox .levelBtn').next('.addActivity').hide();
    });

    $('.oneBox').delegate('.levelMore, .unitLevelBox','mouseleave',function(){
      $('.levelMoreBox .levelMoreBtn').removeClass('hover');
      $('.levelMore').hide();
      $('.levelMoreBox .levelMoreBtn').next('.levelMore').hide();
    });

    

    /*活动页更多操作*/  
    $('body').on('mouseenter','.oneBox .levelMoreBox',function(ev){

        $('.levelMoreBox .levelMoreBtn').removeClass('hover');
        $(this).find('.levelMoreBtn').addClass('hover');
        
        $('.levelMore').hide();
        $(this).find('.levelMoreBtn').next('.levelMore').show();

        var ev=ev||event;
        if($(this).find('.levelMoreBtn').next('.levelMore').height()+ev.clientY>document.documentElement.clientHeight-20){
               $(this).find('.levelMoreBtn').next('.levelMore').addClass('levelMoreLast');
        }else{
              $('.levelMoreBox').find('.levelMore').removeClass('levelMoreLast');
        }

        // 其他隐藏
        $('.addActivity').hide();
    });

    $('body').on('mouseleave','.oneBox .levelMoreBox',function(ev){
           $('.levelMore').hide();
           $('.levelMoreBox .levelMoreBtn').removeClass('hover');
    });
    $('body').on('mouseenter','.addactBg .levelMoreBox',function(){
        $('.levelMore').hide();
        $('.levelMoreBox .levelMoreBtn').removeClass('hover');
    });


    /*单元级显示隐藏*/ 
    $.levelMenuCaret('.unitLevelBox','.oneLevel','.levelAngle','.oneCon, .twoContainer');
    $.levelMenuCaret('.twoBox','.twoLevel','.levelAngle','.threeBox, .unitLevelList li');
    $.levelMenuCaret('.threeBox','.threeLevel','.levelAngle','.unitLevelList');
    $.levelMenuCaret('.courselevelBox','.courselevelBox','.levelAngle','.courselevelList');
    /*收起活动*/
    $('.toggleActivity').click(function() {

      var toggleUp = $('.oneLevel .levelAngle').is('.fa-caret-down');
      if (toggleUp) {
        $('.oneCon').hide();
        $(this).find('span').text('展开活动');
        $('.oneLevel .levelAngle').removeClass('fa-caret-down').addClass('fa-caret-right');
        $('.threeBox').hide();
        $('.twoLevel .levelAngle').removeClass('fa-caret-down').addClass('fa-caret-right');
        $('.threeBox .unitLevelList').hide();
        $('.threeLevel .levelAngle').removeClass('fa-caret-down').addClass('fa-caret-right');
      } else {
        $('.oneCon').show();
        $(this).find('span').text('收起活动');
        $('.oneLevel .levelAngle').removeClass('fa-caret-right').addClass('fa-caret-down');
        $('.threeBox').show();
        $('.twoLevel .levelAngle').removeClass('fa-caret-right').addClass('fa-caret-down');
        $('.threeBox .unitLevelList').show();
        $('.threeLevel .levelAngle').removeClass('fa-caret-right').addClass('fa-caret-down');
      };
      $.footerBom();
    });
    //升降级箭头显示隐藏
    $('.oneBox').delegate('.oneLevel,.twoLevel,.threeLevel,.unitLevelList li,.courselevelList li','mouseenter',function(){
      $(this).find('.moveDel').show();
    });
    
    $('.oneBox').delegate('.oneLevel,.twoLevel,.threeLevel,.unitLevelList li,.courselevelList li','mouseleave',function(){
      $(this).find('.moveDel').hide();
    });
    
    /*按结构导航*/
    $.tab(".termBox",".resourcesBox","cur");
      $('body').on("click",".maMoreLi span",function() {
      var isHover = $(this).parents('.maMoreLi').is('.hover');
      if(!isHover) {
        $(this).parents('.maMoreLi').addClass('hover');     
      };
    });
    $('body').on("mouseleave",".maMoreLi",function() {
      $(this).removeClass('hover');   
    });
     $('body').on("click",".maMoreLi dd",function() {
      var navText = $(this).text().replace(/(^\s*)|(\s*$)/g, "");
      var index = $(this).index();
      $(this).parents('.termBox').find('li').removeClass('cur');
      $(this).parents('.termBox').find('.tabli').show().addClass('cur').children('em').text(navText); 
      $(this).parents('.termBox').find('.tabli').attr('title',navText);
      if($('.line')){ //如果有line样式，则有内容时line显示，否则忽略即可
        $('.sturepNav').find('.line').last().show();
      }
      $('.resourcesBox').hide();
      $('.resourcesBox').last().show(); 
      $(this).parents('.maMoreLi').removeClass('hover');
      $('.resourcesBox .subResources').hide();
      $('.resourcesBox .subResources').eq(index).show();
    });

    //合并选择搜索
    $.mergeSelect = function(){
      $('.searchDown input').focus(function() {
          $(this).parent('.searchDiv').find('.searchBtn').addClass('cur');
          $(this).parents('.mergeWrap').find('.chosen-single').addClass('bdcur');
      }).blur(function() {
          $(this).parent('.searchDiv').find('.searchBtn').removeClass('cur');
          $(this).parents('.mergeWrap').find('.chosen-single').removeClass('bdcur');
      });

      $("body").delegate(".chosen-list li","mouseenter",function(){
          $(this).addClass('highlighted');
      }).delegate(".chosen-list li","mouseleave",function(){
          $(this).removeClass('highlighted');
      });

      $('.searchDown input,.searchBtn,.chosen-list li').on('click',function() {
          var $this = $(this),
             isDown = $this.parents('.searchDown').find('.chosen-list').is('.none');
          if(!isDown){
              $this.parents('.searchDown').find('.chosen-list').addClass('none');
          }else{
              $this.parents('.searchDown').find('.chosen-list').removeClass('none');
          }
      });

      $('.chosen-list li').on('click',function() {
          var $this = $(this),
             oLi = $this.text();
             $this.parents('.searchDown').find(':text').val(oLi);
      });
    };

    // 签到等左右滚动
    $.LRscrollView = function(initnum){
      var n = 0,pWidth=0,td_width,len,contentWidth;

        td_width = $(".signIntable-r .ul-table").find(".div-th").width();
        len = $(".signIntable-r .ul-table").find(".div-th").length;
        contentWidth=$('.signIntable-r').width();
        
        pWidth=len*td_width+1;
        $(".signIntable-r .ul-table").css({width:pWidth});
        
        contentWidth = pWidth > contentWidth ? contentWidth : pWidth;
        $('.signIntable-r').css({width:contentWidth});   
        $('.signIntable-r .table').css({width:contentWidth+1});     
        
        $(".l-arrow-btn").hide();
        if(len > initnum){
            $(".r-arrow-btn").show();
        }else{
            $(".l-arrow-btn").hide();
            $(".r-arrow-btn").hide();
        }
        
        // 浮框信息显示位置
        $('.sturepContent .signIntable-r .li-tr').each(function(){
           $(this).find('.div-td').eq(initnum-1).find('.showBox').addClass('showBoxLeft');
        });

        $(document).on("click",".r-arrow-btn",function(){
          n++;
          var count=len-initnum;
          $(".l-arrow-btn").show();
          // 浮框信息显示位置
          $('.sturepContent .signIntable-r .li-tr').each(function(){
             $(this).find('.div-td').eq(initnum+n-1).find('.showBox').addClass('showBoxLeft');
          });
          if(n==count){
            n=count;
            $(".r-arrow-btn").hide();        
            $(".signIntable-r .ul-table .li-tr").stop().animate({left:-count*td_width});
            if(contentWidth > initnum*td_width){//活动初始显示有半块现象时
              // console.log(contentWidth,initnum*td_width);
              var l=contentWidth%td_width;
                $(".signIntable-r .ul-table .li-tr").stop().animate({left:-n*td_width+l});
            }            
            return false;          
          }
          $(".signIntable-r .ul-table .li-tr").stop().animate({left:-n*td_width},300);
        });

        $(document).on("click",".l-arrow-btn",function(){
          n--;
          var count=len-initnum;
          $(".r-arrow-btn").show();
          if(n==0){
            n=0;
            $(".l-arrow-btn").hide();
            $(".signIntable-r .ul-table .li-tr").stop().animate({left:0});
          }
          $(".signIntable-r .ul-table .li-tr").stop().animate({left:-n*td_width},300);
        });
      };   
      
    //学习报告 右侧头部字段多于两行出现省略号  
    $.hdtitCtrl = function(){
      $('.signIntable-r .hd-title').each(function(){      
          var titH = $(this).height();
          var moreHideDot ='<em class="morehidedot">...</em>';
          if(titH>32){
              $(this).addClass('defaultH');
              $(this).append(moreHideDot);
          }else if(titH<25){
             $(this).css('line-height','1.8');
          };
          // 右侧头部字段有无考核
          var isKH = $(this).parent('.div-th').find('em').is('.khtag');
          var str = $(this).val();
          if(isKH){
            $(this).addClass('needKH');
          }; 
          if(!str.match(/^[\u4e00-\u9fa5]+$/)) { //不全是中文
            $(this).removeAttr('style').addClass('mt3');
            $(this).next('.khtag').css('margin-top','-4px');
          }
      });
    };


    /*课堂历史 基本信息浮动层*/
    function blockFixed(a,b) { 

        var lock = true;   
        
        $(window).scroll(function() {
            if (lock) { 
                var h = $('body').height();
                 //console.log(h);          
                var init = $(window).scrollTop();
                //console.log('init:'+init);
                
                $(window).scroll(function() {
                    var sTop = $(window).scrollTop();
                    //console.log('sTop:'+sTop);
                    if(init < sTop) {
                        //console.log('下');
                        init = sTop;
                        // $(a).addClass('fixed');
                        $(a).find('.topBarWrap').slideUp();
                        $(a).next('.main').removeClass('mt130').addClass('mt80');
                        $(a).find('.topBarWrap').find('.to-back,h2').addClass('init1').removeClass('init2');
                        $(b).removeClass('fixed');
                    };
                    if(init > sTop ) {
                        //console.log('上');
                        init = sTop;
                        $(a).find('.topBarWrap').slideDown();
                        $(a).next('.main').addClass('mt130').removeClass('mt80');
                        $(a).find('.topBarWrap').find('.to-back,h2').removeClass('init1').addClass('init2');
                        if(sTop < 105){
                            // $(a).removeClass('fixed');
                        }
                        $(b).addClass('fixed');
                    };
                });
                
                lock =false;
                
                setTimeout(function(){
                    lock = true;
                },500);
                
                
            }   
        });
    };

    blockFixed('.fixedTop','');  


    /*单元级活动等顶部 基本信息浮动层*/
    function blockFixed2(a,b) { 

        var lock = true;

        // 初始状态
        $('.UnitfixedTop').next('.main').addClass('mt192');
        $('.addActfixedTop').next('.main').addClass('mt142');

        if($(a).find('#navhtml, #nav').is(':visible')){
          $(a).next('.main').removeClass('mt80').removeClass('mt30').addClass('mt192');
        }else{
          $(a).next('.main').removeClass('mt80').removeClass('mt30').addClass('mt142');
        }   
        
        $(window).scroll(function() {
            if (lock) { 
                var h = $('body').height();
                var init = $(window).scrollTop();

                $(window).scroll(function() {
                    var sTop = $(window).scrollTop();
                    if( sTop>160) {
                        init = sTop;
                        $(a).addClass('fixed');
                        $(a).find('.trplan-topBarWrap').addClass('trplan-topBarWrap-fixed');
                        
                        if($(a).find('#navhtml, #nav').is(':visible')){
                          $(a).next('.main').removeClass('mt192').addClass('mt80'); 
                          $(a).find('#navhtml, #nav').hide(); 
                        }else{
                          $(a).next('.main').removeClass('mt142').addClass('mt80');
                        }                     
                    };
                    if( sTop<1) {
                        init = sTop;                        
                        $(a).find('#navhtml, #nav').show();
                        // $(a).removeClass('fixed');
                        $(a).find('.trplan-topBarWrap').removeClass('trplan-topBarWrap-fixed');

                        if($(a).find('#navhtml, #nav').is(':visible')){
                          $(a).find('#navhtml, #nav').stop().show();
                          $(a).next('.main').removeClass('mt30').removeClass('mt80').addClass('mt192');
                        }else{
                          $(a).next('.main').removeClass('mt80').addClass('mt142');
                        }
                    };
                });
                
                lock =false;
                
                setTimeout(function(){
                    lock = true;
                },500);
                
                
            }   
        });
    };

    blockFixed2('.UnitfixedTop','');
    blockFixed2('.addActfixedTop','');


    //收藏图标效果
  $('body').on('click','.collection',function(){
    if($(this).is('.collect')){
    $(this).removeClass('collect');
    }else{
    $(this).addClass('collect');
    }
  });
  /*点赞*/
  $('body').on('click','.agree',function() {
    var isAgree = $(this).is('.blueCur');
    if(!isAgree) {
      $(this).addClass('blueCur');
      $(this).find('i').removeClass('fa-thumbs-o-up').addClass('fa-thumbs-up');
    };
  });

  /*平均分*/
  $('.star').each(function() {
    var starScore = $(this).find('input').val();
    $(this).find('.stardlbox').css('width',starScore*100/5 + '%');
  });
  $('.starBig').each(function() {
    var starScore = $(this).find('input').val();
    $(this).find('.stardlbox').css('width',starScore*100/5 + '%');
  });

  /*课程学习-宽度自适应页面的高度控制*/
  var initBodyHeight = $('body').height();
  $.autoStudy = function(initBodyHeight){
      var _h = $(window).height(),
          bh = $(document.body).height()+100,
          s_Box =$(".s_Box");
          sbheight=s_Box.height();
          console.log(mob, initBodyHeight,_h,bh)
          if (_h > bh){
            if(mob == 'false') {
              s_Box.css({
                  height:"auto",
                  minHeight:_h-150
              });           
            };
          }else {
          if(_h - initBodyHeight > 100) {
            if(mob == 'false') {
              s_Box.css({
                height:_h-150
              });             
            };          
          } else {
            s_Box.css({
              height:"auto",
              minHeight:_h-150
            });
          };
        };
         if(sbheight<initBodyHeight){
        	$('body').css({height:sbheight});
        }
  };
  $.autoStudy(initBodyHeight);

  $(window).resize(function(){
      $.autoStudy(initBodyHeight);
  });

  /*右侧漂浮提示*/
  $('.RightTool .user,.sbarItem').tipBox({
    direction: 'left',
    skin: 'grayBlackLeft',
    offset: 0,
    textAlign: 'center'

  }); 

  var $backToTopFun = function() {
        var st = $(document).scrollTop(), winh = $(window).height();
        (st > 0)? $(".RightTool .Top").show(): $(".RightTool .Top").hide();
    };
  $(window).bind("scroll", $backToTopFun);
  $(function() { $backToTopFun(); });

  $(".RightTool .Top").click(function() {
    $("html, body").animate({ scrollTop: 0 },300);
  });

  /*word高度*/
  $.flashH = function() {
    var isFlash = $('body').find('.flashBox').text();
    if(isFlash) {
      var wh = $(window).height();
      var fh = wh - 230;
      $('.flashBox').css('height',fh + 'px');
    };
  };
  $.flashH();
  /*右侧悬浮高度自适应*/
  $.rFloat = function() {
    var wh;
    if(mob == 'true') {
      wh = getViewRect().height;
    } else {
      wh = $(window).height();
    };
    var rH = wh - 150;
    if(rH < 470) {
      $('.RightTool').css('height','470px');
      $('.bottomTool').addClass('bmToolRelative');
    } else {
      $('.RightTool').css('height',rH + 'px');
      $('.bottomTool').removeClass('bmToolRelative');
    };
  };
  $.rFloat();
  
  // 下拉选
  $.chosePos = function(){
      $('body:not(.popBody)').find('.chosen-container').each(function(){
          var wh = $(window).height();
          var choseTop = $(this).offset();
          var choseH = $(this).find('.chosen-drop').height();
          //console.log(choseH,wh,choseTop.top);
          if(choseH > wh-choseTop.top){        
             $(this).find('.chosen-drop').addClass('chosedropAbove');
             $(this).find('.chosen-single').addClass('btm');
          }
      })
      
  };
  $.chosePos();
  
  /*页面底部固定*/
  $.footerBom = function(){
	  $('.layoutWrap').each(function(){
		  var conh,wh;
		  conh = $(this).find('.layoutInner').height(); 
		  wh = $(window).height();
		  //console.log(conh,wh);
		  if(conh < wh){
			  if($(this).find('.fixed').is(':visible')){
				  $(this).find('.mainOnly').addClass('mb160');
			  }else{
				  $(this).find('.mainOnly, .mainSignRec').addClass('mb50');
			  }
			  $(this).parents('html').addClass('emptyBom');
		  }else{
			  $(this).parents('html').removeClass('emptyBom');
		  }
	  })
  };
  $.footerBom();

  $(window).resize(function() {
    $.flashH();
    $.rFloat();
    $('#_my97DP').hide();
    $('.edit-area').hide();
    $.chosePos();
    $.footerBom();
  }); 
  $(window).scroll(function() {
    $('#_my97DP').hide();
    $('.edit-area').hide();
    $.footerBom();
    // $.rfCon();
  });  

});



































/*tip提示*/
  $.fn.tipBox = function(opt) {
    var settings = $.extend({
      direction: 'left',
      offset: 15,
      skin: 'grayDarkLeft',
      textAlign: 'right'
    },opt);
    var $this = $(this);
    var tipBox = {
      init: function() {
        $this.on('mouseenter',this.mouseenter);
        $this.on('mouseleave',this.mouseleave);
      },
      mouseenter: function() {
        var w = $(this).width();
        var h = $(this).height();
        var tipHtml = $(this).find('.tipHtml').html();
        if(tipHtml) {
          var tipbox = '';
          tipbox += '<div class="tipBox ';
          tipbox += settings.skin;
          tipbox += '"><div class="prompt"><div class="tipcon">';
          tipbox += tipHtml;
          tipbox += '</div><div class="point"></div></div></div>';
          $(this).append(tipbox);
          var tipH = $(this).find('.tipBox').height();
          var tipTop = parseInt((h - tipH) / 2);
          var tipW = $(this).find('.tipBox').width();
          var tipLeft = parseInt((w - tipW) / 2);

          //滚动条
          if($('.classHover').length > 0){
            $(this).find('.prompt').addClass('scrolbarStyle').mCustomScrollbar({
              scrollInertia:200,
              theme:'dark-2',
              update:true
            });
          };
          
          if($(this).find('.tipcon').height() > 150){
             $(this).find('.prompt').addClass('hasscrolbarS');
          };

          if(settings.direction == 'left') {
            $(this).find('.tipBox').css({right:w + settings.offset + 'px',top:tipTop + 'px'});
          }else if(settings.direction == 'right') {
            $(this).find('.tipBox').css({left:w + settings.offset + 'px',top:tipTop + 'px'});
            $(this).find('.tipBox').find('.point').css('display','none');
          } else if(settings.direction == 'bottom') {
            if (settings.textAlign == 'center') {
              $(this).find('.tipBox').css({left:tipLeft + 'px',top:h + settings.offset});
              $(this).find('.tipBox').find('.point').css('left',(tipW/2-5) + 'px');
            } else {
              $(this).find('.tipBox').css({right:'0px',top:h + settings.offset});
              $(this).find('.tipBox').find('.point').css('right',(w/2-5) + 'px');
            };          
          } else if(settings.direction == 'top') {
            if (settings.textAlign == 'center') {
              $(this).find('.tipBox').css({left:tipLeft + 'px',bottom:h + settings.offset});
              $(this).find('.tipBox').find('.point').css('left',(tipW/2-5) + 'px');
            } else {
              $(this).find('.tipBox').css({right:'0px',bottom:h + settings.offset});
              $(this).find('.tipBox').find('.point').css('right',(w/2-5) + 'px');
            };                      
          };          
        };
      },
      mouseleave: function() {
        $(this).find('.tipBox').remove();       
      }
    };
    tipBox.init();
    return tipBox;
  };

  /* 模拟单选框 */ 
  $('body').delegate('.radio-box', 'click', function(){
    var el = $(this),
      _name=filterNameAttr(el.find('input:radio').attr('name'));
      
    if(el.find('.radio').is('.disabled')){
      return ;
    }
    if(!el.find('input:radio')[0].checked){    
      $('input:radio[name="' +_name + '"]').parent().removeClass('fa-dot-circle-o').removeClass('c_58abe1').addClass('fa-circle-o c_ccc');
      $('input:radio[name="' +_name + '"]').prop('checked', false);
      el.find('input:radio').parent().addClass('fa-dot-circle-o c_58abe1').removeClass('fa-circle-o').removeClass('c_ccc');
      el.find('input:radio').prop('checked', true).trigger('change');
    } 
  });

// 复选框批量删除
  $.pldel = function() {
    $('.tableBoxCon').each(function() {
        var len = $(this).find('.checkbox:checked').length;
        if(len>0) {
          $(this).find('.seaTjBtns').find('.delpl').addClass('active');  
        } else {
          $(this).find('.seaTjBtns').find('.delpl').removeClass('active');  
        };
    });
  };
  /* 模拟复选框 */ 
  $.checkbox = function(container){
        $('body').delegate(':checkbox', 'change', function(){
            var bool = this.checked;
            if(bool){
              $(this).next().addClass('checked');
            } else {
              $(this).next().removeClass('checked');
            }
          });
          $('body').delegate('.j-checkbox-i', 'click', function(){
            var el = $(this);
            if(el.is('.disabled') || el.is('.disabled-checked')){
              return ;
            }
            if(el.is('.j-checked-all-i')){
              if(el.prev()[0].checked) {
                el.parents(container).find('.label-checkbox').each(function() {
                  $(this).children('.checkbox-i').removeClass('checked');
                  $(this).children('.checkbox').prop('checked',false).trigger('change');
                });
              } else {
                el.parents(container).find('.label-checkbox').each(function() {
                  $(this).children('.checkbox-i').addClass('checked');
                  $(this).children('.checkbox').prop('checked',true).trigger('change');
                });       
              };      
              $.pldel();
              return;
            }
            if(el.prev()[0].checked){
              el.removeClass('checked');      
              el.prev().prop('checked', false).trigger('change').trigger('spsClick');
              el.parents(container).find('.j-checked-all-i').removeClass('checked');      
              el.parents(container).find('.j-checked-all-i').prev().prop('checked', false).trigger('change');
            } else {
              el.addClass('checked');         
              el.prev().prop('checked', true).trigger('change').trigger('spsClick');
              var anum = el.parents(container).find('.checkbox-i').length;
              var cnum = el.parents(container).find('.checkbox-i.checked').length;
              if (window.console) { console.log(anum,cnum); }
              if(anum - cnum == 1) {
                el.parents(container).find('.j-checked-all-i').addClass('checked');         
                el.parents(container).find('.j-checked-all-i').prev().prop('checked', true).trigger('change');
              };
            };
            $.pldel();
          });
      };

      // 从备课导入全选
  $.checkbox('.table, .import-page .r-con, .JS-checkBlock');


  






























//网页全屏代码
function requestFullScreen(){
     //ie10以下全屏模式
     if(window.ActiveXObject){  
         var wscript = new ActiveXObject("WScript.Shell");  
         if(wscript){  
             wscript.SendKeys("{F11}");  
             return;
         }else{
             console.log('用户拒接或者加载插件失败');
         }  
     };  
     // 判断各种浏览器，找到正确的方法
     function fulls(obj) {
         if(obj.requestFullscreen){
             obj.requestFullscreen();
         }else if(obj.mozRequestFullScreen){
             obj.mozRequestFullScreen();
         }else if(obj.webkitRequestFullscreen){
             obj.webkitRequestFullscreen();
         }else if(obj.msRequestFullscreen){
             obj.msRequestFullscreen();
         }else{
           console.log('该浏览器不支持全屏，请升级最新版本');
         }
     };
     //启动全屏
     var winh=window.screen.height;
     //$('html').height(winh+'px');
     fulls($('html').get(0)); // 整个网页
    //fullScreen(document.getElementById("videoElement")); //某个页面元素
};
//退出全屏代码
function exitScreen(){
    //ie10以下全屏模式
    if(window.ActiveXObject){  
        var wscript = new ActiveXObject("WScript.Shell");  
        if(wscript){  
            wscript.SendKeys("{F11}");  
            return;
        }
    }; 
  
    // 判断浏览器种类
    function exit() {
      if(document.exitFullscreen){
        document.exitFullscreen();
      }else if(document.mozCancelFullScreen){
        document.mozCancelFullScreen();
      }else if(document.webkitExitFullscreen){
        document.webkitExitFullscreen();
      }else if(document.msExitFullscreen){
        document.msExitFullscreen();
      }
    };
    // 退出全屏模式!
    exit();
};
//判断是否全屏
//function isFull(){
//  var explorer = window.navigator.userAgent.toLowerCase();
//  var full;
//  if(explorer.indexOf('chrome')>0){//chrome
//      if (document.body.scrollHeight == window.screen.height && document.body.scrollWidth == window.screen.width) {
//          full=true;
//      } else {
//          full=false;
//      }
//  }else{//IE 9+  fireFox
//      if (window.outerHeight == window.screen.height && window.outerWidth == window.screen.width) {
//          full=true;
//      } else {
//          full=false;
//      }
//  };
//    
//  return full;
//}
//检查是否全屏
function checkFull() {
//      var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
//      //to fix : false || undefined == undefined
//      if (isFull === undefined) {isFull = false;}
//      return isFull;
        var explorer = window.navigator.userAgent.toLowerCase();
	    var full;
        if(explorer.indexOf('chrome')>0){//chrome
        	console.log('chrome'+document.body.scrollHeight +'--'+window.screen.height);
	        if ( window.screen.height - document.body.clientHeight < 21  || window.screen.height - document.documentElement.clientHeight < 21) {
		            full=true;
		        } else {
		            full=false;
		        }
		    }else{//IE 9+  fireFox
		        if (window.outerHeight == window.screen.height && window.outerWidth == window.screen.width) {
		            full=true;
		        } else {
		            full=false;
		        }
          };
	    return full;
}
//签到页面

var module1=(function(mod,$){
    mod.m1=function(){
        //签到页面-共有-左上侧下拉框 
        $('.sign-head .nav').hover(function(){
            $(this).addClass('cur');
            $('.sign-head .nav-bar').show();
        },function(){
            $(this).removeClass('cur');
            $('.sign-head .nav-bar').hide();
        });
        //添加title
        $('.sign-head .nav-bar').on('mouseenter','.list',function(){
            $(this).addClass('hover').siblings().removeClass('hover');
        });
       //签到页面-共有-提示框
      /*  $.each($('.sign-head .nav-bar .list a'),function(){
            var txt=$(this).text();
            $(this).attr('title',txt);
        }) */     
    };
    mod.screen=function(){//全屏事件
         $('.fullscreen').click(function(){
//           var screen=isFull();
             console.log(checkFull());
             if(checkFull()){
                 exitScreen();
             }else{
                 requestFullScreen();
             }
         });
    };
    /*  //后台套数据--先注释
    mod.showPicture=function(){//图片依次出现
        var len=$('.signb-left .list .img img').length,
            step=0;
        //url的第一个数组传已提交人数的数据，第二个数组传未提交人数的数据
        var json1={
            url:[
                  [
                    'images/q1.png','images/q1.png'
                  ],
                  [
                    'images/q1.png','images/q1.png'
                  ]
                ],
            name:[
                  [
                    '成立云','rr'
                  ],
                  [
                    '未提交','r未提交'
                  ]
                ]
        };
        var len2=json1.url.length;
        
        function ingAdd(index){
            var m,i=-1,timer=null;
            clearInterval(timer);
            timer=setInterval(add,100);
            function add(){
                i+=1;
                step+=1;
                if(i>=len){
                    i=len;
                    step=len;
                    clearInterval(timer);
                    for(m=0;m<len2;m++){
                        $('.signb-left .list .img img').eq(m).get(0).src=json1.url[index][m];
                        $('.signb-left .list .name').eq(m).text(json1.name[index][m]);
                        $('.signb-left .list .img').eq(m).addClass('rotate');
                    };
                };
                $('.signb-left .img').eq(i).show();
            };
        };

        ingAdd(0);
        
        //判断走完再切换
        $('.testb-body .tw-btn .btn').click(function(){
            if(step==len){
                $('.signb-left .img').hide();
                $('.signb-left .list .img img').attr('src','images/info-user-man.png');
                $('.signb-left .list .name').text('');

                $(this).addClass('cur').siblings().removeClass('cur');
                $('.signb-left .list .img').removeClass('rotate');
               
                var index=$(this).index();
                ingAdd(index);
            }else{
                return false;
            }
        });

    };
    */
    mod.autoHeight=function(obj,h){//自动计算高度

      var _h=parseInt(document.documentElement.clientHeight)-h;
      obj.height(_h+'px');

    };

    mod.fullScreenClickH = function(a,b) {
      // 全屏与正常视窗下 内容区域高度
      var screenH = window.screen.height;//全屏高度
      var wh = document.documentElement.clientHeight;//窗口高度
      console.log('abcabc',wh,screenH);
      $('.fullscreen').click(function(){
//    	   alert(checkFull());
           if(!checkFull()){
               module1.autoHeight(a,b);             
           }
      });
       
      window.onresize = function() {	        
	       if(!checkFull()){	       	  
	           module1.autoHeight(a,b);   
	          
	       }else{
               module1.autoHeight(a,b); 
               
           }
      }      
    };

    return mod;
})(window.module1||{},jQuery)

module1.m1();
module1.screen();


//简易jq插件 ，实现大屏幕移动上去显示学员详细信息，后端可给当前元素添加唯一标识，ajax请求获取data.或者渲染页面时就添加全部元素，隐藏不显示内容。
$.fn.blacktip = function(opt) {
	var option = {
		blackgroundColor: "#353535",
		direction: 'left',
		offset: 10,
		data:{}
	}
	var opt = $.extend(true, opt, option);
	function postion(ev, obj) {
		this.o=obj;
		this._x = obj.offset().left;
		this._y = obj.offset().top;
		this.cx = ev.clientX;
		this.cy = ev.clientY;
	}
	postion.prototype.htmlText = function() {		
		opt.data._name= this.o.find(opt.nameclass).html();
		opt.data._idnum=this.o.find(opt.noclass).html()||'暂无学号';
		opt.data._class=this.o.find(opt.banclass).html()||'暂无班级';
	}
	postion.prototype.render = function() {
		this._html = '<div class="blacktip">' +
			'<div class="blacktip_content lh30">' +
			'<div class="balcktiptext">' +
			'<div class="mb10"><span>' + opt.data._name + '</span> <span class="ml16">' + opt.data._idnum + '</span> </div>' +
			'<div class="c_c0c0c0"><span>' + opt.data._class + '</span></div>' +
			' </div>' +
			' <div class="balcktiparrow"></div>' +
			'</div>' +
			'</div>';
		$('body').append(this._html);
	}
	postion.prototype.laoy = function() {
		if(this._x < 100 || this._y < 100) {
			$('body').find('.blacktip').css({
				'position': 'absolute',
				'left': this._x + 180,
				'top': this._y,
				'color': '#fff',
				'background': opt.blackgroundColor,
				'padding': '15px 20px',
				'font-size': '24px'
			})
			$('body').find('.balcktiparrow').addClass('leftarrow');
		} else if(this._y < 100) {
			$('body').find('.blacktip').css({
				'position': 'absolute',
				'left': this._x + 100,
				'top': this._y,
				'color': '#fff',
				'background': this.blackgroundColor,
				'padding': '15px 20px',
				'font-size': '24px'
			})
			$('body').find('.balcktiparrow').addClass('toparrow');
		} else {
			$('body').find('.blacktip').css({
				'position': 'absolute',
				'display': 'block',
				'left': this._x,
				'top': this._y - 70,
				'color': '#fff',
				'background': opt.blackgroundColor,
				'padding': '15px 20px',
				'font-size': '24px'
			})
			$('body').find('.balcktiparrow').addClass('downarrow');
		}

		this.outW = $('body').find('.balcktiptext').width();
		$('body').find('.blacktip').css({
			'margin-left': -this.outW / 2 + 30,
			'z-index':'999'
		})
		$('body').find('.c_c0c0c0').css({
			'color': '#c0c0c0'
		})
	}
	$(this).on('mouseenter',function(ev) {
		
		var tip = new postion(ev, $(this));
		tip.htmlText();
		if(opt.data._name!=''){		
			tip.render();
		    tip.laoy();
		}		
	})
	$(this).on('mouseleave',function(ev) {
		var ev= ev || event;	      
		if(ev.clientY-$(this).offset().top>39 || ev.clientY-$(this).offset().top<10){
			$('body').find('.blacktip').remove();
		}		
	})
	$('body').on('mouseleave','.blacktip',function(ev) {		
			$('body').find('.blacktip').remove();	
	})
};

//页面元素监听
;(function($, h, c) {
    var a = $([]),
        e = $.resize = $.extend($.resize, {}),
        i,
        k = "setTimeout",
        j = "resize",
        d = j + "-special-event",
        b = "delay",
        f = "throttleWindow";
    e[b] = 250;
    e[f] = true;
    $.event.special[j] = {
        setup: function() {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.add(l);
            $.data(this, d, {
                w: l.width(),
                h: l.height()
            });
            if (a.length === 1) {
                g();
            }
        },
        teardown: function() {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.not(l);
            l.removeData(d);
            if (!a.length) {
                clearTimeout(i);
            }
        },
        add: function(l) {
            if (!e[f] && this[k]) {
                return false;
            }
            var n;
            function m(s, o, p) {
                var q = $(this),
                    r = $.data(this, d);
                r.w = o !== c ? o: q.width();
                r.h = p !== c ? p: q.height();
                n.apply(this, arguments);
            }
            if ($.isFunction(l)) {
                n = l;
                return m;
            } else {
                n = l.handler;
                l.handler = m;
            }
        }
    };
    function g() {
        i = h[k](function() {
                a.each(function() {
                    var n = $(this),
                        m = n.width(),
                        l = n.height(),
                        o = $.data(this, d);
                    if (m !== o.w || l !== o.h) {
                        n.trigger(j, [o.w = m, o.h = l]);
                    }
                });
                g();
            },
            e[b]);
    }
})(jQuery, this);

//ie11 全屏
$(".fullscreen").on("click",function(){
	$(".sign").css("width",$(window).width());
});
            $(window).resize(function () {       
            	$(".sign").css("width",$(window).width());
            });
 //ie11 全屏结束
$('body, .layoutWrap, .layoutInner ,.mainOnly ,.mainSignRec').resize(function(){
	if (window.console) { console.log('121') };
	$.footerBom();
});

