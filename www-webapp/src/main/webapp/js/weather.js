(function($) {
	var opts, container, map, weatherLayer = undefined;
	
	var cloudLayer = new google.maps.weather.CloudLayer();
	var brazil = new google.maps.LatLng(-18.771115, -42.758789);

	var methods = {
		init: function(_opts) {
			opts = $.extend({}, $.fn.weather.settings, this.opts, _opts);
			build.map();
		},
		map: function() {
			return map;
		},
		celsius: function() {
			weatherLayer.setOptions({'temperatureUnits': google.maps.weather.TemperatureUnit.CELSIUS});
		},
		fahrenheit: function() {
			weatherLayer.setOptions({'temperatureUnits': google.maps.weather.TemperatureUnit.FAHRENHEIT});
		},
		cloud: function() {
			cloudLayer.setMap(cloudLayer.getMap() ? null: map);
		},
		// Wesley, se quiser, pode melhorar esta dinamica de zoom
		zoomMais: function() {
			var valor = map.getZoom(); 
			valor++;		
			if (valor <= 12) {
				weatherLayer.setOptions({ zoom:valor });
				valor++;
			}		
		},
		zoomMenos: function() {
			var valor = map.getZoom();
			valor--;		
			if (valor >= 4) { 
				weatherLayer.setOptions({ zoom:valor });
				valor--;
			}
		}
	};

	var build = {
		map: function() {
			if (!map) {
				map = new google.maps.Map($(container)[0], opts);
				build.layers.weather().cloud();
				position.load();
			
			}
		},
		layers: {
			weather: function() {
				weatherLayer = new google.maps.weather.WeatherLayer(opts);
				weatherLayer.setMap(map);
				google.maps.event.addListener(weatherLayer, 'click', util.removePublicity);
				
				return build.layers;
			},
			cloud: function() {
				if (opts.cloud) methods.cloud();
				return build.layers;
			}
		}
	};
		
	var position = {
		load: function() {
			if (!opts.position && navigator.geolocation) {
				position.get(function(_position, status) {
					if (status == "OK")
						position.set(new google.maps.LatLng(_position.coords.latitude, _position.coords.longitude));
					else
						$.error("[world-wide-weather] Unable to load client position. " + status.message);
				});
			}
		},
		set: function(position) {
			opts.position = position;
			map.setCenter(opts.position);
		},
		get: function(callback) {
			navigator.geolocation.getCurrentPosition ( 
				function(result) {
					callback(result, 'OK');
				}, 
				function(error) {
					callback(null, error);
				}
			);
		}
	};
	
	var util = {
		removePublicity: function(e) {
			var html = $(e.infoWindowHtml);
			
			html.find("a[href][href!=#][href*=http][href*=google]").parent().remove();
			e.infoWindowHtml = html.html();
		}
	};

	$.fn.weather = function(_opts, args) {
		container = $(this);

		if (!opts || typeof _opts == "object") {
			methods.init(_opts);
		} else if (typeof _opts == "string" && methods[_opts]) {
			return methods[_opts](args);
		} else {
			$.error("[world-wide-weather] Unsuported parameter " + _opts);
		}
		
	};

	$.fn.weather.settings = {
		center: brazil,
		zoom: 10,
		minZoom: 4,
		maxZoom: 12,
		clickable:false,
		suppressInfoWindows:false,
		disableDoubleClickZoom:true,
		temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS,
		windSpeedUnits: google.maps.weather.WindSpeedUnit.KILOMETERS_PER_HOUR,
		cloud: false,
		panControl: false,
		streetViewControl: false,
		mapTypeControl: false,
		navigationControl: false,
		streetViewControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControlOptions: {
		   style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
		   position: google.maps.ControlPosition.TOP_LEFT
	    	}
	};
})(jQuery);
