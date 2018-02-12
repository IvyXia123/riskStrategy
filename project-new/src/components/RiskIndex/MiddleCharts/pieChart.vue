<template>
    <div id="pieChart" class="chartBox">
        <div id="ruleChart" ref='circle'></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import echarts from 'echarts';
    export default{
        name: 'pieChart',
        data(){
        	return{
        		percent:80,
        	}
        },
        methods: {
           	createCanvas(outerBox,action,color){
        		let size = (outerBox.offsetWidth >= outerBox.offsetHeight ? outerBox.offsetHeight : outerBox.offsetWidth);
        	 	let $canvas = document.createElement('canvas');
        	 	$canvas.style.position = 'absolute';
        	 	$canvas.style.top = 0;
        	 	$canvas.style.right = 0;
        	 	$canvas.style.bottom = 0;
        	 	$canvas.style.left = 0;
        	 	$canvas.style.margin = 'auto';
        	 	$canvas.style.backgroundColor = 'white';
        	 	$canvas.style.transform = 'rotate(-90deg)';
        	 	$canvas.setAttribute('width',size+'px');
                $canvas.setAttribute('height',size+'px');
                outerBox.appendChild($canvas);
                let ctx = $canvas.getContext('2d');
            	//画可见的红色圆环
                ctx.lineWidth = 3;
            	ctx.strokeStyle = color;
            	this.angle = 0;
            	this.canvasParams = {
            		ctx : ctx,
            		size: size,
            		angle:0
            	}
            	this.draw();
        	},
            draw(){
            	let ctx = this.canvasParams.ctx;
            	let size= this.canvasParams.size;
            	this.timer = window.requestAnimationFrame(this.draw);
                ctx.clearRect(0,0,size,size);// 清空画布
				ctx.beginPath();//百分比圆环
                ctx.arc(size/2, size/2, size/2 - ctx.lineWidth/2, 0, this.canvasParams.angle * Math.PI / 180, false);
              	ctx.stroke();
              	ctx.closePath();
                this.canvasParams.angle += 20;
                this.percentAge = parseInt((this.canvasParams.angle / 360) * 100);
                if (this.canvasParams.angle >= this.percent / 100 * 360) {
                 	this.percentAge = this.percent;
                 	window.cancelAnimationFrame(this.timer);
             	};
             	ctx.save();
             	ctx.rotate(90 * Math.PI / 180);
                ctx.beginPath();
                ctx.font = '30px Arial';
                ctx.fillStyle = '#000';
                ctx.fillText(this.percentAge + '%', size/2 - ctx.measureText(this.percentAge + '%').width/2, -size/2+10);
                ctx.font = '12px Arial';
                ctx.fillStyle = '#a8a7a8';
                ctx.fillText('拒绝率', size/2 - ctx.measureText("拒绝率").width/2, -size/2 + 25);
                ctx.closePath();
                ctx.restore();
            }
        },
        mounted(){
            this.createCanvas(this.$refs.circle,'font','#fb8561');
        }
    }
</script>

<style lang="less" type="text/less" scoped>
	@import url("./../../../less/common");
    #ruleChart{
    	position: relative;
    	overflow: hidden;
    	width: 100%;
    	height: 100%;
    }
</style>