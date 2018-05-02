!function($,window,document){"use strict";function Wickedpicker(e,t){this.element=$(e),this.options=$.extend({},defaults,t),this.element.addClass("hasWickedpicker"),this.element.attr("onkeypress","return false;"),this.element.attr("aria-showingpicker","false"),this.createPicker(),this.timepicker=$(".wickedpicker"),this.up=$("."+this.options.upArrow.split(/\s+/).join(".")),this.down=$("."+this.options.downArrow.split(/\s+/).join(".")),this.separator=$(".wickedpicker__controls__control--separator"),this.hoursElem=$(".wickedpicker__controls__control--hours"),this.minutesElem=$(".wickedpicker__controls__control--minutes"),this.secondsElem=$(".wickedpicker__controls__control--seconds"),this.meridiemElem=$(".wickedpicker__controls__control--meridiem"),this.close=$("."+this.options.close.split(/\s+/).join("."));var i=this.timeArrayFromString(this.options.now);this.options.now=new Date(today.getFullYear(),today.getMonth(),today.getDate(),i[0],i[1],i[2]),this.selectedHour=this.parseHours(this.options.now.getHours()),this.selectedMin=this.parseSecMin(this.options.now.getMinutes()),this.selectedSec=this.parseSecMin(this.options.now.getSeconds()),this.selectedMeridiem=this.parseMeridiem(this.options.now.getHours()),this.setHoverState(),this.attach(e),this.setText(e)}"function"!=typeof String.prototype.endsWith&&(String.prototype.endsWith=function(e){return e.length>0&&this.substring(this.length-e.length,this.length)===e});var isMobile=function(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)},today=new Date,pluginName="wickedpicker",defaults={now:today.getHours()+":"+today.getMinutes(),twentyFour:!1,upArrow:"wickedpicker__controls__control-up",downArrow:"wickedpicker__controls__control-down",close:"wickedpicker__close",hoverState:"hover-state",title:"Timepicker",showSeconds:!1,timeSeparator:" : ",secondsInterval:1,minutesInterval:1,beforeShow:null,afterShow:null,show:null,clearable:!1,closeOnClickOutside:!0,onClickOutside:function(){}};$.extend(Wickedpicker.prototype,{showPicker:function(e){"function"==typeof this.options.beforeShow&&this.options.beforeShow(e,this.timepicker);var t=$(e).offset();if($(e).attr({"aria-showingpicker":"true",tabindex:-1}),this.setText(e),this.showHideMeridiemControl(),this.getText(e)!==this.getTime()){var i=this.getText(e),s=/\s[ap]m$/i,o=s.test(i)?i.substr(-2,2):null,n=i.replace(s,"").split(this.options.timeSeparator),r={};r.hours=n[0],r.minutes=n[1],r.meridiem=o,this.options.showSeconds&&(r.seconds=n[2]),this.setTime(r)}this.timepicker.css({"z-index":this.element.css("z-index")+1,position:"absolute",left:t.left,top:t.top+$(e)[0].offsetHeight}).show(),"function"==typeof this.options.show&&this.options.show(e,this.timepicker),this.handleTimeAdjustments(e)},hideTimepicker:function(e){this.timepicker.hide(),"function"==typeof this.options.afterShow&&this.options.afterShow(e,this.timepicker),{start:function(){var e=$.Deferred();return $('[aria-showingpicker="true"]').attr("aria-showingpicker","false"),e.promise()}}.start().then(function(e){setTimeout(function(){$('[aria-showingpicker="false"]').attr("tabindex",e)},400)}(0))},createPicker:function(){if(0===$(".wickedpicker").length){var e='<div class="wickedpicker"><p class="wickedpicker__title">'+this.options.title+'<span class="wickedpicker__close"></span></p><ul class="wickedpicker__controls"><li class="wickedpicker__controls__control"><span class="'+this.options.upArrow+'"></span><span class="wickedpicker__controls__control--hours" tabindex="-1">00</span><span class="'+this.options.downArrow+'"></span></li><li class="wickedpicker__controls__control--separator"><span class="wickedpicker__controls__control--separator-inner">:</span></li><li class="wickedpicker__controls__control"><span class="'+this.options.upArrow+'"></span><span class="wickedpicker__controls__control--minutes" tabindex="-1">00</span><span class="'+this.options.downArrow+'"></span></li>';this.options.showSeconds&&(e+='<li class="wickedpicker__controls__control--separator"><span class="wickedpicker__controls__control--separator-inner">:</span></li><li class="wickedpicker__controls__control"><span class="'+this.options.upArrow+'"></span><span class="wickedpicker__controls__control--seconds" tabindex="-1">00</span><span class="'+this.options.downArrow+'"></span> </li>'),e+='<li class="wickedpicker__controls__control"><span class="'+this.options.upArrow+'"></span><span class="wickedpicker__controls__control--meridiem" tabindex="-1">AM</span><span class="'+this.options.downArrow+'"></span></li></ul></div>',$("body").append(e),this.attachKeyboardEvents()}},showHideMeridiemControl:function(){!1===this.options.twentyFour?$(this.meridiemElem).parent().show():$(this.meridiemElem).parent().hide()},showHideSecondsControl:function(){this.options.showSeconds?$(this.secondsElem).parent().show():$(this.secondsElem).parent().hide()},attach:function(e){var t=this;this.options.clearable&&t.makePickerInputClearable(e),$(e).attr("tabindex",0),$(e).on("click focus",function(e){$(t.timepicker).is(":hidden")&&(t.showPicker($(this)),window.lastTimePickerControl=$(this),$(t.hoursElem).focus())});var i=function(e){if($(t.timepicker).is(":visible")){if($(e.target).is(t.close))t.hideTimepicker(window.lastTimePickerControl);else if($(e.target).closest(t.timepicker).length||$(e.target).closest($(".hasWickedpicker")).length)e.stopPropagation();else{if("function"==typeof t.options.onClickOutside?t.options.onClickOutside():console.warn("Type of onClickOutside must be a function"),!t.options.closeOnClickOutside)return;t.hideTimepicker(window.lastTimePickerControl)}window.lastTimePickerControl=null}};$(document).off("click",i).on("click",i)},attachKeyboardEvents:function(){$(document).on("keydown",$.proxy(function(e){switch(e.keyCode){case 9:"hasWickedpicker"!==e.target.className&&$(this.close).trigger("click");break;case 27:$(this.close).trigger("click");break;case 37:e.target.className!==this.hoursElem[0].className?$(e.target).parent().prevAll("li").not(this.separator.selector).first().children()[1].focus():$(e.target).parent().siblings(":last").children()[1].focus();break;case 39:e.target.className!==this.meridiemElem[0].className?$(e.target).parent().nextAll("li").not(this.separator.selector).first().children()[1].focus():$(e.target).parent().siblings(":first").children()[1].focus();break;case 38:$(":focus").prev().trigger("click");break;case 40:$(":focus").next().trigger("click")}},this))},setTime:function(e){this.setHours(e.hours),this.setMinutes(e.minutes),this.setMeridiem(e.meridiem),this.options.showSeconds&&this.setSeconds(e.seconds)},getTime:function(){return[this.formatTime(this.getHours(),this.getMinutes(),this.getMeridiem(),this.getSeconds())]},setHours:function(e){var t=new Date;t.setHours(e);var i=this.parseHours(t.getHours());this.hoursElem.text(i),this.selectedHour=i},getHours:function(){var e=new Date;return e.setHours(this.hoursElem.text()),e.getHours()},parseHours:function(e){return!1===this.options.twentyFour?(e+11)%12+1:e<10?"0"+e:e},setMinutes:function(e){var t=new Date;t.setMinutes(e);var i=t.getMinutes(),s=this.parseSecMin(i);this.minutesElem.text(s),this.selectedMin=s},getMinutes:function(){var e=new Date;return e.setMinutes(this.minutesElem.text()),e.getMinutes()},parseSecMin:function(e){return(e<10?"0":"")+e},setMeridiem:function(e){var t="";t=void 0===e?"PM"===this.getMeridiem()?"AM":"PM":e,this.meridiemElem.text(t),this.selectedMeridiem=t},getMeridiem:function(){return this.meridiemElem.text()},setSeconds:function(e){var t=new Date;t.setSeconds(e);var i=t.getSeconds(),s=this.parseSecMin(i);this.secondsElem.text(s),this.selectedSec=s},getSeconds:function(){var e=new Date;return e.setSeconds(this.secondsElem.text()),e.getSeconds()},parseMeridiem:function(e){return e>11?"PM":"AM"},handleTimeAdjustments:function(e){var t=0;$(this.up).add(this.down).off("mousedown click touchstart").on("mousedown click",{Wickedpicker:this,input:e},function(e){if(1!=e.which)return!1;var i=this.className.indexOf("up")>-1?"+":"-",s=e.data;"mousedown"==e.type?t=setInterval($.proxy(function(e){e.Wickedpicker.changeValue(i,e.input,this)},this,{Wickedpicker:s.Wickedpicker,input:s.input}),200):s.Wickedpicker.changeValue(i,s.input,this)}).bind("mouseup touchend",function(){clearInterval(t)})},changeValue:function(operator,input,clicked){var target="+"===operator?clicked.nextSibling:clicked.previousSibling,targetClass=$(target).attr("class");targetClass.endsWith("hours")?this.setHours(eval(this.getHours()+operator+1)):targetClass.endsWith("minutes")?this.setMinutes(eval(this.getMinutes()+operator+this.options.minutesInterval)):targetClass.endsWith("seconds")?this.setSeconds(eval(this.getSeconds()+operator+this.options.secondsInterval)):this.setMeridiem(),this.setText(input)},setText:function(e){$(e).val(this.formatTime(this.selectedHour,this.selectedMin,this.selectedMeridiem,this.selectedSec)).change()},getText:function(e){return $(e).val()},formatTime:function(e,t,i,s){var o=e+this.options.timeSeparator+t;return this.options.showSeconds&&(o+=this.options.timeSeparator+s),!1===this.options.twentyFour&&(o+=" "+i),o},setHoverState:function(){var e=this;isMobile()||$(this.up).add(this.down).add(this.close).hover(function(){$(this).toggleClass(e.options.hoverState)})},makePickerInputClearable:function(e){$(e).wrap('<div class="clearable-picker"></div>').after("<span data-clear-picker>&times;</span>"),$("[data-clear-picker]").on("click",function(e){$(this).siblings(".hasWickedpicker").val("")})},timeArrayFromString:function(e){if(e.length){var t=e.split(":");return t[2]=t.length<3?"00":t[2],t}return!1},_time:function(){var e=$(this.element).val();return""===e?this.formatTime(this.selectedHour,this.selectedMin,this.selectedMeridiem,this.selectedSec):e},_hide:function(){this.hideTimepicker(this.element)}}),$.fn[pluginName]=function(e,t){return $.isFunction(Wickedpicker.prototype["_"+e])?$(this).hasClass("hasWickedpicker")?void 0!==t?$.data($(this)[t],"plugin_"+pluginName)["_"+e]():$.data($(this)[0],"plugin_"+pluginName)["_"+e]():void 0:this.each(function(){$.data(this,"plugin_"+pluginName)||$.data(this,"plugin_"+pluginName,new Wickedpicker(this,e))})}}(jQuery,window,document);
$(document).ready(function () {
    // Get Current value
    var currentValue = {};
    $('.custom-timepicker').each(function() {
        currentValue[$(this).attr('name')] = $(this).val();
    });
    
    // if CurrentValue empty then set widgetpicker empty value
    $.each(currentValue, function(key, value){
        timePickerInit(value, key);
        $('.custom-timepicker[name="' + key + '"]').val(value);
    });
})

// Global Current Timer Variable
var currentTimer;

// Set Cursor Position
$.fn.setCursorPosition = function (pos) {
    this.each(function (index, elem) {
        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    });
    return this;
};

// Time Picker Init Function
function timePickerInit(timeValue, newTimerName)
{   
    var regexp = /([01][0-9]|[02][0-3]):[0-5][0-9]/,
        isEmptyTime = (typeof timeValue === 'undefined' || timeValue === '') ? true : false;
    // If undefined Time value
    if (!regexp.test(timeValue)){
        var date = new Date();
        var minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
        var hours = (date.getHours()<10?'0':'') + date.getHours();
        timeValue = hours + ":" + minutes;
    }
    
    $('.custom-timepicker[name="' + newTimerName + '"]').wickedpicker({
        now: timeValue,
        twentyFour: true,
        timeSeparator: ':', // The string to put in between hours and minutes (and seconds)
        title: '',
        show: function(timer){
            currentTimer = timer;
            timeKeyPress(currentTimer);
        },
        afterShow: function(){
            var timeValue = $(currentTimer).val(),
                newTimer = $(currentTimer)[0].outerHTML;
            $(currentTimer).replaceWith(newTimer);
            // Init Time Picker
            timePickerInit(timeValue, $(newTimer).attr('name'));
        } 
    });
    
    if( isEmptyTime ){
        $('.custom-timepicker[name="' + newTimerName + '"]').val('');
    }
}

// Timer Key Press User Type
function timeKeyPress(ele){
    $(ele).off('keypress').keypress(function(event){
        var regexs = [/[0-2]/,/[0-9]/,/:/,/[0-5]/,/[0-9]/];
        var key = event.which;
        
        var eleValue =  $(ele).val();
        var enterKey = String.fromCharCode(key);
        var position = this.selectionStart;
        // Concat String
        var string = [eleValue.slice(0, position), enterKey, eleValue.slice(position)].join('');
        
        var characters  = string.split("");

        var isBackspace = key === 8;

        var passed = ! ( characters.length > 6 && ! isBackspace );
        
        if(characters[1] == ':'){
            passed = ! ( characters.length > 4 && ! isBackspace );
        }
        
        for (var i = 0; i < characters.length; i++) 
        {
            var character = characters[i];
            var regex = regexs[i];
            if( i == 1 && characters[0] == 2){
                regex = /[0-3]/;
            }
            if (characters[1] == ':'){
                regexs = [/[0-9]/,/:/,/[0-5]/,/[0-9]/];
                regex = regexs[i];
            }
            try{
                var testFailed = ! regex.test(character) ;

                if( testFailed ) 
                { 
                    passed = false; 
                    break;
                }
            } catch(err) {
                passed = false; 
                break;
            }

        }
        
        if(passed){
            $(ele).val(string);
            $(ele).setCursorPosition(position + 1);
        }

        return passed;
    });
}