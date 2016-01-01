angular.module('rector', []);

/**
 * @attribute static
 * @attribute watch-collection
 */
angular.module('rector').directive('rectorScope', [function () {
    'use strict';

    return {
        restrict: 'E',
        compile: function (elem, attrs) {
            var node = elem[0],
                snippet = document.createElement('pre'),
                snippetContent = document.createElement('code');

            elem.addClass('rector-element');

            return function (scope) {
                node.innerText = '$scope.' + (attrs.static || attrs.watchCollection);

                snippet.appendChild(snippetContent);
                node.appendChild(snippet);

                switch (true) {
                    case !!attrs.static:
                        snippetContent.innerText = scope[attrs.static].toString();
                        break;

                    case !!attrs.watchCollection:
                        scope.$watchCollection(attrs.watchCollection, function (val) {
                            snippetContent.innerText = JSON.stringify(val, null, '  ');
                        });
                        break;
                }
            };
        }
    };
}]);

/**
 * @attribute rector-lang
 * @attribute rector-eval
 */
angular.module('rector').directive('rectorMarkup', [function () {
    'use strict';

    /**
     * @param {String} str
     * @return {String}
     */
    function trim(str) {
        return str.replace(/^\s+|\s+$/g, '');
    }

    /**
     * @param {String} line
     * return {Number}
     */
    function getLeadingWhiteSpaceLen(line) {
        var match = line.match(/^\s+/);
        return !match ? 0 : match[0].length;
    }

    /**
     * @param {String} text
     * @return {String}
     */
    function removeLeadingWhitespace(text) {
        var lines = text.split('\n'),
            count = 0,
            matcher;

        var i = 0,
            len = lines.length;

        for (i = 0; i < len; i++) {
            if (!lines[i]) {
                continue;
            }

            count = getLeadingWhiteSpaceLen(lines[i]);
            break;
        }

        if (!count) {
            return text;
        }

        matcher = new RegExp('\\s{' + count + '}');

        for (i = 0; i < len; i++) {
            if (!lines[i]) {
                continue;
            }

            lines[i] = lines[i].replace(matcher, '');
        }

        return trim(lines.join('\n'));
    }

    return {
        restrict: 'E',
        compile: function (elem, attrs) {
            var node = elem[0],
                snippet = document.createElement('pre'),
                snippetContent = document.createElement('code'),
                content = removeLeadingWhitespace(node.innerHTML);

            elem.addClass('rector-element');

            return function (scope) {
                if (attrs.rectorEval) {
                    content = scope.$eval(attrs.rectorEval);
                    node.innerHTML = '';
                }

                snippet.appendChild(snippetContent);
                node.appendChild(snippet);
                snippetContent.innerText = content;
            };
        }
    };
}]);
