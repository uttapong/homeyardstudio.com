(function(a){"function"===typeof define&&define.amd?define(["jquery","./effect"],a):a(jQuery)})(function(a){return a.effects.effect.transfer=function(e,k){var f=a(this),b=a(e.to),g="fixed"===b.css("position"),c=a("body"),h=g?c.scrollTop():0,c=g?c.scrollLeft():0,d=b.offset(),b={top:d.top-h,left:d.left-c,height:b.innerHeight(),width:b.innerWidth()},d=f.offset(),l=a("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(e.className).css({top:d.top-h,left:d.left-c,height:f.innerHeight(),
width:f.innerWidth(),position:g?"fixed":"absolute"}).animate(b,e.duration,e.easing,function(){l.remove();k()})}});