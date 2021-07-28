$('.advantage').owlCarousel({
    loop:true,
    margin:10,
    //nav:true,
    //autoWidth:true,
    autoplay:true,
    autoplayTimeout:4000,
    autoplayHoverPause:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        },
        1440:{
            items:4
        },
    }
})
$('.slider_top_block').owlCarousel({
    loop:true,
    nav:true,
    //autoWidth:true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:5
        },
        
    }
})
$("a.scroll-to").on("click", function(e){
    e.preventDefault();
    var anchor = $(this).attr('href');
    $('html, body').stop().animate({
        scrollTop: $(anchor).offset().top - 0
    }, 800);
});



const mobile_menu = () => {
    const menu = document.querySelector('.m_menu')
    const navMenu = document.querySelector('.main_menu')
    let menuOpen = false;
    let screenWidth = 0
    window.addEventListener('resize',() => {
        screenWidth = window.innerWidth;
        if (screenWidth <= 1080) {
            menu.classList.remove('open')
            navMenu.classList.remove('open_menu')
            menuOpen = false
        }
        
    })
    menu.addEventListener('click',() => {
        if(!menuOpen) {
            menu.classList.add('open')
            navMenu.classList.add('open_menu')
            //navMenu.classList.remove('hide_menu')
            menuOpen = true
        } else {
            menu.classList.remove('open')
            navMenu.classList.remove('open_menu')
            //navMenu.classList.add('hide_menu')
            menuOpen = false
        }
    })
    
}
mobile_menu();

const calc = () => {
    const COTTON = 'cotton';
    const SYNTH = 'synth';
    const discount = document.querySelector('.total_price_discount')
    const resultBtn = document.querySelector('.btn_calc');
    let selectSize = document.getElementById('calc_size');
    let selectMaterial = document.getElementById('calc_material');
    const resultMaterial = document.querySelector('.res_material');
    const resultSum = document.querySelector('.total_price');
    const priceCotton = {
        3040 : '1100',
        3050 : '1250',
        4040 : '1300',
        4050: '1450',
        4060: '1650',
        5050: '1700',
        5060: '1900',
        5070: '2150',
    };
    const priceSynth = {
        3040 : '850',
        3050 : '950',
        4040 : '1000',
        4050: '1250',
        4060: '1400',
        5050: '1350',
        5060: '1500',
        5070: '1700',
        6070: '1900',
        6080: '2100',
        7070: '2300',
        7080: '2450',
        7090: '2600',
        8080: '2700',
        8090: '2900',
        80100:'3150',
        9090: '2950',
        90100:'3300',
        90110:'3500',
        90120:'3800'
    }
    resultBtn.addEventListener('click',() => {
        resultBtn.preventDefault;
        let sizeValue = selectSize.options[selectSize.selectedIndex].value;
        let materialValue = selectMaterial.options[selectMaterial.selectedIndex].value;
        let material = selectMaterial.options[selectMaterial.selectedIndex].text;
        const getSum = (obj) => {
            for (key in obj) {
                if (typeof obj[sizeValue] === "undefined") {
                    resultSum.innerHTML = `Нет в наличие`
                    discount.innerHTML = `Выберите синтетическую основу`;
                    return null
                } 
                if (key === sizeValue && typeof obj[key] !== "undefined") {
                    resultSum.innerHTML = `${obj[key]} рублей`
                    discount.innerHTML = `Цена со скидкой ${obj[key] * 0.9} рублей`;
                    return null
                }
            }
        }
        if (materialValue != '' && size != '') {
            resultMaterial.innerHTML = material;
            if (materialValue === COTTON) {
                getSum(priceCotton)
            }
            if(materialValue === SYNTH) {
                getSum(priceSynth)
            }
            
        }





    })



}
calc();

const gallerySlide = () => {
    const nav = document.querySelector('.manage_slide');
    const slides = document.querySelectorAll('.slider_img');
    const dots = document.querySelectorAll('.fa-circle');
    let position = 0;
    let count = 0;


    const dotsActive = (id) => {
        dots.forEach((elem) => {
            elem.classList.remove('slide_active')
            dots[id].classList.add('slide_active')
        })
    }
    nav.addEventListener('click',(e) => {
        const target = e.target
        if(target.classList.contains('fa-chevron-right')) {
            if(position >= slides[0].offsetWidth * (slides.length - 1)) {
                position = 0;
                count = 0;
                dotsActive(count)
                slides.forEach((elem) => {
                    elem.style.transform = `translateX(${-position}px)`
                })
            } else {
                position = position + slides[0].offsetWidth;
                count = count + 1
                dotsActive(count)
                slides.forEach((elem) => {
                elem.style.transform = `translateX(${-position}px)`
            })
            }
        }
        if(target.classList.contains('fa-chevron-left')) {
            if (position <= 0) {
                return false
            } else {
                position = position - slides[0].offsetWidth
                count = count - 1
                dotsActive(count)
                slides.forEach((elem) => {
                elem.style.transform = `translateX(${-position}px)`
            })
            }
        }
    })

}

gallerySlide();

const runPopup = () => {
    const popup = document.querySelector('.popup'),
          popupClose = document.querySelector('.form_close'),
          body = document.querySelector('.body'),
          btn = document.querySelector('.popup_btn'),
          form = document.querySelector('.popup_form'),
          btn_order = document.querySelector('.order_btn'),
          inputs = form.querySelectorAll('.popup_data input');
          newArrayStyled = [];
    let posTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    let thanks;
    popup.addEventListener('submit',(e) => {
        e.preventDefault();
    })
    btn_order.addEventListener('click',() => {
        popup_show()
    })
    btn.addEventListener('click',() => {
        let data = [].slice.call(form.children);
        let formData = new FormData(form);
        if(formData.get('popup_phone') !== '') {
            inputs[1].classList.remove('input_err')
            data.forEach(elem => {
                if (elem.classList.contains('form_bg_img') || elem.classList.contains('form_close') ) {
                    return false
                } else {
                    elem.classList.add('popup_hidden_elem')
                    newArrayStyled.push(elem)
                }
            })
            setTimeout(initThanks,500)
        } else {
            inputs[1].classList.add('input_err')
        }
    })



    const popup_hide = () => {
        popup.classList.remove('popup_show')
        body.classList.remove('body_anchor')
    }
    const popup_show = () => {
        posTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        inputs.forEach(elem => {
            elem.value = ''
        })
        popup.classList.add('popup_show')
        body.classList.add('body_anchor')
        popup.style.top = `${posTop}px`
    }
    popupClose.addEventListener('click',() => {
        inputs[1].classList.remove('input_err')
        if(newArrayStyled.length != 0) {
            thanks.remove();
            newArrayStyled.forEach(elem => {
                elem.classList.remove('popup_hidden_elem')
            })
        }
            popup_hide();
    })
    setTimeout(popup_show,10000)
    const initThanks = () => {
            thanks = document.createElement('div'),
            thanksTitle = document.createElement('div'),
            thanksDescr = document.createElement('span');
            const createThanks = () => {
                thanks.classList.add('popup_thanks')
                thanks.classList.add('animate__animated')
                thanksTitle.classList.add('thanks_title')
                thanksTitle.innerText = `Спасибо!`
                thanksDescr.innerText = `В ближайшее время с Вами свяжется наш менеджер`
                thanks.appendChild(thanksTitle)
                thanks.appendChild(thanksDescr)
                form.appendChild(thanks)
                thanks.classList.add('animate__zoomIn')

            }

        createThanks()
    }
    window.addEventListener('keydown',(e) => {
        if(inputs[1].value !== '') {
            inputs[1].classList.remove('input_err')
        }
    })
}
runPopup()


