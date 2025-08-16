var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus, ParseIntPipe, } from "@nestjs/common";
import { UserService } from "./user.service";
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    create(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.create(createUserDto);
        });
    }
    findAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.findAll(query);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.findOne(id);
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.findByUsername(username);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.findByEmail(email);
        });
    }
    update(id, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.update(id, updateUserDto);
        });
    }
    changeStatus(id, changeStatusDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.changeStatus(id, changeStatusDto.status);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.remove(id);
        });
    }
};
__decorate([
    Post(),
    HttpCode(HttpStatus.CREATED),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    Get(),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    Get(":id"),
    __param(0, Param("id", ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    Get("username/:username"),
    __param(0, Param("username")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByUsername", null);
__decorate([
    Get("email/:email"),
    __param(0, Param("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByEmail", null);
__decorate([
    Patch(":id"),
    __param(0, Param("id", ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    Patch(":id/status"),
    __param(0, Param("id", ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeStatus", null);
__decorate([
    Delete(":id"),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, Param("id", ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
UserController = __decorate([
    Controller("users"),
    __metadata("design:paramtypes", [UserService])
], UserController);
export { UserController };
