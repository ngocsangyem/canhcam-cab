function CCForm7() {
	$('.canhcam-form-7 .validator').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			alert($(this).find('input').attr('data-error'))
		} else {
			$(this)[0].reset();
		}
		return false
	})
};

$(function() {
    CCForm7();
})

$(window).resize(function() {})
