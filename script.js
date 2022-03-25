$(document).ready(function() {

    // Make the "see-more" class appear when the user clicks on the button using jQuery
    $(".see-more-button").click(function() {
        $(this).parent().find(".see-more").slideToggle("ease-in-out");
        // Change the text of the button
        if ($(this).text() === "Voir plus") {
            $(this).text("Voir moins");
        } else {
            $(this).text("Voir plus");
        }
    });

    // make all scrolls smooth and 30px above the real place
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - document.querySelector('.navbar').offsetHeight - 28
            }, 500);
        }
    });

    // increase tile shadow when navbar button clicked
    document.querySelectorAll('.navbar a').forEach(function(element) {
        element.addEventListener('click', function(event) {
            // prevent the default action of the event
            event.preventDefault();
            // get the id of the element that was clicked
            var id = event.target.getAttribute('href').substr(1);
            // get the element with the corresponding id
            var element = document.getElementById(id);
            // find the first parent element that has the class tile
            var parent = element.parentElement;
            while (!parent.classList.contains('tile')) {
                parent = parent.parentElement;
            }
            // change tile background color to the one of the navbar
            var initialShadow = window.getComputedStyle(parent).getPropertyValue('box-shadow');
            var newShadow = initialShadow.split(' ');
            newShadow[5] = '5px';
            parent.style.boxShadow = newShadow.join(' ');
            // remove the border 500ms after the scroll ends
            setTimeout(function() {
                parent.style.boxShadow = initialShadow;
            }, 800);

        });
    });
});