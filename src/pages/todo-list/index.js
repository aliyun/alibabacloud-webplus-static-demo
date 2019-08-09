import 'typeface-montserrat'
import 'typeface-crimson-text'
import '../../scss/index.scss'

import $ from 'jquery'
import 'bootstrap/js/dist/util'

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

$(() => {
    setupLoader()
    windowScroll()
});