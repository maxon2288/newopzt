$(function() {

	// --------------------------------------------------------------------------
	// Detect Touch
	// --------------------------------------------------------------------------

	function detectTouch() {
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	        $('html').addClass('touch-device');
	    }
	    else {
	    	$('html').addClass('no-touch-device');
	    }
	}
	detectTouch();

	// --------------------------------------------------------------------------
	// SVG
	// --------------------------------------------------------------------------

	svg4everybody();

	// --------------------------------------------------------------------------
	// Nav
	// --------------------------------------------------------------------------


	$('.nav').on('click', '.nav-btn', function(event) {
		event.preventDefault();
		if ($(this).is('.is-active')) {
            $(this).removeClass('is-active').closest('body').removeClass('is-navOpen');
        }
        else {
            $(this).addClass('is-active').closest('body').addClass('is-navOpen');
        }
	});

	$('.nav').on( 'click', 'li:has(.nav-sub) > .nav-link, li:has(.nav-sub) > .nav-sub-link', function(event) {

		if (matchMedia('only screen and (max-width: 1199px)').matches) {

			if( $(this).is('.is-active')) {
				$(this).removeClass('is-active').next('.nav-sub').slideUp(240);
			}
			else {
				$(this).addClass('is-active').next('.nav-sub').slideDown(240);
			}

		}

		else {
			if( $(this).is('.is-active')) {
				$(this).removeClass('is-active').closest('li').removeClass('is-open');
			}
			else {
				$(this).addClass('is-active').closest('li').addClass('is-open');
			}
		}

		event.preventDefault();
		
	});


	$(document).on('click', function(e) {
        if($(e.target).closest('.nav').length == 0) {
           $('.nav-menu li, .nav-link').removeClass('is-open is-active');
        }
    });


	// --------------------------------------------------------------------------
	// News Region
	// --------------------------------------------------------------------------

    $('.news-region').on('click', '.news-region-trigger', function(event) {
		event.preventDefault();
		if ($(this).is('.is-active')) {
            $(this).removeClass('is-active').closest('body').removeClass('is-regionOpen');
        }
        else {
            $(this).addClass('is-active').closest('body').addClass('is-regionOpen');
        }
	});


	$(document).on('click', function(e) {
        if($(e.target).closest('.news-region').length == 0) {
           $('body, .news-region-trigger').removeClass('is-regionOpen is-active');
        }
    });

    // --------------------------------------------------------------------------
	// News Share
	// --------------------------------------------------------------------------

    $('.news-share').on('click', '.news-share-trigger', function(event) {
		event.preventDefault();
		if ($(this).is('.is-active')) {
            $(this).removeClass('is-active').closest('body').removeClass('is-shareOpen');
        }
        else {
            $(this).addClass('is-active').closest('body').addClass('is-shareOpen');
        }
	});


	$(document).on('click', function(e) {
        if($(e.target).closest('.news-share').length == 0) {
           $('body, .news-share-trigger').removeClass('is-shareOpen is-active');
        }
    });



	// --------------------------------------------------------------------------
	// Scrollbar
	// --------------------------------------------------------------------------

	$('.js-scrollbar').scrollbar({
		disableBodyScroll: true
	});

	// --------------------------------------------------------------------------
	// Tabs
	// --------------------------------------------------------------------------

	$('.geo-tabs-menu').on('click', 'li:not(.active)', function() {
		$(this).addClass('is-active').siblings().removeClass('is-active')
		.closest('.geo-tabs').find('.geo-tabs-panel').removeClass('is-active').eq($(this).index()).addClass('is-active');
	});

	// --------------------------------------------------------------------------
	// Owl Carousel
	// --------------------------------------------------------------------------

	var iconPrev = '<svg class="icon-prev"><use xlink:href="/sprites/sprite.svg#icon-prev"></use></svg>',
		iconNext = '<svg class="icon-next"><use xlink:href="/sprites/sprite.svg#icon-next"></use></svg>';


	$('.partners-slides').owlCarousel({
	    loop: false,
	    margin: -1,
	    nav: true,
	    dots: false,
	    items: 1,
	    navText: [iconPrev,iconNext],
		responsive: {
			0: {
				items: 1
			},
			480: {
				items: 2
			},
			768: {
				items: 3
			},
			992: {
				items: 6
			}
		}
	});

	$('.about-slides').owlCarousel({
	    loop: true,
	    margin: 30,
	    nav: true,
	    dots: false,
	    items: 1,
	    navText: [iconPrev,iconNext],
		responsive: {
			0: {
				items: 1
			},
			480: {
				items: 2
			},
			768: {
				items: 3
			},
			992: {
				items: 4
			}
		}
	});

		// --------------------------------------------------------------------------
	// Gallery
	// --------------------------------------------------------------------------


	if ( $('.gallery').length) {



	var sync1 = $('.gallery-slides'),
		sync2 = $('.gallery-thumbs'),
		slidesPerPage = 4,
		syncedSecondary = true;

		sync1.owlCarousel({
			items : 1,
			nav: true,
			loop: false,
			autoplay: false,
			autoplayTimeout: 5000,
			margin: 10,
			dots: true,
			navText: [iconPrev,iconNext],
		}).on('changed.owl.carousel', syncPosition);

		sync2
		.on('initialized.owl.carousel', function () {
			var showArrows = sync2.find(".owl-item").length;
			if (showArrows <=4) $(this).closest('.gallery').addClass('is-hideArows');
			sync2.find(".owl-item").eq(0).addClass("is-current");
		})
		.owlCarousel({
			items : 4,
			slideBy: 1,
			nav: true,
			autoplay: false,
			autoplayTimeout: 5000,
			margin: 10,
			navText: [iconPrev,iconNext],
		});

		function syncPosition(el) {
		
			var current = el.item.index;

			sync2.find('.owl-item').removeClass('is-current').eq(current).addClass('is-current');

			var onscreen = sync2.find('.owl-item.active').length - 1;
			var start = sync2.find('.owl-item.active').first().index();
			var end = sync2.find('.owl-item.active').last().index();

			if (current > end) {
				sync2.data('owl.carousel').to(current, 100, true);
			}
			if (current < start) {
				sync2.data('owl.carousel').to(current - onscreen, 100, true);
			}

		}


		sync2.on('click', '.owl-item', function(event){
			event.preventDefault();
			var number = $(this).index();
			sync1.data('owl.carousel').to(number, 300, true);
		});

	}



	$('body').on('keydown', function(e) {
			
		if(e.keyCode == 37) {
			sync1.trigger('prev.owl.carousel');
		}
		if(e.keyCode == 39) {
			sync1.trigger('next.owl.carousel');
		}
	});
	



	// --------------------------------------------------------------------------
	// Datepicker
	// --------------------------------------------------------------------------



	function stringToArray(str){
        var arrEl = str.split(',');
        var arr = new Array();

        for(var i = 0; i < arrEl.length; i++){

            arr[i] = arrEl[i].split('=');

        }

        return arr;
    }


	function highlightDays(date) {
        for (var i = 0; i < dates.length; i++) {
            if (new Date(dates[i]).toString() == date.toString()) {              
                return [true, 'ui-event'];
            }
        }
        for (var i = 0; i < current.length; i++) {
            if (new Date(current[i]).toString() == date.toString()) {              
                return [true, 'ui-current'];
            }
        }
        return [true, ''];
    } 

    var dates = stringToArray( $(".js-datepicker").data('events') );
	var current = stringToArray( $(".js-datepicker").data('current') );
	



	$(".js-datepicker").datepicker({
		inline: true,
		showOtherMonths: true,
		dateFormat: "dd.mm.yy",
		beforeShowDay: highlightDays,
		prevText: iconPrev,
		nextText: iconNext
  	});


  	$(".js-datepicker").datepicker("setDate", new Date(current) );




  	

	


	// ------ 


  	$(".js-datepicker-slide").datepicker({
		showOtherMonths: true,
		showAnim: false,
		prevText: iconPrev,
		nextText: iconNext
  	});


  	$('.js-datepicker-trigger').on('click', function(e){
		$('.js-datepicker-slide').addClass('is-open');
	});

	$('.js-datepicker-slide').on('change',function(){
		var $datepicker = $(this),
			$datepickerDate = $datepicker.val(),
			$datepickerTrigger = $('.js-datepicker-trigger');

		$datepickerTrigger.val($datepickerDate);
		// $datepicker.removeClass('is-open');
	});


	$(document).on('click', function(e) {
        if($(e.target).closest('.js-datepicker-slide, .js-datepicker-trigger').length == 0) {
           $('.js-datepicker-slide').removeClass('is-open');
        }
    });



  	// --------------------------------------------------------------------------
	// Formstyler
	// --------------------------------------------------------------------------

	$('.app-select').styler({
		selectSmartPositioning: false,
		selectSearch: false,
		selectVisibleOptions: 0,
		selectSearchLimit: 6
	});


	


	// --------------------------------------------------------------------------
	// Popup
	// --------------------------------------------------------------------------


	$('[data-mfp]').magnificPopup({
		type:'inline',
		mainClass: 'mfp-with-zoom',
		showCloseBtn: false,
		removalDelay: 300,
		zoom: {
		    enabled: true,
		    duration: 300,
		    easing: 'ease-in-out'
		  },
		  overflowY: 'scroll',

		  callbacks: {
		    open: function() {

		    	var magnificPopup = $.magnificPopup.instance;

		    	$('.gallery-slides').trigger('to.owl.carousel', [magnificPopup.index, 0]);

		    	var eventsName = magnificPopup.st.el.closest('.events-item').find('.events-item-title').text();

		    	magnificPopup.content.find('[name="event"]').val(eventsName)

		    	// console.log(eventsName)
		    }
		  }
	});

	$('[data-mfp-close]').on('click', function(event) {
		event.preventDefault();
		$.magnificPopup.close();
	});


	// ------


	$('[data-mfp-video]').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-with-zoom',
		showCloseBtn: true,
		removalDelay: 300,
		zoom: {
		    enabled: true,
		    duration: 300,
		    easing: 'ease-in-out'
		  },
		  overflowY: 'scroll'
	});



	// --------------------------------------------------------------------------
	// Chart
	// --------------------------------------------------------------------------


	var chartPie = AmCharts.makeChart("chartPie", {
		  "type": "pie",
		  "startDuration": 0,
		  "addClassNames": true,
		  "theme": "light",
		  "allLabels": [{
		    "y": "43%",
		    "align": "center",
		    "size": 14,
		    "bold": true,
		    "text": "ПОЛНЫЙ СОСТАВ",
		    "color": "#2b2b2b"
		  }, {
		    "y": "48%",
		    "align": "center",
		    "size": 14,
		    "bold": true,
		    "text": "НП “ОПЖТ” ПО ТИПАМ",
		    "color": "#2b2b2b"
		  }, {
		    "y": "53%",
		    "align": "center",
		    "size": 14,
		    "bold": true,
		    "text": "ПРЕДПРИЯТИЙ",
		    "color": "#2b2b2b"
		  }],
		"innerRadius": '120', //120
		"pullOutRadius": 0,
		 "startAngle": 20,
		  colors: ["#0091E2", "#27C7FB", "#0E3E59", "#6E2F72", "#BCD228", "#E64924", "#80913C", "#25A89D", "#E12B89", "#595CDD", "#5FB249", "#FBCC27"],
		  "dataProvider": [{
		    "country": "Комплектаторы",
		    "litres": 50
		  }, {
		    "country": "ОАО “РЖД”",
		    "litres": 3
		  }, {
		    "country": "Ремонтные заводы",
		    "litres": 6
		  }, {
		    "country": "ГО “АО “Казахстан темир жолы”",
		    "litres": 6
		  }, {
		    "country": "ГО “Белорусская железная дорога”",
		    "litres": 5
		  }, {
		    "country": "Локомотивостроительные заводы",
		    "litres": 18
		  }, {
		    "country": "Вагоностроительные и вагоноремонтные заводы",
		    "litres": 22
		  }, {
		    "country": "Инфраструктурный комплекс",
		    "litres": 15
		  }, {
		    "country": "Металлургические компании",
		    "litres": 5
		  }, {
		    "country": "Консалтинговые фирмы",
		    "litres": 5
		  }, {
		    "country": "НИИ и ВУЗы",
		    "litres": 7
		  }, {
		    "country": "Операторы",
		    "litres": 5
		  }],
		  "valueField": "litres",
		  "titleField": "country",
		  "export": {
		    "enabled": true
		  },
		  "labelsEnabled": false,
		  "marginTop": 40,
  		  "marginBottom": 40,
  		  "balloonText": "[[country]]</b>",
  		  "balloon": {
		    "borderThickness": 0,
		    "color": "#fff",
		    "fillColor": "none",
		    "fillAlpha": 1,
		    "fontSize": 12,
		    "horizontalPadding": 0,
		    "verticalPadding": 0,
		    "shadowColor": 'none',
		    "showBullet": false,
		    "fixedPosition": false
		  },
		  "listeners": [{
			   "event": "rendered",
			   "method": function(e) {

					
					$('#chartPie-loading').fadeOut();

					chartPie.customLegend = $('#chartLegend');

					for (var i in chartPie.chartData) {
						var row = chartPie.chartData[i];
						var color = chartPie.colors[i];
						var value = row.value;
						chartLegend.innerHTML += '<div class="chart-legend-item" id="chart-legend-item-' + i + '"><div class="chart-legend-marker" style="background: ' + color + '"></div>' + row.title + '<div class="chart-legend-value">' + value + '</div></div>';


						$('.chart-legend-item').hover(function() {
		    					var el = $(this).index();
								chartPie.rollOverSlice(el);
						}, function() {
		    				var el = $(this).index();
							chartPie.rollOutSlice(el);
						});


					}
	

				}
		   }]
		}, 400);

		// Комплектаторы
		// ОАО “РЖД”
		// Ремонтные заводы
		// ГО “АО “Казахстан темир жолы”
		// ГО “Белорусская железная дорога”
		// Локомотивостроительные заводы
		// Вагоностроительные и вагоноремонтные заводы
		// Инфраструктурный комплекс
		// Металлургические компании
		// Консалтинговые фирмы
		// НИИ и ВУЗы
		// Операторы

		// ------



		var chartColumn = AmCharts.makeChart( "chart-column", {
			"type": "serial",
			"theme": "light",
			"dataProvider": [ {
				"country": "2007",
				"visits": 58
			}, {
				"country": "2008",
				"visits": 70
			}, {
				"country": "2009",
				"visits": 75
			}, {
				"country": "2010",
				"visits": 80
			}, {
				"country": "2011",
				"visits": 95
			}, {
				"country": "2012",
				"visits": 120
			}, {
				"country": "2013",
				"visits": 140
			}, {
				"country": "2014",
				"visits": 155
			}, {
				"country": "2015",
				"visits": 170
			}, {
				"country": "2016",
				"visits": 175
			}, {
				"country": "2017",
				"visits": 171
			}],
			"valueAxes": [ {
				"gridColor": "#DDDDDD",
				"gridAlpha": 1,
				"dashLength": 0,
				axisColor: '#DDDDDD',
				fontFamily: 'Open Sans',
				fontSize: '14',
			} ],
			"gridAboveGraphs": false,
			"startDuration": 1,
			"graphs": [ {
				"balloonText": "<b>[[value]]</b>",
				"lineAlpha": 0,
				"type": "column",
				"valueField": "visits",
				fillColors : '#0091E2',
				"fillAlphas": 1,
				columnWidth : 0.3,
				colorField: '#2b2b2b',
				// "showBalloon": false,

			} ],
			
			"categoryField": "country",
			"categoryAxis": {
				"gridPosition": "start",
				"gridAlpha": 0,
				"tickPosition": "start",
				"tickLength": 20,
				fillColors : '#0091E2',
				axisColor: '#DDDDDD',
				fontFamily: 'Open Sans',
				fontSize: '14',
			},
			"export": {
				"enabled": true
			},
			"balloonText": "[[country]]</b>",
			"balloon": {
				"borderThickness": 0,
				"color": "#fff",
				"fillColor": "none",
				"fillAlpha": 1,
				"fontSize": 12,
				"horizontalPadding": 0,
				"verticalPadding": 0,
				"shadowColor": 'none',
				"showBullet": false,
				"fixedPosition": true
			},


			"startDuration": 1,


		"listeners": [{
			   "event": "rendered",
			   "method": function(e) {

					
					$('#chartColumn-loading').fadeOut();
	

				}
		   }]
		}, 400);




	// --------------------------------------------------------------------------
	// Validate
	// --------------------------------------------------------------------------


	$(".js-mask-phone").mask("+7 (999) 999-9999");

	$.validator.addMethod("regexp", function (value, element) {
	    return this.optional(element) || /^\+\d \(\d{3}\) \d{3}-\d{4}$/.test(value);
	}, 'Введите телефон');

	var request = $('#request').validate({
		errorClass: 'is-error',
		validClass: 'is-success',
		errorElement: "p",
		ignore: ":disabled,:hidden",
		rules: {
			company: "required",
			fullName: "required",
			position: "required",
			phone: {
                required: true,
                regexp: true
			},
			email: {
		    	required: true,
				email: true
			}

		},
		messages: {
			company: 'Введите название компании',
			fullName: 'Введите ФИО',
			position: 'Введите Вашу должность',
			phone: 'Введите телефон',
			email: 'Введите E-mail'
		},
		submitHandler: function(formSerialize) {

			var formSerialize = $('#request').serialize(); 

			 $.ajax({
                type: "POST",
                url: $('#request').attr('action'),
                data: formSerialize,
                timeout: 300,
                success: function() {


	                	$.magnificPopup.open({
							type:'inline',
							items: {
					            src: '#popup_success'
					        },
							mainClass: 'mfp-with-zoom',
							showCloseBtn: false,
							removalDelay: 300,
							zoom: {
							    enabled: true,
							    duration: 300,
							    easing: 'ease-in-out'
							},
							overflowY: 'scroll'

					    });


					    $("#request")[0].reset().find('.app-input').removeClass('is-success');

                },
                error: function() {
                	// $.magnificPopup.close();
                	
                }
            });

            return false;

		}
	});



});