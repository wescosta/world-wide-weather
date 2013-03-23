var www = {
	entrada : function() {
		var inicio = function () {
			$(".entrada").fadeOut("slow");
			www.animacao.start();
		};
		
		window.setTimeout(inicio, 3000);
	},
	animacao : {
		start : function() {
			$(".menu").transition({
				marginTop : -240,
				delay : 500
			}, 1000, "ease");
		},
		aparece : function() {
			$(".menu").transition({
				marginTop : 10,
				top : 0
			});
		},
		esconde : function() {
			$(".menu").transition({
				marginTop : -240,
				top : 0
			});
		}
	},
	bindElementos : function() {
		$(".menu").on("click", "a", function() {
			var method = this.id;
			$("#map-canvas").weather(method);
		});

		$(".botao").toggle(www.animacao.aparece, www.animacao.esconde);
	}
};

$(function() {
	$("img#imagem-intro").imagesLoaded(function() {
		$("#map-canvas").weather();
	});
});