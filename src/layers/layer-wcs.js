define([
	'layers/layer-base'
	], function(BaseLayer) {

	var WCSLayer = BaseLayer.extend({
		defaults: _.extend({}, BaseLayer.prototype.defaults(), {
			'protocol': 'WCS',
			'version': '2.0.0'
		})
	});

	return WCSLayer;

});