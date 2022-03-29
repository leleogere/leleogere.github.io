$(document).ready(function () {

    // Select language
    var language = "fr";
    // load json language file in the folder called "lang"
    $.getJSON("./lang/" + language + ".json", function (data) {
        // replace text of all elements with the attribute "data-lang" with the corresponding value in the json file
        $("[data-lang]").each(function () {
            $(this).text(data[$(this).attr("data-lang")]);
        });
    });

    // Make the "see-more" class appear when the user clicks on the button using jQuery
    $(".see-more-button").click(function () {
        $(this).parent().find(".see-more").slideToggle("ease-in-out");
        // Change the text of the button
        if ($(this).text() === "Voir plus") {
            $(this).text("Voir moins");
        } else {
            $(this).text("Voir plus");
        }
    });

    // make all scrolls smooth and 30px above the real place and hightlignt target
    window.highlightedTargets = [];
    $('a[href^="#"]').on('click', function (event) {
        let href = this.getAttribute('href')
        let target = $(href);
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - document.querySelector('.navbar').offsetHeight - 28
            }, 500);
        }
        // Add borders to the target to highlight it
        if (!window.highlightedTargets.includes(href)) {
            window.highlightedTargets.push(href);
            // parse hex target color to rgb without
            let color = $(target).css('color');
            let rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            let rgbString = 'rgb(' + rgb[1] + ',' + rgb[2] + ',' + rgb[3] + ', 0)';
            let borderWidth = 2;
            let transitionDuration = 700;
            $(target).css({
                borderTop: borderWidth + 'px solid ' + rgbString,
                borderBottom: borderWidth + 'px solid ' + rgbString,
                marginTop: parseInt($(target).css('margin-top').replace('px', '')) - borderWidth + 'px',
                marginBottom: parseInt($(target).css('margin-bottom').replace('px', '')) - borderWidth + 'px'
            })
            $(target).animate({
                borderColor: rgbString.replace(/0\)$/, '1)')
            }, transitionDuration);
            setTimeout(function () {
                $(target).animate({
                    borderColor: rgbString,
                }, transitionDuration);
                setTimeout(function () {
                    $(target).css({
                        borderTop: 'none',
                        borderBottom: 'none',
                        marginTop: parseInt($(target).css('margin-top').replace('px', '')) + borderWidth + 'px',
                        marginBottom: parseInt($(target).css('margin-bottom').replace('px', '')) + borderWidth + 'px'
                    });
                    // find target position in the array and remove it
                    let index = window.highlightedTargets.indexOf(href);
                    if (index > -1) {
                        window.highlightedTargets.splice(index, 1);
                    }
                }, transitionDuration);
            }, transitionDuration);
        }
    });

    // increase smoothly the tile shadow when navbar button clicked



    // document.querySelectorAll('.navbar a').forEach(function (element) {
    //     element.addEventListener('click', function (event) {
    //         // prevent the default action of the event
    //         event.preventDefault();
    //         // get the id of the element that was clicked
    //         var id = event.target.getAttribute('href').substr(1);
    //         // get the element with the corresponding id
    //         var element = document.getElementById(id);
    //         // find the first parent element that has the class tile
    //         var parent = element.parentElement;
    //         while (!parent.classList.contains('tile')) {
    //             parent = parent.parentElement;
    //         }
    //         // change tile background color to the one of the navbar
    //         var initialShadow = window.getComputedStyle(parent).getPropertyValue('box-shadow');
    //         var newShadow = initialShadow.split(' ');
    //         newShadow[5] = '4px';
    //         parent.style.boxShadow = newShadow.join(' ');
    //         // remove the border 500ms after the scroll ends
    //         setTimeout(function () {
    //             parent.style.boxShadow = initialShadow;
    //         }, 800);
    //
    //     });
    // });
});