// Addition to get the url param
var urlParam = function (name) {
  var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
    window.location.href
  );
  if (results == null) {
    return null;
  } else {
    return results[1] || 0;
  }
};

/*********** Start back to the list same vertical position ***********/
var globalLastListPosition = 0;
/*********** End back to the list same vertical position *************/

/*! jQuery ResponsiveIframe - v0.0.3 - 2013-09-05
 * https://github.com/npr/responsiveiframe
 * Copyright (c) 2013 Irakli Nadareishvili; Licensed MIT, GPL */
if (typeof jQuery !== "undefined") {
  (function ($) {
    var settings = {
      xdomain: "*",
      ie: navigator.userAgent.toLowerCase().indexOf("msie") > -1,
      scrollToTop: true,
    };
    var firstTime = 2; // hides first time scrolling
    var methods = {
      // initialization for the parent, the one housing this
      init: function () {
        return this.each(function (self) {
          var $this = $(this);
          var _archmsg = function () {
            privateMethods.messageHandler($this, event);
          };
          if (window.postMessage) {
            if (window.addEventListener) {
              window.addEventListener("message", _archmsg.bind(event), false);
            } else if (window.attachEvent) {
              window.attachEvent(
                "onmessage",
                function _archmsg(e) {
                  privateMethods.messageHandler($this, e);
                },
                $this
              );
            }
          } else {
            setInterval(function () {
              var hash = window.location.hash,
                matches = hash.match(/^#h(\d+)(s?)$/);
              if (matches) {
                alert("ds");
                privateMethods.setHeight($this, matches[1]);
                if (settings.scrollToTop && matches[2] === "s") {
                  scroll(0, 0);
                }
              }
            }, 150);
          }
        });
      },
    };

    var privateMethods = {
      messageHandler: function (elem, e) {
        var height, r, matches, strD;

        if (settings.xdomain !== "*") {
          var regex = new RegExp(settings.xdomain + "$");
          if (e.origin == "null") {
            throw new Error(
              "messageHandler( elem, e): There is no origin.  You are viewing the page from your file system.  Please run through a web server."
            );
          }
          if (e.origin.match(regex)) {
            matches = true;
          } else {
            throw new Error(
              "messageHandler( elem, e): The orgin doesn't match the responsiveiframe  xdomain."
            );
          }
        }

        if (settings.xdomain === "*" || matches) {
          strD = e.data + "";
          r = strD.match(/^(\d+)(s?)$/);
          if (r && r.length === 3) {
            height = parseInt(r[1], 10);
            if (!isNaN(height)) {
              try {
                height = height + 20; // footer
                privateMethods.setHeight(elem, height);
              } catch (ex) {}
            }
          }
          if (settings.scrollToTop /*&& r[2] === "s"*/) {
            // Settings for responsive scrolling (addition instead  scroll(0,0);)
            // if its deeplinking set the counter to 0
            if (urlParam("shrPrm")) {
              firstTime = 0;
            }

            if (firstTime != 0) {
              if (firstTime == 2) {
                firstTime = 1;
              } else {
                firstTime = 0;
              }
            } else {
              var scrollPoint = 0;
              /*********** Start back to the list same vertical position ***********/
              var ListPositionDone = false;
              /*********** End back to the list same vertical position ***********/
              if ($("#shrAnchor").length) {
                /*********** Start back to the list same vertical position ***********/
                /** instead of only the below row
                 *  scrollPoint = $("#shrAnchor").offset().top;
                 */
                if (
                  typeof e.data["ComingFromDetail"] !== "undefined" &&
                  e.data["ComingFromDetail"] === true
                ) {
                  // in case that we are coming back from product details page to the list we save previous scroll position on product list page
                  globalLastListPosition =
                    e.data["ScrollPagePosition"] + $("#shrFrm").offset().top;
                  scrollPoint = globalLastListPosition;
                } else {
                  if (
                    typeof e.data["ScrollPagePosition"] !== "undefined" &&
                    e.data["ScrollPagePosition"] > 0
                  ) {
                    scrollPoint = e.data["ScrollPagePosition"];
                  } else {
                    if (globalLastListPosition > 0) {
                      scrollPoint = globalLastListPosition;
                      ListPositionDone = true;
                    } else {
                      scrollPoint = $("#shrAnchor").offset().top;
                    }
                  }
                }
                /*********** End back to the list same vertical position *************/
              } else {
                removeEventListener("message", this);
                if ($("#shrFrm").offset())
                  scrollPoint = $("#shrFrm").offset().top;
              }

              // Fast scrolltop (1ms) => will be doublecalled but its no problem

              /*********** Start back to the list same vertical position ***********/
              if (ListPositionDone === true) {
                globalLastListPosition = 0;
              }
              /*********** End back to the list same vertical position *************/
            }
          }
          // End of the addition
          //} //was the if (settings.xdomain === '*' || matches)
        }
      },
      // Sets the height of the iframe
      setHeight: function (elem, height) {
        elem.css("height", height + "px");
      },
      getDocHeight: function () {
        var D = document;
        return Math.min(
          Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
          Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
          Math.max(D.body.clientHeight, D.documentElement.clientHeight)
        );
      },
    };

    $.fn.responsiveIframe = function (method) {
      if (methods[method]) {
        return methods[method].apply(
          this,
          Array.prototype.slice.call(arguments, 1)
        );
      } else if (typeof method === "object" || !method) {
        $.extend(settings, arguments[0]);
        return methods.init.apply(this);
      } else {
        $.error(
          "Method " + method + " does not exist on jQuery.responsiveIframe"
        );
      }
    };
  })(jQuery);
}

(function () {
  var self,
    module,
    ResponsiveIframe = function () {
      self = this;
    };

  ResponsiveIframe.prototype.allowResponsiveEmbedding = function () {
    if (window.addEventListener) {
      window.addEventListener("load", self.messageParent, false);
      window.addEventListener("resize", self.messageParent, false);
    } else if (window.attachEvent) {
      window.attachEvent("onload", self.messageParent);
      window.attachEvent("onresize", self.messageParent);
    }
  };

  ResponsiveIframe.prototype.messageParent = function (scrollTop) {
    var h = document.body.offsetHeight;
    h = scrollTop ? h + "s" : h;
    if (top.postMessage) {
      top.postMessage(h, "*");
    } else {
      window.location.hash = "h" + h;
    }
  };

  function responsiveIframe() {
    return new ResponsiveIframe();
  }

  // expose
  if ("undefined" === typeof exports) {
    window.responsiveIframe = responsiveIframe;
    /*  window.removecazzo=function (){
      
    } */
  } else {
    module.exports.responsiveIframe = responsiveIframe;
  }
})();
