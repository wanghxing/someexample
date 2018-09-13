$(function(){
	//加载菜单
	$.loadMenu = function() {
		var menuInitArr = [];
		var menuHtml = '';
		//获取目录数据
		/*$.ajax({
		  url:'',
		  dataType:'jsonp',
		  data:'',
		  jsonp:"callback",
		  success:function(data) {
			menuArr = data;
		  },
		   error:function(msg) {
		
		   }      
		});*/
	
		function appendArr(id) {
			$.each(menuArr,function(i,v) {
				if(menuArr[i].parent == id) {
					menuInitArr.push(menuArr[i]);
				};
			});			
		};
		appendArr(0);
		function appendItems(Arr) {
			if(Arr.length>0) {
				$.each(Arr,function(i,v) {
					$.each(menuArr,function(index,value) {
						if(menuArr[index].parent == Arr[i].id) {
							Arr[i].items.push(menuArr[index]);
							appendItems(Arr[i].items);
						};
					});
				});				
			}			
		};
		appendItems(menuInitArr);
		
		function getItems(arr) {
			if(arr.length) {
				$.each(arr,function(i,v) {
					var url = arr[i].url ? arr[i].url : '#';
					var levelDiv,levelTit;
					if(arr[i].level == 1) {
						levelDiv = 'twoLevel2';
						levelTit = 'twoTit';
					} else if(arr[i].level == 2) {
						levelDiv = 'threeLevel3';
						levelTit = 'threeTit';
					} else if(arr[i].level == 3) {
						levelDiv = 'fourLevel4';
						levelTit = 'fourTit';
					} else if(arr[i].level == 4) {
						levelDiv = 'fiveLevel5';
						levelTit = 'fiveTit';
					}
					menuHtml += '<div class="levelDiv '+levelDiv+'"><a id="'+arr[i].id+'" parent="'+arr[i].parent+'" level="'+arr[i].level+'" href="'+url+'" class="'+levelTit+'"><span class="title">'+arr[i].title+'</span>';
					if(arr[i].items.length) {
						menuHtml += '<span class="fa fa-caret-right__down arrow-btn"></span>';
					} else {
						menuHtml += '<span class="fa arrow-c"></span>';
					};
					menuHtml += '<div class="opeMenu"><div class="opeMore">•••</div><div class="opeIist"></div></div></a>';
					getItems(arr[i].items);
					menuHtml += '</div>';
				});
			};			
		};
		$.appendHtml = function() {
			menuHtml = '';
			$.each(menuInitArr,function(i,v) {
				var oneUrl = menuInitArr[i].url ? menuInitArr[i].url : '#';
				menuHtml += '<div class="levelDiv oneLevel1 pl20 mb10"><a id="'+menuInitArr[i].id+'" parent="'+menuInitArr[i].parent+'" level="'+menuInitArr[i].level+'" href="'+oneUrl+'" class="oneTit"><span class="title">'+menuInitArr[i].title+'</span>';
				if(menuInitArr[i].items.length) {
					menuHtml += '<span class="fa fa-caret-right__down arrow-btn"></span>';
				} else {
					menuHtml += '<span class="fa arrow-c"></span>';
				};
				menuHtml += '<div class="opeMenu"><div class="opeMore">•••</div><div class="opeIist"></div></div></a>';
				getItems(menuInitArr[i].items);
				menuHtml += '</div>';
			});
			$('#leftMenu').html('').append(menuHtml);
		};
		$.appendHtml();
	};
	
	$('#leftMenu').on('mouseenter','.opeMenu',function(e) {
		var opeHtml = '';
		opeHtml += '<ul><li><div class="opeItem">添加节点</div>';
		opeHtml += '<dl>';
		opeHtml += '<dd class="addPreNode">同级节点前</dd>';
		opeHtml += '<dd class="addNextNode">同级节点后</dd>';
		opeHtml += '<dd class="addSubNode">子节点</dd>';
		opeHtml += '</dl></li>';
		opeHtml += '<li><div class="opeItem">位置移动</div>';
		opeHtml += '<dl>';
		opeHtml += '<dd class="moveUp">上移</dd>';
		opeHtml += '<dd class="moveDown">下移</dd>';
		opeHtml += '<dd class="upgrade">升级</dd>';
		opeHtml += '<dd class="downgrade">降级</dd>';
		opeHtml += '</dl></li>';
		opeHtml += '<li><div class="opeItem delNode">删除</div></li>';
		opeHtml += '<li><div class="opeItem copyNode">复制已有教师单元</div></li>';
		opeHtml += '</ul>';
		$(this).find('.opeIist').append(opeHtml);
	});
	$('#leftMenu').on('mouseleave','.opeMenu',function(e) {
		$(this).find('.opeIist').html('');
	});
	//上移
	$('#leftMenu').on('click','.moveUp',function(e) {
	  if($(this).parents('a').parent('.levelDiv').prevAll().length>1) {
		$(this).parents('a').parent('.levelDiv').prev().before($(this).parents('a').parent('.levelDiv').prop('outerHTML'));
		$(this).parents('a').parent('.levelDiv').remove();
	  };
	});
	//下移
	$('#leftMenu').on('click','.moveDown',function(e) {
	  if($(this).parents('a').parent('.levelDiv').nextAll().length>0) {
		$(this).parents('a').parent('.levelDiv').next().after($(this).parents('a').parent('.levelDiv').prop('outerHTML'));
		$(this).parents('a').parent('.levelDiv').remove();
	  };
	});
	//删除
	$('#leftMenu').on('click','.delNode',function() {
	$(this).parents('a').parent('.levelDiv').remove();
	});
	//升级
	$('#leftMenu').on('click','.upgrade',function(e) {
	var id = $(this).parents('a').attr('id');
	var parent = $(this).parents('a').attr('parent');
	var level = $(this).parents('a').attr('level');
	var ppid = $(this).parents('a').parent().parent().find('a').first().attr('parent');
	if(parent!=0) {
	  $.ajax({
		url:'',
		dataType:'jsonp',
		data:'',
		jsonp:"callback",
		success:function(data) {
		  //升级后重新加载数据
		  $.loadMenu();
		},
		 error:function(msg) {
	
		 }      
	  });
	}
	});
	//降级
	$('#leftMenu').on('click','.downgrade',function(e) {
	var id = $(this).parents('a').attr('id');
	var parent = $(this).parents('a').attr('parent');
	var level = $(this).parents('a').attr('level');
	var ppid = $(this).parents('a').parent().parent().find('a').first().attr('parent');
	if(parent!=0) {
	  $.ajax({
		url:'',
		dataType:'jsonp',
		data:'',
		jsonp:"callback",
		success:function(data) {
		  //降级后重新加载数据
		  $.loadMenu();
		},
		 error:function(msg) {
	
		 }      
	  });
	}
	});
	//同级节点前
	$('#leftMenu').on('click','.addPreNode',function(e) {
	var id = $(this).parents('a').attr('id');
	var parent = $(this).parents('a').attr('parent');
	var level = $(this).parents('a').attr('level');
	var ppid = $(this).parents('a').parent().parent().find('a').first().attr('parent');
	$(this).parents('a').parent().before('<div class="addMenu"><input parent="'+parent+'" type="text" class="newNode"></div>');
	});
	//同级节点后
	$('#leftMenu').on('click','.addNextNode',function(e) {
	var id = $(this).parents('a').attr('id');
	var parent = $(this).parents('a').attr('parent');
	var level = $(this).parents('a').attr('level');
	var ppid = $(this).parents('a').parent().parent().find('a').first().attr('parent');
	$(this).parents('a').parent().after('<div class="addMenu"><input parent="'+parent+'" type="text" class="newNode"></div>');
	});
	//子节点
	$('#leftMenu').on('click','.addSubNode',function(e) {
	var id = $(this).parents('a').attr('id');
	var parent = $(this).parents('a').attr('parent');
	var level = $(this).parents('a').attr('level');
	var ppid = $(this).parents('a').parent().parent().find('a').first().attr('parent');
	$(this).parents('a').after('<div class="addMenu"><input parent="'+id+'" type="text" class="newNode"></div>');
	});
	//输入框失去焦点提交数据
	$('body').on('blur','.newNode',function(e) {
	  var val = $(this).val();
	  var parent = $(this).attr('parent');
	  $(this).parent().remove();
	  if(val) {
		 $.ajax({
			url:'',
			dataType:'jsonp',
			data:'',
			jsonp:"callback",
			success:function(data) {
			  //添加节点后重新加载数据
			  $.loadMenu();
			},
			 error:function(msg) {
	
			 }      
		  });    
	   }
	});	
});