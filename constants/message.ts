export const INVALID_INFORMATION = 'Invalid User Information';
export const EXISTING_USER = 'User Already exist with email ID';
export const LOGIN_SUCCESS = 'Login Successfull';
export const INVALID_CREDENTIALS = 'Invalid user Credentials';
export const USER_CREATED = 'User Successfully Registered';
export const INTERNAL_ERROR = 'Something Went Wrong';
export const USER_NOT_ALLOWED = 'User is not a member of the specified team';
export const FAILED_TO_CREATE_TASK = 'Failed to create task';
export const FAILED_TO_ASSIGN_TASK = 'Failed to assign task';
export const TASK_NOT_FOUND = 'Task not found';
export const FAILED_TO_UPDATE_TASK = 'Failed to update task';
export const USER_ID_REQUIRED = 'User ID is required';
export const FAILED_TO_FETCH_TASKS = 'Failed to fetch tasks';
export const TASK_ID_REQUIRED = 'Task ID is required';
export const TASK_DELETED_SUCCESSFULLY = 'Task deleted successfully';
export const FAILED_TO_DELETE = 'Failed to delete task';
export const INTERNAL_SERVER_ERROR = 'Internal server error';
export const ERROR_FETCHING_TASKS = 'Error fetching tasks';
export const ONLY_ADMINS_CAN_CREATE_TEAM = 'Only admins can create team';
export const FAILED_TO_CREATE_TEAM = 'Failed to create team';
export const ONLY_ADMINS_CAN_ADD_MEMBERS = 'Only admins can add members to a team';
export const USER_ALREADY_MEMBER = 'User is already a member of the team';
export const MEMBER_ADDED_SUCCESSFULLY = 'Member added to team successfully';
export const FAILED_TO_ADD_MEMBER = 'Failed to add member to team';
export const FAILED_TO_FETCH_TEAM_MEMBERS = 'Failed to fetch team members';
export const ERROR_FETCHING_TEAMS = 'Error fetching teams';
export const INVALID_PASSWORD = 'Invalid password';
export const INVALID_LOGIN_INFORMATION = 'Invalid login information';
export const USER_ID_NOT_FOUND_IN_REQUEST = 'User ID not found in request';
export const USER_NOT_FOUND = 'User not found';
export const USER_UPDATED_SUCCESSFULLY = 'User updated successfully';
export const ERROR_UPDATING_USER = 'Error updating user';
export const UNAUTHORIZED_ONLY_ADMIN_CAN_DELETE = 'Unauthorized: Only admin users can delete users';
export const USER_DELETED_SUCCESSFULLY = 'User deleted successfully';
export const INTERNAL_SERVOR_ERROR ="Internal Server Error";
export const COMMENT_NOT_FOUND = 'Comments not found';
export const FAILED_TO_ADD_COMMENT= 'Failed to add comment';
export const FAILED_TO_FETCH_COMMENT= 'Failed to fetch comments';
export const FAILED_TO_DELETE_COMMENT= 'Failed to delete comments;';
export const COMMENT_DELETE_SUCCESS= 'Comment deleted successfully';
export const UNAUTHORIZED_TO_DELETE_COMMENT = 'You are not authorized to delete this comment';


export enum ERROR_TYPE {
    MALFORM = "MALFORM",
    EXISTS = "EXISTS"
}
export const ERROR_MESSAGE: { [key: string]: string }  = {
    [ERROR_TYPE.MALFORM]: INVALID_INFORMATION,
    [ERROR_TYPE.EXISTS]: EXISTING_USER
}


