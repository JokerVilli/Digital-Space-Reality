$.getScript("js/jquery-ui.js", function() {
    $(function() {
        $('#calendar').datepicker({
            inline: true,
            firstDay: 1,
            showOtherMonths: true,
            // dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        });
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 500,
            values: [75, 300],
            slide: function(event, ui) {
                $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });
        $("#amount").val("$" + $("#slider-range").slider("values", 0) +
            " - $" + $("#slider-range").slider("values", 1));
    });
    redChild($('#logo'), 1)
});

function redChild(node, counter) {
    counter++
    // console.log(counter)
    if (node.children().length) {
        node.children().each(function() {
            // console.log($(this).attr('id'))
            if (counter % 2 == 0) {
                $(this).animate({
                    'background-color': 'red'
                }, 200, function() {
                    $(this).animate({
                        'background-color': 'white'
                    }, 200, redChild($(this), counter))
                });
            } else {
                redChild($(this), counter)
            }
        })
    } else {
        redChild($('#logo'), 1)
    }
}
