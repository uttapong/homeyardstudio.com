(function(a){"function"===typeof define&&define.amd?define(["jquery","./effect"],a):a(jQuery)})(function(a){return a.effects.effect.explode=function(f,u){function v(){m.push(this);m.length===g*l&&(b.css({visibility:"visible"}),a(m).remove(),c||b.hide(),u())}var g=f.pieces?Math.round(Math.sqrt(f.pieces)):3,l=g,b=a(this),c="show"===a.effects.setMode(b,f.mode||"hide"),t=b.show().css("visibility","hidden").offset(),h=Math.ceil(b.outerWidth()/l),k=Math.ceil(b.outerHeight()/g),m=[],d,e,n,p,q,r;for(d=0;d<
g;d++)for(p=t.top+d*k,r=d-(g-1)/2,e=0;e<l;e++)n=t.left+e*h,q=e-(l-1)/2,b.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-e*h,top:-d*k}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:h,height:k,left:n+(c?q*h:0),top:p+(c?r*k:0),opacity:c?0:1}).animate({left:n+(c?0:q*h),top:p+(c?0:r*k),opacity:c?1:0},f.duration||500,f.easing,v)}});