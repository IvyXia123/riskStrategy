function myCanvas(id,data,trigger,idSuffix){
	if(id == null)return;
	$(id).children("canvas").remove();
	var dom = document.getElementById(id);
	// 如果当前要创建的canvas已经存在就删掉重新创建；
	if($(dom).children("#"+id+idSuffix).length > 0){
		$(dom).children("#"+id+idSuffix).remove();
	}
	var myCanvas = new drawCanvas(dom,data,trigger,idSuffix);
	return myCanvas.draw();
}

function drawCanvas(dom,data,trigger,idSuffix){
	this.width  = dom.offsetWidth;
	this.height = dom.offsetHeight;
	this.id     = dom;
	this.trigger = !trigger ? 'action' : trigger;
	// 转义宽高
	this.data   = JSON.parse(JSON.stringify(data));
	this.clear  = []; // 定时器放置 
	this.maxRadius = 0; // 最大半径,圆内折线使用
	this.draw = function(){
		var self = this;
		// 创建<canvas>。后缀为after的canvas不绑定数据、 后缀为before的canvas与数据绑定
		var h = self.height;
		var w = self.width;
		var bor = -(w - self.id.clientWidth)/2;
		var id = self.id.id+idSuffix; // 设置id
		var myCanvas = document.createElement('canvas');
			myCanvas.setAttribute('width',w+'px');
			myCanvas.setAttribute("height",h+'px');
			myCanvas.setAttribute("id",id);
			$(myCanvas).css({'position':'absolute','top':bor,'left':bor});
		self.id.appendChild(myCanvas);
		// 创建完成，修改 self.id指向
		self.id  = document.getElementById(id);
		self.ctx = self.id.getContext('2d');
		self.animationList = 0; 
		for(var i = 0;i < self.data.length;i++){
			if(self.data[i].type == "Test"){
				self.animationList += self.data[i].texts.length;
			}else if(self.data[i].type == "line"){
				self.animationList += self.data[i].radii.length+self.data[i].texts.length;
			}else{
				self.animationList += self.data[i].path.length;
			};
			if(self.data[i].R > self.maxRadius){
				self.maxRadius = self.data[i].R;
			};
			self.clear.push({'timer':""});
			// 原点
			if(!self.data[i].centerDot){
				self.data[i].centerDot  = [];
			}
			// 是否需要动画
			if(self.data[i].animate){
				(function(i,n){
					var x = i;
					setTimeout(function(){
						self.animation(x);
					},self.data[x].speed*100);
				})(i);
			}else{
				// 作用于提升，解决层级问题
				(function(i){
					var x = i;
					setTimeout(function(){
						self.type(self,x);	
					},self.data[x].speed);
				})(i);
			};
		};
	};
	// 绘制图像的类型
	this.type = function(obj,x1,animate){
		//try{
			if(obj.data[x1].type == 'arc'){
				this.arc(obj.ctx,obj.data[x1],animate);
			};
			if(obj.data[x1].type == 'Test'){
				for(var i = 0; i < obj.data[x1].texts.length; i++){
					var data = this.escape(obj.data[x1],i)
					this.Test(obj.ctx,data,0);
				}
			};
			if(obj.data[x1].type == 'line'){
				this.line(obj.ctx,obj.data[x1]);
			};
			if(obj.data[x1].type == 'circle'){
				this.circle(obj.ctx,obj.data[x1]);
			};
			if(obj.data[x1].type == 'border'){
				this.border(obj.ctx,obj.data[x1]);
			}
		//}catch(e){
			//console.log(e);
		//}finally{
			
		//}
	};
	// 动画
	this.animation = function(x1){// x1 = 对应的ata[x1]数据，x2 = 对应 data[x1].path[x2]
		var self = this;// 定时器中 this =>> windiw,所以这里要重新定义一次
		var a = self.data,
			b = self.data[x1],
			c = self.ctx;
		self["animation"] = {[x1]:[]};// 存在动画，顶层对象就生成一个新的属性：["animation"][x1]。
		for(var i = 0;i < b.path.length;i++){
				var obj = self.escape(b,i);// 洗过之后用于画圆的json，
				var objs = {}; // 生成一个新的json对象，这个对象只存在于当前循环。 包含id、前面清洗过的json；
				objs.data ={[i]:JSON.parse(JSON.stringify(obj))};
				objs.data[i]["type"] =b.type;
				objs.ctx = c;
				if(!obj.an || obj.an == "0" || obj.an == "false"){
					self.type(objs,i,true);
					// object调用
					if(self.animationList == 0){
						self.trigger.action = null;
					}
				}else if(obj.an == "1"){
					objs.data[i]["count"] = obj.s;//起始点
					objs.data[i]["size"]  = 0.04;// 起点到终点的绘制长度；
					//由于json对象“objs”只存在于当前for循环中，无法在外部操作。所以将"objs"赋给顶层对象中的属性[animation][x1]，目的是用于在循环外部调用。
					self["animation"][x1].push({[i]:objs,"timer":" "});
				}else if(obj.an == "true"){
					//无限次
				}else{
					console.log(b.type+'"中的'+'第"'+i+'"个'+'"animate"属性值有误');
				}
		};
		// 存在动画？
		if(self["animation"][x1].length > 0){
			// 遍历数组长度
			for(var n = 0; n < self["animation"][x1].length; n++){
				// 获取对应的key,用于判断数据类型
				for(var key in self["animation"][x1][n]){
					if(key != "timer")timer(self["animation"][x1],key,n);
				}
			}
		}
		// 写外部方法是为了解决for循环变量作用域问题
		function timer (obj,key,index){
			self.type(obj[index][key],key,true);
			obj[index][key].timer = setInterval(function(){
				if(obj[index][key].data[key].count >= obj[index][key].data[key].e){
					clearInterval(obj[index][key].timer);
					self.animationList--;
					// object调用
					if(self.animationList == 0){
						self.trigger.action = null;
					}
					return;
				}else{
					self.type(obj[index][key],key,true);
				}
			},1);
		}
	};
	// 圆弧 at= {动画次数 ，当前起点}
	this.arc = function(ctx,obj,animate){
		var ot = obj.status == true ? true : false;
		if(!obj)return;
		if(animate){
			ctx.beginPath();
			if(!obj.an || obj.an == "0" || obj.an == "false"){
				// 圆环 无动画
				ctx.arc(obj.x,obj.y,obj.r,obj.s*Math.PI,obj.e*Math.PI,ot);
				this.animationList--;
				// object调用
				if(this.animationList == 0){
					this.trigger.action = null;
				}
			}else{
				var aa = Number(parseFloat(obj.count+obj.size).toFixed(2))
				// 圆环 有动画
				ctx.arc(obj.x,obj.y,obj.r,obj.count*Math.PI,aa*Math.PI,ot);
				obj.count += 0.02;
				obj.count = Number(parseFloat(obj.count).toFixed(2));
			}
			ctx.lineCap = obj.lc;
			ctx.lineWidth 	= obj.w;
			ctx.strokeStyle = obj.c;
			ctx.stroke();
			ctx.closePath();
		}else{
			for(var i = 0;i < obj.path.length; i++){
				var objs = this.escape(obj,i);
				ctx.beginPath();
				ctx.arc(objs.x,objs.y,objs.r,objs.s*Math.PI,objs.e*Math.PI,ot);
				ctx.lineCap = objs.lc;
				ctx.lineWidth 	= objs.w;
				ctx.strokeStyle = objs.c;
				ctx.stroke();
				ctx.closePath();
				this.animationList--;
				// object调用
				if(this.animationList == 0){
					this.trigger.action = null;
				}
			}
		}
	};
	// 边框
	this.border = function(ctx,obj){
		for(var i = 0; i < obj.path.length; i++){
			ctx.beginPath();
			var objs = this.escape(obj,i,obj.type);
			if(obj.shadow){
			  	ctx.shadowOffsetX = obj.shadow.offsetX; // 阴影Y轴偏移
			  	ctx.shadowOffsetY = obj.shadow.offsetY; // 阴影X轴偏移
			  	ctx.shadowBlur 	  = obj.shadow.blur; // 模糊尺寸
			  	ctx.shadowColor   = obj.shadow.color; // 颜色
			};
			ctx.lineWidth = objs.w;
			ctx.strokeStyle = objs.c;
			if(obj.cap){
				ctx.lineCap = objs.lc;
			}
			ctx.moveTo(eval(objs.s.substring(0,objs.s.indexOf(","))) , eval(objs.s.substring(objs.s.indexOf(",")+1,objs.s.length)));// 起点
			// 截取，运算
			for(var a = 0;a < objs.e.length; a++){
				ctx.lineTo(eval(objs.e[a].substring(0,objs.e[a].indexOf(","))) , eval(objs.e[a].substring(objs.e[a].indexOf(",")+1,objs.e[a].length)));	// 路径
			}
			ctx.stroke();		// 结束
			this.animationList--;
			// object调用
			if(this.trigger && this.animationList == 0){
				this.trigger.action = null;
			}
		}
		
	};
	// 折线
	this.line = function(ctx,obj){
		for(var i = 0;i < obj.angle.length; i++){
			var objs = this.escape(obj,i,obj.type);
			if(!obj.angle[i] || !obj.radii[i])return;
			if(obj.angle[i] == "25/50"){// 解决折线角度为 0.5 方位的是时候文字不显示，暂时没找到问题所在
				obj.angle[i] = "25.5/50";
			}
			obj.angle[i] = 360 - 180*eval(obj.angle[i]);//第一段线段角度，0~2
			// 字体是否设置
			var wh = this.fontW(objs,i);//根据字体宽度设置第二段线的宽度
			if(!obj.centerDot){ // 未设置原点？
				obj.coord = this.getCoord(objs.x,objs.y,objs.minR,objs.maxR,obj.angle[i],wh[0]); // X,Y原点、最小半径、最大半径、角度,字体宽度；
			}else {
				if(!obj.centerDot[i]){// 原点个数不够？
					var objs = this.escape(obj,0,obj.type);
					obj.coord = this.getCoord(objs.x,objs.y,objs.minR,objs.maxR,obj.angle[i],wh[0]); // X,Y原点、最小半径、最大半径、角度,字体宽度；
				}else{ // 原点个数与线段对应
					var objs = this.escape(obj,i,obj.type);
					obj.coord = this.getCoord(objs.x,objs.y,objs.minR,objs.maxR,obj.angle[i],wh[0]); // X,Y原点、最小半径、最大半径、角度,字体宽度；
				}
			};
			// 开始绘制
			//-------------------
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.strokeStyle = objs.c;
			ctx.moveTo(obj.coord.x1, obj.coord.y1);
			ctx.lineTo(obj.coord.x2, obj.coord.y2);
			ctx.lineTo(obj.coord.x3, obj.coord.y3);
			ctx.stroke();
			ctx.closePath() //闭合路径 
			// 末端小圆
			ctx.beginPath();
			ctx.arc(obj.coord.x3,obj.coord.y3,3,0,360,false);
			ctx.fillStyle = objs.c;//填充颜色,默认是黑色
			ctx.fill();//画实心圆
			ctx.closePath();
			// 不存在文本，跳过当前循环；
			if(!obj.texts[i])continue ;
			objs.x = obj.coord.x2 > obj.coord.x3 ? obj.coord.x2 -(obj.coord.x2 - obj.coord.x3)/2 : obj.coord.x3-(obj.coord.x3 - obj.coord.x2)/2;
			objs.y = obj.coord.y3-5;
			this.Test(ctx,objs,true);
			ctx.closePath();
			this.animationList--;
			// object调用
			if(this.animationList == 0){
				this.trigger.action = null;
			}
		}
	};
	// 圆形
	this.circle = function(ctx,obj){
		for(var i = 0;i < obj.radii.length; i++){
			var objs = this.escape(obj,i,obj.type);
			ctx.beginPath();
			//创建一个径向渐变，从圆心为(X,Y)半径为minR的圆周,开始沿着圆心为0、半径为maxR的圆周进行径向渐变
			var c1 = objs.c.substring(0,objs.c.indexOf(",")),
				c2 = objs.c.substring(objs.c.indexOf(",")+1,objs.c.length);
			// (X轴原点，Y轴原点，最大半径， X轴原点，Y轴原点，最小半径)；
			var my_gradient= ctx.createRadialGradient(objs.x,objs.y,objs.maxR, objs.x,objs.y,objs.minR);  
				my_gradient.addColorStop(1, objs.c1);    //定义 渐变色弱，
				my_gradient.addColorStop(0, objs.c2);    //定义 渐变色强
			ctx.fillStyle = my_gradient;//填充颜色,默认是黑色
			// (X轴原点，Y轴原点，最大半径，路径起点，路径终点,正反)
			ctx.arc(objs.x,objs.y,objs.maxR,objs.s*Math.PI,objs.e*Math.PI,false);
			ctx.fill();//画实心圆
			ctx.closePath();
			this.animationList--;
			// object调用
			if(this.animationList == 0){
				this.trigger.action = null;
			}
		}
	}
	// 文字
	this.Test = function(ctx,data,offH){
		// w ： 文字宽度的一半；
		var wh = this.fontW(data,offH);
		ctx.beginPath();
		ctx.font 	  = data.f;
		console.log(data.c)
		if(data.c == "#59d5ef"){
			ctx.fillStyle = data.c;
		}else{
			ctx.fillStyle = "yellow";//data.c
		}
		ctx.fillText(data.t , data.x-wh[0] , data.y+wh[1]);
		ctx.closePath();
		this.animationList--;
		// object调用
		if(this.animationList == 0){
			this.trigger.action = null;
		}
	};
	// 计算文字宽度，用于居中放置
	this.fontW = function(data,offH){
		// 创建一个行内元素。将要绘制的文字、大小、字体 全部赋给这个行内元素。之后计算出一半的宽度再删除掉；
		var span = document.createElement('span');
			span.style.font 	= data.f;
			span.style.opacity 	= 0;
			span.innerHTML 		= data.t;
		document.getElementsByTagName('body')[0].appendChild(span);
		if(offH){
			// 折线上文字 水平居中
			var wh = [span.offsetWidth/2,"0"];
		}else{
			// 正常文字水平、垂直居中
			var wh = [span.offsetWidth/2,span.offsetHeight/4];
		}
		span.remove();
		return wh;
	};
	this.getCoord = function(cx,cy,r1,r2,a,w){
		var x2 = cx + r2*Math.cos(a*2*Math.PI / 360);
		var x3 = x2 > cx ? eval(cx+"+"+r2+"+"+w*2) : eval(cx+"-"+r2+"-"+w*2);
		var coord = {
			x1 : cx + r1*Math.cos(a*2*Math.PI / 360),
			y1 : cy - r1*Math.sin(a*2*Math.PI / 360),
			x2 : x2,
			y2 : cy - r2*Math.sin(a*2*Math.PI / 360),
			x3 : x3,
			y3 : cy - r2*Math.sin(a*2*Math.PI / 360)
		};
		return coord;
	};
	// 转义，截取，计算
	this.escape = function(data,i,type){
		var datas = {
			"x":this.id.offsetWidth/2,//原点X轴
			"y":this.id.offsetHeight/2,//原点Y轴
			"s":0,//路径起点
			"e":2,//路径终点
			"maxR":this.maxRadius+15,//最大半径
			"minR":0,//最小半径
			"r":0,//半径
			"w":1,//路径宽度
			"c":"black",//颜色
			"c1":"#000",// 开始颜色
			"c2":"#fff",// 结束颜色
			"t":0,//文字
			"f":"",//字体样式
			"l":0,//折线长度
			"ag":0,//角度
			"sp":0,//速度
			"an":false,//动画
			"lc":"butt"//线帽
		};
		// 转义
		var arr = ["path","radii","width","lineLength","centerDot"];
		for(var n = 0;n < arr.length; n++){
			// 当前属性不存在或未设置参数;
			if(!data[arr[n]] && arr[n] != "centerDot"){
				//console.log(data.type+'对象的"'+arr[n]+'"属性不存在');
				continue ;
			}else{
				if(!data.centerDot[n]){
					if(data.centerDot[0]){
						data.centerDot.push(data.centerDot[0]);// 原点未设置?设置默认值
					}else{
						data.centerDot.push("w/2,h/2");// 原点未设置?设置默认值
					}
				}
				// 原点未设置?设置默认值
				if(!data[arr[n]] || data[arr[n]].length <  0){
					continue;
				}else{
					data[arr[n]][i] = this.replace(data[arr[n]][i]);
				};
			}
		}
		// 截取，计算
		if(type == "border"){
			datas.s = data.path[i].substring(data.path[i].indexOf("S")+1,data.path[i].indexOf("E"));
			datas.e = data.path[i].substring(data.path[i].indexOf("E")+1,data.path[i].length).split(' ');
	 	}else{
	 		if(data.centerDot.length < 1){
	 			data.centerDot[i] = this.replace(data.centerDot[i],true);
	 		}else{
	 			data.centerDot[i] = this.replace(data.centerDot[i],true);
	 		};
	 		datas.x = eval(data.centerDot[i].substring(0,data.centerDot[i].indexOf(',')));
		 	datas.y = eval(data.centerDot[i].substring(data.centerDot[i].indexOf(',')+1,data.centerDot[i].length));
		 	// 半径
		 	if(data.radii){
		 		if(data.radii[i] && data.radii[i].indexOf(",") > -1){
			 		var r1 = eval(data.radii[i].substring(0,data.radii[i].indexOf(','))),
			 			r2 = eval(data.radii[i].substring(data.radii[i].indexOf(',')+1,data.radii[i].length));
			 		if(parseInt(r1) > parseInt(r2)){
			 			datas.maxR = r1 > 0 ? r1 : 0;
			 			datas.minR = r2 > 0 ? r2 : 0;
			 		}else{
			 			datas.maxR = r2 > 0 ? r2 : 1;
			 			datas.minR = r1 > 0 ? r1 : 0;
			 		}
			 		
			 	}else{
			 		datas.r = eval(data.radii[i]) > 0? eval(data.radii[i]) : 5;
			 	}
		 	}
		 	// 路径
		 	if(data.path){
		 		datas.s = eval(data.path[i].substring(0,data.path[i].indexOf(',')));
	 			datas.e = eval(data.path[i].substring(data.path[i].indexOf(',')+1,data.path[i].length));
		 	}
	 	}
	 	// 颜色
	 	if(data.color){
	 		if(data.color[i]){
	 			if(data.color[i].indexOf("hsla") > -1 || data.color[i].indexOf("rgba") > -1){// alpha通道 及 rgba 合法色值判断
		 			if(data.color[i] && data.color[i].indexOf("),") > -1){
				 		datas.c1 = data.color[i].substring(0,data.color[i].indexOf('),'))+")",
				 		datas.c2 = data.color[i].substring(data.color[i].indexOf('),')+2,data.color[i].length);
				 	}else{
				 		datas.c = data.color[i];
				 	}
		 		}else{
		 			if(data.color[i] && data.color[i].indexOf(",") > -1){
				 		datas.c1 = data.color[i].substring(0,data.color[i].indexOf(',')),
				 		datas.c2 = data.color[i].substring(data.color[i].indexOf(',')+1,data.color[i].length);
				 	}else{
				 		datas.c = data.color[i];
				 	}
		 		}
	 		}else{
	 			// 颜色数量不够？ 那就只取第一个
	 			datas.c = data.color[0];
	 		}
	 	};
	 	// 速度
	 	if(data.speed){
	 		if(data.speed[i]){
	 			datas.sp = data.speed[i];
	 		}else{
	 			// 速度数量不够？ 那就没有速度
	 			datas.sp = 0;
	 		}
	 	}
	 	//宽度
	 	if(data.width){
	 		if(data.width[i]){
	 			datas.w = eval(data.width[i]);
	 		}else{
	 			// 宽度数量不够？ 那就只取第一个
	 			datas.w = eval(data.width[0]);
	 		}
	 	}
	 	// 帽子
	 	if(data.lineCap){
	 		if(data.lineCap[i]){
	 			datas.lc = data.lineCap[i];
	 		}else{
	 			// 帽子数量不够？ 那就只取第一个
	 			datas.lc = data.lineCap[0];
	 		}
		};
		//动画
		if(data.animate){
			if(data.animate[i]){
	 			datas.an = data.animate[i];
	 		}else{
	 			// 动画数量不够？ 那就只取第一个
	 			datas.an = data.animate[0];
	 		}
		};
		// 字体
		if(data['font']){
			if(!data['font'][i]){
				datas.f = data['font'][0];
			}else{
				datas.f = data['font'][i];
			}
		}
		// 文字
		if(data.texts){
			datas.t = data.texts[i];
		}
	 	return datas;
	};
	// 转义
	this.replace = function(obj,Dot){
		if(obj){
			return	obj = obj.replace(/\h/g,this.id.offsetHeight).replace(/w/g,this.id.offsetWidth);
		}else{
			// 如果未设置原点，默认居中
			if(Dot){
				return	obj = this.id.offsetWidth/2+","+this.id.offsetHeight/2;
			}else{
				return;
			}
		};
	};
	
	//return this.draw();
}