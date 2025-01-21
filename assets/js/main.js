
(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});

	// Smooth scrolling for navbar links
	document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("#navbar a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50, // Adjust for navbar height
                    behavior: "smooth"
                });
            }
        });
    });
	});

	document.addEventListener("DOMContentLoaded", function () {
		const textElement = document.getElementById("typing-text");
		const staticText = "hey, i'm aiden.";
		const dynamicWords = ["i code.", "i journal.", "i excel.", "and . . . .  i ball."];
		let wordIndex = 0;
		let charIndex = 0;
		let isDeleting = false;
	
		function typeEffect() {
			const currentWord = dynamicWords[wordIndex];
			const displayText = staticText + "<br>" + currentWord.substring(0, charIndex);
			textElement.innerHTML = displayText + "<span class='cursor'>|</span>";
	
			if (!isDeleting && charIndex < currentWord.length) {
				charIndex++; // Typing forward
				setTimeout(typeEffect, 100);
			} else if (isDeleting && charIndex > 0) {
				charIndex--; // Deleting backward
				setTimeout(typeEffect, 50);
			} else {
				if (!isDeleting) {
					// Check if we're at the last word
					if (wordIndex === dynamicWords.length - 1) {
						setTimeout(typeEffect, 3000); // Longer pause at the end
					} else {
						setTimeout(typeEffect, 1500); // Normal pause before deleting
					}
					isDeleting = true;
				} else {
					isDeleting = false;
					wordIndex = (wordIndex + 1) % dynamicWords.length;
					setTimeout(typeEffect, 500); // Pause before typing next word
				}
			}
		}
	
		typeEffect();
	});

})(jQuery);
