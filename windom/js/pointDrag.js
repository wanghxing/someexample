$.fn.pointDrag=function(opt){	       
	        var call={
	        	socur:'.conList ul',//父元素容器
	        	son:'li',//子元素
	        	oh:this.outerHeight(true),
	        	cbEnd:function(){}
	        }	     
	        var option=$.extend({}, call, opt);	        
    		function drag(){
    			    this.id=[];//交换顺序后的id列表，看需要存储。    			  
    			    this.self={zIndex:1};
    			    this._this;
    			    this.$img = $('body').find("img");    		
    			    //交换顺序后重新排序，可在这里读取新的排序列表值		    				    				    		
    			    if(document.attachEvent) { //ie的事件监听，拖拽div时禁止选中内容，firefox与chrome已在css中设置过-moz-user-select: none; -webkit-user-select: none;						
						try{
							$img[0].attachEvent('onselectstart', function() {
							return false;
						});
						}catch(e){
							//TODO handle the exception
						}						
					}                   
			}   		
    		drag.prototype.start=function(ev,obj){					
						ev.preventDefault();
		                this.self.moved=$(obj).attr('id');
		                this.self._index=$(obj).index();
		                this.self._start = true;
		                var oEvent = ev || event;
		                this.self.disX = oEvent.clientX - obj.offsetLeft;
		                this.self.disY = oEvent.clientY - obj.offsetTop;	  		               
			}					
			drag.prototype.move=function(ev,obj){									           
		                if (this.self._start != true) {
		                    return false
		                }		             
		                this.self._move = true;		               
		                var oEvent = ev || event;
		                var l = oEvent.clientX - this.self.disX;
		                var t = oEvent.clientY - this.self.disY;			               
		                var ol = obj.offsetLeft;
		                var ot = obj.offsetTop;		              		               
		                $(obj).css({"position":'absolute','left' : l + 'px','top':t + 'px','z-index':999});		 		               		                     
			}					
			drag.prototype.end=function(ev,obj){
						var ol = obj.offsetLeft;
		                var ot = obj.offsetTop;		                
		                var alis=$(option.socur).find(option.son);
		                var $this;
		                var k;
		                var that=this;
		                $(option.socur).find(option.son).each(function(i){		               
		                	if(0<Math.abs(this.offsetTop-ot)&&Math.abs(this.offsetTop-ot)<option.oh/3){
		                		$this=$(this);
		                		k=i;		                		
		                	}
		                })
		                if($this){
//                          $this.stop().animate({top:that.self._index*option.oh},300);
//		                	$(obj).stop().animate({top:k*option.oh,left:0},300);
//		                	console.log(k+"--"+this.self._index);
//		                	setTimeout(function(){
		                		if(Math.abs(k-that.self._index)==1){
		                			if(k<that.self._index){
		                				$(obj).insertBefore($this);
		                			}else{
		                				$this.insertBefore($(obj));		                				
		                			}		                			
		                		}else if(k<that.self._index&&Math.abs(k-that.self._index)>1){
		                			$(obj).insertBefore($this);
		                		}else{
		                			$(obj).insertBefore($this);
		                		}
			                	that.sort();
			                	option.cbEnd();
//		                	},400)		                	
		                }else{
		                	$(obj).stop().animate({top:that.self._index*option.oh,left:0},300);		                
		                }		                
	                    $(document).unbind("mousemove");
						$(document).unbind('mouseup');                   
			}
			drag.prototype.sort = function(){
				            $(option.socur).css('position','relative');
							$(option.socur).find(option.son).each(function(i){							
									$(this).css({"position":'absolute','z-index':''});
									$(this).stop().animate({'top':i*option.oh+'px',left:0},300);	
							})
			}
			drag.prototype.firstsort = function(){
				            $(option.socur).css('position','relative');
							$(option.socur).find(option.son).each(function(i){								
									$(this).css({"position":'absolute','top':i*option.oh+'px',left:0,'z-index':''});									
							})
			}		
    	    drag.prototype.exchange=function(a,b){
		                    var n = a.next(), p = b.prev();
		                    b.insertBefore(n);
		                    a.insertAfter(p);		                    
		    };
		    (function init(){		    	
	        	var a=new drag();
	        	a.firstsort();
	        	$(option.socur).find(option.son).on('mousedown',function(ev){
						_this=this;						
						ev.preventDefault();
						if(window.event){
							window.event.returnValue = false; 
						}
						a.start(ev,this);						
						$(document).on("mousemove",function(ev){
							a.move(ev,_this);
						});
					    $(document).on('mouseup',function(ev){
					    	a.end(ev,_this)
					    });
					});			
	        })();	
}  