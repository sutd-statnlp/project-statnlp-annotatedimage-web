!function(){"use strict";function t(t){t.initialize()}angular.module("statnlpApp",["ngResource","ngAria","ui.router","oc.lazyLoad"]).run(t),t.$inject=["stateHandler"]}(),function(){"use strict";function t(t,e){var a=e.getEndpoint();return t("",{},{getAll:{method:"GET",isArray:!0,url:a+"/data/regions.json"}})}angular.module("statnlpApp").factory("RegionService",t),t.$inject=["$resource","DataService"]}(),function(){"use strict";function t(t,e){var a=e.getEndpoint();return t("",{},{getAll:{method:"GET",isArray:!0,url:a+"/data/images.json"}})}angular.module("statnlpApp").factory("ImageService",t),t.$inject=["$resource","DataService"]}(),function(){"use strict";function t(t){function e(){return a}var a="",n={getEndpoint:e};return n}angular.module("statnlpApp").factory("DataService",t),t.$inject=["$resource"]}(),function(){"use strict";function t(t,e){var a=e.getEndpoint();return t("",{},{getAll:{method:"GET",isArray:!0,url:a+"/data/annotations.json"}})}angular.module("statnlpApp").factory("AnnotationService",t),t.$inject=["$resource","DataService"]}(),function(){"use strict";function t(t,e,a,n){function i(){function t(t){o.image=t[0]}n.getAll({},t,r)}function r(t){console.log(t)}var o=this;o.image={image_id:null,image_rl:null,objects:[]},i()}angular.module("statnlpApp").controller("SidenavRightController",t),t.$inject=["$scope","$state","$ocLazyLoad","ImageService"]}(),function(){"use strict";function t(t,e,a,n){}angular.module("statnlpApp").controller("SidenavController",t),t.$inject=["$scope","$state","$ocLazyLoad","ImageService"]}(),function(){"use strict";function t(t,e){}angular.module("statnlpApp").controller("PageloadController",t),t.$inject=["$scope","$state"]}(),function(){"use strict";function t(t,e,a,n){function i(){function t(t){l.images=t}n.getAll({},t,r)}function r(t){console.log(t)}function o(t){$(".m-menu-item").removeClass("m-item-active");var e=angular.element(t.currentTarget);e.addClass("m-item-active")}a.load("js/admin.js");var l=this;l.images=[],l.imageClick=o,i(),$(document).ready(function(){$(".m-scroll").click(function(){return $("html, body").animate({scrollTop:$($(this).attr("href")).offset().top},500),!1})})}angular.module("statnlpApp").controller("NavbarController",t),t.$inject=["$scope","$state","$ocLazyLoad","ImageService"]}(),function(){"use strict";function t(t){t.state("home",{parent:"app",url:"/",data:{authorities:[]},views:{"content@":{templateUrl:"app/home/home.html",controller:"HomeController",controllerAs:"vm"}}})}angular.module("statnlpApp").config(t),t.$inject=["$stateProvider"]}(),function(){"use strict";function t(t,e,a,n,i,r){function o(){function t(t){m.images=t,m.image=t[0]}n.getAll({},t,g)}function l(){function t(t){m.regions=t[0].regions}i.getAll({},t,g)}function s(){function t(t){m.annotations=t[0].relationships,c(m.region)}r.getAll({},t,g)}function c(t){var e=p(t.region_id);null!==e&&u(t,e)}function u(t,e){t.predicate=e.predicate;for(var a in e)"predicate"!==a&&(t.annotation[a]=e[a]);$("#img-region").elevateZoom({zoomWindowWidth:200,zoomWindowHeight:240,lensFadeIn:500,lensFadeOut:500,scrollZoom:!0})}function d(t){for(var e=0;e<m.image.objects.length;e++){var a=m.image.objects[e];if(a.object_id===t)return a.names[0]}return null}function p(t){for(var e=0;e<m.annotations.length;e++){var a=m.annotations[e];if(a.region_id===t)return a.region_relations}return null}function g(t){console.log(t)}function v(t){var e=$(".m-region").attr("data-label");m.region.annotation[e]=t}a.load("plugins/dropzone/dropzone.js").then(function(){a.load("js/pages/forms/advanced-form-elements.js")}),a.load("js/pages/medias/image-gallery.js");var m=this;m.region={height:57,image_id:1,phrase:"man has raised his arm",region_id:1736,width:67,x:372,y:274,predicate:"",annotation:{}},m.annotations=[],m.image={image_id:null,image_rl:null,objects:[]},m.getObjectNameById=d,m.chooseObject=v,o(),s(),l()}angular.module("statnlpApp").controller("HomeController",t),t.$inject=["$scope","$state","$ocLazyLoad","ImageService","RegionService","AnnotationService"]}(),function(){"use strict";function t(){function t(t,e){if(isNaN(e))return t;if(e<=0)return"";if(t){var a=t.split(/\s+/);a.length>e&&(t=a.slice(0,e).join(" ")+"...")}return t}return t}angular.module("statnlpApp").filter("words",t)}(),function(){"use strict";function t(){function t(t,e,a){if(isNaN(e))return t;if(e<=0)return"";if(t&&t.length>e){if(t=t.substring(0,e),a)for(;" "===t.charAt(t.length-1);)t=t.substr(0,t.length-1);else{var n=t.lastIndexOf(" ");n!==-1&&(t=t.substr(0,n))}return t+"..."}return t}return t}angular.module("statnlpApp").filter("characters",t)}(),function(){"use strict";function t(){function t(t,e,a,n){e.bind("click",function(){n.sort(a.jhSortBy)})}var e={restrict:"A",scope:!1,require:"^jhSort",link:t};return e}angular.module("statnlpApp").directive("jhSortBy",t)}(),function(){"use strict";function t(){var t={restrict:"A",scope:{predicate:"=jhSort",ascending:"=",callback:"&"},controller:e,controllerAs:"vm",bindToController:!0};return t}function e(t,e){function a(t){var e=t.find("span.glyphicon"),a="glyphicon-sort",n="glyphicon-sort-by-attributes",i="glyphicon-sort-by-attributes-alt",r=a+" "+i,l=n;o.ascending||(r=a+" "+n,l=i),o.resetClasses(),e.removeClass(r),e.addClass(l)}function n(){var t=e.find("span.glyphicon"),a="glyphicon-sort",n="glyphicon-sort-by-attributes",i="glyphicon-sort-by-attributes-alt";t.removeClass(n+" "+i),t.addClass(a)}function i(e){e!==o.predicate?o.ascending=!0:o.ascending=!o.ascending,o.predicate=e,t.$apply(),o.callback()}function r(t){o.resetClasses(),t&&"_score"!==t[0]&&o.applyClass(e.find("th[jh-sort-by='"+t[0]+"']"))}var o=this;o.applyClass=a,o.resetClasses=n,o.sort=i,o.triggerApply=r,t.$watchGroup(["vm.predicate","vm.ascending"],o.triggerApply),o.triggerApply()}angular.module("statnlpApp").directive("jhSort",t),e.$inject=["$scope","$element"]}(),function(){"use strict";function t(){function t(t){if(0===t.length)throw new Error("input must not be of zero length");var e=t.split(","),a={};return angular.forEach(e,function(t){var e=t.split(">;");if(2!==e.length)throw new Error('section could not be split on ">;"');var n=e[0].replace(/<(.*)/,"$1").trim(),i={};n.replace(new RegExp("([^?=&]+)(=([^&]*))?","g"),function(t,e,a,n){i[e]=n});var r=i.page;angular.isString(r)&&(r=parseInt(r));var o=e[1].replace(/rel="(.*)"/,"$1").trim();a[o]=r}),a}var e={parse:t};return e}angular.module("statnlpApp").factory("ParseLinks",t)}(),function(){"use strict";angular.module("statnlpApp").constant("errorConstants",function(){var t="http://www.jhipster.tech/problem";return{EMAIL_ALREADY_USED_TYPE:t+"/email-already-used",LOGIN_ALREADY_USED_TYPE:t+"/login-already-used",EMAIL_NOT_FOUND_TYPE:t+"/email-not-found"}}())}(),function(){"use strict";function t(t){function e(t){return t?new Date(t):null}function a(t){if(t){var e=t.split("-");return new Date(e[0],e[1]-1,e[2])}return null}function n(e){return e?t("date")(e,"yyyy-MM-dd"):null}function i(){return"yyyy-MM-dd"}var r={convertDateTimeFromServer:e,convertLocalDateFromServer:a,convertLocalDateToServer:n,dateformat:i};return r}angular.module("statnlpApp").factory("DateUtils",t),t.$inject=["$filter"]}(),function(){"use strict";function t(t){function e(t){return angular.isString(t)?t.length<30?t:t?t.substring(0,15)+"..."+t.slice(-10):"":""}function a(t){function e(t,e){return e.indexOf(t,e.length-t.length)!==-1}function a(t){return e("==",t)?2:e("=",t)?1:0}function n(t){return t.length/4*3-a(t)}function i(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")+" bytes"}return angular.isString(t)?i(n(t)):""}function n(e,a){t.open("data:"+e+";base64,"+a,"_blank","height=300,width=400")}function i(t,e){var a=new FileReader;a.readAsDataURL(t),a.onload=function(t){var a=t.target.result.substr(t.target.result.indexOf("base64,")+"base64,".length);e(a)}}var r={abbreviate:e,byteSize:a,openFile:n,toBase64:i};return r}angular.module("statnlpApp").factory("DataUtils",t),t.$inject=["$window"]}(),function(){"use strict";function t(){function t(t){return null!==t&&(t=t.toLowerCase(),t=t.substring(0,1).toUpperCase()+t.substring(1)),t}return t}angular.module("statnlpApp").filter("capitalize",t)}(),function(){"use strict";function t(){function t(t){for(var e,n,i,r,o,l,s,c="",u=0;u<t.length;)e=t.charCodeAt(u++),n=t.charCodeAt(u++),i=t.charCodeAt(u++),r=e>>2,o=(3&e)<<4|n>>4,l=(15&n)<<2|i>>6,s=63&i,isNaN(n)?l=s=64:isNaN(i)&&(s=64),c=c+a.charAt(r)+a.charAt(o)+a.charAt(l)+a.charAt(s);return c}function e(t){var e,n,i,r,o,l,s,c="",u=0;for(t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"");u<t.length;)r=a.indexOf(t.charAt(u++)),o=a.indexOf(t.charAt(u++)),l=a.indexOf(t.charAt(u++)),s=a.indexOf(t.charAt(u++)),e=r<<2|o>>4,n=(15&o)<<4|l>>2,i=(3&l)<<6|s,c+=String.fromCharCode(e),64!==l&&(c+=String.fromCharCode(n)),64!==s&&(c+=String.fromCharCode(i));return c}var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n={decode:e,encode:t};return n}angular.module("statnlpApp").factory("Base64",t)}(),function(){"use strict";function t(t,e,a,n){function i(){t.VERSION=n;var e=t.$on("$stateChangeStart",function(e,n,i,r){t.toState=n,t.toStateParams=i,t.fromState=r,n.external&&(e.preventDefault(),a.open(n.url,"_self"))}),i=t.$on("$stateChangeSuccess",function(t,e,n,i,r){var o="StatNLP Annotation";e.data.pageTitle&&(o=e.data.pageTitle),a.document.title=o});t.$on("$destroy",function(){angular.isDefined(e)&&null!==e&&e(),angular.isDefined(i)&&null!==i&&i()})}return{initialize:i}}angular.module("statnlpApp").factory("stateHandler",t),t.$inject=["$rootScope","$state","$window","VERSION"]}(),function(){"use strict";function t(t,e){t.otherwise("/"),e.type("boolean",{name:"boolean",decode:function(t){return t===!0||"true"===t},encode:function(t){return t?1:0},equals:function(t,e){return this.is(t)&&t===e},is:function(t){return[!0,!1,0,1].indexOf(t)>=0},pattern:/bool|true|0|1/})}angular.module("statnlpApp").config(t),t.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider"]}(),function(){"use strict";function t(t){t.html5Mode({enabled:!0,requireBase:!0})}angular.module("statnlpApp").config(t),t.$inject=["$locationProvider"]}(),function(){"use strict";function t(t,e){t.debugInfoEnabled(e)}angular.module("statnlpApp").config(t),t.$inject=["$compileProvider","DEBUG_INFO_ENABLED"]}(),function(){"use strict";function t(t){t.state("app",{abstract:!0,views:{navbar:{templateUrl:"app/layouts/navbar/navbar.html",controller:"NavbarController",controllerAs:"vm"},pageload:{templateUrl:"app/layouts/pageload/pageload.html",controller:"PageloadController",controllerAs:"vm"},sidenav:{templateUrl:"app/layouts/sidenav/sidenav.html",controller:"SidenavController",controllerAs:"vm"},"sidenav-right":{templateUrl:"app/layouts/sidenav-right/sidenav-right.html",controller:"SidenavRightController",controllerAs:"vm"}}})}angular.module("statnlpApp").config(t),t.$inject=["$stateProvider"]}(),function(){"use strict";angular.module("statnlpApp").constant("VERSION","0.0.1-SNAPSHOT").constant("DEBUG_INFO_ENABLED",!1).constant("BUILD_TIMESTAMP",1518600049762)}(),function(){angular.module("statnlpApp").run(["$templateCache",function(t){t.put("app/home/home.html",'<aside class="rightsidebar m-sidenav"><!-- Menu --><div class="menu"><ul class="list m-objects" data-step="1" data-intro=\'Choose the object for label "agent"\'><li><!-- <a href="/">\n                            <i class="material-icons">home</i>\n                            <span>Home</span>\n                        </a> --></li><li class="active" ng-repeat="item in vm.image.objects" ng-click="vm.chooseObject(item.object_id)"><a href=""><span class="text-capitalize">{{$index + 1}}. {{item.names[0]}}</span></a></li></ul></div><!-- #Menu --><div class="legal"><div class="copyright"><a href="javascript:void(0);">SUTD STATNLP</a> &copy; 2018</div><div class="version"><b>Version: </b>1.0.0-beta</div></div></aside><div class="container-fluid"><!-- Advanced Select --><div id="annotation" class="row clearfix"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><div class="card m-region-image"><div class="header"><h2>REGION IMAGE</h2></div><div class="body"><div id="aniimated-thumbnials" class="list-unstyled row clearfix"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><a href="{{\'./data/images/\' + vm.region.region_id + \'.jpg\'}}" data-sub-html="{{vm.region.phrase}}" data-zoom-image="{{\'./data/images/\' + vm.region.region_id + \'.jpg\'}}"><img id="img-region" class="img-responsive" width="{{vm.region.width}}" height="{{vm.region.height}}" ng-src="{{\'./data/images/\' + vm.region.region_id + \'.jpg\'}}"></a></div></div></div></div></div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6"><div class="card"><div class="header"><h2>ANNOTAIONS & REGIONS</h2></div><div class="body m-region" data-label=""><div class="row clearfix"><div class="col-md-12"><p>Verb: <b class="col-blue">{{vm.region.predicate}}</b></p><p>Description: <b class="col-blue">{{vm.region.phrase}}</b></p><br><div ng-repeat="(key,value) in vm.region.annotation" class="col-md-6 m-label"><b>{{key}}</b> <span class="label label-primary">{{vm.getObjectNameById(value)}}</span></div></div></div></div></div></div></div><!-- #END# Advanced Select --><div id="upload" class="row clearfix"><div class="col-lg-10 col-md-10 col-sm-10 col-xs-10"><div class="card"><div class="header"><h2>IMAGE UPLOAD - DRAG & DROP OR WITH CLICK & CHOOSE</h2></div><div class="body"><form action="/" id="frmFileUpload" class="dropzone" method="post" enctype="multipart/form-data"><div class="dz-message"><div class="drag-icon-cph"><i class="material-icons">touch_app</i></div><h3>Drop images here or click to upload.</h3></div><div class="fallback"><input name="file" type="file" multiple="multiple" accept="image/*"></div></form></div></div></div></div></div>'),t.put("app/layouts/navbar/navbar.html",'<nav class="navbar m-navbar"><div class="container-fluid"><div class="navbar-header"><a href="javascript:void(0);" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"></a> <a href="javascript:void(0);" class="bars"></a> <a class="navbar-brand" href="index.html">StatNLP - ANNOTATED IMAGES</a></div><div class="collapse navbar-collapse" id="navbar-collapse"><ul class="nav navbar-nav navbar-right"><li><a onclick="introJs().start();" role="button"><i class="material-icons">help</i></a></li><li><a href="#annotation" class="m-scroll" role="button"><i class="material-icons">panorama</i></a></li><li><a href="#upload" class="m-scroll" role="button"><i class="material-icons">file_upload</i></a></li><li class="dropdown"><a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button"><i class="material-icons">collections</i> <span class="label-count">{{ vm.images.length}}</span></a><ul class="dropdown-menu"><li class="header">Images</li><li class="body"><ul class="menu"><li class="m-menu-item" ng-click="vm.imageClick($event)" ng-repeat="item in vm.images"><a href="javascript:void(0);"><div class="icon-circle"><img class="img-circle" ng-src="{{item.image_rl}}" width="40" height="40"></div><div class="menu-info p-l-5"><h4>Image {{item.image_id}}</h4><p><i class="material-icons">view_comfy</i> {{item.objects.length}} objects</p></div></a></li></ul></li></ul></li></ul></div></div></nav>'),t.put("app/layouts/pageload/pageload.html",'<div class="page-loader-wrapper"><div class="loader"><div class="preloader"><div class="spinner-layer pl-blue"><div class="circle-clipper left"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div><p>Please wait...</p></div></div>'),t.put("app/layouts/sidenav/sidenav.html",'<aside id="leftsidebar" class="sidebar m-sidenav"><div class="legal"><p>Definition of verb</p><p>Definition of roles</p><p>Example</p></div><!-- Menu --><div class="menu"><ul class="list"><li class="active"><!-- <a href="/">\n                    <i class="material-icons">home</i>\n                    <span>Home</span>\n                </a> --></li><li><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-t-20"><button type="button" class="btn bg-blue btn-block btn-lg waves-effect" data-step="4" data-intro="Click save or use shortcut Ctrl + S for saving annotation">Save (Ctrl + S)</button></div></li><li><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-t-20"><button type="button" class="btn bg-blue btn-block btn-lg waves-effect">Ambiguous (Ctrl + B)</button></div></li><li id="btn-nextrole"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-t-20"><button type="button" class="btn bg-blue btn-block btn-lg waves-effect" data-step="2" data-intro="Click next role or use shortcut Shift + A for choosing the next label">Next role (Shift + A)</button></div></li><li id="btn-prevrole"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-t-20"><button type="button" class="btn bg-blue btn-block btn-lg waves-effect" data-step="3" data-intro="Click previous role or use shortcut Shift + S for choosing the previous label">Previous role (Shift + S)</button></div></li></ul></div><!-- #Menu --></aside>'),t.put("app/layouts/sidenav-right/sidenav-right.html","")}])}();