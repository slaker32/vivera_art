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
    const discount = document.querySelector('.total_price_discount')
    const resultBtn = document.querySelector('.btn_calc');
    let selectSize = document.getElementById('calc_size');
    let size = selectSize.options[selectSize.selectedIndex].value;
    let selectMaterial = document.getElementById('calc_material');
    let materialIndex = selectMaterial.options[selectMaterial.selectedIndex].value;
    let material = selectMaterial.options[selectMaterial.selectedIndex].text;
    const resultMaterial = document.querySelector('.res_material');
    const resultSum = document.querySelector('.total_price')

    resultBtn.addEventListener('click',() => {
        resultBtn.preventDefault;
        let size = selectSize.options[selectSize.selectedIndex].value;
        let materialIndex = selectMaterial.options[selectMaterial.selectedIndex].value;
        let material = selectMaterial.options[selectMaterial.selectedIndex].text;
        if (materialIndex != '' && size != '') {
            resultMaterial.innerHTML = material;
            resultSum.innerHTML = size * materialIndex + 'рублей'
            discount.innerHTML = `Цена со скидкой ${(size * materialIndex) * 0.9} рублей`;
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
          btn = document.querySelector('.popup_btn')
          form = document.querySelector('.popup_form')
    let posTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    popup.addEventListener('submit',(e) => {
        e.preventDefault();
        let data = new FormData(e.target);
        console.log(data.get('popup_name'))
        
    })



    const popup_hide = () => {
        popup.classList.remove('popup_show')
        body.classList.remove('body_anchor')
    }
    const popup_show = () => {
        posTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        popup.classList.add('popup_show')
        body.classList.add('body_anchor')
        popup.style.top = `${posTop}px`
    }
    popupClose.addEventListener('click',() => {
            popup_hide();
    })
    setTimeout(popup_show,10000)
}
runPopup()
document.cookie = "user=John";
console.log(document.cookie)
