
(function () {
    const carousel = document.querySelector('.carousel')
    const slides = carousel.querySelectorAll('.slide');
    const indicatorsContainer = carousel.querySelector('#indicators-container');
    const indicators = carousel.querySelectorAll('.indicator');
    const pauseBtn = carousel.querySelector('#pause-btn');
    const prevBtn = carousel.querySelector('#prev-btn');
    const nextBtn = carousel.querySelector('#next-btn');

    let currentSlide = 0;
    let timerID = 2000;
    let isPlaying = true;

    const slidesCount = slides.length;
    const interval = 2000;

    const LEFT_ARROW = 'ArrowLeft';
    const RIGHT_ARROW = 'ArrowRight';
    const SPACE = 'Space'

    


    function goToSlide(n) {
        slides[currentSlide].classList.toggle('active');
        indicators[currentSlide].classList.toggle('active');
        currentSlide = (n + slidesCount) % slidesCount;
        slides[currentSlide].classList.toggle('active');
        indicators[currentSlide].classList.toggle('active');
    }


    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prev() {
        pause();
        prevSlide();
    }

    function next() {
        pause();
        nextSlide();
    }



    function play() {
        timerID = setInterval(nextSlide, interval);
        pauseBtn.innerHTML = 'Pause';
        isPlaying = true;
    }

    function pause() {
        clearInterval(timerID);
        pauseBtn.innerHTML = 'Play';
        isPlaying = false;
    }

    function pausePlay() {
        if (isPlaying) {
            pause();
        } else { 
            play();
        }
    }

    function indicate(e) {
        const target = e.target;

        if (target && target.classList.contains('indicator')) {
            pause();
            goToSlide(+target.getAttribute('data-slide-to'));
        }
    }

    function pressKey(e) {
        if (e.code === LEFT_ARROW) prev();
        if (e.code === RIGHT_ARROW) next();
        if (e.code === SPACE) pausePlay();
    }


    pauseBtn.addEventListener('click', pausePlay);
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    indicatorsContainer.addEventListener('click', indicate);
    document.addEventListener('keydown', pressKey);

    timerID = setInterval(nextSlide, interval);
}());

