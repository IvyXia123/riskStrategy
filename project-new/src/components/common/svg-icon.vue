<template lang="html">
	<svg v-if="iconId" class="icon" aria-hidden="true">
		<use :xlink:href="iconId"></use>	
	</svg>
</template>

<script>
	export default {
		name: 'svg-icon',
	    props: {
	        id: {
	            type: String,
	            default: ''
	        }
	    },
	    computed: {
	        'iconId'() {
	            return this.id ? `#${this.id}` : '';
	        }
	    }
	}
</script>

<style lang="less" type="text/less" scoped>
	@import url("./../../less/common");
	svg{
		use{
			width:100%;
			height:100%;
		}
	}
</style>