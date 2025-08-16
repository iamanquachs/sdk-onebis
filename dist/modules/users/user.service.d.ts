import { CreateUserDto, UpdateUserDto, UserResponseDto, UserQueryDto } from "../../models/dtos/user.dto";
export declare class UserService {
    constructor();
    create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    findAll(query: UserQueryDto): Promise<{
        users: UserResponseDto[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<UserResponseDto>;
    findByUsername(username: string): Promise<UserResponseDto | null>;
    findByEmail(email: string): Promise<UserResponseDto | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
    remove(id: number): Promise<void>;
    changeStatus(id: number, status: "active" | "inactive" | "suspended"): Promise<UserResponseDto>;
    private checkRelatedRecords;
    private mapToResponseDto;
}
