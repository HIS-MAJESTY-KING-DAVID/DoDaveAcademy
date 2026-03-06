# Kulmapeck Navigation Structure

This document provides a comprehensive visual mindmap of the application's navigation structure based on the codebase configuration. It covers the Public Header, Student Sidebar, Instructor Sidebar, and Footer links.

## Visual Mindmap

```mermaid
mindmap
  root((Kulmapeck Navigation))
    Public_Header(Public Header)
      Home["Home (app_front)"]
      Categories["Categories Dropdown"]
      Courses["Courses Dropdown"]
      Examens["Exams List (app_front_exam_index)"]
      Forum["Forum Index (app_front_forum_index)"]
      Premium_CTA["Become Premium (app_plan)"]
      Auth(Authentication)
        SignIn["Sign In (app_login)"]
        Register["Create Account (Modal)"]
      Search["Search Courses (app_front_courses)"]
      Lang["Language Switcher (EN/FR)"]
      UserProfile(User Profile Dropdown)
        Dashboard["Dashboard (app_home)"]
        EditProfile["Edit Profile"]
        Help["Help"]
        SignOut["Sign Out (app_logout)"]
        DarkMode["Dark Mode Toggle"]

    Student_Sidebar(Student Sidebar)
      Subscribe["S'ABONNER (app_plan)"]
      Dash_Student["Dashboard (app_student_home)"]
      AllCourses["Voir tous nos cours (app_front_courses_category)"]
      MySubs["Mes subscriptions (app_student_subscriptions)"]
      MyCourses["Mes cours (app_student_courses)"]
      MyPayments["Mes paiements (app_student_payments)"]
      MyNetwork["Mon réseau (app_student_network)"]
      MyProfile["Mon profile (app_student_profile)"]
      Chat["Discuter avec nos profs (app_chat)"]
      Logout_Student["Se déconnecter (app_logout)"]

    Instructor_Sidebar(Instructor Sidebar)
      Dash_Instr["Dashboard (app_instructor_home)"]
      InstrCourses["My Courses (app_instructor_courses)"]
      InstrNetwork["My Network (app_instructor_network)"]
      Orders["Orders (app_instructor_orders_index)"]
      Exam_Instr["Exam (app_instructor_exam_index)"]
      Evaluations["Evaluations (app_admin_evaluation_index)"]
      Reviews["Reviews (app_instructor_reviews)"]
      InstrProfile["Profile (app_instructor_profile)"]
      Logout_Instr["Sign Out (app_logout)"]

    Footer(Footer)
      Company_Links(Company)
        C_Courses["Courses (app_front_courses)"]
        C_Exam["Exam (app_front_exam_index)"]
        About["About Us (app_front_about)"]
        Contact["Contact Us (app_front_contact)"]
      Community_Links(Community)
        FAQ["FAQ (app_front_faq)"]
        C_Forum["Forum (app_front_forum_index)"]
        Sitemap["Sitemap"]
```

## Detailed Navigation Breakdown

### 1. Public Header (Navbar)
Located in `templates/front/base.html.twig`. Available to all visitors.
*   **Logo & Home**: Direct access to the landing page (`app_front`).
*   **Categories & Courses**: Dynamic dropdowns rendering categories and course lists via `app_front_header_categories` and `app_front_header_courses_and_formations`.
*   **Examens**: Access to public exam listings (`app_front_exam_index`).
*   **Forum**: Access to the community forum (`app_front_forum_index`).
*   **Premium Actions**: "Become Premium" link (`app_plan`) appears for non-premium users.
*   **Search**: Global search bar targeting courses (`app_front_courses`).
*   **User Menu**: Dropdown providing access to the user-specific dashboard (`app_home`), profile settings, and logout.

### 2. Student Sidebar
Located in `templates/student/base.html.twig`. Specific to users with `ROLE_STUDENT`.
*   **Dashboard**: Main student overview (`app_student_home`).
*   **Learning**: Access to course catalog (`app_front_courses_category`) and enrolled courses (`app_student_courses`).
*   **Account Management**: Subscription plans (`app_student_subscriptions`), payments (`app_student_payments`), and profile settings (`app_student_profile`).
*   **Social & Support**: Networking (`app_student_network`) and direct chat with teachers (`app_chat`).

### 3. Instructor Sidebar
Located in `templates/instructor/base.html.twig`. Specific to users with `ROLE_INSTRUCTOR`.
*   **Management**: Dashboard (`app_instructor_home`) and course management (`app_instructor_courses`).
*   **Sales & Performance**: Order tracking (`app_instructor_orders_index`) and student reviews (`app_instructor_reviews`).
*   **Assessment**: Exam creation (`app_instructor_exam_index`) and evaluations (`app_admin_evaluation_index`).
*   **Profile**: Instructor profile settings (`app_instructor_profile`).

### 4. Footer
Located in `templates/front/base.html.twig`.
*   **Company**: Standard information links (About, Contact).
*   **Community**: Help resources (FAQ, Forum).
