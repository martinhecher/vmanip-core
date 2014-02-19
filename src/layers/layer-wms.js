define([
	'layers/layer-base'
	], function(BaseLayer) {

	var WCSLayer = BaseLayer.extend({
		defaults: _.extend({}, BaseLayer.prototype.defaults(), {
			'protocol': 'WMS',
			'style': 'default',
			'crs': 'EPSG:4326',
			'format': 'image/png',
			'version': '1.0.0'
		})
	});

	return WCSLayer;
	
});