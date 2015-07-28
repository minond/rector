/**
 * @attribute rector-section-stand-alone
 */
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
                } else if ($section.attr('rector-section-stand-alone') !== undefined) {
                    angular.element('rector-section').fadeOut();
                    $section.fadeIn();
                } else {
                    angular.element('rector-section[rector-section-stand-alone]').fadeOut();
                    angular.element('rector-section:not([rector-section-stand-alone])').fadeIn();
                    scroll_to($section);
                }

                $last = $section;
            }

            angular.element('rector-section').each(function () {
                var $section = angular.element(this),
                    label = $section.find('rector-section-label').text();

                $home = $home || $section;
                angular.element('<div></div>')
                    .text(label)
                    .appendTo($items)
                    .addClass('rector-toc--item')
                    .attr('tabindex', '0')
                    .on('click keypress', function () {
                        show($section);
                    });
            });

            if ($home) {
                show($home);
            }
        }
    };
});
