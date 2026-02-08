/* ================== RESPONSE MESSAGES ================== */

export const message = {
  REGISTRATION_SUCCESS: "Registration completed successfully",
  LOGIN_SUCCESS: "Login successful",
  TOURNAMENT_CREATED: "Tournament created successfully",
  TOURNAMENT_REGISTERED: "Successfully registered for the tournament",
  UNAUTHORIZED_ACCESS: "Unauthorized access",
  INVALID_CREDENTIALS: "Invalid email or password",
  DATA_NOT_FOUND: "Requested data not found",
  SOMETHING_WENT_WRONG: "Something went wrong. Please try again later",
  PAGE_NOT_FOUND: "API endpoint not found"
};

/* ================== HTTP STATUS CODES ================== */

export const status = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};
