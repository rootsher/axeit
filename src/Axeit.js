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

    /**
     * 
     * @constructor
     */
    function PatternManager() {
        this._patternTree = {
            children: {}
        };
        this._routeSeparator = '/';
        this._paramPrefix = ':';
        this._queryStringInitiator = '?';
    }

    /**
     * 
     * @method
     * @param {PatternDefinition} patternDefinition
     */
    PatternManager.prototype.addPattern = function addPattern(patternDefinition) {
        var self = this;

        var pattern = patternDefinition.pattern;
        var view = patternDefinition.viewDefinition;

        var patternPartList = pattern.split(this._routeSeparator);

        var current = this._patternTree;
        var paramNames = [];

        function PathNode() {
            this.children = {};
        }

        patternPartList.forEach(function (part) {
            if (part[0] === self._paramPrefix) {
                if (!part.slice(1)) {
                    throw new Error('Parameter name is too short in pattern: ' + pattern);
                }

                if (!current.paramNode) {
                    current.paramNode = new PathNode();
                }

                paramNames.push(part.slice(1));
                current = current.paramNode;
            } else {
                if (!current.children[part]) {
                    current.children[part] = new PathNode();
                }

                current = current.children[part];
            }
        });

        if (current.view) {
            if (current.view !== view) {
                throw new Error('Routing path collision: ' + pattern);
            }
        } else {
            current.paramNames = paramNames;
            current.view = view;
        }
    };

    /**
     * 
     * @method
     * @param {string} hash
     * @returns {Object|undefined}
     */
    PatternManager.prototype.resolveHash = function resolveHash(hash) {
        var path = hash.split(this._queryStringInitiator)[0];
        var parts = path.split(this._routeSeparator);

        var current = this._patternTree;
        var params = [];

        for (var i = 0, len = parts.length; i < len; i += 1) {
            part = parts[i];

            if (current.children[part]) {
                current = current.children[part];
                continue;
            }

            if (current.paramNode) {
                current = current.paramNode;
                params.push(part);
                continue;
            }

            return undefined;
        }

        if (!current.view) {
            return undefined;
        }

        var paramList = {};

        current.paramNames.forEach(function (param, i) {
            paramList[param] = params[i];
        });

        return {
            view: current.view,
            params: paramList
        };
    };

    return {
        definitions: {
            ViewDefinition: ViewDefinition,
            PatternDefinition: PatternDefinition
        },
        PatternManager: PatternManager
    };
});