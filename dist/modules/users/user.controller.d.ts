import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto, UserResponseDto, UserQueryDto } from "../../models/dtos/user.dto";
import { StatusUser } from "@prisma/client";
export interface ChangeStatusDto {
    status: StatusUser;
}
export interface UsersListResponse {
    users: UserResponseDto[];
    total: number;
    page: number;
    limit: number;
}
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    findAll(query: UserQueryDto): Promise<UsersListResponse>;
    findOne(id: number): Promise<UserResponseDto>;
    findByUsername(username: string): Promise<UserResponseDto | null>;
    findByEmail(email: string): Promise<UserResponseDto | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
    changeStatus(id: number, changeStatusDto: ChangeStatusDto): Promise<UserResponseDto>;
    remove(id: number): Promise<void>;
}
