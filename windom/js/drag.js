(function($) {
	var $divMove = $(".fz_group_dl_dd li"); //鼠标可拖拽区域
	var $img = $('body').find("img");
	var mX = 0,
		mY = 0; //定义鼠标X轴Y轴	
	var dX = 0,
		dY = 0; //定义div左、上位置		
	var isDown = false; //mousedown标记

	if(document.attachEvent) { //ie的事件监听，拖拽div时禁止选中内容，firefox与chrome已在css中设置过-moz-user-select: none; -webkit-user-select: none;
		$img[0].attachEvent('onselectstart', function() {
			return false;
		});
	}
	$('body').on("mousedown", 'img', function(event) {
		stopDefalut(event)
		_this = $(this);
		start(event);
	})

	function stopDefalut(evt) {
		var e = evt || window.event;
		if(e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	}

	function start(event) {
		var that = _this.parents("li");
		var dd = _this.parents(".fz_group_dl");
		var studentId = _this.parent().parent().find('.studentId').html(); //当前点击学生id
		var notGrouped = false; //此处用来唯一表示是未分组的元素进行拖拽
		dd.attr('data-self', 'yes');
		//拖拽前小组名称
		var pre_name = dd.children('dt').children('span').html();
		var pre_id = dd.children('dt').children('.groupId').html(); //当前点击学生的组或班的id
		var pre_type = dd.children('dt').children('.groupType').html(); //拖拽前类型 1:组,2:班级
		console.log("start: " + pre_type);

		//判断拖拽前是未分组 还是已经分组小组
		var pre_team = dd.parent().attr("class");
		if(pre_team == 'con_right_main') {
			notGrouped = true;
		} else {
			notGrouped = false;
		}

		st1 = $(window).scrollTop();
		var event = event || window.event;
		var drag = false;
		mX = event.clientX;
		mY = event.clientY;
		disX = event.clientX - that[0].offsetLeft;
		disY = event.clientY - that[0].offsetTop;
		oleft = that[0].offsetParent;
		stopDefalut(event);
		that.css({
			"position": "absolute",
			"cursor": "move",
			"z-index": "9999"
		});
		that.css({
			"left": that[0].offsetLeft + "px",
			"top": that[0].offsetTop + "px"
		});

		isDown = true; //鼠标拖拽启动    
		$("body").find(".fz_group_dl_dd").css("border", "1px dashed #208AF8");
		console.log(that.parents('.cont_right'));
		if(pre_type == 2) { //右拖拽左 无 蓝色边框
			$("body").find(".cont_right .fz_group_dl_dd").css("border", "");
		}
		dd.children("dd").css("border", "");
		$("body").find(".fz_group_dl").each(function(i) {
			if($(this).children("dd").children("li").length == 0) {
				$(this).children("dd").css("min-height", "120px");
			}
		});
		$(document).bind("mousemove", move);
		$(document).bind("mouseup", stop);

		function move(event) {
			var scrollY = 0;
			var event = event || window.event;
			var x = event.clientX; //鼠标滑动时的X轴
			var y = event.clientY; //鼠标滑动时的Y轴
			var _winy=window.screenY;
			st2 = $(window).scrollTop();
			if(Math.abs(x - mX) > 5 && isDown) {
				drag = true;
				that.find(".showmes").remove();
				that.find("img").css("border", "");
			}
			
			if(isDown) {
				that.css({
					"left": x - disX,
					"top": y - disY + st2 - st1
				}); //div动态位置赋值
			}
			if(_winy-y<100&&$(window).scrollTop()<$('body').outerHeight()-500){
				$(window).scrollTop(st2 +100);
			}
			
			if(y<100 ){
				$(window).scrollTop(st2 -100);
			}
		};

		function stop(event) {
			var event = event || window.event;
			isDown = false; //鼠标拖拽结束           
			var nx = event.clientX; //鼠标停止时的X轴
			var ny = event.clientY; //鼠标停止时的Y轴 
			var $divApend = $("body").find(".fz_group_dl"); //每个可以拖拽进入的小组容器
			for(var i = 0; i < $divApend.length; i++) {
				//如果元素的落点在容器范围内，则把该拖拽元素添加到该容器              
				var w = $divApend[i].offsetWidth + parseInt($divApend.eq(i).css('padding-left'));
				var h = $divApend[i].offsetHeight + parseInt($divApend.eq(i).css('padding-top'));
				var m = parseInt($divApend[i].offsetLeft + disX);
				var n = parseInt($divApend[i].offsetTop + disY);
				var jx = parseInt(nx - m);
				var jy = parseInt(ny - n + st2 - st1);
				var dataSelf = $divApend.eq(i).attr("data-self");
				//计算拖拽范围
				console.log(jx + "--" + jy + "===" + w + "--" + h);
				if(jx > 0 && jy < h && jx > 0 && jy > 0 && jx < w && drag == true && dataSelf != "yes") {
					console.log("进入可以拖拽范围");
					//当判断是右边未分组的元素进行拖拽，并却还是拖拽到当前未分组的情况，不处理。
					if($divApend.eq(i).parent().attr('class') == 'con_right_main' && notGrouped) {
						that.css({
							"position": "",
							"left": "",
							"top": "",
							"cursor": ""
						});
						$("body").find(".fz_group_dl_dd").css("border", "");
					} else {
						//成功的拖拽。可做根据这做数据交互处理
						var dragEndName = $divApend.eq(i).children('dt').children('span').html();
						var dragEndId = $divApend.eq(i).children('dt').children('.groupId').html(); //拖拽后的组或班级的id
						var dragEndType = $divApend.eq(i).children('dt').children('.groupType').html(); //拖拽后类型 1:组,2:班级               				
						console.log("start->:" + pre_type + " stop-->: " + dragEndType);
						console.log("studentId:" + studentId);
						console.log("pre_id:" + pre_id);
						console.log("dragEndId" + dragEndId);

						$('#userId').val(studentId);
						$('#beforeTargetId').val(pre_id);
						$('#afterTargetId').val(dragEndId);
						$('#beforeTargetType').val(pre_type);
						$('#afterTargetType').val(dragEndType);

//						ajaxSubmit({
//							url: _basePath + 'classroomstudent/dragStudent.do',
//							form: "myForm",
//							onSuccess: function() {
//								ajaxSearch();
//							}
//						});
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
			dd.attr('data-self', '');
			notGrouped = false;
			$(document).unbind("mousemove", move);
			$(document).unbind("mouseup", stop);
		}
	}
})(jQuery);