export interface UserSearchParams {
    name?: string | {};
    email?: string | {};
    page?: number;
    limit?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}