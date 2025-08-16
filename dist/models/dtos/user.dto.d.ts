import { Role, StatusUser, Gender } from "@prisma/client";
export interface CreateUserDto {
    username: string;
    email: string;
    password_hash: string;
    full_name: string;
    phone?: string | null;
    address?: string | null;
    date_of_birth?: string | null;
    gender?: Gender | null;
    role?: Role;
    avatar_url?: string | null;
    status?: StatusUser;
}
export interface UpdateUserDto {
    username?: string;
    email?: string;
    password_hash?: string;
    full_name?: string;
    phone?: string | null;
    address?: string | null;
    date_of_birth?: string | null;
    gender?: Gender | null;
    role?: Role;
    avatar_url?: string | null;
    status?: StatusUser;
}
export interface UserResponseDto {
    user_id: number;
    username: string;
    email: string;
    full_name: string;
    phone?: string | null;
    address?: string | null;
    date_of_birth?: Date | null;
    gender?: Gender | null;
    role: Role;
    avatar_url?: string | null;
    status: StatusUser;
    created_at: Date;
    updated_at: Date;
}
export interface UserQueryDto {
    search?: string;
    role?: Role;
    status?: StatusUser;
    page?: string;
    limit?: string;
}
