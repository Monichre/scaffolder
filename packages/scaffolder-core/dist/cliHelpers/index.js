"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displaySpecificCommandTemplate = exports.boxFileName = exports.displayAvailableCommands = exports.getLongestCommand = exports.showSuccessMessage = exports.generateKeyValues = exports.handleError = void 0;
var chalk = require('chalk');
var _a = require('./colors'), bold = _a.bold, boldGreen = _a.boldGreen, path = _a.path, multiColors = _a.multiColors;
exports.handleError = function (err) {
    if (err.getDisplayErrorMessage) {
        console.log(err.getDisplayErrorMessage());
    }
    else {
        console.error(err);
    }
};
exports.generateKeyValues = function (cmd) {
    return cmd.parent.rawArgs
        .filter(function (arg) { return arg.includes('='); })
        .map(function (keyValuePair) { return keyValuePair.split('='); })
        .reduce(function (accm, _a) {
        var _b;
        var key = _a[0], value = _a[1];
        return (__assign(__assign({}, accm), (_b = {}, _b[key.trim()] = value.trim(), _b)));
    }, {});
};
exports.showSuccessMessage = function (command, createdAtPath) {
    var message = multiColors('Hooray!!') + "\nSuccessfuly created the " + boldGreen(command) + " template at " + path(createdAtPath) + "\n    ";
    console.log(message);
};
exports.getLongestCommand = function (commands) {
    return Math.max.apply(Math, Object.keys(commands)
        .filter(function (c) { return c[0] !== '.'; })
        .map(function (c) { return c.length; }));
};
exports.displayAvailableCommands = function (commands) {
    var longestCommandLength = exports.getLongestCommand(commands);
    console.log(chalk.bold('Command'.padEnd(longestCommandLength, ' ') + " | Location"));
    Object.entries(commands)
        .filter(function (_a) {
        var command = _a[0];
        return command[0] !== '.';
    })
        .forEach(function (_a) {
        var command = _a[0], location = _a[1];
        console.log(boldGreen(command.padEnd(longestCommandLength + 1, ' ')) + "| " + path(location));
    });
};
exports.boxFileName = function (name) {
    console.log(bold(''.padEnd(name.length + 4, '-')));
    console.log("| " + boldGreen(name) + " |");
    console.log(bold(''.padEnd(name.length + 4, '-')));
};
exports.displaySpecificCommandTemplate = function (templates, shouldShowContent) {
    templates.forEach(function (_a) {
        var name = _a.name, content = _a.content;
        exports.boxFileName("" + name);
        if (shouldShowContent) {
            console.log((content || bold('EMPTY FILE')) + '\n');
        }
    });
};
//# sourceMappingURL=index.js.map