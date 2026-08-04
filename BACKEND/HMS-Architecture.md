# Hospital Management System — Production Architecture

Stack: React (Vite) + Material UI • Flask (Blueprints, JWT, SQLAlchemy, Marshmallow) • MySQL

---

## 1. Folder & File Structure

```
hospital-management-system/
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   │
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── theme/
│   │   │   ├── theme.js
│   │   │   └── palette.js
│   │   │
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── RoleBasedRoute.jsx
│   │   │
│   │   ├── layouts/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── DoctorLayout.jsx
│   │   │   ├── PatientLayout.jsx
│   │   │   ├── ReceptionistLayout.jsx
│   │   │   └── AuthLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── RegisterPage.jsx
│   │   │   │   └── ForgotPasswordPage.jsx
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── ManageDoctors.jsx
│   │   │   │   ├── ManageReceptionists.jsx
│   │   │   │   ├── ManagePatients.jsx
│   │   │   │   └── SystemReports.jsx
│   │   │   ├── doctor/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── AppointmentQueue.jsx
│   │   │   │   ├── PatientRecord.jsx
│   │   │   │   └── PrescriptionEditor.jsx
│   │   │   ├── patient/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── BookAppointment.jsx
│   │   │   │   ├── MedicalHistory.jsx
│   │   │   │   ├── LabReports.jsx
│   │   │   │   └── Bills.jsx
│   │   │   ├── receptionist/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── RegisterPatient.jsx
│   │   │   │   ├── ScheduleAppointment.jsx
│   │   │   │   └── BillingDesk.jsx
│   │   │   ├── laboratory/
│   │   │   │   ├── TestQueue.jsx
│   │   │   │   └── UploadResults.jsx
│   │   │   ├── pharmacy/
│   │   │   │   ├── Inventory.jsx
│   │   │   │   └── DispenseMedicine.jsx
│   │   │   ├── bloodbank/
│   │   │   │   ├── StockOverview.jsx
│   │   │   │   └── DonorRegistry.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── DataTable.jsx
│   │   │   │   ├── ConfirmDialog.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── NotificationBell.jsx
│   │   │   ├── appointment/
│   │   │   │   ├── AppointmentCard.jsx
│   │   │   │   └── AppointmentForm.jsx
│   │   │   ├── billing/
│   │   │   │   └── InvoiceView.jsx
│   │   │   └── charts/
│   │   │       └── CanvasVitalsChart.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── NotificationContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useFetch.js
│   │   │   └── useNotifications.js
│   │   │
│   │   ├── services/
│   │   │   ├── apiClient.js
│   │   │   ├── authService.js
│   │   │   ├── appointmentService.js
│   │   │   ├── patientService.js
│   │   │   ├── doctorService.js
│   │   │   ├── labService.js
│   │   │   ├── pharmacyService.js
│   │   │   ├── bloodBankService.js
│   │   │   ├── billingService.js
│   │   │   ├── reportService.js
│   │   │   └── notificationService.js
│   │   │
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── roles.js
│   │   │   ├── validators.js
│   │   │   ├── formatDate.js
│   │   │   └── tokenStorage.js
│   │   │
│   │   └── assets/
│   │       ├── images/
│   │       └── icons/
│   │
│   ├── .env
│   ├── .env.production
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── extensions.py
│   │   │
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── admin.py
│   │   │   ├── doctor.py
│   │   │   ├── patient.py
│   │   │   ├── receptionist.py
│   │   │   ├── appointment.py
│   │   │   ├── medical_record.py
│   │   │   ├── prescription.py
│   │   │   ├── lab_test.py
│   │   │   ├── pharmacy.py
│   │   │   ├── blood_bank.py
│   │   │   ├── billing.py
│   │   │   ├── notification.py
│   │   │   └── audit_log.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── user_schema.py
│   │   │   ├── doctor_schema.py
│   │   │   ├── patient_schema.py
│   │   │   ├── appointment_schema.py
│   │   │   ├── lab_schema.py
│   │   │   ├── pharmacy_schema.py
│   │   │   ├── blood_bank_schema.py
│   │   │   ├── billing_schema.py
│   │   │   └── notification_schema.py
│   │   │
│   │   ├── blueprints/
│   │   │   ├── __init__.py
│   │   │   ├── auth/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── routes.py
│   │   │   │   └── controller.py
│   │   │   ├── admin/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── routes.py
│   │   │   │   └── controller.py
│   │   │   ├── doctor/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── routes.py
│   │   │   │   └── controller.py
│   │   │   ├── patient/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── routes.py
│   │   │   │   └── controller.py
│   │   │   ├── receptionist/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── routes.py
│   │   │   │   └── controller.py
│   │   │   ├── appointment/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── routes.py
│   │   │   │   └── controller.py
│   │   │   ├── laboratory/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── routes.py
│   │   │   │   └── controller.py
│   │   │   ├── pharmacy/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── routes.py
│   │   │   │   └── controller.py
│   │   │   ├── blood_bank/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── routes.py
│   │   │   │   └── controller.py
│   │   │   ├── billing/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── routes.py
│   │   │   │   └── controller.py
│   │   │   ├── reports/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── routes.py
│   │   │   │   └── controller.py
│   │   │   └── notifications/
│   │   │       ├── __init__.py
│   │   │       ├── routes.py
│   │   │       └── controller.py
│   │   │
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── auth_service.py
│   │   │   ├── appointment_service.py
│   │   │   ├── billing_service.py
│   │   │   ├── lab_service.py
│   │   │   ├── pharmacy_service.py
│   │   │   ├── blood_bank_service.py
│   │   │   ├── report_service.py
│   │   │   └── notification_service.py
│   │   │
│   │   ├── middleware/
│   │   │   ├── __init__.py
│   │   │   ├── role_required.py
│   │   │   ├── error_handler.py
│   │   │   └── request_logger.py
│   │   │
│   │   └── utils/
│   │       ├── __init__.py
│   │       ├── password_hash.py
│   │       ├── jwt_helpers.py
│   │       ├── response_builder.py
│   │       ├── validators.py
│   │       └── constants.py
│   │
│   ├── migrations/
│   │   └── (Flask-Migrate / Alembic version files)
│   │
│   ├── tests/
│   │   ├── conftest.py
│   │   ├── test_auth.py
│   │   ├── test_appointment.py
│   │   ├── test_billing.py
│   │   ├── test_lab.py
│   │   └── test_pharmacy.py
│   │
│   ├── seeders/
│   │   └── seed_data.py
│   │
│   ├── logs/
│   │   └── app.log
│   │
│   ├── .env
│   ├── .flaskenv
│   ├── requirements.txt
│   ├── wsgi.py
│   └── run.py
│
├── database/
│   ├── schema.sql
│   ├── er_diagram.png
│   └── seed.sql
│
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── ARCHITECTURE.md
│   └── ROLES_AND_PERMISSIONS.md
│
├── .gitignore
└── README.md
```

---

## 2. Responsibility of Every Folder & File

### Frontend (`frontend/src`)

| Path | Responsibility |
|---|---|
| `main.jsx` | React entry point; mounts `App.jsx` to the DOM, wraps app in providers (Auth, Notification, Theme). |
| `App.jsx` | Root component; renders `AppRoutes` inside the MUI `ThemeProvider`. |
| `theme/` | Centralized MUI theme (colors, typography, spacing) so styling stays consistent and swappable. |
| `routes/AppRoutes.jsx` | Declares all routes using React Router DOM; maps URLs to pages/layouts. |
| `routes/ProtectedRoute.jsx` | Blocks access to routes unless a valid JWT exists in context. |
| `routes/RoleBasedRoute.jsx` | Further restricts a route to specific roles (e.g., only `ADMIN` can access `/admin/*`). |
| `layouts/` | Shell components (sidebar + navbar + outlet) unique to each role, so pages don't repeat chrome. |
| `pages/<role>/` | Route-level screens; compose components + call services; contain page-specific state only. |
| `components/common/` | Reusable, role-agnostic UI: tables, dialogs, loaders, notification bell. |
| `components/appointment/`, `billing/`, `charts/` | Domain-specific reusable UI pieces used across multiple pages. |
| `components/charts/CanvasVitalsChart.jsx` | Uses HTML5 Canvas directly (via `useRef`) to render patient vitals/trends without a heavy charting library. |
| `context/AuthContext.jsx` | Holds logged-in user, role, token; exposes `login()`, `logout()`, `isAuthenticated`. |
| `context/NotificationContext.jsx` | Holds live notification list/count, used by `NotificationBell`. |
| `hooks/` | Custom hooks wrapping context/services (`useAuth`, `useFetch`, `useNotifications`) to keep components thin. |
| `services/apiClient.js` | Single Fetch API wrapper: base URL, attaches JWT header, handles 401/refresh, parses JSON, throws normalized errors. |
| `services/*Service.js` | One file per domain; each exports functions like `getAppointments()`, `createInvoice()` — the **only** place that calls the backend for that domain. |
| `utils/roles.js` | Role constants (`ADMIN`, `DOCTOR`, `PATIENT`, `RECEPTIONIST`) shared across route guards and UI conditionals. |
| `utils/tokenStorage.js` | Reads/writes JWT (and refresh token) from storage; single source of truth so storage strategy can change later. |
| `utils/validators.js` | Client-side form validation (email, phone, required fields) mirroring backend Marshmallow rules. |
| `.env` / `.env.production` | `VITE_API_BASE_URL` and environment-specific flags. |

### Backend (`backend/app`)

| Path | Responsibility |
|---|---|
| `__init__.py` | Application factory (`create_app()`): initializes extensions, registers blueprints, loads config. |
| `config.py` | Environment-based config classes (Dev/Test/Prod) — DB URI, JWT secret, CORS origins. |
| `extensions.py` | Instantiates shared extension objects (`db`, `jwt`, `cors`, `ma`) without binding to an app yet, avoiding circular imports. |
| `models/` | SQLAlchemy ORM classes — one file per entity — defining table columns, relationships, and constraints. This is the single source of truth for DB schema. |
| `schemas/` | Marshmallow schemas — one per model — defining serialization (DB → JSON) and validation (JSON → DB) rules, including nested/related fields. |
| `blueprints/<domain>/routes.py` | Declares URL endpoints and HTTP methods for that domain; applies `@jwt_required()` and `@role_required()`; delegates logic to controller/service. |
| `blueprints/<domain>/controller.py` | Parses request, calls schema validation, invokes the service layer, formats the HTTP response. Keeps routes.py thin. |
| `services/` | Business logic layer: appointment conflict checks, billing calculations, stock deduction rules, notification triggers. Framework-agnostic — testable without Flask request context. |
| `middleware/role_required.py` | Custom decorator reading the JWT claims to enforce role-based access control (RBAC) beyond simple authentication. |
| `middleware/error_handler.py` | Global Flask error handlers → consistent JSON error responses (400/401/403/404/500). |
| `middleware/request_logger.py` | Logs each request (method, path, user, status, latency) to `logs/app.log`. |
| `utils/password_hash.py` | Wraps Werkzeug's `generate_password_hash` / `check_password_hash`. |
| `utils/jwt_helpers.py` | Helpers to embed custom claims (role, user_id) into JWT and extract them. |
| `utils/response_builder.py` | Standard JSON envelope (`{success, data, message, errors}`) used by every controller. |
| `migrations/` | Flask-Migrate/Alembic version history for schema changes — enables safe production upgrades. |
| `seeders/seed_data.py` | Populates dev/test DB with sample admins, doctors, patients, etc. |
| `tests/` | Pytest suite per domain, using `conftest.py` for a test app/DB fixture. |
| `wsgi.py` | Production entry point for Gunicorn/uWSGI. |
| `run.py` | Local dev server entry point (`flask run` equivalent). |

### Database

| Path | Responsibility |
|---|---|
| `schema.sql` | Exported DDL — reference copy of the MySQL schema outside of migrations. |
| `seed.sql` | Raw SQL seed data alternative to the Python seeder. |
| `er_diagram.png` | Visual entity-relationship diagram for documentation. |

### Root

| Path | Responsibility |
|---|---|
| `docs/API_DOCUMENTATION.md` | Endpoint list, request/response contracts per blueprint. |
| `docs/ROLES_AND_PERMISSIONS.md` | Matrix of which role can access which endpoint/action. |
| `.gitignore`, `README.md` | Standard project hygiene and setup instructions. |

---

## 3. Complete Request Flow (End-to-End)

**Example: Patient books an appointment.**

1. **UI Trigger** — Patient fills `BookAppointment.jsx` form and clicks Submit.
2. **Client Validation** — `utils/validators.js` checks required fields before any network call.
3. **Service Call** — Component calls `appointmentService.createAppointment(payload)`.
4. **API Client** — `apiClient.js` attaches `Authorization: Bearer <JWT>` header (from `tokenStorage.js`), sends `fetch(POST /api/appointments)`.
5. **CORS** — Flask-CORS validates the origin is whitelisted before the request reaches routing.
6. **Routing** — `blueprints/appointment/routes.py` matches `POST /api/appointments`.
7. **Auth Guard** — `@jwt_required()` verifies the token signature/expiry; `@role_required('PATIENT')` confirms the role claim.
8. **Controller** — `controller.py` receives the JSON body, passes it to `AppointmentSchema` for validation/deserialization.
9. **Business Logic** — `appointment_service.py` checks doctor availability, prevents double-booking, computes slot status.
10. **ORM/Model** — Service calls SQLAlchemy model methods; `db.session.add()` + `commit()` persist to MySQL.
11. **Side Effects** — Service triggers `notification_service.py` to create a notification row for the doctor and (optionally) queues an email/SMS hook.
12. **Serialization** — Controller passes the saved object back through `AppointmentSchema` to produce clean JSON.
13. **Response Envelope** — `response_builder.py` wraps it as `{success: true, data: {...}, message: "Appointment booked"}`.
14. **Error Path** — Any exception (validation, conflict, DB) is caught by `middleware/error_handler.py` and returned as a structured error JSON with the correct HTTP status.
15. **Frontend Receives** — `apiClient.js` parses response; on success, `appointmentService` resolves the promise.
16. **State Update** — Page updates local state / `NotificationContext`; MUI `Snackbar` shows success; `NotificationBell` badge increments if a notification arrived via polling or refetch.
17. **Re-render** — React re-renders the appointment list with the new entry.

---

## 4. Frontend Flow

1. **Bootstrap** — `main.jsx` renders `<App />` inside `AuthProvider`, `NotificationProvider`, and MUI `ThemeProvider`.
2. **Routing Decision** — `AppRoutes.jsx` checks the URL; `ProtectedRoute` checks `AuthContext.isAuthenticated`; `RoleBasedRoute` checks `user.role` against the route's allowed roles list from `utils/roles.js`.
3. **Layout Mount** — Once authorized, the matching `Layout` (e.g., `PatientLayout`) renders persistent Navbar/Sidebar, with the page component in the `<Outlet />`.
4. **Page Logic** — Page component mounts, uses `useFetch`/service calls in `useEffect` to load data.
5. **Data Fetching** — All network access goes through `services/*.js` → `apiClient.js`, never `fetch()` called directly in components — keeps a single point for auth headers, error handling, and base URL.
6. **State Management** — Local UI state via `useState`; cross-cutting state (auth, notifications) via Context + custom hooks, avoiding prop drilling.
7. **Rendering** — Material UI components (`DataTable`, `AppointmentCard`, `InvoiceView`) render fetched data; `CanvasVitalsChart` draws directly to a `<canvas>` element via `useRef` + `useEffect`.
8. **User Actions** — Form submits/clicks call service functions → optimistic or post-response state updates → MUI feedback (Snackbar/Dialog).
9. **Logout/Token Expiry** — `apiClient.js` intercepts a 401, clears `tokenStorage`, `AuthContext` resets, router redirects to `LoginPage`.

---

## 5. Backend Flow

1. **App Factory** — `create_app()` in `app/__init__.py` loads `config.py`, initializes `db`, `jwt`, `cors`, `ma` from `extensions.py`, then registers every blueprint.
2. **Request Enters** — Flask matches the URL to a blueprint route.
3. **Middleware Chain** — CORS check → JWT verification → role check → request logger records the incoming call.
4. **Routes Layer** — `routes.py` is intentionally thin: just decorators + calling the controller function.
5. **Controller Layer** — Deserializes/validates input via Marshmallow schema; on validation failure, raises a structured error (caught globally).
6. **Service Layer** — Contains all business rules (e.g., "a doctor cannot have two overlapping appointments", "pharmacy stock cannot go negative", "blood unit expiry check"). Services only depend on models, never on Flask's `request` object — this makes them unit-testable in isolation.
7. **Model Layer** — SQLAlchemy models define relationships (`Doctor` 1—N `Appointment`, `Patient` 1—N `MedicalRecord`, etc.) and perform the actual DB read/write via the session.
8. **Response** — Controller serializes the result with the schema and returns via `response_builder.py` for a consistent contract across all 12 modules.
9. **Error Handling** — `middleware/error_handler.py` catches `ValidationError`, `IntegrityError`, custom `AppException` subclasses, and unhandled exceptions, always returning JSON (never an HTML stack trace) with the appropriate status code.
10. **Logging** — Every request/response and every unhandled exception is logged to `logs/app.log` for later audit/debugging.

---

## 6. Database Flow

1. **Schema Ownership** — SQLAlchemy models in `models/` are the source of truth; `Flask-Migrate` (Alembic) generates versioned migration scripts in `migrations/` whenever models change — no manual schema edits in production.
2. **Core Entities & Relationships**:
   - `User` (base auth table: email, password_hash, role) — 1:1 with `Admin`, `Doctor`, `Patient`, or `Receptionist` (role-specific profile tables).
   - `Doctor` 1—N `Appointment` N—1 `Patient`.
   - `Appointment` 1—1 `Prescription`, 1—N `MedicalRecord` entries.
   - `Patient` 1—N `LabTest`, 1—N `Billing`, 1—N `Notification`.
   - `Pharmacy` (medicine inventory) linked N—N to `Prescription` via a join table (prescribed items).
   - `BloodBank` tracks blood units by type/expiry, linked to `Billing`/`Patient` when issued.
   - `Billing` aggregates charges from consultation, lab, pharmacy, and blood bank into one invoice per patient visit.
   - `AuditLog` records sensitive actions (who changed what, when) for compliance.
3. **Connection Management** — `Flask-SQLAlchemy` manages a connection pool to MySQL; each request gets a scoped session, committed on success and rolled back on exception (handled in the service/controller boundary).
4. **Constraints & Integrity** — Foreign keys enforce referential integrity (e.g., an `Appointment` can't reference a non-existent `Doctor`); unique constraints on `User.email`; check-level rules (e.g., non-negative stock) enforced in the service layer since MySQL check constraints are limited.
5. **Read Path** — Service queries via SQLAlchemy ORM (with `joinedload`/`selectinload` for related data to avoid N+1 queries) → results passed to Marshmallow for serialization.
6. **Write Path** — Validated data → model instantiation → `db.session.add()` → `db.session.commit()`; multi-step operations (e.g., billing that touches pharmacy + lab + consultation) run inside a single transaction so partial failures roll back cleanly.
7. **Indexing Strategy** — Indexes on frequently filtered/joined columns: `Appointment.doctor_id`, `Appointment.patient_id`, `Appointment.date`, `User.email`, `Billing.patient_id` — keeps dashboard and report queries fast as data grows.
8. **Reporting** — `reports` module runs aggregate queries (revenue by period, appointments per doctor, lab turnaround time) — for heavier analytics these can later be moved to scheduled jobs writing to summary tables, keeping the system scalable.

---

## 7. Why This Is Scalable & Production-Ready

- **Blueprints per domain** mean each module (Lab, Pharmacy, Blood Bank, Billing...) can be developed, tested, and even deployed independently later if split into microservices.
- **Service layer separation** keeps business logic testable and reusable outside HTTP context.
- **Schema/Model separation** (Marshmallow vs SQLAlchemy) means API contracts can evolve without touching the DB layer, and vice versa.
- **Centralized `apiClient.js` and `response_builder.py`** mean auth, error handling, and response shape are consistent everywhere — new modules just plug in.
- **Role-based route guards on both ends** (frontend `RoleBasedRoute` + backend `role_required`) enforce defense-in-depth.
- **Migrations instead of manual SQL** make schema evolution safe across environments.
- **Structured logging + global error handling** make production debugging and monitoring feasible from day one.
