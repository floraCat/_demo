/**
 * 字体大小自适应
 * 按屏宽自动修改 html 元素的字体大小
 */

// 比例基准：屏宽375px(IPhone 6) vs 16px的html字体大小
const originWidthByDesign = 375;
const originRootFontSize = 16;
const maxLimitWidth = 667;

const doc = document.documentElement;

/**
 * 检测当前浏览器是否支持 rem
 * 随便创建一个 div 并赋予 1rem 的字体大小
 * 如值等于 1rem 表示支持 rem，否则不支持
 */
const div = document.createElement('div');
div.setAttribute('style', 'font-size: 1rem');
if (!!document.addEventListener && '1rem' === div.style.fontSize) {

	// html字体大小计算
	function reCalculate () {
		let clientWidth = doc.clientWidth;
		if (!clientWidth) { return;}

		clientWidth = clientWidth < maxLimitWidth ? clientWidth : maxLimitWidth;
		doc.style.fontSize = `${originRootFontSize * clientWidth / originWidthByDesign}px`;
		doc.style.display = 'none';

		// Force rerender - important to new Android devices
		doc.clientWidth;
		doc.style.display = '';
	}

	// 屏宽有变动时触发以上函数
	window.addEventListener('resize', reCalculate, false);
	document.addEventListener('DOMContentLoaded', reCalculate, false);

	reCalculate();
}