var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
import { Injectable, NotFoundException, ConflictException, BadRequestException, } from "@nestjs/common";
import prisma from "../../config/prisma.config";
import * as bcrypt from "bcrypt";
let UserService = class UserService {
    constructor() { }
    create(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if user already exists
                const existingUser = yield prisma.user.findFirst({
                    where: {
                        OR: [
                            { username: createUserDto.username },
                            { email: createUserDto.email },
                        ],
                    },
                });
                if (existingUser) {
                    throw new ConflictException("Username or email already exists");
                }
                // Hash password if provided
                let passwordHash = createUserDto.password_hash;
                if (createUserDto.password_hash) {
                    passwordHash = yield bcrypt.hash(createUserDto.password_hash, 10);
                }
                const user = yield prisma.user.create({
                    data: Object.assign(Object.assign({}, createUserDto), { password_hash: passwordHash, role: createUserDto.role || "customer", status: "active" }),
                });
                return this.mapToResponseDto(user);
            }
            catch (error) {
                if (error instanceof ConflictException) {
                    throw error;
                }
                throw new BadRequestException("Failed to create user");
            }
        });
    }
    findAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(query.page || "1");
            const limit = parseInt(query.limit || "10");
            const skip = (page - 1) * limit;
            const where = {};
            // Add search filter
            if (query.search) {
                where.OR = [
                    { username: { contains: query.search, mode: "insensitive" } },
                    { email: { contains: query.search, mode: "insensitive" } },
                    { full_name: { contains: query.search, mode: "insensitive" } },
                ];
            }
            // Add role filter
            if (query.role) {
                where.role = query.role;
            }
            // Add status filter
            if (query.status) {
                where.status = query.status;
            }
            const [users, total] = yield Promise.all([
                prisma.user.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { created_at: "desc" },
                }),
                prisma.user.count({ where }),
            ]);
            return {
                users: users.map((user) => this.mapToResponseDto(user)),
                total,
                page,
                limit,
            };
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { user_id: id },
            });
            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            return this.mapToResponseDto(user);
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { username },
            });
            return user ? this.mapToResponseDto(user) : null;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { email },
            });
            return user ? this.mapToResponseDto(user) : null;
        });
    }
    update(id, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if user exists
                const existingUser = yield prisma.user.findUnique({
                    where: { user_id: id },
                });
                if (!existingUser) {
                    throw new NotFoundException(`User with ID ${id} not found`);
                }
                // Check for unique constraints if updating username or email
                if (updateUserDto.username || updateUserDto.email) {
                    const whereClause = {
                        user_id: { not: id },
                    };
                    if (updateUserDto.username) {
                        whereClause.username = updateUserDto.username;
                    }
                    if (updateUserDto.email) {
                        whereClause.email = updateUserDto.email;
                    }
                    const duplicateUser = yield prisma.user.findFirst({
                        where: whereClause,
                    });
                    if (duplicateUser) {
                        throw new ConflictException("Username or email already exists");
                    }
                }
                // Hash password if updating
                let passwordHash = updateUserDto.password_hash;
                if (updateUserDto.password_hash) {
                    passwordHash = yield bcrypt.hash(updateUserDto.password_hash, 10);
                }
                const updatedUser = yield prisma.user.update({
                    where: { user_id: id },
                    data: Object.assign(Object.assign(Object.assign({}, updateUserDto), (passwordHash && { password_hash: passwordHash })), { updated_at: new Date() }),
                });
                return this.mapToResponseDto(updatedUser);
            }
            catch (error) {
                if (error instanceof NotFoundException ||
                    error instanceof ConflictException) {
                    throw error;
                }
                throw new BadRequestException("Failed to update user");
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if user exists
                const existingUser = yield prisma.user.findUnique({
                    where: { user_id: id },
                });
                if (!existingUser) {
                    throw new NotFoundException(`User with ID ${id} not found`);
                }
                // Check if user has related records
                const hasRelatedRecords = yield this.checkRelatedRecords(id);
                if (hasRelatedRecords) {
                    // Soft delete by updating status
                    yield prisma.user.update({
                        where: { user_id: id },
                        data: { status: "inactive", updated_at: new Date() },
                    });
                }
                else {
                    // Hard delete if no related records
                    yield prisma.user.delete({
                        where: { user_id: id },
                    });
                }
            }
            catch (error) {
                if (error instanceof NotFoundException) {
                    throw error;
                }
                throw new BadRequestException("Failed to delete user");
            }
        });
    }
    changeStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.update({
                where: { user_id: id },
                data: { status, updated_at: new Date() },
            });
            return this.mapToResponseDto(user);
        });
    }
    checkRelatedRecords(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [staff, customer] = yield Promise.all([
                prisma.staff.findFirst({ where: { user_id: userId } }),
                prisma.customer.findFirst({ where: { user_id: userId } }),
            ]);
            return !!(staff || customer);
        });
    }
    mapToResponseDto(user) {
        return {
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            full_name: user.full_name,
            phone: user.phone,
            address: user.address,
            date_of_birth: user.date_of_birth,
            gender: user.gender,
            role: user.role,
            avatar_url: user.avatar_url,
            status: user.status,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
    }
};
UserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], UserService);
export { UserService };
