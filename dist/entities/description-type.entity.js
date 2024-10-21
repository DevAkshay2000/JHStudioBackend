"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescriptionType = void 0;
var typeorm_1 = require("typeorm");
var DescriptionType = /** @class */ (function () {
    function DescriptionType() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], DescriptionType.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
        __metadata("design:type", String)
    ], DescriptionType.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
        __metadata("design:type", String)
    ], DescriptionType.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", nullable: true }),
        __metadata("design:type", String)
    ], DescriptionType.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamp", nullable: true }),
        __metadata("design:type", String)
    ], DescriptionType.prototype, "modifiedDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 1 }),
        __metadata("design:type", Number)
    ], DescriptionType.prototype, "revisionNumber", void 0);
    DescriptionType = __decorate([
        (0, typeorm_1.Entity)("description_type")
    ], DescriptionType);
    return DescriptionType;
}());
exports.DescriptionType = DescriptionType;