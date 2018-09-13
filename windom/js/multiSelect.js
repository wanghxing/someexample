/*下拉多级*/
(function($) {
  // 多级下拉单选
    $.fn.multiDrop = function(opt) {
        var settings = $.extend({
            'callback': function() {}
        },opt);
        var $this = $(this);
        var multiDrop = {
            init: function() {
                $this.on('click','.dropText',this.textClick);
                $this.on('click','.dropItem',this.itemClick);
                this.closest(); 
            },
            textClick: function() {
                var len = $(this).parent('.multiDrop').find('.dropUl li').length;
                if(len>0) {
                  $(this).parent('.multiDrop').addClass('multiOpen');
                  multiDrop.arrowInit();
                  $(this).parent('.multiDrop').find(".dropItemCase").mCustomScrollbar({
                      theme:"dark-2",
                      mouseWheelPixels:"200"
                  });                   
                };
            },
            itemClick: function(event) {
                var node = event.target.nodeName.toLowerCase();
                var that = $(this);
                if(node == 'span' || node == 'i') {
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
                    var text = that.children('em').text();
                    var val = that.attr('rel');
                    $(this).parents('.multiDrop').find('.dropText em').text(text);
                    $(this).parents('.multiDrop').find('.id').val(val).trigger('change');
                    $(this).parents('.multiDrop').find('.name').val(text).trigger('change');
                    $(this).parents('.multiDrop').removeClass('multiOpen');
                    settings.callback(that);
                };
            },
            arrowInit: function() {
                $this.find('.dropItem').each(function() {
                    var len = $(this).next('ul').find('li').length;
                    if(len>0) {
                        $(this).find('span').removeClass('none');
                    } else {
                        $(this).find('span').addClass('none');
                    }
                });
            },
            closest: function() {
                var dropText = $this.find('.dropText');
                $(document).click(function(e){
                    var elem=$(e.target).closest(dropText);
                    if(!elem.length){
                        $this.removeClass('multiOpen');
                    };
                });             
            }
        };
        multiDrop.init();
        return multiDrop;       
    };
})(jQuery);
//下拉多级结束