	$(function(){
		//load函数是异步的，后面获取数据回调函数
		$("#header").load("header.html",function(){
			// console.log($("#header"));
			var textNav = $("#textNav");
			// console.log(textNav);
			var navAli = $("#textNav>li");
			// console.log(navAli);
			var textBox = $("#textNav>li>.text-box")
			// console.log(textBox);
			// var textBoxAli = $("#textNav>li>.text-box>li");
			// console.log(textBoxAli);

			//左侧导航的移入移出
			$.each(navAli,function(){
				// console.log(1);
				$(this).hover(function(){
					textBox.eq($(this).index()).css("display","block");
				},function(){
					textBox.eq($(this).index()).css("display","none");
				})
			})
			
		});
		
	})

	//轮播图
	$(function(){
		var oLunbo = $("#lunbo");
		var oUl = $("#lunbo>ul");
		var aLi = $("#lunbo>ul>li");
		var oBtn = $("#lunbo-btn>a");
		var aCircle = $("#circle>span")
		var aLunboRightA = $("#lunbo-right>a");
		// console.log(aLunboRightA);
		var iNow=0;
		var timer = null;
		aLi.eq(0).clone().appendTo(oUl);

		//自动轮播
		timer = setInterval(function(){
			iNow++;
			oUl.stop(true).animate({"left":-iNow*aLi.eq(0).width()},function(){
				if(iNow==aLi.length){
					iNow=0;
					oUl.css("left",0);
					aCircle.eq(iNow).addClass("active").siblings().removeClass("active");
				}
				aCircle.eq(iNow).addClass("active").siblings().removeClass("active");
			})
		},3000)

		//移入移出
		oBtn.each(function(){
				$(this).stop(true).hide();
			})
		oLunbo.mouseover(function(){
			clearInterval(timer);
			oBtn.each(function(){
				$(this).stop(true).fadeIn();
			})
		})

		oLunbo.mouseout(function(){
			oBtn.each(function(){
				$(this).stop(true).fadeOut();
			})
			timer = setInterval(function(){
				iNow++;
				oUl.stop(true).animate({"left":-iNow*aLi.eq(0).width()},function(){
					if(iNow==aLi.length){
						iNow=0;
						oUl.css("left",0);
						aCircle.eq(iNow).addClass("active").siblings().removeClass("active");
					}
					aCircle.eq(iNow).addClass("active").siblings().removeClass("active");
				})
			},3000)
		})

		//按钮点击
		oBtn.eq(0).click(function(){
			if(iNow==0){
				iNow=$("#lunbo>ul>li").length-1;
				oUl.css("left",-iNow*aLi.eq(0).width());
				aCircle.eq(iNow).addClass("active").siblings().removeClass("active");
			}
				iNow--;
				oUl.stop(true).animate({"left":-iNow*aLi.eq(0).width()});
				aCircle.eq(iNow).addClass("active").siblings().removeClass("active");
			
		})

		oBtn.eq(1).click(function(){
			iNow++;
			console.log($("#lunbo>ul>li").length);
			if(iNow==($("#lunbo>ul>li").length-1)){
				console.log(iNow);
				// oUl.stop(true).animate({"left":-iNow*aLi.eq(0).width()});
				iNow=0;
				oUl.css("left",-iNow*aLi.eq(0).width());
				aCircle.eq(iNow).addClass("active").siblings().removeClass("active");
			}
					
				oUl.stop(true).animate({"left":-iNow*aLi.eq(0).width()});
				aCircle.eq(iNow).addClass("active").siblings().removeClass("active");
			
		})

		//小圆点
		aCircle.on("click",function(){
			$(this).addClass("active").siblings().removeClass("active");
		})

		// aLunboRightA.mouseover(function(){
		// 	$(this).stop(true).delay(800).css("right","40");
		// })
		// console.log(aLunboRightA);
		$.each(aLunboRightA,function(){
			$(this).mouseover(function(){
				// console.log($(this).children())
				// console.log($(this).index())
				$(this).stop(true).animate({"left":-4,"opacity":0.8},300);
				console.log($(this).children().eq(0))
				// $(this).children().eq(0).stop(true).animate({"left":-500,"opacity":0})
				// console.log($(this).css("left"));
			})
			$(this).mouseout(function(){
				$(this).stop(true).animate({"left":0,"opacity":1},300);
			})
		})

	})

	//限时推荐
	$(function(){
		var oLimit = $("#limit-time");
		$.ajax({
			type:"GET",
			dataType:"JSON",
			url:"../json/limit-time.json",
			success:function(data){
				// console.log(data);
				var str = "";
				str+="<ul>";
				for(var i=0;i<data.length;i++){
					str+="<li class='limit-img'><a href='##'><img src="+data[i].img+"></a></li>";
				}
				str+="</ul>";
				// console.log(str);
				oLimit.append(str);

				//第四张图放大效果
				// console.log($("#limit-time>ul>.limit-img>a>img"))
				$("#limit-time>ul>.limit-img>a>img").eq(3).mouseover(function(){
					// console.log(1);
					$(this).stop(true).animate({"width":250,"height":220,"margin-left":-10,"margin-top":-10},50);
				})

				$("#limit-time>ul>.limit-img>a>img").eq(3).mouseout(function(){
					// console.log(1);
					$(this).stop(true).animate({"width":230,"height":200,"margin-left":0,"margin-top":0},50);
				})
			}
		})

		
		
	})

	//水果蛋糕
	$(function(){
		var oUl = $("#main1>.fruit-cake>.goods>ul");
		// console.log(oUl);
		$.ajax({
			type:"GET",
			dataType:"JSON",
			url:"../json/fruit-cake.json",
			success:function(data){
				var str ="";
				for(var i=0;i<data.length;i++){
					str+="<li>";
					str+="<a href='##'><img src='"+data[i].img+"'/><p>"+data[i].title+"</p><p>"+data[i].price+"</p></a>";
					str+="</li>";
				}
				// console.log(str);
				oUl.append(str);

				oUl.on("mouseover","li",function(){
					$(this).find("p").css("color","orange");
				})
				oUl.on("mouseout","li",function(){
					$(this).find("p").css("color","black");
				})
			}
		})
	})

	//鲜花
	$(function(){
		var oUl = $("#main1>.flower>.goods>ul");
		// console.log(oUl);
		$.ajax({
			type:"GET",
			dataType:"JSON",
			url:"../json/flower.json",
			success:function(data){
				var str ="";
				for(var i=0;i<data.length;i++){
					str+="<li>";
					str+="<a href='##'><img src='"+data[i].img+"'/><p>"+data[i].title+"</p><p>"+data[i].price+"</p></a>";
					str+="</li>";
				}
				// console.log(str);
				oUl.append(str);

				oUl.on("mouseover","li",function(){
					$(this).find("p").css("color","orange");
				})
				oUl.on("mouseout","li",function(){
					$(this).find("p").css("color","black");
				})
			}
		})
	})


	//组合
	$(function(){
		var oUl = $("#main1>.group>.goods>ul");
		// console.log(oUl);
		$.ajax({
			type:"GET",
			dataType:"JSON",
			url:"../json/group.json",
			success:function(data){
				var str ="";
				for(var i=0;i<data.length;i++){
					str+="<li>";
					str+="<a href='##'><img src='"+data[i].img+"'/><p>"+data[i].title+"</p><p>"+data[i].price+"</p></a>";
					str+="</li>";
				}
				// console.log(str);
				oUl.append(str);

				oUl.on("mouseover","li",function(){
					$(this).find("p").css("color","orange");
				})
				oUl.on("mouseout","li",function(){
					$(this).find("p").css("color","black");
				})
			}
		})
	})


	//彩虹蛋糕
	$(function(){
		var oUl = $("#main1>.rainbow-cake>.goods>ul");
		// console.log(oUl);
		$.ajax({
			type:"GET",
			dataType:"JSON",
			url:"../json/rainbow-cake.json",
			success:function(data){
				var str ="";
				for(var i=0;i<data.length;i++){
					str+="<li>";
					str+="<a href='##'><img src='"+data[i].img+"'/><p>"+data[i].title+"</p><p>"+data[i].price+"</p></a>";
					str+="</li>";
				}
				// console.log(str);
				oUl.append(str);

				oUl.on("mouseover","li",function(){
					$(this).find("p").css("color","orange");
				})
				oUl.on("mouseout","li",function(){
					$(this).find("p").css("color","black");
				})
			}
		})
	})

	//礼物
	$(function(){
		var oUl = $("#main1>.gift>.goods>ul");
		// console.log(oUl);
		$.ajax({
			type:"GET",
			dataType:"JSON",
			url:"../json/gift.json",
			success:function(data){
				var str ="";
				for(var i=0;i<data.length;i++){
					str+="<li>";
					str+="<a href='##'><img src='"+data[i].img+"'/><p>"+data[i].title+"</p><p>"+data[i].price+"</p></a>";
					str+="</li>";
				}
				// console.log(str);
				oUl.append(str);

				oUl.on("mouseover","li",function(){
					$(this).find("p").css("color","orange");
				})
				oUl.on("mouseout","li",function(){
					$(this).find("p").css("color","black");
				})
			}
		})
	})

	$(function(){
		$("#footer").load("footer.html",function(){
			
		})
	})