function format_interface_data(data){
	let newData = [];// 格式化后的新数据
	let formatData = function(datum,Key){
		if(datum instanceof Array){
			for(var i = 0; i < datum.length; i++){
				formatData(datum[i], Key + '[' + i + ']');
			}
		}else
		if(datum instanceof Object){
			for(var k in datum){
				formatData(datum[k],Key + '.' + k);
			}
		}else {
			newData.push({
				'key':Key,
				'val':datum
			})
		};
	}
	formatData(data,"json");// “json” : data数据的开头索引,可以不设
	return newData;
};
export default format_interface_data;
