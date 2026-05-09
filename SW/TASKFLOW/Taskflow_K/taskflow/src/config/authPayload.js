/**
 * Build a stable user object from a decoded JWT (Spring Boot + standard JWT claims).
 */
export function buildUserFromDecoded(decodedToken, token, fallbackEmail = "", rolesFromResponse = []) {
  // Use roles from API response first, then fallback to JWT claims
  const roles = rolesFromResponse.length > 0 ? rolesFromResponse : (decodedToken.roles || decodedToken.Roles || []);
  const roleRaw = Array.isArray(roles) ? roles[0] : roles;
  
  // Map backend roles to frontend roles
  let role = "member"; // default
  if (typeof roleRaw === "string") {
    const normalizedRole = roleRaw.toLowerCase();
    if (normalizedRole === "admin") {
      role = "admin";
    } else if (normalizedRole === "manager") {
      role = "manager";
    } else if (normalizedRole === "user") {
      role = "member"; // Map 'User' to 'member' for frontend
    }
  }

  const email =
    decodedToken.sub || // Spring Boot uses 'sub' claim for username
    decodedToken.email ||
    decodedToken.Email ||
    decodedToken.unique_name ||
    decodedToken.UserName ||
    fallbackEmail ||
    "";

  const name =
    decodedToken.name ||
    decodedToken.Name ||
    decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
    ] ||
    email ||
    "";

  return { email, role, name, token, roles: Array.isArray(roles) ? roles : [roles] };
}

/** API may return camelCase or PascalCase for the token field */
export function pickAccessToken(data) {
  if (!data || typeof data !== "object") return null;
  return data.token ?? data.Token ?? null;
}
