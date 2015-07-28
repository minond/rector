angular.module('rector').directive('rectorToc', function () {
    'use strict';

    return {
        template: '<div class="rector-toc--items"></div>',
        link: function (scope, elem) {
            var $items = elem.find('.rector-toc--items'),
                $body = angular.element('html, body');

            angular.element('rector-section').each(function () {
                var $this = angular.element(this),
                    label = $this.text();

                angular.element('<div></div>')
                    .text(label)
                    .appendTo($items)
                    .addClass('rector-toc--item')
                    .attr('tabindex', '0')
                    .on('click keypress', function () {
                        $body.animate({
                            scrollTop: $this.offset().top - 30
                        }, 700, 'swing');
                    });
            });
        }
    };
});
