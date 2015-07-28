angular.module('rector').directive('rectorToc', function () {
    'use strict';

    return {
        template: '<div class="rector-toc--items"></div>',
        link: function (scope, elem) {
            var $items = elem.find('.rector-toc--items'),
                $body = angular.element('html, body'),
                $home,
                $last;

            function scroll_to($section) {
                $body.animate({
                    scrollTop: $section.offset().top - 20
                }, 0, 'swing');
            }

            function show($section) {
                if ($section === $last) {
                    return;
                } else if ($section.attr('rector-stand-alone') !== undefined) {
                    angular.element('rector-section').parent().fadeOut();
                    $section.parent().fadeIn();
                } else {
                    angular.element('rector-section[rector-stand-alone]').parent().fadeOut();
                    angular.element('rector-section:not([rector-stand-alone])').parent().fadeIn();
                    scroll_to($section);
                }

                $last = $section;
            }

            angular.element('rector-section').each(function () {
                var $this = angular.element(this),
                    label = $this.text();

                $home = $home || $this;
                angular.element('<div></div>')
                    .text(label)
                    .appendTo($items)
                    .addClass('rector-toc--item')
                    .attr('tabindex', '0')
                    .on('click keypress', function () {
                        show($this);
                    });
            });

            if ($home) {
                show($home);
            }
        }
    };
});
