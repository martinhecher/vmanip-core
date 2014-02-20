define([
	'layers/layer-base'
	], function(BaseLayer) {

	var WMSLayer = BaseLayer.extend({
		defaults: _.extend({}, BaseLayer.prototype.defaults(), {
			'protocol': 'WMS',
			'style': 'default',
			'crs': 'EPSG:4326',
			'format': 'image/png',
			'version': '1.0.0',
			'transparent': true
		})
	});

	return WMSLayer;
	
});