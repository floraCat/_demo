Vue.filter("filter", function(val,key) { 
	// 分类
	if (key === 'cat') {
		switch(val) {
			// --------------word------------
			case 'chengyu':
				return '成语'
				break;
			case 'suyu':
				return '俗语'
				break;
			// ----------------matter----------
			case 'renwu':
				return '人物'
				break;
			case 'lunju':
				return '论据'
				break;
			case 'duanzi':
				return '段子'
				break;
			case 'mingyan':
				return '名言'
				break;
			case 'huati':
				return '话题'
				break;
			case 'fangfa':
				return '方法技巧'
				break;
			// ------------------training--------
			// case 'chengyu':
			// 	return '成语俗语'
			// 	break;
			case 'shuyu':
				return '专业术语'
				break;
			case 'zhuci':
				return '助词口语'
				break;
			case 'shengpi':
				return '生僻字词'
				break;
			case 'yongci':
				return '用辞'
				break;
			case 'cankao':
				return '参考'
				break;
			case 'jieshi':
				return '词语解释'
				break;
			case 'biyu':
				return '比喻'
				break;
			// ------------------english--------
			case 'danci':
				return '单词'
				break;
			case 'duanyu':
				return '短语'
				break;
			case 'juzi':
				return '句子'
				break;
			case 'duanluo':
				return '段落'
				break;
			// ------------------pic--------
			case 'renwu':
				return '人物'
				break;
			case 'pinpai':
				return '品牌'
				break;
			case 'lvyou':
				return '旅游'
				break;
			case 'jiyi':
				return '记忆'
				break;
			// ------------------mix--------
			case 'jingju':
				return '警句'
				break;
			case 'jiqiao':
				return '小技巧'
				break;
			// ------------------question--------
			case 'shenghuo':
				return '生活'
				break;
			case 'gongzuo':
				return '工作'
				break;
			case 'jiaoji':
				return '交际'
				break;
			case 'siwei':
				return '思维'
				break;
			case 'quedian':
				return '缺点'
				break;
			// --------------------------
			case 'qita':
				return '其他'
				break;
			default:
				return ''
				break;
		}
	}
	// 属性
	if (key === 'grade') { 
		switch(val) {
			// case '1':
			// 	return '新'
			// 	break;
			case '2':
				return '常记'
				break;
			case '3':
				return '已熟悉,有空看看'
				break;
			case '4':
				return '垃圾桶'
				break;
			case '11':
				return '难点'
			case '5':
				return '未懂'
				break;
			case '6':
				return '少用,再处理'
				break;
			case '9':
				return '标记'
				break;
			case '19':
				return 'highlight'
				break;
			default:
				return ''
				break;
		}
	}
});

