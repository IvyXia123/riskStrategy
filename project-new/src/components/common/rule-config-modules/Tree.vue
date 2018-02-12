<template>
	<li>
        <p v-if="!hasChild" :class="{'item':(data.val != '{'||data.val != ']'||data.val != '}'),'select-item':(data.key+data.val == text)}" 
        	@click="toggle">
        	<tt v-if="data.key == 'json'"></tt>
        	<tt v-else-if="data.val == '}' || data.val == ']'"></tt>
        	<tt v-else-if="data.key.indexOf('[') > 0 && data.key.indexOf(']') > 0 && data.key.indexOf(']') == data.key.length-1"></tt> 
        	<tt v-else-if="data.key.indexOf('[') > 0 && data.key.indexOf(']') > 0 && data.key.indexOf(']') != data.key.length-1"> 
        		{{ data.key.substring(data.key.lastIndexOf('.')+1,data.key.length) }} :
        	</tt> 
        	<tt v-else>
        		{{ data.key.substring(data.key.lastIndexOf('.')+1,data.key.length) }} :
        	</tt>
            {{ data.val}}
        </p>
        <ol class="items" v-if="hasChild">
            <tree-menu v-for="(item, index) in data.val" :data="item" :key="index" :text="text" @upup='aaa'></tree-menu>
        </ol>
    </li>
</template>
<script>
	export default {
	    name: 'TreeMenu',
	    props: {
	        data: {
	            type: Object,
	            required: true
	        },
	        text:{
	        	type:String
	        }
	    },
	    data() {
	        return {
	            open: false
	        }
	    },
	    computed: {
	        hasChild() {
	            return (this.data.key == 'children');
	        }
	    },
	    methods: {
	    	aaa(msg){
	    		this.$emit("upup",msg);
	    	},
	    	toggle() {
	    		this.$emit("upup",this.data);
	    	}
	    }
	}
</script>
<style lang="less" type="text/less">
</style>