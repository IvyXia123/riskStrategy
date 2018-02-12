function format_dependency_field_data(data){
	let newData = [];// 格式化后的新数据
	let formatData = function(datum,Key,arr){
		if(datum instanceof Array){
			arr.push(
				{'key':Key,'val':'['},
				{'key':"children",'val':[]},
				{'key':Key,'val':']'}
			);
			var size = arr.length;
			for(var i = 0; i < datum.length; i++){
				formatData(datum[i], Key + '[' + i + ']',arr[size-2].val);
			}
		}else if(datum instanceof Object){
			arr.push(
				{'key':Key,'val':'{'},
				{'key':"children",'val':[]},
				{'key':Key,'val':'}'}
			);
			var size = arr.length;
			for(var k in datum){
				formatData(datum[k],Key + '.' + k,arr[size-2].val);
			}
		}else{
			arr.push({
				'key':Key,
				'val':datum
			});
		}
	}
	formatData(data,"json",newData,0);// “json” : data数据的开头索引,可以不设
	return newData;
};
export default format_dependency_field_data;
