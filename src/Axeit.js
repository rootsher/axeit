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
     */
    function ViewDefinition(templatePath, scriptPaths) {
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
    }

    /**
     * 
     * @param {string} pattern
     * @param {ViewDefinition} viewDefinition
     * @param {string=view|popup} type
     */
    function PatternDefinition(pattern, viewDefinition, type) {
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
        /**
         * 
         * @type {string=view|popup}
         */
        this.type = type;
    }

    return {
        definitions: {
            ViewDefinition: ViewDefinition,
            PatternDefinition: PatternDefinition
        }
    };
});