(function($) {
	var drag = {
		option: {
			$divMove: $(".con_right_main .fz_group_dl_dd li"), //鼠标可拖拽区域
			$img: $('body').find("img"),
			mX: 0,
			mY: 0, //定义鼠标X轴Y轴	
			dX: 0,
			dY: 0, //定义div左、上位置
			drag: false,
			isDown: false, //mousedown标记   
			notGrouped: false //此处用来唯一表示是未分组的元素进行拖拽
		},
		stopDefalut: function(evt) {
			var e = evt || window.event;
			if(e.preventDefault /*()*/ ) {
				e.preventDefault();
			} else {
				e.returnValue = false;
			}
			if(document.attachEvent) { //ie的事件监听，拖拽div时禁止选中内容，firefox与chrome已在css中设置过-moz-user-select: none; -webkit-user-select: none;
				$img[0].attachEvent('onselectstart', function() {
					return false;
				});
			}
		},
		start: function(event) {
			that = $(this).parents("li");
			var dd = $(this).parents(".fz_group_dl");
			st1 = $(window).scrollTop();
			//判断拖拽前是未分组 还是已经分组小组
			dd.parent().attr("class") == 'con_right_main' ? drag.option.notGrouped = true : drag.option.notGrouped = false;
			drag.option.mX = event.clientX;
			drag.option.mY = event.clientY;
			drag.option.disX = event.clientX - that[0].offsetLeft;
			drag.option.disY = event.clientY - that[0].offsetTop;
			oleft = that[0].offsetParent;
			drag.stopDefalut(event);
			that.css({
				"position": "absolute",
				"cursor": "move",
				"z-index": '999'
			})
			that.css({
				"left": that[0].offsetLeft + "px",
				"top": that[0].offsetTop + "px"
			})
			drag.option.isDown = true; //鼠标拖拽启动   
			$("body").find(".fz_group_dl_dd").css("border", "1px dashed #208AF8");

			try {
				if(pre_type == 2) { //右拖拽左 无 蓝色边框
					$("body").find(".cont_right .fz_group_dl_dd").css("border", "");
				}
			} catch(e) {
				//TODO handle the exception
			}
			dd.children("dd").css("border", "");
			$("body").find(".fz_group_dl").each(function(i) {
				if($(this).children("dd").children("li").length == 0) {
					$(this).children("dd").css("height", "120px");
				}
			})
			$(document).bind("mousemove", drag.move);
			$(document).bind("mouseup", drag.stop);
		},
		move: function(event) {
			var event = event || window.event;
			var x = event.clientX; //鼠标滑动时的X轴
			var y = event.clientY; //鼠标滑动时的Y轴 
			st2 = $(window).scrollTop();
			if(Math.abs(x - drag.option.mX) > 5 && drag.option.isDown) {
				drag.option.drag = true;
				that.find(".showmes").remove();
				that.find("img").css("border", "");
			}
			if(drag.option.isDown) {
				that.css({
					"left": x - drag.option.disX,
					"top": y - drag.option.disY
				}); //div动态位置赋值
			}
		},
		stop: function(event) {
			var event = event || window.event;
			drag.option.isDown = false; //鼠标拖拽结束           
			var nx = event.clientX; //鼠标停止时的X轴
			var ny = event.clientY; //鼠标停止时的Y轴 
			var $divApend = $("body").find(".fz_group_dl"); //每个可以拖拽进入的小组容器
			for(var i = 0; i < $divApend.length; i++) {
				//如果元素的落点在容器范围内，则把该拖拽元素添加到该容器              
				var w = $divApend[i].offsetWidth + parseInt($divApend.eq(i).css('padding-left'));
				var h = $divApend[i].offsetHeight + parseInt($divApend.eq(i).css('padding-top'));
				var m = parseInt($divApend[i].offsetLeft + drag.option.disX);
				var n = parseInt($divApend[i].offsetTop + drag.option.disY);
				var jx = parseInt(nx - m);
				var jy = parseInt(ny - n + st2 - st1);
				var dataSelf = $divApend.eq(i).attr("data-self");
				//计算拖拽范围                
				if(jx > 0 && jy < h && jx > 0 && jy > 0 && jx < w && drag.option.drag == true) {
					//当判断是右边未分组的元素进行拖拽，并却还是拖拽到当前未分组的情况，不处理。
					if($divApend.eq(i).parent().attr('class') == 'con_right_main' && drag.option.notGrouped) {
						that.css({
							"position": "",
							"left": "",
							"top": "",
							"cursor": ""
						});
						$("body").find(".fz_group_dl_dd").css("border", "");
					} else {
						//                    		        成功的拖拽。可做根据这做数据交互处理
						//              				var dragEndName = $divApend.eq(i).children('dt').children('span').html();
						//              				var dragEndId = $divApend.eq(i).children('dt').children('.groupId').html();//拖拽后的组或班级的id
						//              				var dragEndType = $divApend.eq(i).children('dt').children('.groupType').html();//拖拽后类型 1:组,2:班级               				
						//          					$('#userId').val(studentId);
						//          					$('#beforeTargetId').val(pre_id);
						//          					$('#afterTargetId').val(dragEndId);
						//          					$('#beforeTargetType').val(pre_type);
						//          					$('#afterTargetType').val(dragEndType);           					
						//								ajaxSubmit({
						//									url:_basePath + 'classroomstudent/dragStudent.do',
						//									form:"myForm",
						//									onSuccess:function() {
						//										ajaxSearch();
						//									}
						//								});                      
						$divApend.eq(i).children("dd").append(that[0]);
						$("body").find(".fz_group_dl_dd").css("border", "");
					}
				} else {
					that.css({
						"position": "",
						"left": "",
						"top": "",
						"cursor": ""
					});
					$("body").find(".fz_group_dl_dd").css("border", "");
				}
			}
			$(document).unbind("mousemove", drag.move);
			$(document).unbind("mouseup", drag.stop);
		}
	}
	drag.option.$img.bind("mousedown", drag.start);
})(jQuery);