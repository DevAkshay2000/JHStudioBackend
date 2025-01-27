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
exports.DFeatureType = void 0;
var typeorm_1 = require("typeorm");
var DFeatureType = /** @class */ (function () {
    function DFeatureType() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
        __metadata("design:type", Number)
    ], DFeatureType.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
        __metadata("design:type", String)
    ], DFeatureType.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
        __metadata("design:type", String)
    ], DFeatureType.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", nullable: true }),
        __metadata("design:type", String)
    ], DFeatureType.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamp", nullable: true }),
        __metadata("design:type", String)
    ], DFeatureType.prototype, "modifiedDate", void 0);
    DFeatureType = __decorate([
        (0, typeorm_1.Entity)("d_feature_type")
    ], DFeatureType);
    return DFeatureType;
}());
exports.DFeatureType = DFeatureType;
//# sourceMappingURL=d-feature-types.entity.js.map