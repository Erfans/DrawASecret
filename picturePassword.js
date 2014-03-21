/* 
    Document   : picturePassword
    Author     : erfan.shamabadi.com
    Description:
        jQuery extension to make picture password for website
 */
(function($, doc) {
    
    "use strict";
    
    var PicturePassword = function($img,$input,opts){
      

        var options ={
            rows :15,
            columns:15
        };


        this.$img = $img;
        this.$input = $input;
        
        this.pathString = "";
        this.isTouching = false;        
        this.lastPosition = {
            x:-1,
            y:-1
        };     
        
        this.init($.extend(options, opts ));
    };
    
    PicturePassword.prototype.init = function(options){
        
        var self = this;
        var imgNum = 0;
        var $img = self.$img;
        
        $img.each(function() {                  

            var img = this;
            
            img.picturePassword ={
                num :imgNum++,
                cw:Math.floor(img.width / options.columns),
                rh:Math.floor(img.height / options.rows)
            };
        });
        
        $img.on("touchstart mousedown", function(event){
            event.preventDefault();  
            var img = this;
            var pp = img.picturePassword;
            self.makeString(event, $(img).offset(), pp.cw, pp.rh, pp.num);
            self.isTouching = true;
        });
            
        $img.on("touchmove mousemove", function(event){
            event.preventDefault();                
            if(self.isTouching){                
                var img = this;
                var pp = img.picturePassword;
                self.makeString(event, $(img).offset(), pp.cw, pp.rh, pp.num);
            }
        });
            
        $img.on("touchend mouseup", function(e){
            e.preventDefault();                        
            self.isTouching = false;                                
        });
        
        $(doc).on("touchend mouseup",function(){
            self.lastPosition = {
                x:-1,
                y:-1
            };                
            self.isTouching = false;
        });
        
        $img.on('dragstart', function(event) {
            event.preventDefault();
        });        
        
    };
    
    PicturePassword.prototype.makeString = function(event, offset, columnWidth, rowHeight, imgNum){
        var self = this;
        var lastPosition = self.lastPosition;
        var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event;
        
        var currentPositionX = Math.floor((data.pageX - offset.left) / columnWidth);
        var currentPositionY = Math.floor((data.pageY - offset.top) / rowHeight);
                
        if( lastPosition.x != currentPositionX || lastPosition.y != currentPositionY){
            self.pathString += ''+imgNum+ currentPositionX+ currentPositionY;
            
            if(self.$input){
                self.$input.val(self.pathString);
            }
            
            self.lastPosition = {
                x:currentPositionX , 
                y:currentPositionY
            };            
        }
    };
    
    PicturePassword.prototype.clearPassword = function(){
        var self = this;
        self.pathString = "";
        if(self.$input){
            self.$input.val("");
        }
    }
    
    $.fn.picturePassword = function(inputSelector,options) {
        var $input = inputSelector? $(inputSelector):null;
        return new PicturePassword(this,$input,options);
    }

})(jQuery, document);