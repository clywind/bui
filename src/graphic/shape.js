define('bui/graphic/shape',['bui/common','bui/graphic/base','bui/graphic/canvasitem','bui/graphic/raphael'],function(require){

	var BUI = require('bui/common'),
		Base = require('bui/graphic/base'),
		Item = require('bui/graphic/canvasitem'),
		Raphael = require('bui/graphic/raphael');

	/**
   * @class BUI.Graphic.Shape
   * 图形的基类
   * @extends BUI.Graphic.Base
   */
  var Shape = function(cfg){
    Shape.superclass.constructor.call(this,cfg);
  };

  Shape.ATTRS = {
  	attrs : {}
  }

  BUI.extend(Shape,Base);

  //获取画布内元素的一些共性方法
	BUI.mixin(Shape,[Item]);

  BUI.augment(Shape,{
  	/**
  	 * 是否图形
  	 * @type {Boolean}
  	 */
  	isShape : true,
  	
  	//渲染shape
  	renderUI : function(){

  		var _self = this,
  			el = _self.get('el'),
  			node,
  			cfg,
  			attrs;
  		if(!el){
  			cfg = _self.cfg;
  			attrs = _self.parseElCfg(cfg.attrs);
  			el = _self.createElement(attrs);
  			_self.set('el',el);
  		}
  		node = el.node;
      node.shape = this;
  		_self.set('node',node);
  	},
  	/**
  	 * @private
  	 */
  	createElement : function(attrs){
  		var _self = this,
  			parent = _self.get('parent'),
        set = parent.get('el').add([attrs]),
  			element;
      element = set[0];
  		return element;
  	},
  	/**
  	 * @protected
  	 * 格式化初始化配置项
  	 */
  	parseElCfg : function(attrs){
  		attrs.type = this.get('type');
  		return attrs;
  	},
  	/**
  	 * 获取图形的整体长度
  	 * @return {Number} 长度
  	 */
  	getTotalLength : function(){
  		return this.get('el').getTotalLength();
  	}
  });

  /**
   * 圆
   * @class BUI.Graphic.She.Circle
   * @extends BUI.Graphic.Shape
   */
  var Circle = function(cfg){
  	Circle.superclass.constructor.call(this,cfg);
  };

  Circle.ATTRS = {
  	/**
  	 * 圆心的x坐标
  	 * @type {Number}
  	 */
  	cx : {},
  	/**
  	 * 圆心的y坐标
  	 * @type {Number}
  	 */
  	cy : {},
  	/**
  	 * 圆的半径
  	 * @type {Number}
  	 */
  	r : {}
  };

  BUI.extend(Circle,Shape);

  Shape.Circle = Circle;

  /**
   * 矩形
   * @class BUI.Graphic.Shape.Rect
   * @extends BUI.Graphic.Shape
   */
  var Rect = function(cfg){
  	Rect.superclass.constructor.call(this,cfg);
  };

  Rect.ATTRS = {
  	/**
  	 * 矩形的左定点x坐标
  	 * @type {Number}
  	 */
  	x : {},
  	/**
  	 * 矩形的左定点y坐标
  	 * @type {Number}
  	 */
  	y : {},
  	/**
  	 * 矩形的宽度
  	 * @type {Number}
  	 */
  	width : {},
  	/**
  	 * 矩形的高度
  	 * @type {Number}
  	 */
  	width : {}
  };

  BUI.extend(Rect,Shape);
  Shape.Rect = Rect;

  /**
   * 矩形
   * @class BUI.Graphic.Shape.Ellipse
   * @extends BUI.Graphic.Shape
   */
  var Ellipse = function(cfg){
  	Ellipse.superclass.constructor.call(this,cfg);
  };

  Ellipse.ATTRS = {
  	/**
  	 * 矩形的左定点x坐标
  	 * @type {Number}
  	 */
  	cx : {},
  	/**
  	 * 矩形的左定点y坐标
  	 * @type {Number}
  	 */
  	cy : {},
  	/**
  	 * 矩形的宽度
  	 * @type {Number}
  	 */
  	rx : {},
  	/**
  	 * 矩形的高度
  	 * @type {Number}
  	 */
  	ry : {}
  };

  BUI.extend(Ellipse,Shape);
  Shape.Ellipse = Ellipse;

  /**
   * 路径
   * @class BUI.Graphic.Shape.Path
   * @extends BUI.Graphic.Shape
   */
  var Path = function(cfg){
  	Path.superclass.constructor.call(this,cfg);
  };

  Path.ATTRS = {
  	/**
  	 * 路径
  	 * @type {String}
  	 */
  	path : {}
  };


  BUI.extend(Path,Shape);

  Shape.Path = Path;

  /**
   * 直线
   * @class BUI.Graphic.Shape.Line
   * @extends BUI.Graphic.Shape.Path
   */
  var Line = function(cfg){
  	Line.superclass.constructor.call(this,cfg);
  };

  Line.ATTRS = {
  	/**
  	 * 起始x坐标
  	 * @type {Number}
  	 */
  	x1 : {},
  	/**
  	 * 起始y坐标
  	 * @type {Number}
  	 */
  	y1 : {},
  	/**
  	 * 终止x坐标
  	 * @type {Number}
  	 */
  	x2 : {},
  	/**
  	 * 终止y坐标
  	 * @type {Number}
  	 */
  	y2 : {}
  };

  BUI.extend(Line,Path);

  BUI.augment(Line,{
  	/**
  	 * @protected
  	 * 格式化初始化配置项
  	 */
  	parseElCfg : function(attrs){
  		attrs.type = 'path'; //将线转换成path
			attrs.path = BUI.substitute('M {x1},{y1}L{x2},{y2}',attrs);
  		return attrs;
  	},
  	//获取线的坐标点
  	_getLinePoint : function(pointIndex,coordIndex){
  		var path = this.getPath();
  		return path[pointIndex][coordIndex];
  	},
  	//设置线的坐标点
  	_setLinePoint : function(pointIndex,coordIndex,value){
  		var _self = this,
  			path = this.getPath();
  		path[pointIndex][coordIndex] = value;
  		_self.attr('path',path);
  	},
  	//设置坐标x1
  	_setX1 : function(value){
  		this._setLinePoint(0,1,value);
  	},
  	_getX1 : function(){
  		return this._getLinePoint(0,1);
  	},
  	//设置坐标x2
  	_setX2 : function(value){
  		this._setLinePoint(1,1,value);
  	},
  	_getX2 : function(){
  		return this._getLinePoint(1,1);
  	},
  	//设置坐标y1
  	_setY1 : function(value){
  		this._setLinePoint(0,2,value);
  	},
  	_getY1 : function(){
  		return this._getLinePoint(0,2);
  	},
  	//设置坐标y2
  	_setY2 : function(value){
  		this._setLinePoint(1,2,value);
  	},
  	_getY2 : function(){
  		return this._getLinePoint(1,2);
  	}
  });

  Shape.Line = Line;


  function points2path(points,z){
  	if(BUI.isArray(points)){
  		points = points.join(' ');
  	}
  	return 'M' + points + z;
  }

  /**
   * 折线，polyLine
   * @class BUI.Graphic.Shape.PolyLine
   * @extends BUI.Graphic.Shape.Path
   */
  var PolyLine = function(cfg){
  	PolyLine.superclass.constructor.call(this,cfg);
  };

  PolyLine.ATTRS = {
  	/**
  	 * 定点集合，可以是字符串、或者数组
  	 *
  	 *  - 字符串： '0,0 25,25 31,50'
  	 *  - 数组 ： ['0,0','25,25','31,50']
  	 *  
  	 * @type {Array|String}
  	 */
  	points : {}
  };

  BUI.extend(PolyLine,Path);

  BUI.augment(PolyLine,{
  	//设置顶点
  	_setPoints : function(value){
  		var _self = this,
  			el = _self.get('el'),
  			path = points2path(value,'');
  		_self.attr('path',path);
  	},
  	/**
  	 * @protected
  	 * 格式化初始化配置项
  	 */
  	parseElCfg : function(attrs){
  		attrs.type = 'path'; //将线转换成path
			attrs.path = points2path(attrs.points,'');
  		return attrs;
  	}

  });

  Shape.PolyLine = PolyLine;

  /**
   * 多边形
   * @class BUI.Graphic.Shape.Polygon
   * @extends BUI.Graphic.Shape.Path
   */
  var Polygon = function(cfg){
  	PolyLine.superclass.constructor.call(this,cfg);
  };

  Polygon.ATTRS = {
  	/**
  	 * 定点集合，可以是字符串、或者数组
  	 *
  	 *  - 字符串： '0,0 25,25 31,50'
  	 *  - 数组 ： ['0,0','25,25','31,50']
  	 *  
  	 * @type {Array|String}
  	 */
  	points : {}
  };

  BUI.extend(Polygon,Path);

  BUI.augment(Polygon,{
  	//设置顶点
  	_setPoints : function(value){
  		var _self = this,
  			el = _self.get('el'),
  			path = points2path(value,'z');
  		_self.attr('path',path);
  	},
  	/**
  	 * @protected
  	 * 格式化初始化配置项
  	 */
  	parseElCfg : function(attrs){
  		attrs.type = 'path'; //将线转换成path
			attrs.path = points2path(attrs.points,'z');
  		return attrs;
  	}

  });

  Shape.Polygon = Polygon;

  /**
   * 文本
   * @class BUI.Graphic.Shape.Text
   * @extends BUI.Graphic.Shape
   */
  var Text = function(cfg){
  	Text.superclass.constructor.call(this,cfg);
  };

  Text.ATTRS = {
  	/**
  	 * x轴坐标
  	 * @type {Number}
  	 */
  	x : {},
  	/**
  	 * y轴坐标
  	 * @type {Number}
  	 */
  	y : {},
  	/**
  	 * 显示的文本
  	 * @type {String}
  	 */
  	text : {},
  	/**
  	 * 字体相关的属性，也可以单独设置其中的属性: font-family,font-weight....
  	 * @type {String}
  	 */
  	'font' : {},
  	/**
  	 * 文本的对齐方式：默认对齐方式: 'middle'
  	 * @type {String}
  	 */
  	'text-anchor' : {}
  };

  BUI.extend(Text,Shape);

  Shape.Text = Text;

  /**
   * @class BUI.Graphic.Shape.Image
   * 图片
   * @extends BUI.Graphic.Shape
   */
  var Image = function(cfg){
  	Image.superclass.constructor.call(this,cfg);
  };

  Image.ATTRS = {
  	/**
  	 * 路径
  	 * @type {String}
  	 */
  	src : {}, 
  	/**
  	 * x轴位置
  	 * @type {Number}
  	 */
  	x : {}, 
  	/**
  	 * y轴位置
  	 * @type {Number}
  	 */
  	y : {}, 
  	/**
  	 * 宽度
  	 * @type {Number}
  	 */
  	width : {}, 
  	/**
  	 * 高度
  	 * @type {Number}
  	 */
  	height : {}
  }

  BUI.extend(Image,Shape);

  Shape.Image = Image;

  
  return Shape;
});