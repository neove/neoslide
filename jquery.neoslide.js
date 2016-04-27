;(function(window,document,$,undefined){
        function Banner(data){
            this.data=data;
            this.div=$('div.banner');
            this.ul=this.div.find('ul.banner-img');
            this.img=this.ul.find('img');
            this.num=0;     
            this.list=this.div.find('ul.list');
            this.li_curr=this.list.find('li.curr');
            this.top=this.div.find('div.top');
            this.info=this.data.img;
            this.prew_img=$(document).find('img.prew-img');
            this.list_num=0;
            //some css setting
            this.div.css({
                'width':this.data.w,
                'height':this.data.h
            });
            this.ul.css({
                'width':'300%',
                'height':'100%',
                'left':-this.data.w
            });
            this.top.css('line-height',this.top.height()+'px');
            //initialize the images
            var that=this;
            this.img.css({
                 'width':that.data.w,
                 'height':that.data.h
                });
            this.img.each(function(index,ele){
                if(index===0){
                    index=that.data.img.length-1;
                }else{
                    index--;
                }
                ele.src=that.data.img[index].src;
            });
            //if top-info ,then initialize
            if(this.data.top_info===true){
                $('div.top p').text(this.data.img[0].top);
               this.top.show();
            } 
            this.data.type==='fadeIn' ? this.fadeInFn() : this.slideFn();
            this.data.bot_list   && this.listFn();
            this.data.mousewheel && this.mouseFn();
            this.data.keyboard   && this.keyBoardFn();

        }
        Banner.prototype.ulBack=function () {
            var that=this;
            if(that.num===0){
                that.img.each(function(index,ele){
                    //³õÊ¼»¯×ó±ßµÄimg´æ×îºóÒ»ÕÅ
                    if(index===0){
                        index=that.data.img.length-1;
                    }else{
                        index--;
                    }
                    ele.src=that.data.img[index].src;
                });
            }else{
                that.img.each(function(index,ele){
                    ele.src=that.data.img[(index+that.num-1)%that.data.img.length].src; 
                });
            }

            that.ul.css({'left':-that.data.w});
        };
        //slide
        Banner.prototype.slideFn=function () {
            var that=this;
            clearInterval(this.ul.timer);
            this.ul.timer=setInterval(function(){
                if(!that.ul.is(':animated')){
                    if(that.data.direction=='left'){
                        that.imgMove(1);
                        that.listAndTop(1);
                        
                    }else{
                        that.imgMove(0);
                        that.listAndTop(0);
                    }
                }
            },Number(this.data.delay) ||4000 + 1000);
        };
        //fadeIn and fadeOut
        Banner.prototype.fadeInFn=function() {
            
            var that=this;
            clearInterval(this.ul.timer);
            this.ul.timer=setInterval(function(){
                if(!that.ul.is(':animated')){
                    if(that.data.direction=='left'){
                        that.num++;
                        that.ul.animate({'opacity':'0.1'},500,'swing',function (){
                             that.ulBack();
                             that.ul.animate({'opacity':1},500,'swing');
                        }); 
                        that.listAndTop(1);

                    }else{
                        that.num--;
                        if(that.num<0)that.num=that.data.img.length-1;//ÕâÀïÅÐ¶ÏÊÇ¹Ø¼ü
                        that.ul.animate({'opacity':'0.1'},500,'swing',function(){
                             that.ulBack();
                             that.ul.animate({'opacity':'1'},500,'swing');
                        });
                        that.listAndTop(0);
                    }
                }
            },Number(this.data.delay) || 4000+1000);
        };
        //add list move
        Banner.prototype.listMove=function(){
             if(this.list_num>this.info.length-1) this.list_num=0;
             if(this.list_num<0)                this.list_num=this.info.length-1; 
             this.li_curr.stop().animate({'left':this.list_num*32},1000);
        };
        Banner.prototype.imgMove=function(a){
            var that=this;
            if(a){
                this.num++;
                this.ul.animate({'left':-this.data.w*2},1000,'swing',function (){
                     that.ulBack();
                });   
            }else{
                this.num--;
                if(this.num<0)this.num=this.data.img.length-1;
                this.ul.animate({'left':'0'},1000,'swing',function(){
                     that.ulBack();
                });
            }
        };
        Banner.prototype.listFn=function(){
            var that=this;
            this.prew_img.css({
                    'width':that.data.w/6,
                    'height':that.data.h/6,
                });
            //append li to ul 
            for(var i=0;i<this.data.img.length;i++){
                this.list.append($('<li></li>'));
            }
            // to be center
            this.list.show().css({'margin-left':-this.list.width()/2});//ÏÔÊ¾ºÍ¾ÓÖÐ
            this.list.mouseover(function(){
                clearInterval(that.ul.timer); 
                that.prew_img.css('display','block');

            }).mouseout(function(){
                that.data.type==='fadeIn' ? that.fadeInFn() : that.slideFn();
               // that.prew_img.css('display','none');
                 
            });
            //show preview img
            this.list.delegate('li','mouseover',function(e){           
                var a=$(this).index()-1;   
                if($(this).hasClass('curr'))a=that.list_num;              
                that.prew_img.css({
                // the positsion and transition of the preview img
                'left':$(this).offset().left-that.data.w/12-$('div.banner-wrap').offset().left,
                'top':$(this).offset().top-that.data.h/6-15-$('div.banner-wrap').offset().top,
                '-webkit-transform': 'rotate3d(0,1,0,0deg)',
                '-moz-transform':   ' rotate3d(0,1,0,0deg)',
                '-ms-transform':    ' rotate3d(0,1,0,0deg)',
                '-o-transform':     ' rotate3d(0,1,0,0deg)',
                'transform':        ' rotate3d(0,1,0,0deg)',
                'opacity':'1'
                
                }).attr('src',that.info[a].src);             

            });
             this.list.delegate('li','mouseout',function(){
                that.prew_img.css({
                // the positsion of the preview img
                '-webkit-transform': 'rotate3d(0,1,0,90deg)',
                '-moz-transform':   ' rotate3d(0,1,0,90deg)',
                '-ms-transform':    ' rotate3d(0,1,0,90deg)',
                '-o-transform':     ' rotate3d(0,1,0,90deg)',
                'transform':        ' rotate3d(0,1,0,90deg)',
                'opacity':'0'
                });
             });
            //add click event to li in ul.list
            this.list.delegate('li','click',function(){
                if($(this).hasClass('curr')){
                    return;
                }else{
                    if(!$('li.curr').is(':animated')){
                    that.num=$(this).index()-1;
                    //infoFn(num%data.length);
                    that.ul.animate({'opacity':'0.1'},500,function(){
                        that.ulBack();
                        that.ul.animate({'opacity':'1'},500,function(){
                        });
                    });
                    that.list_num=$(this).index()-1;
                    that.listMove();
                    if(that.top.is(':visible'))that.topInfo();
                }
                }
            });
        };
        Banner.prototype.listAndTop=function(a){
             if(this.top.is(':visible'))this.topInfo();
             if(this.list.is(':visible')){
                if(a){
                     this.list_num++;
                     this.listMove();
                }else{
                     this.list_num--;
                     this.listMove();
                }
             }
        };
        Banner.prototype.topInfo=function(){
            var that=this;
            this.top.animate({'top':-this.top.height()},500,function(){
                that.top.animate({'top':'0'},500);
                that.top.find('p').text(that.info[that.num%that.info.length].top);
            });
        };
        Banner.prototype.mouseFn=function(){
            var that=this;
            this.div.bind('mouseover',function(){
                clearInterval(that.ul.timer);
            }).bind('mouseout',function(){
                 that.data.type==='fadeIn' ? that.fadeInFn() : that.slideFn();
            });
            if(document.addEventListener){
                this.div[0].addEventListener('DOMMouseScroll',function(e){
                    switchFn(e);
                },false);
            }//w3c
            this.div[0].onmousewheel=function(e){
                switchFn(e);
            };//IE/Opera/Chrome

            function switchFn(e){
                var b=true;
                if(e.wheelDelta){
                    b=e.wheelDelta>0 ? true : false;
                }else{
                    b=e.detail<0 ? true : false;
                }
                if(!that.ul.is(':animated')){
                     if(b){
                        that.imgMove(1); 
                        that.listAndTop(1);
                     }else{
                        that.imgMove(0); 
                        that.listAndTop(0); 
                     }
                     }
                      e.preventDefault&&e.preventDefault();
                      return false;

                }
        };
        Banner.prototype.keyBoardFn=function(){
            var that=this;
            $(document).keydown(function(e){
             if(e.keycode==37 || 39){
                 clearInterval(that.ul.timer);
             }
             if(!that.ul.is(':animated')){
                 switch(e.keyCode){
                    case 37:
                      that.imgMove(0); 
                      that.listAndTop(0);
                      break;
                    case 39:
                      that.imgMove(1); 
                      that.listAndTop(1);
                      break;
                  }
                 return false;
             }
            });
            $(document).keyup(function(){
                setTimeout(function(){
                    that.data.type==='fadeIn' ? that.fadeInFn() : that.slideFn();
                },4000);
            });
        };
        $.fn.neoSlide=function(data){
            var a=new Banner(data);
            return a;
        };
})(window,document,jQuery);
