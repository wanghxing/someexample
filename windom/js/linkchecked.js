$.checkbox2 = function(){
    $('body').delegate(':checkbox', 'change', function(){
        var bool = this.checked;
        if(bool){
          $(this).next().addClass('checked');
        } else {
          $(this).next().removeClass('checked');
        }
      });
      $('body').delegate('.b-checkbox-a', 'click', function(){
        var el = $(this);
        var checkAll = el.is('.b-checked-all-all-a');
        var checkChapter = el.is('.b-checked-all-a');
        var checkPart = el.is('.b-checked-part-a');
        var anum, cnum, chapter_num, chapter_num_c , part_num, part_num_c;        

        if(el.is('.disabled') || el.is('.disabled-checked')){
          return ;
        }
        if(checkAll){
          if(el.prev()[0].checked) {
            el.parents('.content-tree').find('.label-checkbox').each(function() {
              $(this).children('.checkbox-a').removeClass('checked');
              $(this).children('.checkbox').prop('checked',false).trigger('change');
            });
          } else {
            el.parents('.content-tree').find('.label-checkbox').each(function() {
              $(this).children('.checkbox-a').addClass('checked');
              $(this).children('.checkbox').prop('checked',true).trigger('change');
            });       
          };      
          return;
        }

        if(checkChapter){
         if(el.prev()[0].checked) {
            el.parents('.cm_chapter').find('.label-checkbox').each(function() {
              $(this).children('.checkbox-a').removeClass('checked');
              $(this).children('.checkbox').prop('checked',false).trigger('change');
              $(this).parents('.content-tree').find('.b-checked-all-all-a').removeClass('checked');
              $(this).parents('.content-tree').find('.b-checked-all-all-a').prev().prop('checked',false).trigger('change');
            });
          } else {
            el.parents('.cm_chapter').find('.label-checkbox').each(function() {
              $(this).children('.checkbox-a').addClass('checked');
              $(this).children('.checkbox').prop('checked',true).trigger('change');

              anum = el.parents('.content-tree').find('.checkbox-a').length;
              cnum = el.parents('.content-tree').find('.checkbox-a.checked').length;

              console.log(anum , cnum);
              
              if(anum - cnum == 1) {
                el.parents('.content-tree').find('.b-checked-all-all-a').addClass('checked');         
                el.parents('.content-tree').find('.b-checked-all-all-a').prev().prop('checked', true).trigger('change');
              };

            });       
          };      
          return;   
        }

        if(checkPart){
         if(el.prev()[0].checked) {
            el.parents('.cm_part').find('.label-checkbox').each(function() {
              $(this).children('.checkbox-a').removeClass('checked');
              $(this).children('.checkbox').prop('checked',false).trigger('change');

              $(this).parents('.cm_chapter').find('.b-checked-all-a').removeClass('checked');
              $(this).parents('.cm_chapter').find('.b-checked-all-a').prev().prop('checked',false).trigger('change');

              $(this).parents('.content-tree').find('.b-checked-all-all-a').removeClass('checked');
              $(this).parents('.content-tree').find('.b-checked-all-all-a').prev().prop('checked',false).trigger('change');
            });
          } else {
            el.parents('.cm_part').find('.label-checkbox').each(function() {
              $(this).children('.checkbox-a').addClass('checked');
              $(this).children('.checkbox').prop('checked',true).trigger('change');

              chapter_num = el.parents('.cm_chapter').find('.checkbox-a').length;
              chapter_num_c = el.parents('.cm_chapter').find('.checkbox-a.checked').length;
              anum = el.parents('.content-tree').find('.checkbox-a').length;
              cnum = el.parents('.content-tree').find('.checkbox-a.checked').length;
              console.log(anum , cnum , chapter_num, chapter_num_c);
              if(chapter_num - chapter_num_c == 1) {
                el.parents('.cm_chapter').find('.b-checked-all-a').addClass('checked');         
                el.parents('.cm_chapter').find('.b-checked-all-a').prev().prop('checked', true).trigger('change');
              };
             
              if(anum - cnum == 2) {
                el.parents('.content-tree').find('.b-checked-all-all-a').addClass('checked');         
                el.parents('.content-tree').find('.b-checked-all-all-a').prev().prop('checked', true).trigger('change');
              };



            });       
          };      
          return;   
        }
        

        if(el.prev()[0].checked){
          console.log('w1');
          el.removeClass('checked');      
          el.prev().prop('checked', false).trigger('change');

          el.parents('.content-tree').find('.b-checked-all-all-a').removeClass('checked');      
          el.parents('.content-tree').find('.b-checked-all-all-a').prev().prop('checked', false).trigger('change');

          el.parents('.cm_chapter').find('.b-checked-all-a').removeClass('checked');      
          el.parents('.cm_chapter').find('.b-checked-all-a').prev().prop('checked', false).trigger('change');

          el.parents('.cm_part').find('.b-checked-part-a').removeClass('checked');      
          el.parents('.cm_part').find('.b-checked-part-a').prev().prop('checked', false).trigger('change');

        } else {
          console.log('w2');
          el.addClass('checked');         
          el.prev().prop('checked', true).trigger('change');
          
          part_num = el.parents('.cm_part').find('.checkbox-a').length; 
          part_num_c = el.parents('.cm_part').find('.checkbox-a.checked').length;

          chapter_num = el.parents('.cm_chapter').find('.checkbox-a').length; 
          chapter_num_c = el.parents('.cm_chapter').find('.checkbox-a.checked').length;

          anum = el.parents('.content-tree').find('.checkbox-a').length;
          cnum = el.parents('.content-tree').find('.checkbox-a.checked').length;

          var c1 = anum - cnum, c2 = chapter_num - chapter_num_c, c3 = part_num - part_num_c;
          var threeLevel = $('.cm_chapter').find('.cm_partCon_all').is(':visible'); //判断有两级还是三级
          if(!threeLevel){c1 = 2,c2 = 1};  //有两级
          if(threeLevel){c1 = 3, c2 = 2 ,c3 = 1};  //有三级

          console.log(anum,cnum,chapter_num,chapter_num_c,part_num,part_num_c);

          if(part_num - part_num_c == c3) {
            el.parents('.cm_part').find('.b-checked-part-a').addClass('checked');         
            el.parents('.cm_part').find('.b-checked-part-a').prev().prop('checked', true).trigger('change');
          }
          if(chapter_num - chapter_num_c == c2) {
            el.parents('.cm_chapter').find('.b-checked-all-a').addClass('checked');         
            el.parents('.cm_chapter').find('.b-checked-all-a').prev().prop('checked', true).trigger('change');
          }
          if(anum - cnum == c1) {
            el.parents('.content-tree').find('.b-checked-all-all-a').addClass('checked');         
            el.parents('.content-tree').find('.b-checked-all-all-a').prev().prop('checked', true).trigger('change');
          }

          
        };
      });
  };
  $.checkbox2();