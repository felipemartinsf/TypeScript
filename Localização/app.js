"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var rent_1 = require("./rent");
var bcrypt_1 = require("bcrypt");
var bcrypt_2 = require("bcrypt");
var App = /** @class */ (function () {
    function App() {
        this.users = [];
        this.bikes = [];
        this.rents = [];
    }
    App.prototype.findUser = function (email) {
        return this.users.find(function (user) { return user.email === email; });
    };
    App.prototype.registerUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, rUser, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _i = 0, _a = this.users;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        rUser = _a[_i];
                        _b = user;
                        return [4 /*yield*/, (0, bcrypt_1.hash)(user.password, 10)];
                    case 2:
                        _b.password = _c.sent();
                        if (rUser.email === user.email) {
                            throw new Error('Duplicate user.');
                        }
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.users.push(user);
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.registerBike = function (bike) {
        for (var _i = 0, _a = this.bikes; _i < _a.length; _i++) {
            var rBikes = _a[_i];
            if (rBikes.id === bike.id) {
                throw new Error('Duplicate bike');
            }
        }
        this.bikes.push(bike);
    };
    App.prototype.removeUser = function (email) {
        var i = this.users.findIndex(function (u) { return u.email === email; });
        this.users.splice(i, 1);
        if (i === -1)
            throw new Error('Did not found your email');
    };
    App.prototype.rentBike = function (id, email, dateStart) {
        var a = this.bikes.find(function (i) { return i.id === id; });
        if (a === undefined)
            throw new Error("This id was not found");
        var b = this.users.find(function (j) { return j.email === email; });
        if (b === undefined)
            throw new Error("This email was not found");
        var c = rent_1.Rent.create(this.rents, a, b, dateStart);
        this.rents.push(c);
    };
    App.prototype.returnBike = function (id) {
        var a = this.bikes.find(function (i) { return i.id === id; });
        var b = this.rents.find(function (j) { return j.bike === a; });
        if (b === undefined)
            throw new Error('Essa bike não está registrada aqui');
        var valor;
        var time = new Date() - b.dateFrom; //new date seria a data atual quando a pessoa retornou
        return time * valor;
    };
    App.prototype.listUser = function () {
        return this.users;
    };
    App.prototype.listBike = function () {
        return this.bikes;
    };
    App.prototype.listRent = function () {
        return this.rents;
    };
    App.prototype.authenticateUser = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var a, isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        a = this.users.find(function (i) { return i.email === email; });
                        if (a === undefined)
                            throw new Error('Do not exist in our system');
                        return [4 /*yield*/, (0, bcrypt_2.compare)(a.password, password)];
                    case 1:
                        isValid = _a.sent();
                        if (isValid)
                            console.log('Senha correta');
                        else
                            console.log('Senha incorreta');
                        return [2 /*return*/];
                }
            });
        });
    };
    return App;
}());
exports.App = App;
