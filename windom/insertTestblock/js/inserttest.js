$(function(){
	// 注：LMS的视频插入测试 没有单选复选js,因为公共js里已加

    var test_index = 0;
	/*TAB控制器*/
    $.tabTest=function(tabnav,tabcon,navh) {
        $(tabnav + ' li').click(function() {
            var index=$(this).index();
            $(tabnav + ' li').removeClass(navh);
            $(this).addClass(navh);
            $(tabcon).hide();
            $(tabcon).eq(index).show();

            var tabscroll = $(tabcon).find('.tabscroll').text();
            if(tabscroll) {
              $(tabcon).eq(index).find('.tabscroll').mCustomScrollbar({
		        scrollInertia:200,
		        theme:'dark-2'
		      });
            };
            var tabselect = $(tabcon).find('.select-show,.select-default').text();
            if(tabselect) {
                $(tabcon).find('.select-hide').chosen({disable_search:true});
            };
            // 切换到单选和多选的测试点
            if( $('.testtypeCon-single').is(':visible') ) {
            	$('body').find('.testdotslist').hide();
			    $('body').find('.single-testdots').show();
			}else {
				$('body').find('.testdotslist').hide();
				$('body').find('.multi-testdots').show();
			}
			
			test_index = index;
        });
    };
    // 选题型 切换
    $.tabTest('.testtypeTab','.testypeCon','cur');

    /*推荐提示*/
	$.testrecTips = function(rectxt,rectime,recState) {
		var recText;
		if(recState == 'success') {
			recText = '<div class="recTipBox itestTipBox"><span class="tspic"><i class="fa fa-check-circle"></i>' + rectxt + '！</span></div>'; 
		} else if(recState == 'fail') {
			recText = '<div class="recTipBox itestTipBox"><span class="tspic"><i class="fa fa-times-circle"></i>' + rectxt + '！</span></div>'; 
		} else {
			recText = '<div class="recTipBox itestTipBox"><span class="tspic">' + rectxt + '！</span></div>'; 
		};
		$('body').append(recText);
		var recTimer = setTimeout(function () {
            clearTimeout(recTimer);
            $('.recTipBox').remove();
        }, rectime*1000);
	};

	var creatTest = {
		_test:function(){
			var testOptHtml, s, ord, optArea;
			$('.testypeCon').eq(test_index).each(function(){
				if( $('.testypeCon').eq(test_index).find('.t-list li').length >0 ) {
					s = $('.testypeCon').eq(test_index).find('.t-list li').length;
				}
			})

			if($('.testtypeCon-single').is(':visible')) {
				optArea = '<span class="radio-box fl"><i class="fl fa fa-circle-o f18 c_ccc radio" name="radio_qy"><input type="radio" name="status"></i></span>';
			}else {
				optArea = '<span class="label-checkbox"><input type="checkbox" name="checkbox" class="checkbox"><i class="checkbox-i  j-checkbox-i"></i></span>'
			}

		    var test_len = $('.testypeCon').eq(test_index).find('.t-list li').length;
		    for(var i = s; i < test_len + 1; i++) {
		        ord = i+1;
		        testOptHtml = '<li class="t-item">' + 
		                        optArea +
		                        '<div class="fl t-show" style="width:89%">' +
			                        '<label class="t-opt testoptCon" data-name="选项'+ ord +'">选项'+ ord +'</label>' +
			                        '<div class="clear"></div>' +
			                        '<div class="fr test-smtool">' +
			                            '<div class="test-smicons">' +
			                                '<a href="javascript:;" class="fl mr10 fa fa-arrow-up tc up"></a>' +
			                                '<a href="javascript:;" class="fl mr10 fa fa-arrow-down tc down"></a>' +
			                                '<a href="javascript:;" class="fl mr10 fa fa-edit tc edit"></a>' +
			                                '<a href="javascript:;" class="fl fa fa-trash-o tc del"></a>' +
			                            '</div>' +
			                        '</div>' +
			                    '</div>' +
                                '<div class="fl t-edit none">' +
                                  '<textarea type="text" nature="edit" class="multiRowText t-area mh100 fl" placeholder="">请编辑选项内容</textarea>' +
                                '</div>' +
		                    '</li>';
		    };

		    return testOptHtml;
		},
		_add: function(a) {
			$('body').on('click','.addOptBtn',function(e){
				var t_len = $(this).parent().find('.t-list li').length;
				if(t_len >= 10) {
			      alert('选项最多10个!');
			    }else {
			      $(this).parent().find('.t-list').append(a._test());
			    }
			})
			return a;
		},
		editer:function(){
            $('body').on('click','.test-smtool a',function(ev){
             	ev.stopPropagation();
             	var item_len = $(this).parents('.t-list').find('li').length;
             	var _item = $(this).closest('.t-item');
             	// console.log(item_len);
	         	//上移
	         	if ($(this).is('.up')) {
                    if (!_item.prev().length) {
                        alert('已经是第一道题');
                    } else {
                        _item.prev().before(_item);
                    }
                }
	         	//下移
	         	if ($(this).is('.down')) {
                    if (!_item.next().length) {
                        alert('已经是最后一道题');
                    } else {
                        _item.next().after(_item);
                    }
                }
	         	//编辑
	         	var isEdit;
	         	if ($(this).is('.edit')) {
	         		isEdit = _item.find('.t-show').is(':visible');
                    if(isEdit){
                    	_item.find('.t-show').hide();
                    	_item.find('.t-edit').show().find('.t-area').focus();
                    }else {
                    	_item.find('.t-show').show();
                    	_item.find('.t-edit').hide();
                    }
                }
         	    //删除
         	    var r;
         		if($(this).is('.del')) {
         		    r = confirm("确定要删除吗？");
         			if(r == true) {
         				if(item_len > 2) {
	         				_item.remove();
	         			}else {
		         			alert('不可删除，至少留2个选项！');
		         		}
         			}
         		}
            })
		},
		init: function(){
			var _this = this;
			_this._add(_this);
			_this.editer();
		}
	}
	creatTest.init();

	/* 修改选项后赋值 */
    $(document).on('click',function(e){
		if($(e.target).hasClass('t-opt')||$(e.target).attr('nature')=='edit'){ //修改选项
		   $(e.target).focus();
		   return false;
		}else {
		   $('.t-edit').each(function(index, element) {
		       if($(this).is(':visible')){
			     $(this).hide().prev('.t-show').show().find('.t-opt').text($(this).find('.t-area').val());
			     $(this).hide().prev('.t-show').show().find('.t-opt').attr('title',$(this).find('.t-area').val());
			     $(this).hide().prev('.t-show').show().find('.t-opt').removeClass('dfh');
			     $.textctrl();
			   };
           });
		};
	});

});