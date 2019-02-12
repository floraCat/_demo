<template>
  <div id="header">
    <a class="logo" href="#"><img src="../assets/logo.png" /></a>
    <ol>
    	<li></li>
    	<li></li>
    	<li></li>
    </ol>
  </div>
</template>

<script>
export default {
  name : "header",
  data () {
    return {
      mes : "header"
    }
  }
}
</script>

<style lang="less">
#header { 
	height:40px; background:#ccc; overflow:hidden;
	.logo {
		float:left;	
		img { height:40px;}
	}
	ol {
		overflow:hidden; float:right; padding:0 5px;
		li {
			width:40px;	height:1px; background:#333; margin-bottom:10px;
		}
	}
}
</style>