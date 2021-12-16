function initCounter() {
  (function ($) {
    $.fn.charCount = function (newvalue, newword) {
      this.newvalue = newvalue;
      var defaults = {
        maxlimit: 140,
        becareful: 25,
        css: "counter",
        newvalue: "span",
        warn: "warning",
        cssExceeded: "exceeded",
        counterText: "",
      };
      var newword = $.extend(defaults, newword);

      function calculate(obj, newvalue) {
        newvalue.attr("disabled", "disabled");
        var countnew1 = $(obj).val().length;
        var thisavali = newword.maxlimit - countnew1;
        $("#form").submit(function () {
          if ($.trim($("#thistweettext").val()) === "") {
            $("#error").show().text("Please enter text of the Tweet!");
            return false;
          }
        });
        console.log(newword.warn);
        console.log(thisavali);
        if (thisavali <= defaults.becareful && thisavali >= 0 ) {
          $("#newvalue").next().addClass(newword.warn);
          
        } else {
          $("#newvalue").next().removeClass(newword.warn);
        }
        if (thisavali < 0) {
            $("#newvalue").next().addClass(newword.cssExceeded);
            $("#error").css({ display: "block" });
          } else {
            $("#newvalue").next().removeClass(newword.cssExceeded);
            $("#error").css({ display: "none" });
            newvalue.removeAttr("disabled");
          }
        
        $("#newvalue")
          .next()
          .html(newword.counterText + thisavali);
      }
      this.each(function () {
        $(this).after(
          "<" +
            newword.counterElement +
            ' class="' +
            newword.css +
            '">' +
            newword.counterText +
            "" +
            "</" +
            newword.counterElement +
            ">"
        );
        calculate(this, newvalue);
        $(this).keyup(function () {
          calculate(this, newvalue);
        });
        $(this).change(function () {
          calculate(this, newvalue);
        });
      });
    };
  })(jQuery);
}
