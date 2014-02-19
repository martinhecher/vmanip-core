define([
	'layers/layer-base'
	], function(BaseLayer) {

	var WMSLayer = BaseLayer.extend({
		defaults: _.extend({}, BaseLayer.prototype.defaults(), {
			'protocol': 'WCS',
			'version': '2.0.0'
		})
	});

	return WMSLayer;

});