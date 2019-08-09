import 'typeface-montserrat'
import 'typeface-crimson-text'
import '../../scss/index.scss'

import $ from 'jquery'
import 'bootstrap/js/dist/util'
import 'bootstrap/js/dist/scrollspy'
import 'bootstrap/js/dist/tab'

import SmoothScroll from 'smooth-scroll'

import 'slick-carousel'

const setupLoader = () => {
    setTimeout(function () {
        if ($('#pb_loader').length > 0) {
            $('#pb_loader').removeClass('show')
        }
    }, 700)
}

const windowScroll = () => {
    $(window).scroll(() => {
        const st = $(window).scrollTop()
        const navbar = $('.pb_navbar')
        const sd = $('.js-scroll-wrap')

        if (st > 150) {
            if (!navbar.hasClass('scrolled')) {
                navbar.addClass('scrolled')
            }
        }
        if (st < 150) {
            if (navbar.hasClass('scrolled')) {
                navbar.removeClass('scrolled sleep')
            }
        }
        if (st > 350) {
            if (!navbar.hasClass('awake')) {
                navbar.addClass('awake')
            }
            if (sd.length > 0) {
                sd.addClass('sleep')
            }
        }
        if (st < 350) {
            if (navbar.hasClass('awake')) {
                navbar.removeClass('awake')
                navbar.addClass('sleep')
            }
            if (sd.length > 0) {
                sd.removeClass('sleep')
            }
        }
    })
}

const onPageScroll = () => {
    new SmoothScroll("a[href^='#']", {
        speed: 100,
        speedAsDuration: true,
        easing: 'easeOutExpo'
    })
    const navToggler = $('.navbar-toggler')
    document.addEventListener('scrollStart', (e) => {
        if (e.type === 'scrollStart') {
            $("#navbar ul li a[href^='#']").on('click', () => {
                if (navToggler.is(':visible')) {
                    navToggler.click()
                }
            })
        }
    }, false)
}

const slickSlider = () => {
    $('#whats-new-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        fade: true,
        adaptiveHeight: false,
        autoplay: true
    })
}

$(() => {
    setupLoader()
    windowScroll()
    onPageScroll()
    slickSlider()
});