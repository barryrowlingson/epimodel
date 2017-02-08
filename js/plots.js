var Plot = Class.extend({
    init: function(id, options) {
        this._container = '#' + String(id);
        this._plots = [];
        this._flotObj = null;
        this._locked = false;

        if(options != null) {
            this._options = options;
        } else {
            this._options = {
            };
        }

    },
    getContainer: function() {
        return this._container;
    },
    getGraph: function() {
        return this._flotObj;
    },
    setData: function(data) {
        this._plots = data;
    },
    clear: function() {
        this._plots = [];
    //this.render();
    },
    showLegend: function() {
        this._options.legend = {
            show: true
        };
        this.render();
    },
    hideLegend: function() {
        this._options.legend = {
            show: false
        };
        this.render();
    },
    render: function() {
        this._flotObj = null;
	this._options.crosshair={
	    mode: "xy",
	    color: "gray",
	    lineWidth:1
	};
	this._options.grid = {
	    hoverable: true,
	    autoHighlight: false,
	    clickable: true
	};
        this._flotObj = $.plot($(this._container), this._plots, this._options);

	$("#plot").bind("plothover", function (event, pos, item) {
			    $("#x").text("t = "+pos.x.toFixed(1));
			    $("#y").text("")//count = "+pos.y.toFixed(0));
	                    if(item){
				$("#y").text(item.series.label+"="+item.datapoint[1].toFixed(1));
				};
			});

	$("#plot").bind("mouseenter",function(){$("#coords").fadeTo(500,1);});
	$("#plot").bind("mouseleave",function(){$("#coords").fadeTo(500,0.5);});
	
    }
});

var SIRPlot = Plot.extend(
    {
	init: function(id, options){
	    this._super(id,options);
	    this._fill=false;
	    
	},
	render: function(){
	    var S=[];
	    var I=[];
	    var R=[];
	    for(i=0;i<this._model.n;i++){
		S.push([i,this._model.S[i]]);
		I.push([i,this._model.I[i]]);
		R.push([i,this._model.R[i]]);
	    };
	    
	    this.setData(
		[
		    {data: S, label: "S", color: "green", hoverable: true}, 
		    {data: I, label:"I", color: "red", hoverable: true },
		    {data:R, label:"R", color: "blue", hoverable: true}
		]);
	    this._super();
	    this._flotObj.setupGrid();
	    
	},
	setModel: function(model){
	    this._model = model;
	    this.render();
	}
    });

var SIPlot = Plot.extend({
	init: function(id, options){
	    this._super(id,options);
	    this._plotType='line';
	    this._fill=false;

	},
	render: function(){
	        var S=[];
		var I=[];
		for(i=0;i<this._model.n;i++){
		    S.push([i,this._model.S[i]]);
		    I.push([i,this._model.I[i]]);
		};
		this.setData([{data: S, label: "S", color: "green", hoverable: true}, {data: I, label:"I", color: "red", hoverable: true}]);
		this._super();
		this._flotObj.setupGrid();

	},
	setModel: function(model){
	    this._model = model;
	    this.render();
	}
    });

var EXPPlot = Plot.extend({
	init: function(id, options){
	    this._super(id,options);
	    this._plotType='line';
	    this._fill=false;

	},
	render: function(){
		var N=[];
		for(i=0;i<this._model.n;i++){
		    N.push([i,this._model.N[i]]);
		};
		this.setData([{data: N, label:"N", color: "red", hoverable: true}]);
		this._super();
		this._flotObj.setupGrid();
	},
	setModel: function(model){
	    this._model = model;
	    this.render();
	}
    });
