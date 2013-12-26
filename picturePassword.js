/* 
    Document   : picturePassword
    Created on : Dec 26, 2013
    Author     : Erfan - www.erfan.shamabadi.com
    Description:
        jQuery extension to have picture password on websites
 */
(function($) {
    $.fn.picturePassword = function(passwordElm,options) {
        if(passwordElm == undefined){
            console.error("Password Elememt couldn't be null!");
            return;
        }
        
        passwordElm = $(passwordElm);
        
        var pathString = "";        
        var isTouching = false;        
        var lastPositionX = -1,
        lastPositionY = -1,
        currentPositionX = -1,
        currentPositionY = -1;
        
        var imgNum = 0;
        var settings = $.extend({
            rowsNb : 15, // Number of rows
            columnsNb : 15 // Number of columns
        }, options );
        
        this.clearPassword = function(){
            pathString = "";
            passwordElm.val(pathString);
        };
        
        return this.each(function() {                  
            
            this.columnWidth = Math.floor(this.width / settings.columnsNb);
            this.rowHeight = Math.floor(this.height / settings.rowsNb);            
            this.imgNum = imgNum++;           
                               
            var makeString = function(data, offset, columnWidth, rowHeight, imgNum){
                currentPositionX = Math.floor((data.pageX - offset.left) / columnWidth);
                currentPositionY = Math.floor((data.pageY - offset.top) / rowHeight);
                
                if(lastPositionX != currentPositionX || lastPositionY != currentPositionY){
                    pathString += imgNum.toString() + currentPositionX.toString() + currentPositionY.toString();
                    passwordElm.val(pathString);
                    lastPositionX = currentPositionX;
                    lastPositionY = currentPositionY;
                }
            };
            
            $(this).on("touchstart mousedown", function(e){
                e.preventDefault();
                var data = e.originalEvent.touches ? e.originalEvent.touches[0] : e;                
                makeString(data, $(this).offset(), this.columnWidth, this.rowHeight, this.imgNum);
                isTouching = true;
            });
            $(this).on("touchmove mousemove", function(e){
                e.preventDefault();
                var data = e.originalEvent.touches ? e.originalEvent.touches[0] : e;                
                if(isTouching){
                    makeString(data, $(this).offset(), this.columnWidth, this.rowHeight, this.imgNum);
                }
            });
            $(this).on("touchend mouseup", function(e){
                e.preventDefault();                        
                isTouching = false;                                
            });
        
            $(document).on("touchend mouseup",function(){
                lastPositionX = -1;
                lastPositionY = -1;
                isTouching = false;
            })
        
            $(this).on('dragstart', function(event) {
                event.preventDefault();
            });        
        });
    }

}(jQuery));