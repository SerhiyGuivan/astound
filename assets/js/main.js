(function ($) {
    $.fn.tooltip = function (options) {

        var settings = $.extend({
            title: '',
            element: ''
        }, options);

        return this.each(function () {

            var $this = $(this);
            var $close = $('<span class="tooltip-close icon--close">');
            var $title = $('<div class="tooltip-title">');
            var $content = $('<div class="tooltip-content">');
            var $container = $('<div class="tooltip-container">');
            var $tooltip = $('<div class="tooltip">');
            var $element = $(settings.element);

            generateTmpl();

            $(window).on('resize', closeTooltip);

            $close.on('click', closeTooltip);

            $this.on('click', toggleTooltip);

            function toggleTooltip() {
                openTooltip() || closeTooltip();
            }

            function closeTooltip() {
                if ($tooltip.is(":visible")) {
                    $tooltip.detach();
                    return true;
                }
            }

            function openTooltip() {

                if ($tooltip.is(":hidden")) {
                    $element.css('display', 'block');
                    $this.after($tooltip);
                    setTooltipOffset();
                    return true;
                }

            }

            function setTooltipOffset() {

                var w_t = $($tooltip).outerWidth();
                var w_e = $this.width();
                var h_e = $this.height();

                var styles = {
                    top: $($this).position().top,
                    left: $($this).position().left,
                    marginTop: h_e + 10 + 'px',
                    marginLeft: (w_e / 2) - (w_t / 2) + 'px'
                };

                $($tooltip).css(styles);
            }

            function generateTmpl() {
                $title.text(settings.title);
                $content.append($element);
                $container
                    .append($close)
                    .append($title)
                    .append($content);
                $tooltip.append($container);
            }

        });
    };

    $(document).ready(function () {

        $('.js-label--share').tooltip({
            title: 'Share with',
            element: '.shares'
        });

    });
})(jQuery);