define(function() {

	/**
	 * @class Layer.Base: An abstract object managing a request to a OGC service provider.
	 *
	 * @note: In the future this can really be a 'base' object, not oriented on an (OGC) request
	 * schema, but for now this is all we need.
	 */
	var BaseLayer = Backbone.Model.extend({

		/**
		 * The Base layer defines common visualization properties, as well as internal data
		 * structures (it is not necessary to define them here, but it is a clear way to
		 * document the internal data structure).
		 */
		defaults: function() {
			return {
				// Visualization options:
				'opacity': 1,
				'ordinal': -1,

				// Internal data structures:
				'mimeTypeHandlers': []
			}
		},

		/**
		 * Registers a handler for a specific format for preprocessing data received
		 * by a data request. An eventual registered handler with the same mimetype
		 * will be overwritten.
		 *
		 * @param mimetype - MIME type name (i.e. 'image/x-aaigrid')
		 * @returns {boolean} - TRUE if a handler for the given format was already registered,
		 * FALSE if not
		 */
		registerMimeTypeHandler: function(mimetype, handler) {
			var wasRegistered = false;
			if (this.get('mimeTypeHandlers')[mimetype]) {
				wasRegistered = true;
			}
			this.get('mimeTypeHandlers')[mimetype] = handler;

			return wasRegistered;
		},

		getMimeTypeHandlers: function() {
			return this.get('mimeTypeHandlers');
		}
	});

	return BaseLayer;
	
});