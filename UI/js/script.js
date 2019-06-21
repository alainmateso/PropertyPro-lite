window.onload = () => {
    var slideIndex = 1;
    // Next/previous controls
    plusSlides = (n) => {
        showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    currentSlide = (n) => {
        showSlides(slideIndex = n);
    }

    showSlides = (n) => {
        if (n != slideIndex) {
            slideIndex = n;
        }
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("demo");
        if (n > slides.length) { slideIndex = 1 }
        if (n <= 0) { slideIndex = slides.length }
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