function carousel() {
    let slideIndex = 1;

    plusSlides = (n) => {
        showSlides(slideIndex += n);
    }

    currentSlide = (n) => {
        showSlides(slideIndex = n);
    }

    showSlides = (n) => {
        if (n != slideIndex) {
            slideIndex = n;
        }

        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("demo");
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n <= 0) {
            slideIndex = slides.length
        }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        if (typeof slides[slideIndex - 1] != "undefined") {
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].className += " active";
        }
    }
    showSlides(slideIndex);
}

function myFunction() {
    const x = document.getElementById("my-top-nav");
    const y = document.getElementById("logo")
    if (x.className === "top-nav") {
        x.className = "responsive";
    }
    else {
        x.className = "top-nav";
    }
    if (y.className === "logoArea") {
        y.className = "hidden"
    }
    else {
        y.className = "logoArea"
    }
}

window.onload = carousel
