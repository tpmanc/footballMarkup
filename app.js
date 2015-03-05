var blocked = false;

function showTimeout(){
	$('.activatedBlock .preview').hide();
	$.ajax({
		url: 'ajax.php',
		beforeSend: function(){$('#loader').show();},
		success: function(data){
			$('.activatedBlock').html(data).find('.content').addClass('showContent');
		},
		complete: function(){
			$('#loader').hide();
			blocked = false;
		}
	});
}
function hideTimeout(){
	$('.activatedBlock').remove();
	$('#loader').hide();
	blocked = false;
	$('#mainHolder').removeClass('closeBlock').addClass('allClosed');
}

$(function(){
	var mainHolder = $('#mainHolder');

	$('#mainHolder > div').on('click', function(){
		if( !blocked ){
			var parent = $(this);
			var elem = parent.clone();
			elem.removeClass('bottom').removeClass('right').addClass('activatedBlock').offset( parent.position() );
			blocked = true;
			mainHolder.append( elem );
			setTimeout(showTimeout, 800);
		}
	});
	$('body').on('click', '.activatedBlock', function(){
		if( !blocked ){
			blocked = true;
			$('#loader').hide();
			$('.activatedBlock .preview').show();
			mainHolder.removeClass('allClosed').addClass('closeBlock');
			setTimeout(hideTimeout, 800);
		}
	});

	var cl = new CanvasLoader('loader');
	cl.setShape('spiral');
	cl.setColor('#ffffff');
	cl.setDiameter(31);
	cl.setDensity(72);
	cl.setSpeed(3);
	cl.setFPS(52);
	cl.show();
});

window.onpopstate = function(event) {
	
};