	var www = {
			entrada : function() {
					var intervalo = window.setInterval(inicio, 3000);
					function inicio() {
						$('.entrada').fadeOut('slow');
						www.animacao.start();
						window.clearInterval(intervalo);
					};
			},
			animacao : {
				start : function() {
					$('.menu').transition({ 
							marginTop: -240,
							delay:500,
						}, 1000, 'ease');
				},
				aparece : function() {
					$('.menu').transition({ 
							marginTop: 10,
							top: 0
						});
				},
				esconde : function() {
					$('.menu').transition({ 
						marginTop: -240,
						top: 0
					});
				}
			},
			bindElementos : function() {
				$('.menu').on('click', '#celsius', function(){ $("#map-canvas").weather("celsius"); })
								  .on('click', '#fahrenheit', function(){ $("#map-canvas").weather("fahrenheit"); })
								  .on('click', '#zoomMais', function() { $("#map-canvas").weather("zoomMais"); })
								  .on('click', '#zoomMenos', function() { $("#map-canvas").weather("zoomMenos"); });
				
				$('.botao').toggle(function() { 
						www.animacao.aparece();
					},
					function() {
						www.animacao.esconde();
					}
				);
			}
		};

	$(function(){
		$('img#imagem-intro').imagesLoaded(function() {
			$("#map-canvas").weather();
		});
	});