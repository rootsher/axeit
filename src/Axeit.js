/**
 * @module Axeit
 */
define('Axeit', [ 'when/when', 'when/node', 'when/callbacks' ], function Axeit(when, nodefn, callbacks) {
    var util = {};

    util.ajax = {
        /**
         *
         * @param {string} method
         * @param {string} url
         * @param {Object} data
         * @returns {external:Promise}
         */
        load: function load(method, url, data) {
            var request = new XMLHttpRequest();

            method = method.toUpperCase();
            data = data || {};

            return when.promise(function (resolve, reject) {
                request.open(method, url, true);

                request.onreadystatechange = function () {
                    if (this.readyState !== 4) {
                        return;
                    }

                    var responseStatus = this.status;
                    var responseText = this.responseText;

                    if ((responseStatus) >= 200 && (responseStatus < 400)) {
                        return resolve(responseText);
                    }

                    reject({
                        status: responseStatus,
                        body: responseText
                    });
                }

                request.send(data);
                request = null;
            });
        }
    };

    /**
     * 
     * @param {string} templatePath
     * @param {string[]} scriptPaths
     * @param {string=view|popup} type
     */
    function ViewDefinition(templatePath, scriptPaths, type) {
        /**
         * 
         * @type {string}
         */
        this.templatePath = templatePath;
        /**
         * 
         * @type {string[]}
         */
        this.scriptPaths = scriptPaths;
        /**
         * 
         * @type {string=view|popup}
         */
        this.type = type;
    }

    /**
     * 
     * @param {string} pattern
     * @param {ViewDefinition} viewDefinition
     */
    function PatternDefinition(pattern, viewDefinition) {
        /**
         * 
         * @type {string}
         */
        this.pattern = pattern;
        /**
         * 
         * @type {ViewDefinition}
         */
        this.viewDefinition = viewDefinition;
    }

    return {
        definitions: {
            ViewDefinition: ViewDefinition,
            PatternDefinition: PatternDefinition
        }
    };
});