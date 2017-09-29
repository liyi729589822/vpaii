	// header
	$(function(){
		//load函数是异步的，后面获取数据回调函数
		$("#header").load("header.html",function(){
			var textNav = $("#textNav");
			var navAli = $("#textNav>li");
			var textBox = $("#textNav>li>.text-box")
			var oI = textNav.prev();
			// console.log(oI);
			// 导航栏移入
			oI.parent().on("mouseover",function(){
				oI.removeClass("icon-down-trangle").addClass("icon-xiangxia");
			})
			oI.parent().on("mouseout",function(){
				oI.removeClass("icon-xiangxia").addClass("icon-down-trangle");
			})

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



	//cartoon-goods
	$(function(){
		var oCartoonGoods = $("#cartoon-goods");
		// console.log(oCartoonGoods);
		$.ajax({
			type:"POST",
			dataType:"JSON",
			url:"../json/cartoon-cake.json",
			success:function(data){
				var pageLen = 12;
				var pageNum = Math.ceil(data.length/pageLen);
				//页数加载进去
				for(var i=0;i<pageNum;i++){
					var a = $("<a href='##' class='page'>"+(i+1)+"</a>");
					$("#fenye>.last").before(a);
				}
				// console.log()
				//如何让我的页面只加载12个数据
				datapage(0)
				function datapage(n){
					var str = '';
					str+="<ul>";	
					for(var i=n*pageLen;i<Math.min(data.length,(n+1)*pageLen);i++){
						str+="<li><a href='##'>";
						str+="<img src='"+data[i].img+"''>";
						str+="<p><span>￥"+data[i].price+"元</span><span>"+data[i].peopleNum+"人付款</span></p>";
						str+="<p>"+data[i].title+"</p></a>";
						str+="<p><span><input type='text' value='1'/></span><span><a href='##' class='add'><button>+</button></a><a href='##' class='sub'><button>-</button></a></span><span><a href='##'>加入购物车</a></span></p>";
						str+="</li>";
					}
					str+="</ul>";
					oCartoonGoods.empty();
					oCartoonGoods.append(str);
				};

				//点击换页
				var now = 1;
				var aPage = $(".page");
				aPage.eq(0).addClass("active");
				aPage.each(function(){
					$(this).on("click",function(){
						datapage($(this).index()-1);
						now = $(this).index();
						$(this).addClass("active").siblings().removeClass("active");
					})
				})

				$(".first").on("click",function(){
					if(now==1){
						aPage.eq(0).addClass("active").siblings().removeClass("active");
						return ;
					}else{
						datapage(now-2);
						aPage.eq(now-2).addClass("active").siblings().removeClass("active");
						now--;
					}
				})

				$(".last").on("click",function(){
					if(now==pageNum){
						aPage.eq(pageNum).addClass("active").siblings().removeClass("active");
						return ;
					}else{
						datapage(now);
						aPage.eq(now).addClass("active").siblings().removeClass("active");
						now++;
					}
				})
			},
			error:function(){
				console.log(1);
			}
		})


	})

	// footer
	$(function(){
		$("#footer").load("footer.html",function(){
			
		})
	})