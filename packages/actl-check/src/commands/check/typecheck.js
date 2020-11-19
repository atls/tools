var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import execa from 'execa';
import { Command } from '@oclif/command';
import { AnnotationLevel, Conclusion } from '../../types';
import { createCheck } from '../../github';
var getAnnotationLevel = function (level) {
    if (level !== 'failure') {
        return AnnotationLevel.Warning;
    }
    return AnnotationLevel.Failure;
};
var formatLine = function (line) {
    var _a = line.split(':'), file = _a[0], rule = _a[1], message = _a[2];
    var _b = file.split(/\(|\)/).filter(function (f) { return f; }), filePath = _b[0], position = _b[1];
    var startLine = position.split(',')[0];
    var level = rule.trim().split(' ')[0];
    return {
        path: filePath,
        start_line: Number(startLine || 0),
        end_line: Number(startLine || 0),
        annotation_level: getAnnotationLevel(level),
        title: rule.trim(),
        message: message.trim(),
        raw_details: "(" + rule.trim() + "): " + message.trim(),
    };
};
var TypecheckCommand = (function (_super) {
    __extends(TypecheckCommand, _super);
    function TypecheckCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TypecheckCommand.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        return [4, execa('tsc', ['--noEmit', '-p', process.cwd(), '--pretty', 'false'])];
                    case 1:
                        result = _a.sent();
                        return [4, this.check(result.all)];
                    case 2:
                        _a.sent();
                        return [3, 5];
                    case 3:
                        error_1 = _a.sent();
                        return [4, this.check(error_1.all)];
                    case 4:
                        _a.sent();
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    TypecheckCommand.prototype.check = function (output) {
        if (output === void 0) { output = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var annotations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        annotations = output
                            .split('\n')
                            .reduce(function (result, line, index) {
                            if (line.includes(' TS')) {
                                return __spreadArrays(result, [line]);
                            }
                            if (result.length > 0 && result[result.length - 1]) {
                                result[result.length - 1] = result[result.length - 1] + line;
                            }
                            return result;
                        }, [])
                            .map(formatLine);
                        return [4, createCheck('TypeCheck', annotations.length > 0 ? Conclusion.Failure : Conclusion.Success, {
                                title: annotations.length > 0 ? "Errors " + annotations.length : 'Successful',
                                summary: annotations.length > 0 ? "Found " + annotations.length + " errors" : 'All checks passed',
                                annotations: annotations,
                            })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    TypecheckCommand.description = 'Check TypeScript via tsc';
    TypecheckCommand.examples = ['$ actl check:typecheck'];
    return TypecheckCommand;
}(Command));
export default TypecheckCommand;
