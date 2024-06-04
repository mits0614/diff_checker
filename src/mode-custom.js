import ace from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-html';

const CustomMode = function() {
    this.HighlightRules = ace.require('ace/mode/html').Mode;
};
ace.define('ace/mode/custom', [], function(require, exports, module) {
    const oop = require('ace/lib/oop');
    const HtmlMode = require('ace/mode/html').Mode;

    const CustomMode = function() {
        HtmlMode.call(this);
        this.HighlightRules = HtmlMode.HighlightRules;
    };
    oop.inherits(CustomMode, HtmlMode);

    (function() {
        this.$id = "ace/mode/custom";
    }).call(CustomMode.prototype);

    exports.Mode = CustomMode;
});
