var Custom = {
	scrollToNextSection: function(){
		$(".go-next-btn").on('click', function(){
			var href = $(this).attr("href");

			$('html, body').animate({
				scrollTop: $(href).offset().top
			}, 700);
		});
	},

	toggleScoreOnMobile: function(){
		var $sideToggler = $('#mob-side-toggler');
		var toggleScoreBox = function(){
			var scoreTogglerHeight = $sideToggler.outerHeight();
			var $side = $('.side');
			var scoreBoxHeight = $side.height();
			var scrollDistance = (scoreBoxHeight - scoreTogglerHeight) + "px";

			if( $side.hasClass('side-opened') ){
				$side.css("transform", "translateY("+scrollDistance+")");
			} else {
				$side.css("transform", "translateY(0)");
			}

			$side.toggleClass('side-opened');
		}
		
		toggleScoreBox();

		$sideToggler.on('click', function(){
			toggleScoreBox();
		});
	},
}

$(function(){
	Custom.scrollToNextSection();

	if( $(window).width() < 992 ){
		Custom.toggleScoreOnMobile();
	}
});