function showTimeout(){
	$('#mainHolder').removeClass('blocked');
	$('.activatedBlock .preview').hide();
	$.ajax({
		url: 'ajax.php',
		beforeSend: function(){$('#loader').show();},
		success: function(data){
			$('.activatedBlock').html(data).find('.content').addClass('showContent');
		},
		complete: function(){$('#loader').hide();}
	});
}
function hideTimeout(){
	$('.activatedBlock').remove();
	$('#loader').hide();
	$('#mainHolder').removeClass('blocked').removeClass('closeBlock').addClass('allClosed');
}

$(function(){
	$('#mainHolder > div').on('click', function(){
		if( !$('#mainHolder').hasClass('blocked') ){
			var parent = $(this);
			var elem = parent.clone();
			elem.removeClass('bottom').removeClass('right');
			$('#mainHolder').addClass('blocked');
			// history.pushState({page: elem}, elem, "?p="+elem);
			elem.addClass('activatedBlock').offset( parent.position() ).offset();
			$('#mainHolder').append( elem );
			setTimeout(showTimeout, 300);
		}
	});
	$('body').on('click', '.activatedBlock', function(){
		if( !$('#mainHolder').hasClass('blocked') ){
			$('#loader').hide();
			$('.activatedBlock .preview').show();
			$('#mainHolder').removeClass('allClosed').addClass('closeBlock');
			setTimeout(hideTimeout, 300);
		}
	});

	var cl = new CanvasLoader('loader');
	cl.setShape('spiral');
	cl.setDiameter(31);
	cl.setDensity(72);
	cl.setSpeed(3);
	cl.setFPS(52);
	cl.show();
});

window.onpopstate = function(event) {
	
};