define([
	'layers/layer-base',
	'layers/layer-wms',
	'layers/layer-wcs'
], function(BaseLayer, WMSLayer, WCSLayer) {

	var VMANIP = {};
	
	VMANIP.Layers = {};
	VMANIP.Layers.Base = BaseLayer;
	VMANIP.Layers.WMS = WMSLayer;
	VMANIP.Layers.WCS = WCSLayer;

	VMANIP.Modules = {};

	/**
	 * A Context represents the current state of the VMANIP
	 * runtime, containing selected layers, layer settings, ToI, AoI, etc.
	 * Modules or external entities can request or inject data into the
	 * context (i.e. the TimeSlider injects and updates the current
	 * time of interest). Moreover, Modules can register observers to
	 * data bits of the context to get notified when this data is changed
	 * and can react to the change accordingly.
	 * The Context paradigm also allows for easy testing of the application.
	 */
	VMANIP.Context = function(opts) {
		this.id = opts.id;
		console.log('[Context] "' + this.id + '" initialized');
	};

	/** 
	 * A Runtime manages one or more modules. The idea is that one
	 * 'viewer window' (e.g. a  <div> where VMANIP info is displayed)
	 * should have its own runtime, which can contain multiple VMANIP
	 * modules. The runtime allows to switch between the modules
	 * programmatically and to configure them. To implement something
	 * like a splitview you would create a runtime for each window in
	 * the splitview.
	 *
	 * Note: Runtimes are very lightweight and it is possible and easy to
	 * share contexts between runtimes.
	 */
	VMANIP.Runtime = function() {
		this.modules = {};
		console.log('[Runtime] initialized');
	};

	VMANIP.Runtime.prototype.addModule = function(module, context) {
		module.setContext(context);
		this.modules[module.id] = module;
	};

	VMANIP.Runtime.prototype.listModules = function() {
		console.log('[Runtime] registered modules:');
		for (var item in this.modules) {
			if (this.modules.hasOwnProperty(item)) {
				console.log('    * ' + this.modules[item].id);
			}
		}
	};

	VMANIP.Runtime.prototype.showModules = function(id) {
		console.log('[Runtime] showing module "' + id + '"');
	};

	/**
	 * A Module is an entity that visualizes a Context. The object is used as
	 * a base class that is implemented by a derived object (e.g. the VGV module)
	 * to easily hook into the VMANIP system.
	 * A Module is registered with a VMANIP.Runtime, which manages and controls
	 * multiple modules. Contexts can be shared between modules and runtimes
	 * easily.
	 *
	 * @see Runtime, Context
	 */
	VMANIP.Modules.Base = function(opts) {
		this.id = opts.id;
		console.log('[Module] "' + this.id + '" initialized');
	};

	VMANIP.Modules.Base.prototype.setContext = function(context) {
		this.context = context;
		console.log('[Module] set context "' + this.context.id + '" on "' + this.id + '"');
	};

	VMANIP.Modules.VirtualGlobeViewer = function(opts) {
		this.id = opts.id;
		console.log('[Module] "' + this.id + '" initialized');
	};

	VMANIP.Modules.VirtualGlobeViewer.prototype.setContext = function(context) {
		this.context = context;
		console.log('[Module] set context "' + this.context.id + '" on "' + this.id + '"');
	};

	window.VMANIP = VMANIP;

	return VMANIP;
});