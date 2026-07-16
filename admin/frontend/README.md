# Focused School ERP — Admin Frontend

A responsive, frontend-only school ERP administration portal built with Next.js.

## Current scope

- Essential-only dashboard with four school indicators, three priorities, and six shortcuts
- Tenant-ready school name configuration in the top bar
- Short sidebar: Dashboard, Students, Staff, Attendance, Leave, Fees, Communication, Holidays, Timetable, and Examinations
- Custom-drawn SVG module symbols rather than generic module icons or emoji
- Guided task landing pages with visible priority and hover states
- Students: add, view, and documents pending
- Staff: add, view, teaching, non-teaching, and departments
- Student/staff leave, school holidays, dues list, and fee structure
- Prefiltered attendance download screen
- Class-wise timetable upload and publish flow
- Shortened examination area with schedule and results only
- Desktop, tablet, and mobile navigation/layouts
- Realistic mock data only; no backend or persistence yet

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000/admin/dashboard`.

## Production check

```bash
npm run lint
npm run build
```

## Important routes

- `/admin/dashboard`
- `/admin/students` — guided student workspace
- `/admin/students/all-students`
- `/admin/students/add-student`
- `/admin/students/STU-1024/profile`
- `/admin/attendance`
- `/admin/attendance/download`
- `/admin/leave`
- `/admin/leave/student-leave-form`
- `/admin/fees` — fees workspace
- `/admin/fees/due-list`
- `/admin/fees/fee-structure`
- `/admin/communication`
- `/admin/events-holidays`
- `/admin/events-holidays/add-holiday`
- `/admin/timetable`
- `/admin/timetable/upload`
- `/admin/examinations`

Former secondary modules remain supported by the catch-all mock frontend where needed, but are intentionally removed from the primary navigation for the first release.

## Change the school identity

Edit `schoolConfig` in `lib/admin-navigation.ts`. The top bar and dashboard use this shared configuration so it can later be replaced by the authenticated school/tenant response from Django.

## Backend integration later

Mock data is intentionally kept in the frontend. When Django REST Framework is introduced, replace the mock collections with API services without changing the page layout or route structure.
