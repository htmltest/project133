$(document).ready(function() {

    $('.table-scroll').mCustomScrollbar({
        axis: 'x'
    });

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $('body').on('change', '.form-file input', function() {
        var curInput = $(this);
        var curField = curInput.parents().filter('.form-file');
        var curForm = curField.parents().filter('form');
        var curName = curInput.val().replace(/.*(\/|\\)/, '');
        var curNameArray = curName.split('.');
        var curExt = curNameArray[curNameArray.length - 1];
        curNameArray.pop();
        var curNameText = curNameArray.join('.');
        if (curNameText.length > 10) {
            curNameText = curNameText.substring(0, 10) + '...' + curNameText.slice(-1);
        }
        curField.find('.form-file-name-text').html(curNameText + '.' + curExt);
        curForm.find('.form-files').append(curForm.data('filesCode'));
    });

    $('body').on('click', '.form-file-name-remove', function() {
        var curField = $(this).parents().filter('.form-file');
        curField.remove();
    });

    $('body').on('focus', '.form-input input, .form-input textarea', function() {
        $(this).parent().addClass('focus');
    });

    $('body').on('blur', '.form-input input, .form-input textarea', function() {
        $(this).parent().removeClass('focus');
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        } else {
            $(this).parent().removeClass('full');
        }
    });

    $('form').each(function() {
        initForm($(this));
    });

    $('body').on('click', '.window-link', function(e) {
        if ($('html').hasClass('header-menu-open')) {
            $('.header-menu-link').click();
        }
        if ($('html').hasClass('config-menu-open')) {
            $('.nav-config a').click();
        }
        var curLink = $(this);
        windowOpen(curLink.attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $(window).resize(function() {
        windowPosition();
    });

    $('body').on('click', '.window-close, .window-thanks-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('.header-menu-link').click(function(e) {
        if ($('html').hasClass('config-menu-open')) {
            $('.nav-config a').click();
        }
        if (!$('html').hasClass('header-menu-open')) {
            var curPadding = $('.wrapper').width();
            $('html').addClass('header-menu-open');
            curPadding = $('.wrapper').width() - curPadding;
            $('body').css({'margin-right': curPadding + 'px'});
            $('header').css({'padding-right': curPadding + 'px'});
        } else {
            $('html').removeClass('header-menu-open');
            $('body').css({'margin-right': 0});
            $('header').css({'padding-right': 0});
        }
        e.preventDefault();
    });

    $('.header-menu-close').click(function(e) {
        $('html').removeClass('header-menu-open');
        $('body').css({'margin-right': 0});
        $('header').css({'padding-right': 0});
        e.preventDefault();
    });

    $('.nav-config a').click(function(e) {
        if ($('html').hasClass('header-menu-open')) {
            $('.header-menu-link').click();
        }
        if (!$('html').hasClass('config-menu-open')) {
            var curPadding = $('.wrapper').width();
            $('html').addClass('config-menu-open');
            curPadding = $('.wrapper').width() - curPadding;
            $('body').css({'margin-right': curPadding + 'px'});
            $('header').css({'padding-right': curPadding + 'px'});
        } else {
            $('html').removeClass('config-menu-open');
            $('body').css({'margin-right': 0});
            $('header').css({'padding-right': 0});
        }
        e.preventDefault();
    });

    $('.main-config-btn .btn, .clients-config-link, .side-config-link').click(function(e) {
        $('.nav-config a').trigger('click');
        if ($(window).width() < 1366) {
            $('.header-mobile-link').trigger('click');
            $('.mobile-config-link').trigger('click');
        }
        e.preventDefault();
    });

    $('.config-menu-list input').change(function() {
        var curIndex = $('.config-menu-list input').index($('.config-menu-list input:checked'));
        $('.config-menu-tab.active').removeClass('active');
        $('.config-menu-tab').eq(curIndex).addClass('active');
    });

    $('.config-menu-list input:checked').each(function() {
        var curIndex = $('.config-menu-list input').index($('.config-menu-list input:checked'));
        $('.config-menu-tab.active').removeClass('active');
        $('.config-menu-tab').eq(curIndex).addClass('active');
    });

    $('.config-menu-tab-params-class input').change(function() {
        var curTab = $(this).parents().filter('.config-menu-tab');
        var curIndex = curTab.find('.config-menu-tab-params-class input').index(curTab.find('.config-menu-tab-params-class input:checked'));
        curTab.find('.config-menu-tab-params-method-tab.active').removeClass('active');
        curTab.find('.config-menu-tab-params-method-tab').eq(curIndex).addClass('active');
    });

    $('.config-menu-tab-params-class input:checked').each(function() {
        var curTab = $(this).parents().filter('.config-menu-tab');
        var curIndex = curTab.find('.config-menu-tab-params-class input').index(curTab.find('.config-menu-tab-params-class input:checked'));
        curTab.find('.config-menu-tab-params-method-tab.active').removeClass('active');
        curTab.find('.config-menu-tab-params-method-tab').eq(curIndex).addClass('active');
    });

    $('.config-menu-tab-params-method-tab input').change(function() {
        $('.config-menu-tab').each(function() {
            var curBlock = $(this);
            if (curBlock.find('.config-menu-tab-params-method-tab input:checked').length > 0) {
                curBlock.find('.config-menu-tab-params-submit .btn').prop('disabled', false);
                curBlock.find('.config-menu-tab-params-hints').addClass('hidden');
            } else {
                curBlock.find('.config-menu-tab-params-submit .btn').prop('disabled', true);
                curBlock.find('.config-menu-tab-params-hints').removeClass('hidden');
            }
        });
    });

    $('.config-menu-tab').each(function() {
        var curBlock = $(this);
        if (curBlock.find('.config-menu-tab-params-method-tab input:checked').length > 0) {
            curBlock.find('.config-menu-tab-params-submit .btn').prop('disabled', false);
            curBlock.find('.config-menu-tab-params-hints').addClass('hidden');
        } else {
            curBlock.find('.config-menu-tab-params-submit .btn').prop('disabled', true);
            curBlock.find('.config-menu-tab-params-hints').removeClass('hidden');
        }
    });

    $('.header-search-link').click(function(e) {
        $('.header-search').addClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-search').length == 0) {
            $('.header-search').removeClass('open');
        }
    });

    $('body').on('click', '.back-link a', function(e) {
        window.history.back();
        e.preventDefault();
    });

    $('.footer-up-link').click(function(e) {
        $('html, body').animate({'scrollTop': 0});
        e.preventDefault();
    });

    $('.header-mobile-link').click(function(e) {
        $('html').toggleClass('mobile-menu-open');
        e.preventDefault();
    });

    $('.mobile-menu-list ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (curLi.find('ul').length > 0) {
            if (curLi.hasClass('open')) {
                $('.mobile-menu').removeClass('open-menu');
                curLi.removeClass('open');
            } else {
                $('.mobile-menu').addClass('open-menu');
                curLi.addClass('open');
            }
            e.preventDefault();
        }
    });

    $('.mobile-config-link').click(function(e) {
        var curLink = $(this);
        if (curLink.hasClass('open')) {
            $('.mobile-menu').removeClass('open-config');
            curLink.removeClass('open');
        } else {
            $('.mobile-menu').addClass('open-config');
            curLink.addClass('open');
        }
        e.preventDefault();
    });

    $('.config-menu-mobile-list input').change(function() {
        var curIndex = $('.config-menu-mobile-list input').index($('.config-menu-mobile-list input:checked'));
        $('.config-menu-mobile-tab.active').removeClass('active');
        $('.config-menu-mobile-tab').eq(curIndex).addClass('active');
    });

    $('.config-menu-mobile-list input:checked').each(function() {
        var curIndex = $('.config-menu-mobile-list input').index($('.config-menu-mobile-list input:checked'));
        $('.config-menu-mobile-tab.active').removeClass('active');
        $('.config-menu-mobile-tab').eq(curIndex).addClass('active');
    });

    $('.config-menu-mobile-tab-params-class input').change(function() {
        var curInput = $(this);
        if (curInput.prop('checked')) {
            $('.mobile-menu').addClass('open-class');
            curInput.parents().filter('label').addClass('open');
        } else {
            $('.mobile-menu').removeClass('open-class');
            curInput.parents().filter('label').removeClass('open');
        }
        var curTab = curInput.parents().filter('.config-menu-mobile-tab');
        var curIndex = curTab.find('.config-menu-mobile-tab-params-class input').index(curTab.find('.config-menu-mobile-tab-params-class input:checked'));
        curTab.find('.config-menu-mobile-tab-params-method-tab.active').removeClass('active');
        curTab.find('.config-menu-mobile-tab-params-method-tab').eq(curIndex).addClass('active');
    });

    $('.config-menu-mobile-tab-params-class input').prop('checked', false);

    $('body').on('change', '.catalogue-header-filter label input', function(e) {
        $(this).parents().filter('form').trigger('submit');
    });

    $('body').on('change', '.config-header-filter label input', function(e) {
        $(this).parents().filter('form').trigger('submit');
    });

    $.fancybox.defaults.buttons = [
        'close'
    ];
    $.fancybox.defaults.lang = 'ru';
    $.fancybox.defaults.i18n = {
        'ru' : {
            DOWNLOAD    : 'Скачать',
            CLOSE       : 'Закрыть',
            NEXT        : 'Вперед',
            PREV        : 'Назад'
        }
    };

    $('body').on('click', '.asis-structure-item-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curItem = curLi.parents().filter('.asis-structure-item');

            var curActive = curItem.find('.asis-structure-item-menu ul li.active');
            if (curItem.find('.asis-structure-item-menu ul li').index(curActive) < curItem.find('.asis-structure-item-menu ul li').index(curLi)) {
                curActive.addClass('to-right').removeClass('to-left');
                curLi.removeClass('to-right').addClass('to-left');
            } else {
                curActive.addClass('to-left').removeClass('to-right');
                curLi.removeClass('to-left').addClass('to-right');
            }
            curActive.removeClass('active');
            curLi.addClass('active');

            var curIndex = curItem.find('.asis-structure-item-menu ul li').index(curLi);
            curItem.find('.asis-structure-item-content-item.active').removeClass('active');
            curItem.find('.asis-structure-item-content-item').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.learn-header-filter label:last').addClass('last');
    $('.learn-header-filter a:last').addClass('last');

    $('.knowledge-menu-next').click(function() {
        var curLink = $(this);
        curLink.toggleClass('back');
        var curMenu = $('.knowledge-menu-inner');
        if (curLink.hasClass('back')) {
            curMenu.find('.knowledge-menu-ul').animate({'left': -(curMenu.find('.knowledge-menu-ul').width() - curMenu.width() + 50)}, 200);
        } else {
            curMenu.find('.knowledge-menu-ul').animate({'left': 0}, 200);
        }
    });

    $('body').on('click', '.knowledge-menu-li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curActive = $('.knowledge-menu-li.active');
            if ($('.knowledge-menu-li').index(curActive) < $('.knowledge-menu-li').index(curLi)) {
                curActive.addClass('to-right').removeClass('to-left');
                curLi.removeClass('to-right').addClass('to-left');
            } else {
                curActive.addClass('to-left').removeClass('to-right');
                curLi.removeClass('to-left').addClass('to-right');
            }
            curActive.removeClass('active');
            curLi.addClass('active');

            $.ajax({
                type: 'POST',
                url: $(this).attr('href'),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                $('.knowledge-inner').html(html);
                $(window).trigger('scroll');
            });
        }
        e.preventDefault();
    });

    $('body').on('change', '.learn-header-filter label input', function(e) {
        var form = $('.learn-header-filter form')[0];
        var curData = $(form).serialize();
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            dataType: 'html',
            data: curData,
            cache: false
        }).done(function(html) {
            $('.knowledge-inner').html(html);
            $(window).trigger('scroll');
        });
    });

    if ($('.learn-header-filter form').length > 0) {
        $('.learn-header-filter form').validate().destroy();
        $('.learn-header-filter form').validate({
            ignore: '',
            submitHandler: function(form) {
                var curData = $(form).serialize();
                $.ajax({
                    type: 'POST',
                    url: $(form).attr('action'),
                    dataType: 'html',
                    data: curData,
                    cache: false
                }).done(function(html) {
                    $('.knowledge-inner').html(html);
                    $(window).trigger('scroll');
                });
            }
        });
    }

    $('body').on('change', '.learn-subfilter label input', function(e) {
        var form = $('.learn-subfilter form')[0];
        var curData = $(form).serialize();
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            dataType: 'html',
            data: curData,
            cache: false
        }).done(function(html) {
            $('.knowledge-inner').html(html);
            $(window).trigger('scroll');
        });
    });

    $('body').on('click', '.knowledge-search-empty-link a', function(e) {
        $('.learn-search-input input').trigger('focus');
        e.preventDefault();
    });

    $('.main-sectors-list').each(function() {
        var curList = $(this);
        $('.main-sectors-item-info-count').html(curList.find('.main-sectors-item').length);
        curList.find('.main-sectors-item').each(function() {
            $('.main-sectors-item-info-slider').append('<div class="main-sectors-item-info-slide">' + $(this).find('.main-sectors-item-content').html() + '</div>');
        });
        $('.main-sectors-item-info-slide').eq(0).css({'opacity': 1});
        curList.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow: '<button type="button" class="slick-next"></button>',
            accessibility: false,
            draggable: false,
            swipe: false,
            touchMove: false,
            dots: true
        }).on('setPosition', function(event, slick) {
            var currentSlide = curList.slick('slickCurrentSlide') + 1;
            if (currentSlide < 10) {
                currentSlide = '0' + currentSlide;
            }
            $('.main-sectors-item-info-current').html(currentSlide);
        }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            $('.main-sectors-item-info-slide').eq(nextSlide).css({'left': 0, 'opacity': 0}).animate({'opacity': 1});
            $('.main-sectors-item-info-slide').eq(currentSlide).animate({'left': '-100px', 'opacity': 0});
        });
    });

    $('.detail-gallery-big').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false
    }).on('setPosition', function(event, slick) {
        var currentSlide = $('.detail-gallery-big').slick('slickCurrentSlide');
        $('.detail-gallery-preview-item').eq(currentSlide).addClass('active');
    }).on('afterChange', function(event, slick, currentSlide) {
        $('.detail-gallery-preview-item.active').removeClass('active');
        $('.detail-gallery-preview-item').eq(currentSlide).addClass('active');
        var curIndex = $('.detail-gallery-preview-list').slick('slickCurrentSlide');
        if (curIndex + 4 == currentSlide) {
            $('.detail-gallery-preview-list').slick('slickNext');
        }
        if (curIndex == currentSlide) {
            $('.detail-gallery-preview-list').slick('slickPrev');
        }
    });

    $('.detail-gallery-preview-item a').click(function(e) {
        var curIndex = $('.detail-gallery-preview-item a').index($(this));
        $('.detail-gallery-big').slick('slickGoTo', curIndex);
        e.preventDefault();
    });

    $('.detail-gallery-preview-list').slick({
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        vertical: true,
        accessibility: false
    });

    $('.detail-descr-link a').click(function(e) {
        $('html, body').animate({'scrollTop': $('.detail-descr').offset().top});
        e.preventDefault();
    });

    $('.detail-video-link a').click(function(e) {
        $('html, body').animate({'scrollTop': $('.detail-video').offset().top});
        e.preventDefault();
    });

    $('body').on('click', '.detail-descr-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {

            var curActive = $('.detail-descr-menu ul li.active');
            if ($('.detail-descr-menu ul li').index(curActive) < $('.detail-descr-menu ul li').index(curLi)) {
                curActive.addClass('to-right').removeClass('to-left');
                curLi.removeClass('to-right').addClass('to-left');
            } else {
                curActive.addClass('to-left').removeClass('to-right');
                curLi.removeClass('to-left').addClass('to-right');
            }
            curActive.removeClass('active');
            curLi.addClass('active');

            var curIndex = $('.detail-descr-menu ul li').index(curLi);
            $('.detail-descr-item.active').removeClass('active');
            $('.detail-descr-item').eq(curIndex).addClass('active');
            $(window).trigger('scroll');
        }
        e.preventDefault();
    });

    $('.detail-descr-item-title').click(function() {
        $(this).toggleClass('open');
    });

    $('.detail-gallery-mobile-big').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false
    }).on('setPosition', function(event, slick) {
        var currentSlide = $('.detail-gallery-mobile-big').slick('slickCurrentSlide');
        $('.detail-gallery-mobile-preview-item').eq(currentSlide).addClass('active');
        $('.detail-gallery-mobile-preview-item.active').removeClass('active');
        $('.detail-gallery-mobile-preview-item').eq(currentSlide).addClass('active');
        var curIndex = $('.detail-gallery-mobile-preview-list').slick('slickCurrentSlide');
        if (curIndex + 4 == currentSlide) {
            $('.detail-gallery-mobile-preview-list').slick('slickNext');
        }
        if (curIndex == currentSlide) {
            $('.detail-gallery-mobile-preview-list').slick('slickPrev');
        }
    }).on('afterChange', function(event, slick, currentSlide) {
        $('.detail-gallery-mobile-preview-item.active').removeClass('active');
        $('.detail-gallery-mobile-preview-item').eq(currentSlide).addClass('active');
    });

    $('.detail-gallery-mobile-preview-item a').click(function(e) {
        var curIndex = $('.detail-gallery-mobile-preview-item a').index($(this));
        $('.detail-gallery-mobile-big').slick('slickGoTo', curIndex);
        e.preventDefault();
    });

    $('.detail-gallery-mobile-preview-list').slick({
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        accessibility: false,
        draggable: false,
        swipe: false,
        touchMove: false
    });

    $('.detail-video-list').each(function() {
        var curList = $(this);
        curList.find('.detail-video-list-inner').slick({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 3,
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow: '<button type="button" class="slick-next"></button>',
            dots: true,
            responsive: [
                {
                    breakpoint: 1365,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false
                    }
                }
            ]
        }).on('setPosition', function(event, slick) {
            if (curList.find('.slick-dots li').length > 0) {
                var currentPage = curList.find('.slick-dots li').index(curList.find('.slick-dots li.slick-active')) + 1;
                var countPages = curList.find('.slick-dots li').length;
                curList.find('.detail-video-list-ctrl-current').html(currentPage);
                curList.find('.detail-video-list-ctrl-count').html(countPages);
            } else {
                curList.find('.detail-video-list-ctrl-current').html('1');
                curList.find('.detail-video-list-ctrl-count').html('1');
            }
        }).on('afterChange', function(event, slick, currentSlide) {
            if (curList.find('.slick-dots li').length > 0) {
                var currentPage = curList.find('.slick-dots li').index(curList.find('.slick-dots li.slick-active')) + 1;
                curList.find('.detail-video-list-ctrl-current').html(currentPage);
            } else {
                curList.find('.detail-video-list-ctrl-current').html('1');
            }
        });
    });

    $('.detail-other-list .catalogue-list').each(function() {
        var curList = $(this);
        curList.slick({
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 2,
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow: '<button type="button" class="slick-next"></button>',
            dots: true,
            responsive: [
                {
                    breakpoint: 1365,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        adaptiveHeight: true
                    }
                }
            ]
        }).on('setPosition', function(event, slick) {
            if (curList.find('.slick-dots li').length > 0) {
                var currentPage = curList.find('.slick-dots li').index(curList.find('.slick-dots li.slick-active'));
                var countPages = curList.find('.slick-dots li').length;
                var curWidth = (curList.parent().width() - 128) / countPages;
                curList.parent().find('.detail-other-status').css({'left': currentPage * curWidth, 'width': curWidth});
            }
        }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            if (curList.find('.slick-dots li').length > 0) {
                var currentPage = curList.find('.slick-dots li').index(curList.find('.slick-dots li.slick-active'));
                if (nextSlide > currentSlide) {
                    currentPage++;
                } else {
                    currentPage--;
                }
                var countPages = curList.find('.slick-dots li').length;
                var curWidth = (curList.parent().width() - 128) / countPages;
                curList.parent().find('.detail-other-status').css({'left': currentPage * curWidth, 'width': curWidth});
            }
        });
    });

    var periodServiceProcess = 7000;
    var timerServiceProcess = null;

    $('.service-process-list').each(function() {
        var curList = $(this);
        curList.find('.service-process-item').each(function() {
            var curItem = $(this);
            var curPhoto = curItem.find('.service-process-item-photo img').attr('src');
            curList.find('.service-process-slider').append('<div class="service-process-slider-item">' +
                                                                '<div class="service-process-slider-item-photo">' +
                                                                    '<div class="service-process-slider-item-photo-line"><img src="' + curPhoto + '" alt="" /></div>' +
                                                                    '<div class="service-process-slider-item-photo-line"><img src="' + curPhoto + '" alt="" /></div>' +
                                                                    '<div class="service-process-slider-item-photo-line"><img src="' + curPhoto + '" alt="" /></div>' +
                                                                '</div>' +
                                                                '<div class="service-process-slider-item-text">' +
                                                                    '<div class="service-process-slider-item-text-inner">' +
                                                                        '<div class="service-process-slider-item-title">' + curItem.find('.service-process-item-title-inner').html() + '</div>' +
                                                                        '<div class="service-process-slider-item-descr">' + curItem.find('.service-process-item-descr').html() + '</div>' +
                                                                    '</div>' +
                                                                    '<div class="service-process-slider-item-text-step"></div>'+
                                                                '</div>' +
                                                            '</div>');
        });
        curList.find('.service-process-item').eq(0).addClass('active');
        curList.find('.service-process-slider-item').eq(0).css({'z-index': 2});
        curList.data('curIndex', 0);
        curList.data('animated', false);
        curList.find('.service-process-slider-timer').css({'width': 0}).animate({'width': 36}, periodServiceProcess);
        timerServiceProcess = window.setTimeout(function() { curList.find('.service-process-slider-next').trigger('click'); }, periodServiceProcess);
    });

    $('.service-process-slider-prev').click(function() {
        var curList = $(this).parents().filter('.service-process-list');
        var currentIndex = curList.data('curIndex');
        var nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
            nextIndex = curList.find('.service-process-item').length - 1;
        }
        curList.find('.service-process-slider-timer').stop(true, true);
        curList.find('.service-process-slider-timer').css({'width': 0});
        window.clearTimeout(timerServiceProcess);
        timerServiceProcess = 0;
        serviceProcessAnimate(curList, currentIndex, nextIndex);
    });

    $('.service-process-slider-next').click(function() {
        var curList = $(this).parents().filter('.service-process-list');
        var currentIndex = curList.data('curIndex');
        var nextIndex = currentIndex + 1;
        if (nextIndex > curList.find('.service-process-item').length - 1) {
            nextIndex = 0;
        }
        curList.find('.service-process-slider-timer').stop(true, true);
        curList.find('.service-process-slider-timer').css({'width': 0});
        window.clearTimeout(timerServiceProcess);
        timerServiceProcess = 0;
        serviceProcessAnimate(curList, currentIndex, nextIndex);
    });

    $('.service-process-slider-next').mouseover(function() {
        var curList = $(this).parents().filter('.service-process-list');
        curList.find('.service-process-slider-timer').stop(true, true).css({'width': 0});
        window.clearTimeout(timerServiceProcess);
        timerServiceProcess = 0;
    });

    $('.service-process-slider-next').mouseout(function() {
        var curList = $(this).parents().filter('.service-process-list');
        curList.find('.service-process-slider-timer').css({'width': 0}).animate({'width': 36}, periodServiceProcess);
        timerServiceProcess = window.setTimeout(function() { curList.find('.service-process-slider-next').trigger('click'); }, periodServiceProcess);
    });

    $('.service-process-item-title').click(function() {
        var curItem = $(this).parents().filter('.service-process-item');
        var curList = curItem.parents().filter('.service-process-list');
        var currentIndex = curList.data('curIndex');
        var nextIndex = curList.find('.service-process-item').index(curItem);
        if (currentIndex != nextIndex) {
            curList.find('.service-process-slider-timer').css({'width': 0});
            window.clearTimeout(timerServiceProcess);
            timerServiceProcess = 0;
            serviceProcessAnimate(curList, currentIndex, nextIndex);
        }
        curItem.toggleClass('open');
    });

    function serviceProcessAnimate(curList, currIndex, nextIndex) {
        if (!curList.data('animated')) {
            curList.data('animated', true);
            curList.find('.service-process-item').eq(currIndex).removeClass('active');
            curList.find('.service-process-item').eq(nextIndex).addClass('active');
            var currItem = curList.find('.service-process-slider-item').eq(currIndex);
            var nextItem = curList.find('.service-process-slider-item').eq(nextIndex);
            var animateDir = 1;
            if (nextIndex == 0 && currIndex == curList.find('.service-process-item').length - 1) {
                animateDir = 1;
            } else if (nextIndex == curList.find('.service-process-item').length - 1 && currIndex == 0) {
                animateDir = -1;
            } else if (nextIndex > currIndex) {
                animateDir = 1;
            } else {
                animateDir = -1;
            }
            if (animateDir == 1) {
                curList.find('.service-process-slider-item').css({'z-index': 'auto'});
                currItem.css({'z-index': 1});
                nextItem.css({'z-index': 2});

                nextItem.find('.service-process-slider-item-photo-line').css({'left': '-100%'});

                nextItem.find('.service-process-slider-item-photo-line').eq(0).animate({'left': '0'}, 500);
                nextItem.find('.service-process-slider-item-photo-line').eq(1).delay(100).animate({'left': '0'}, 500);
                nextItem.find('.service-process-slider-item-photo-line').eq(2).delay(200).animate({'left': '0'}, 500, function() {
                    curList.data('animated', false);
                    curList.data('curIndex', nextIndex);
                });

                nextItem.find('.service-process-slider-item-text-inner').css({'opacity': 0, 'top': 50});
                nextItem.find('.service-process-slider-item-text-step').css({'opacity': 0, 'margin-bottom': '-100%'});
                nextItem.find('.service-process-slider-item-text').css({'opacity': 0});

                currItem.find('.service-process-slider-item-text-step').animate({'opacity': 0, 'margin-bottom': '100%'}, 100);
                currItem.find('.service-process-slider-item-text-inner').animate({'top': '-50px', 'opacity': 0}, 100, function() {
                    nextItem.find('.service-process-slider-item-text').css({'opacity': 1});
                    nextItem.find('.service-process-slider-item-text-step').animate({'opacity': 0.21, 'margin-bottom': '0'}, 400);
                    nextItem.find('.service-process-slider-item-text-inner').animate({'opacity': 1, 'top': 0}, 400);
                    curList.find('.service-process-slider-timer').stop(true, true).css({'width': 0}).animate({'width': 36}, periodServiceProcess);
                    timerServiceProcess = window.setTimeout(function() { curList.find('.service-process-slider-next').trigger('click'); }, periodServiceProcess);
                });
            } else {
                curList.find('.service-process-slider-item').css({'z-index': 'auto'});
                currItem.css({'z-index': 2});
                nextItem.css({'z-index': 1});

                nextItem.find('.service-process-slider-item-photo-line').css({'left': '0'});

                currItem.find('.service-process-slider-item-photo-line').eq(0).animate({'left': '-100%'}, 500);
                currItem.find('.service-process-slider-item-photo-line').eq(1).delay(100).animate({'left': '-100%'}, 500);
                currItem.find('.service-process-slider-item-photo-line').eq(2).delay(200).animate({'left': '-100%'}, 500, function() {
                    curList.data('animated', false);
                    curList.data('curIndex', nextIndex);
                });

                nextItem.find('.service-process-slider-item-text-inner').css({'opacity': 0, 'top': -50});
                nextItem.find('.service-process-slider-item-text-step').css({'opacity': 0, 'margin-bottom': '100%'});
                nextItem.find('.service-process-slider-item-text').css({'opacity': 0});

                currItem.find('.service-process-slider-item-text-step').animate({'opacity': 0, 'margin-bottom': '-100%'}, 500);
                currItem.find('.service-process-slider-item-text-inner').animate({'top': '50px', 'opacity': 0}, 500, function() {
                    currItem.css({'z-index': 1});
                    nextItem.css({'z-index': 2});
                    nextItem.find('.service-process-slider-item-text').css({'opacity': 1});
                    nextItem.find('.service-process-slider-item-text-step').animate({'opacity': 0.21, 'margin-bottom': '0'}, 100);
                    nextItem.find('.service-process-slider-item-text-inner').animate({'opacity': 1, 'top': 0}, 100);
                    curList.find('.service-process-slider-timer').stop(true, true).css({'width': 0}).animate({'width': 36}, periodServiceProcess);
                    timerServiceProcess = window.setTimeout(function() { curList.find('.service-process-slider-next').trigger('click'); }, periodServiceProcess);
                });
            }
        }
    }

    $('.service-help-item-title').click(function() {
        $(this).parent().toggleClass('open');
        $(window).trigger('resize');
    });

    $('.clients-faq-item-title').click(function() {
        $(this).parent().toggleClass('open');
        $(window).trigger('resize');
    });

    var mainServiceZ = 0;
    $('.main-service-item a').mouseover(function() {
        var curIndex = $('.main-service-item').index($(this).parent()) + 1;
        var curItem = $('.main-service-photo-item').eq(curIndex);
        if (!curItem.hasClass('active')) {
            $('.main-service-photo-item.active').removeClass('active');
            curItem.addClass('active');
            mainServiceZ++;
            curItem.css({'z-index': mainServiceZ});
            curItem.find('.main-service-photo-item-line').eq(0).stop(true, true).css({'left': '-100%'}).animate({'left': '0'}, 500);
            curItem.find('.main-service-photo-item-line').eq(1).stop(true, true).css({'left': '-100%'}).delay(100).animate({'left': '0'}, 500);
            curItem.find('.main-service-photo-item-line').eq(2).stop(true, true).css({'left': '-100%'}).delay(200).animate({'left': '0'}, 500);
        }
    });

    $('.main-press-list-inner').each(function() {
        var curList = $(this);
        curList.slick({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow: '<button type="button" class="slick-next"></button>',
            dots: true,
            responsive: [
                {
                    breakpoint: 1365,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        adaptiveHeight: true
                    }
                }
            ]
        }).on('setPosition', function(event, slick) {
            if (curList.find('.slick-dots li').length > 0) {
                var currentPage = curList.find('.slick-dots li').index(curList.find('.slick-dots li.slick-active'));
                var countPages = curList.find('.slick-dots li').length;
                var curWidth = (curList.parent().width() - 128) / countPages;
                curList.parent().find('.main-press-status').css({'left': currentPage * curWidth, 'width': curWidth});
            }
        }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            if (curList.find('.slick-dots li').length > 0) {
                var currentPage = curList.find('.slick-dots li').index(curList.find('.slick-dots li.slick-active'));
                if (nextSlide > currentSlide) {
                    currentPage++;
                } else {
                    currentPage--;
                }
                var countPages = curList.find('.slick-dots li').length;
                var curWidth = (curList.parent().width() - 128) / countPages;
                curList.parent().find('.main-press-status').css({'left': currentPage * curWidth, 'width': curWidth});
            }
        });
    });

    $('.about-clients-gallery-list').each(function() {
        var curList = $(this);
        $('.about-clients-gallery-count').html(curList.find('.about-clients-gallery-item').length);
        curList.slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow: '<button type="button" class="slick-next"></button>',
            dots: false
        }).on('setPosition', function(event, slick) {
            var currentSlide = curList.slick('slickCurrentSlide') + 1;
            if (currentSlide < 10) {
                currentSlide = '0' + currentSlide;
            }
            $('.about-clients-gallery-current').html(currentSlide);
        });
    });

    $('.about-gallery-list').each(function() {
        var curList = $(this);
        var count = curList.find('.about-gallery-item').length;
        if (count < 10) {
            count = '0' + count;
        }
        $('.about-gallery-info-count').html(count);
        curList.find('.about-gallery-item').each(function() {
            $('.about-gallery-info-slider').append('<div class="about-gallery-info-slide">' + $(this).find('.about-gallery-item-content').html() + '</div>');
        });
        $('.about-gallery-info-slide').eq(0).css({'opacity': 1});
        curList.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow: '<button type="button" class="slick-next"></button>',
            dots: false,
            adaptiveHeight: true
        }).on('setPosition', function(event, slick) {
            var currentSlide = curList.slick('slickCurrentSlide') + 1;
            if (currentSlide < 10) {
                currentSlide = '0' + currentSlide;
            }
            $('.about-gallery-info-current').html(currentSlide);
        }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            $('.about-gallery-info-slide').eq(nextSlide).css({'left': 0, 'opacity': 0}).animate({'opacity': 1});
            $('.about-gallery-info-slide').eq(currentSlide).animate({'left': '-100px', 'opacity': 0});
        });
    });

    $('.side-menu a').click(function(e) {
        var curBlock = $($(this).attr('href'));
        if (curBlock.length > 0) {
            var curTop = curBlock.offset().top;
            if (curBlock.hasClass('animate') && !curBlock.hasClass('animate-start')) {
                curTop -= 50;
            }
            $('html, body').animate({'scrollTop': curTop});
        }
        e.preventDefault();
    });

    $('.side-menu').mouseover(function() {
        $('.side-menu').css({'width': $('.side-menu ul').width()});
    });

    $('.side-menu').mouseout(function() {
        $('.side-menu').css({'width': 79});
    });

    $('.course-dates-btn a').click(function(e) {
        var curBlock = $('.contacts-feedback-course');
        var curTop = curBlock.offset().top;
        if (curBlock.hasClass('animate') && !curBlock.hasClass('animate-start')) {
            curTop -= 0;
        }
        $('html, body').animate({'scrollTop': curTop});
        e.preventDefault();
    });

    $('.course-dates-list-next').click(function() {
        $('.course-dates-list').toggleClass('reverse');
    });

    $('.course-info-gallery-list').each(function() {
        var curList = $(this);
        var count = curList.find('.course-info-gallery-item').length;
        if (count < 10) {
            count = '0' + count;
        }
        $('.course-info-gallery-count').html(count);
        curList.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow: '<button type="button" class="slick-next"></button>',
            dots: false,
            adaptiveHeight: true
        }).on('setPosition', function(event, slick) {
            var currentSlide = curList.slick('slickCurrentSlide') + 1;
            if (currentSlide < 10) {
                currentSlide = '0' + currentSlide;
            }
            $('.course-info-gallery-current').html(currentSlide);
        });
    });

    $('.page-main').each(function() {
        $.extend($.easing,{ easeInOutCubic: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t*t + b;return c/2*((t-=2)*t*t + 2) + b;}});
        window.scrollifyInitialized = false;
        var options = {
            section : '.main-section',
            sectionName : false,
            easing: 'easeInOutCubic',
            scrollSpeed: 700,
            offset : 0,
            scrollbars: true,
            standardScrollElements: '',
            setHeights: false,
            overflowScroll: false,
            before:function() {},
            after:function() {},
            afterResize:function() {},
            afterRender:function() {
                window.scrollifyInitialized = true;
            }
        };

        function checkInit() {
            var width = $(window).width();
            var height = $(window).height();
            if ((width < 1365 || height < 704) && window.scrollifyInitialized) {
                $.scrollify.destroy();
                window.scrollifyInitialized = false;
            } else if (width >= 1365 && height > 703 && !window.scrollifyInitialized) {
                $.scrollify(options);
            }
        }
        checkInit();
        $(window).on('resize', function() {window.setTimeout(checkInit, 100)});
    });

});

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();
    var windowHeight = $(window).height();

    $('.animate').each(function() {
        var curBlock = $(this);
        var curTop = curBlock.offset().top;

        if (windowScroll + (windowHeight * 0.9) > curTop) {
            curBlock.addClass('animate-start');
        }
    });

    if (windowScroll > $('header').height()) {
        $('.header-menu-link').addClass('hidden');
    } else {
        $('.header-menu-link').removeClass('hidden');
    }

    if (windowScroll > $('header').height() * 2) {
        $('.header-menu-link').removeClass('hidden').addClass('fixed');
    } else {
        $('.header-menu-link').removeClass('fixed');
    }

    if ((windowScroll > $('#config').height()) && (windowScroll < $('#service').offset().top || windowScroll >= $('#contacts').offset().top) ) {
        $('.header-menu-link').addClass('inverse');
    } else {
        $('.header-menu-link').removeClass('inverse');
    }

    if ((windowScroll > $('#config').height()) && (windowScroll < $('#service').offset().top || windowScroll >= $('#contacts').offset().top) ) {
        $('.side-menu').addClass('inverse');
    } else {
        $('.side-menu').removeClass('inverse');
    }

    if (windowScroll > $('header').height()) {
        $('.page-header').addClass('hidden');
    } else {
        $('.page-header').removeClass('hidden');
    }

    $('.side-menu').each(function() {
        $('.side-menu li.active').removeClass('active');
        $('.side-menu').find('li').each(function() {
            var curBlock = $($(this).find('a').attr('href'));
            if (curBlock.length > 0) {
                if (windowScroll + windowHeight / 2 > curBlock.offset().top) {
                    $('.side-menu li.active').removeClass('active');
                    $(this).addClass('active');
                }
            }
        });
    });

    $('.side-config-link').each(function() {
        if (windowScroll < $('#config').height()) {
            $('.side-config-link').removeClass('visible');
        } else {
            $('.side-config-link').addClass('visible');
        }
        if ((windowScroll + windowHeight - 230 > $('#service').offset().top) && (windowScroll + windowHeight - 230 < $('#service').offset().top + $('#service').height() + $('#learn').height() + $('#press').height())) {
            $('.side-config-link').addClass('inverse');
        } else {
            $('.side-config-link').removeClass('inverse');
        }
    });

    $('.side-scroll').each(function() {
        if (windowScroll > $('#config').height()) {
            $('.side-scroll').removeClass('visible');
        } else {
            $('.side-scroll').addClass('visible');
        }
    });

    $('.side-copyrights').each(function() {
        if ((windowScroll + windowHeight - 230 > $('#about').offset().top) && (windowScroll + windowHeight - 230 < $('#about').offset().top + $('#service').offset().top + $('#service').height() + $('#learn').height() + $('#press').height())) {
            $('.side-copyrights').addClass('inverse');
        } else {
            $('.side-copyrights').removeClass('inverse');
        }
    });

    $('.side-developer').each(function() {
        if ((windowScroll + windowHeight - 230 > $('#service').offset().top) && (windowScroll + windowHeight - 230 < $('#service').offset().top + $('#service').height() + $('#learn').height() + $('#press').height())) {
            $('.side-developer').addClass('invisible');
        } else {
            $('.side-developer').removeClass('invisible');
        }
    });

    $('.main-config-content').each(function() {
        $('.main-config-content').css({'transform': 'translateY(-' + windowScroll + 'px)'});
    });

    $('.main-about-inner').each(function() {
        if (windowScroll + windowHeight > $('.main-about-inner').offset().top + $('.main-about-inner').height() / 2) {
            $('.main-about-inner').addClass('animate-main');
        }
    });

});

$(window).on('load resize', function() {
    if ($(window).width() > 1365) {
        $('.team-list, .asis-types-list, .knowledge-menu-ul, .service-schedule-list, .main-learn-list, .course-dates-list-inner').each(function() {
            var curList = $(this);
            if (curList.hasClass('slick-slider')) {
                curList.slick('unslick');
            }
        });
    } else {
        $('.team-list, .asis-types-list').each(function() {
            var curList = $(this);
            if (!curList.hasClass('slick-slider')) {
                curList.slick({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false
                });
            }
        });
        $('.knowledge-menu-ul').each(function() {
            var curList = $(this);
            if (!curList.hasClass('slick-slider')) {
                curList.slick({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false,
                    variableWidth: true
                });
            }
        });
        $('.service-schedule-list').each(function() {
            var curList = $(this);
            if (!curList.hasClass('slick-slider')) {
                curList.slick({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false,
                    variableWidth: true
                });
            }
        });
        $('.course-dates-list-inner').each(function() {
            var curList = $(this);
            if (!curList.hasClass('slick-slider')) {
                curList.slick({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false,
                    variableWidth: true
                });
            }
        });
        $('.main-learn-list').each(function() {
            var curList = $(this);
            if (!curList.hasClass('slick-slider')) {
                curList.slick({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false,
                    variableWidth: true
                });
                curList.slick('slickRemove', 0);
            }
        });
    }

    $('.knowledge-menu').each(function() {
        $('.knowledge-menu-next').removeClass('visible back');
        var curMenu = $(this);
        if (curMenu.width() < curMenu.find('.knowledge-menu-ul').width()) {
            $('.knowledge-menu-next').addClass('visible');
        }
    });

    $('.course-dates-list').each(function() {
        if ($('.course-dates-list-inner').width() > $('.course-dates-list').width()) {
            $('.course-dates-list-next').addClass('visible');
        } else {
            $('.course-dates-list-next').removeClass('visible');
        }
    });
});

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true});
});

function initForm(curForm) {
    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('.form-select select').chosen({disable_search: true});

    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

    if (curForm.find('.form-files').length > 0) {
        curForm.data('filesCode', curForm.find('.form-files').html());
    }

    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            if ($(form).hasClass('ajax-form')) {
                var formData = new FormData(form);

                if ($(form).find('[type=file]').length != 0) {
                    var file = $(form).find('[type=file]')[0].files[0];
                    formData.append('file', file);
                }

                windowOpen($(form).attr('action'), formData);
            } else {
                form.submit();
            }
        }
    });
}

function windowOpen(linkWindow, dataWindow) {
    if ($('.window').length > 0) {
        windowClose();
    }

    var curPadding = $('.wrapper').width();
    var curWidth = $(window).width();
    if (curWidth < 480) {
        curWidth = 480;
    }
    var curScroll = $(window).scrollTop();
    $('html').addClass('window-open');
    curPadding = $('.wrapper').width() - curPadding;
    $('body').css({'margin-right': curPadding + 'px'});
    $('body').append('<div class="window"><div class="window-loading"></div></div>')
    $('.wrapper').css({'top': -curScroll});
    $('.wrapper').data('curScroll', curScroll);
    $('meta[name="viewport"]').attr('content', 'width=' + curWidth);

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        $('.window').append('<div class="window-container window-container-preload"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')

        windowPosition();

        $('.window-container-preload').removeClass('window-container-preload');

        $('.window form').each(function() {
            initForm($(this));
        });
    });
}

function windowPosition() {
    if ($('.window').length > 0) {
        $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});

        $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2});
        if ($('.window-container').height() > $('.window').height()) {
            $('.window-container').css({'top': '0', 'margin-top': 0});
        }
    }
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $(window).scrollTop($('.wrapper').data('curScroll'));
        $('meta[name="viewport"]').attr('content', 'width=device-width');
    }
}