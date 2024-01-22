/**
*	Site-specific configuration settings for Highslide JS
*/
hs.graphicsDir = 'js/plugins/highslide/graphics/';
hs.showCredits = false;
hs.outlineType = 'custom';
hs.dimmingOpacity = 0.75;
hs.fadeInOut = true;
hs.align = 'center';
hs.preserveContent = false;
hs.marginLeft = 15;
hs.marginBottom = 15;
hs.captionEval = 'this.a.title';
hs.captionOverlay.position = 'below';
hs.registerOverlay({
	html: '<div class="closebutton" onclick="return hs.close(this)" title="Close"></div>',
	position: 'top right',
	useOnHtml: true,
	fade: 2 // fading the semi-transparent overlay looks bad in IE
});

var slideshow_options = {
	slideshowGroup: 'group1',
	interval: 5000,
	repeat: false,
	useControls: true,
	fixedControls: false,
	overlayOptions: {
		className: 'text-controls',
		opacity: 1,
		position: 'bottom center',
		offsetX: 0,
		offsetY: -10,
		relativeTo: 'viewport',
		hideOnMouseOut: false
	},
	thumbstrip: {
		mode: 'vertical',
		position: 'middle left',
		relativeTo: 'viewport'
	}
};
hs.addSlideshow(slideshow_options);

var slideshow_options2 = {
	slideshowGroup: 'default_group',
	interval: 5000,
	repeat: false,
	useControls: false,
	fixedControls: false,
	overlayOptions: false,
	thumbstrip: false
};
hs.addSlideshow(slideshow_options2);

// gallery config object
var config1 = {
	//slideshowGroup: 'group1',
	transitions: ['expand', 'crossfade']
};

//hs.slideshowGroup = 'group1';

var hs_config1 = {
	slideshowGroup: 'group1',
	transitions:    ['expand', 'crossfade']
};

var hs_config2 = {
	slideshowGroup: 'default_group',
	transitions:    ['expand', 'crossfade']
};


jQuery(document).ready(function($) {

	window.hsGroups= [];

	jQuery.fn.attachHs = function() {
		$(".hidden-container:not(.hs-redy)").each(function() {
			var $this		= $(this),
				groupId		= $this.attr("data-hs_group"),
				newOptions	= {};


			if(hsGroups[groupId] != groupId) {
				$.extend(newOptions, slideshow_options);
				newOptions.slideshowGroup = groupId;
				hs.addSlideshow(newOptions);
				hsGroups[groupId] = groupId;
			}

			$this.addClass("hs-redy");

			var links = $("a.highslide", $this).each(function() {
				$(this).attr("onclick", "return hs.expand(this, {slideshowGroup: '"+groupId+"', transitions: ['expand', 'crossfade'], captionEval: null})")
			});

			$this.parents(".textwidget").find("a.photo").on("click", function(event) {
				event.preventDefault();
				hs.marginBottom = 60;
				hs.marginLeft = 115;
				$(links[0]).trigger("click");
			});

		});
	}

	jQuery(window).attachHs();
});



/**
 * This file contains modifications to Highslide JS for optimizing the display on mobile user agents.
 * 
 * @author Torstein HA~?nsi
 */

if (/(Android|BlackBerry|iPhone|iPod|iPad|Palm|Symbian)/.test(navigator.userAgent)) {
//if (true) {
	hs.addEventListener(document, 'ready', function() {

		// Add a meta tag to have the iPhone render the page 1:1
		hs.createElement('meta', {
			name: 'viewport',
			content: 'width=device-width; initial-scale=1.0; maximum-scale=1.0;'
		}, null, document.getElementsByTagName('head')[0]);
		
		// Add CSS rules
		var stylesheet = document.getElementsByTagName('style')[0];
		stylesheet.appendChild(document.createTextNode(
			'.highslide img {'+
			'	width: 50px; '+
			'}'+
			'.highslide-wrapper div.navbutton {'+
			'	color: white;'+
			'	margin-top: -32px;'+
			'	line-height: 64px;'+
			'	z-index: 9999;'+
			'	font-size: 64px;'+
			'}'+
			'.highslide-full-expand {'+
			'	display: none !important;'+
			'}'+
			'.highslide-wrapper {'+
			'	background: none !important;'+
			'}'+
'.highslide-thumbstrip, .text-controls {display: none !important;}'+
			'.highslide-caption {'+
			'	border: none !important;'+
			'	color: white !important;'+
			'	background: none !important;'+
			'}'
		));
	});
}

function theMobile() {
	if (/(Android|BlackBerry|iPhone|iPod|iPad|Palm|Symbian)/.test(navigator.userAgent)) {
		// add some options that make sense on a small touchscreen
		hs.outlineType = null; // outlines look distorted at normal zoom
		hs.expandDuration = 0; // animation is too slow anyway
		hs.restoreDuration = 0;
		hs.transitionDuration = 0;
		hs.wrapperClassName = 'borderless draggable-header mobile'; // take all the space available for the image
		hs.marginTop = 15;
		hs.marginRight = 15;
		hs.marginBottom = 10;
		hs.marginLeft = 10;
		hs.captionOverlay.fade = false;
		hs.allowHeightReduction = false; // t=10503

/*		
		// Remove any slideshows with too small controls
		hs.slideshows = [];
*/
		
		// Create custom previous and next overlays
		hs.registerOverlay({
			position: 'middle left',
			width: '20%',
			html: '<div class="navbutton"  onclick="hs.previous()" title="'+
				hs.lang.previousTitle +'">&lsaquo;</div>',
			hideOnMouseOut: false
		});
		hs.registerOverlay({
			position: 'middle right',
			width: '20%',
			html: '<div class="navbutton" style="text-align: right" onclick="hs.next()" title="'+
				hs.lang.nextTitle +'">&rsaquo;</div>',
			hideOnMouseOut: false
		});
	}
}
theMobile();