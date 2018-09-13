/*下拉多级*/
(function($) {
	$.fn.multiDropCheck = function(opt) {
		var defaults = {
				data:[],
				nodeSwitch:false,
				key:'id',
				parentKey:'parentId',
				initValue:'',
				initData:[],
				storage:'',
				width:0,
				callback:function(){}
			};
		var settings = $.extend(defaults,opt);
		return this.each(function(){		
		
		var $this = $(this);
		var multiDropCheck = {
			init: function() {					
				$this.on('click','.dropText',this.textClick);
				$this.on('click','.dropItem',this.itemClick);
				$this.on('change','.checkboxM',this.checkChange);
				$this.on('click','.txt',this.txtClick);
				$this.on('click','.dropBtn',this.setValue);
				this.createElement();
				this.getValue();
				this.closest();					
				
			},
			createElement:function(){
				var _elem = '<div class="dropText"><span class="txt">请选择</span><i></i></div>' +
							'<div class="dropList"><div class="dropItemCase"><ul class="dropUl"></ul></div><div class="dropSubmit"><input type="button" class="dropBtn" value="确定"></div></div>';
				$this.append(_elem);
				if(settings.width && settings.width != 0){
					$this.find('.dropList').width(settings.width)
				}
				this.appendElement();
			},
			filterJson:function(rows){
				function exists(rows, parentId){
					for(var i=0; i<rows.length; i++){
						if (rows[i][settings.key] == parentId) return true;
					}
					return false;
				}
				
				var nodes = [];
				for(var i=0; i<rows.length; i++){
					var row = rows[i];
						
					if (!exists(rows, row[settings.parentKey])){
						nodes.push({
							id:row[settings.key],
							name:row.name,
							Pid:row[settings.parentKey]
						});
					}
				}
				
				var toDo = [];
				for(var i=0; i<nodes.length; i++){
					toDo.push(nodes[i]);
				}
				
				while(toDo.length){
					var node = toDo.shift();
					for(var i=0; i<rows.length; i++){
						var row = rows[i];
						if (row[settings.parentKey] == node.id){
							var child = {id:row[settings.key],name:row.name,pid:row[settings.parentKey]};
							if (node.children){
								node.children.push(child);
							} else {
								node.children = [child];
							}
							toDo.push(child);
							
						}
						
					}
					
				}
				
				if(settings.initData){							
					var i;							
					for(i = settings.initData.length-1;i >= 0;i--) {
						
						nodes.unshift({
							id:settings.initData[i][settings.key],
							name:settings.initData[i].name,
							Pid:''
						});
					}							
					settings.initData = null;
				}
				
				return nodes
			},			
			appendElement:function(){
					var str = "";
					var arr = this.filterJson(settings.data);
					function createDom(o){
						
						for(var i=0;i<o.length;i++){
							
							var urlstr = '';
								try{
									var pid = o[i]['pid'];
									if(!pid) {
										pid = '0';
									};
									urlstr = '<li><div class="dropItem" pid= '+ pid +' rel=' + o[i]['id'] + '><input name="checkbox" type="checkbox" class="checkboxM"><span class="txt" title="' + o[i]['name'] +'">' + o[i]['name'] +'</span>' + 
											'<span class="dropArrow"><i class="fa fa-angle-down"></i></span></div>';
									str += urlstr;									
									if(o[i]['children'] != null){
										str += '<ul>'
										createDom(o[i]['children']);
										str += '</ul>';
									}
									str += '</li>';
								}catch(e){}
						}
						
					 return str;
					}
					$this.find('.dropUl').append(createDom(arr));
					Metronic.init();
				
			
			},
			textClick: function() {
				
				var _val = $this.find('.id').val();
				var _obj = $this.find('.dropItem[rel=' + _val + ']');
				var _pid = _obj.attr('pid');
				$this.find('.dropItem[rel=' + _pid + ']').next().find('ul').show();
				$this.find('.dropItem[rel=' + _pid + ']').next().find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
				var len = $(this).parent('.multiDrop').find('.dropUl li').length;
				if(len>0) {
				  $(this).parent('.multiDrop').addClass('multiOpen');
				  multiDropCheck.arrowInit();
				  $(this).parent('.multiDrop').find(".dropItemCase").mCustomScrollbar({
					  theme:"dark-2",
					  mouseWheelPixels:"200"
					 
				  });					
				};
				
				
				
			},
			itemClick: function(event) {
				var node = event.target.nodeName.toLowerCase();
				var that = $(this);
				if(settings.nodeSwitch){
					if(that.parent().find('ul').length > 0){
						event.stopPropagation();
						var isDown = that.find('i').is('.fa-angle-down');
						if(isDown) {
							that.find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
							that.next().show();
						} else {
							that.find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
							that.next().hide();
						};
						$this.find(".dropItemCase").mCustomScrollbar('update');
						return
					}else{
						
					}
				}else{
					if(node == 'i') {
						event.stopPropagation();
						var isDown = that.find('i').is('.fa-angle-down');
						if(isDown) {
							that.find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
							that.next().show();
						} else {
							that.find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
							that.next().hide();
						};
						$this.find(".dropItemCase").mCustomScrollbar('update');
					} else {
						
						
					};
				}
			},
			checkChange: function() {
				checked = $(this).is(':checked');
				var pid = $(this).parents('.dropItem').attr('pid');
				var id = $(this).parents('.dropItem').attr('rel');
				var that = $(this);
				function parentState(that,pid) {
				  var peerLen = 0;
				  var selectLen = 0;
				  var ParentId = that.parent().parent().parent().parent().parent().prev().attr('pid');
				  var ParentElement = that.parent().parent().parent().parent().parent().prev().find('.checkboxM');				  
				  if(pid || pid=='0') {
					  $this.find('.dropItem').each(function() {
						  if($(this).attr('pid') == pid) {
							  peerLen++;
							  if($(this).find('.checkboxM').is(':checked')) {
								  selectLen++;
							  };
						  };
					  });					  
					  if(selectLen==0) {
						  that.parent().parent().parent().parent().parent().prev().find('.checkboxM').removeAttr('checked').parent().removeClass('checked');
					  } else if(peerLen==selectLen) {
						  that.parent().parent().parent().parent().parent().prev().find('.checkboxM').prop('checked',true).parent().addClass('checked');
					  } else {
						  that.parent().parent().parent().parent().parent().prev().find('.checkboxM').removeAttr('checked').parent().removeClass('checked');
					  };
					  parentState(ParentElement,ParentId);
				  } else {
					  return true;
				  };	
				};
				if(checked) {
					$(this).parents('li').find('ul').show();
					$(this).parents('li').find('.dropArrow').children('i').removeClass('fa-angle-down').addClass('fa-angle-up');
					$(this).parents('.dropItem').next().find('.checkboxM').prop('checked',true).parent().addClass('checked');
					parentState(that,pid);
				} else {
					$(this).parents('.dropItem').next().find('.checkboxM').removeAttr('checked').parent().removeClass('checked');
					parentState(that,pid);
				};
			},
			txtClick: function() {
			  var ck = $(this).parent().find('.checkboxM');
			  ck.trigger('click');
			},
			arrowInit: function() {
				$this.find('.dropItem').each(function() {
                    var len = $(this).next('ul').find('li').length;
					if(len>0) {
						$(this).find('.dropArrow').removeClass('none');
					} else {
						$(this).find('.dropArrow').addClass('none');
					}
                });
			},
			closest: function() {
				$(document).click(function(e){
					var elem=$(e.target).closest($this);
					if(!elem.length){
						$this.removeClass('multiOpen');
					};
				});	
			},
			setValue:function(){
				var textValNum='',val='';
				
				var counter = $this.find('input:checkbox:checked').length; 
				
				$this.find('input:checkbox:checked').each(function(i){
				
					if(i == counter-1){
					
						textValNum += $(this).parents('.dropItem').find('.txt').eq(0).text();
						val += $(this).parents('.dropItem').attr('rel');
						
					}else{
					
						textValNum += $(this).parents('.dropItem').find('.txt').eq(0).text()+',';
						val += $(this).parents('.dropItem').attr('rel')+',';
					}
					
				})
				
				if(textValNum === ''){
				
					$this.find('.dropText .txt').text('请选择').attr('title','请选择');
					
				}else{
				
					$this.find('.dropText .txt').text(textValNum).attr('title',textValNum);
				}
				
				$this.find('.' + settings.storage).val(val);
				$this.removeClass('multiOpen');
			},
			getValue:function(){
				var currentVal = $this.find('.'+settings.storage).val();
				var listVal='';
				currentVal=currentVal.split(',');				
				$.each( currentVal, function(i, n){ 
				
					$this.find('.dropItem').each(function(){
						
						if(currentVal[i] == $(this).attr('rel')){
							
							listVal +=$(this).find('.txt').text()+','
						}
					})
					
				});
				
				
				listVal = listVal.substring(0, listVal.length - 1);
				$this.find('.dropText .txt').text(listVal).attr('title',listVal);
				
			}
		};
		multiDropCheck.init();
		})		
	};
})(jQuery);