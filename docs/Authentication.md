# Authentication & Security

## Current Implementation
- **Library**: Symfony Security Bundle.
- **Mechanisms**:
    - **Session-based**: For traditional Twig frontend.
    - **JWT (JSON Web Token)**: For API endpoints (`lexik/jwt-authentication-bundle`).
- **User Provider**: Entity (`App\Entity\User`).
- **Roles**: `ROLE_USER`, `ROLE_STUDENT`, `ROLE_INSTRUCTOR`, `ROLE_ADMIN`.
- **Password Hashing**: Bcrypt/Argon2.

## Target Implementation (Next.js)

### Solution: NextAuth.js (Auth.js) or Clerk
**Recommendation**: **NextAuth.js** with Credentials Provider (for custom backend) or direct Database Adapter.

### Auth Flow
1.  **Login**:
    - User submits credentials.
    - Backend verifies hash.
    - Returns JWT (Access + Refresh tokens).
    - NextAuth stores session.
2.  **Registration**:
    - API endpoint creates User + Profile (Student/Instructor).
    - Sends verification email (Resend/SendGrid).
3.  **Protected Routes**:
    - Middleware (`middleware.ts`) checks for valid session token.
    - Redirects to `/login` if unauthorized.
4.  **Role-Based Access Control (RBAC)**:
    - Store roles in the JWT/Session.
    - Check roles in Layouts/Pages (`if (!user.roles.includes('ADMIN')) return <Forbidden />`).

### Security Checklist
- [ ] Migrate User passwords (hash compatibility check).
- [ ] Implement CSRF protection (Next.js handles this).
- [ ] Secure API Routes.
- [ ] Environment Variables management (`.env.local`).
