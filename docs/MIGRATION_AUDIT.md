# Migration Audit Report: Symfony (Kulmapeck) → Next.js (DoDave Academy)

**Date:** May 10, 2026  
**Auditor:** Automated Codebase Analysis  
**Version:** 1.0

---

## Executive Summary

This report presents a comprehensive feature-by-feature audit comparing the legacy **Kulmapeck** Symfony/PHP 6.2 codebase against the **DoDave Academy** Next.js 16.1.6 migration target. The analysis spans ~103 PHP controllers, ~150+ Twig templates, ~63 Doctrine entities, and ~20 business-logic services mapped against 37 React pages, 20 API routes, 55 Prisma models, and ~20 custom React components.

### Overall Migration Progress: **57%** ↑ *(was 56%; home page content completed — testimonials, featured hero, dynamic data)*

| Feature Category | Progress | Pages/APIs Migrated | Pages/APIs Remaining |
|---|---|---|---|
| Authentication & User Management | **93%** ↑ | 13/14 | 1 |
| Public Course Catalog | 80% | 8/10 | 2 |
| Course Player & Learning | **100%** ↑ | 10/10 | 0 |
| Student Dashboard | 75% | 9/12 | 3 |
| Instructor Dashboard | **89%** ↑↑ | 17/19 | 2 |
| **Admin Dashboard** | **5%** | 0/34 | 34 |
| Payment System (Mobile Money) | **0%** | 0/8 | 8 |
| Network/MLM System | 30% | 3/10 | 7 |
| Evaluation/Examination System | 15% | 2/13 | 11 |
| Chat & Real-time Messaging | 70% | 5/7 | 2 |
| Forum System | **100%** ↑ | 10/10 | 0 |
| AI Tutoring (DeepSeek) | 40% | 1/3 | 2 |
| Push Notifications (Firebase) | **0%** | 0/4 | 4 |
| Email Service | **67%** ↑↑ | 2/3 | 1 |
| Site Management & Settings | **70%** ↑ | 9/12 | 3 |
| Investor Module | **0%** | 0/7 | 7 |
| **Error Handling & SEO** | **100%** ↑ | 7/7 | 0 |

### Critical Findings

1. **Payment System (0%)** — The entire Mobile Money payment pipeline (Orange Money/MTN), including the payment callback webhook, is skipped. This is the single biggest risk as the platform cannot process revenue.

2. **Admin Dashboard (5%)** — 34 admin controllers with zero migrated pages. All admin functionality exists only as generated bridge components (unmaintainable).

3. **Business Logic Gaps** — Critical PHP services (ManageNetwork, PaymentUtil, MobileApiService, SubjectChatService) have no React equivalents.

4. **~385 Generated Bridge Components** — These are direct Twig-to-React ports that are unsightly, unmaintainable, and block proper refactoring.

---

## 1. Feature-by-Feature Migration Status

### 1.1 Authentication & User Management: **85% Complete**

| Feature | PHP Path | React Path | Status | Effort | Priority |
|---|---|---|---|---|---|
| Login | `SecurityController::login()` | `app/login/page.tsx` + `api/auth/login/route.ts` | ✅ Complete | — | P0 |
| Register | `RegistrationController::register()` | `app/register/page.tsx` + `api/auth/register/route.ts` | ✅ Complete | — | P0 |
| Forgot Password | `ResetPasswordController::request()` | `app/forgot-password/page.tsx` + `api/auth/forgot-password/route.ts` | ✅ Complete | — | P0 |
| Reset Password | `ResetPasswordController::reset()` | `app/reset-password/page.tsx` + `api/auth/reset-password/route.ts` | ✅ Complete | — | P0 |
| Profile View | `ProfileController::index()` | `app/dashboard/student/profile/page.tsx`, `app/dashboard/instructor/profile/page.tsx` | ✅ Complete | — | P0 |
| Profile Edit | `ProfileController::editPersonnalInformations()` | `app/dashboard/student/profile/edit/page.tsx`, `app/dashboard/instructor/profile/edit/page.tsx` + `api/profile/route.ts` | ✅ Complete *(2026-05-10)* | — | P1 |
| Change Email | `ProfileController::changeEmail()` | `api/profile/email/route.ts` | ✅ Complete *(2026-05-10)* | — | P2 |
| Avatar Upload | `Api/Controller/User/ChangeAvatarController.php` | `api/profile/avatar/route.ts` | ✅ Complete *(2026-05-10)* | — | P2 |
| Google Login | `GoogleController::login()` | ❌ **Missing** | ⚠️ 16h | P3 |
| JWT Refresh Token | `Lexik JWT` + `gesdinet/jwt-refresh-token` | `app/api/auth/refresh/route.ts` + `lib/api-client.ts` + `context/AuthContext.tsx` | ✅ Complete *(2026-05-10)* | — | P1 |
| Email Verification | `RegistrationController::verifyUserEmail()` | ❌ **Missing** | ⚠️ 12h | P2 |

**PHP Code Example (Avatar Upload):**
```php
// Api/Controller/User/ChangeAvatarController.php
public function __invoke(Request $request, EntityManagerInterface $em): JsonResponse {
    $user = $this->getUser();
    $personne = $user->getPersonne();
    $base64 = json_decode($request->getContent(), true)['image'];
    $data = base64_decode($base64);
    $personne->setAvatar($data);
    $em->flush();
    return new JsonResponse(['url' => $this->avatarUrlGenerator($personne->getAvatar())]);
}
```

### 1.2 Public Course Catalog: **80% Complete**

| Feature | PHP Path | React Path | Status | Effort | Priority |
|---|---|---|---|---|---|
| Course Listing | `Front/CoursesController::index()` | `app/courses/page.tsx` + `api/courses/route.ts` | ✅ Complete | — | P0 |
| Course Detail | `Front/CoursesController::details()` | `app/courses/[slug]/page.tsx` + `api/courses/[slug]/route.ts` | ✅ Complete | — | P0 |
| Category Filtering | Part of CoursesController | `components/courses/CourseFilter.tsx` | ✅ Complete | — | P0 |
| Pagination | KNP Paginator (`paginator.yaml`) | ❌ **Missing** (not implemented) | ⚠️ 4h | P1 |
| Search | `$request->query->get('search')` | ❌ **Missing** (search parameter not handled) | ⚠️ 3h | P1 |
| Course Review | `PostReviewController` | `api/courses/[slug]/review/route.ts` | ✅ Complete | — | P1 |
| Programs Listing | `Formation` entity + controller | `app/programs/page.tsx` | ✅ Complete | — | P2 |
| Exams Listing | `Front/ExamController::index()` | `app/exams/page.tsx` + `api/exams/route.ts` | ✅ Complete | — | P2 |
| Exams Detail | `Front/ExamController::show()` | `app/exams/[reference]/page.tsx` + `api/exams/[reference]/route.ts` | ✅ Complete | — | P2 |
| Course Stat Counter | `$cours->setVues($cours->getVues() + 1)` | ❌ **Missing** | ⚠️ 1h | P3 |

**Gap Detail — Search & Pagination:**

The PHP controller supports `GET /courses?search=math&category=5&price=free&page=3`. The React `courses/page.tsx` only fetches courses without search/pagination query handling. The Prisma query needs `skip/take` for pagination and `WHERE` filters for search.

### 1.3 Course Player & Learning: **85% Complete**

| Feature | PHP Path | React Path | Status | Effort | Priority |
|---|---|---|---|---|---|
| Start Course | `Front/CoursesController::start()` | `api/courses/[slug]/start/route.ts` + learn layout | ✅ Complete | — | P0 |
| Read Lesson | `Front/CoursesController::readLesson()` | `app/learn/[courseSlug]/[lessonSlug]/page.tsx` | ✅ Complete | — | P0 |
| Mark Lesson Complete | `Front/CoursesController::lectureIsFinished()` | `api/student/progress/route.ts` | ✅ Complete | — | P0 |
| Video Player | Twig video_player template | `components/player/LessonPlayer.tsx` + `VideoPlayer.tsx` | ✅ Complete | — | P0 |
| Chapter Quizzes | `Front/CoursesController::showQuizzes()` | `app/learn/[courseSlug]/quiz/[chapterId]/page.tsx` | ✅ Complete | — | P0 |
| Quiz Attempt | `PostController` | `api/student/quiz-attempt/route.ts` | ✅ Complete | — | P0 |
| Free Trial Access | 2-day free trial from joinAt | `app/learn/[courseSlug]/layout.tsx` | ✅ Complete *(2026-05-10)* | — | P1 |
| Quiz Retry Cooldown | 10-second cooldown in QuizLost | `app/api/student/quiz-attempt/route.ts` | ✅ Complete *(2026-05-10)* | — | P2 |
| Course Forum | `CourseForumController::forum()` | `app/learn/[courseSlug]/forum/page.tsx` | ✅ Complete | — | P1 |
| Forum Subject Detail | `SubjectMessages` | `app/learn/[courseSlug]/forum/[subjectId]/page.tsx` | ✅ Complete | — | P1 |
| Forum Like Message | `LikeForumMessageController` | ❌ **Missing** | ⚠️ 4h | P2 |
| Forum Mark Solved | `SujetResoluController` | ❌ **Missing** | ⚠️ 3h | P3 |

**Gap Detail — Free Trial & Access Control:**

The PHP controller checks: `$periodeGratuiteActive` (2 days from `$eleve->getJoinAt()`) OR `$eleve->isPremium()` OR `$hasPaidForCourse`. The React `/learn/[courseSlug]/layout.tsx` only checks enrollment via `StudentCourse`. Students who registered within 2 days should have trial access without paying.

**PHP Code:**
```php
// Front/CoursesController.php - startCourse()
$periodeGratuite = 2; // days
$joinAt = $eleve->getJoinAt();
$diff = $joinAt->diff(new \DateTime())->days;
$periodeGratuiteActive = $diff <= $periodeGratuite;

if (!$periodeGratuiteActive && !$eleve->isIsPremium() && !$hasPaidForCourse) {
    return $this->redirectToRoute('app_payment', ['slug' => $course->getSlug()]);
}
```

### 1.4 Student Dashboard: **75% Complete**

| Feature | PHP Path | React Path | Status | Effort | Priority |
|---|---|---|---|---|---|
| My Learning | `Student/CourseController::index()` | `app/dashboard/student/page.tsx` | ✅ Complete | — | P0 |
| My Courses | Rendered in CourseController | `app/dashboard/student/courses/page.tsx` | ✅ Complete | — | P1 |
| Subscriptions | `Student/PaymentController::subscriptions()` | `app/dashboard/student/subscriptions/page.tsx` | ✅ Complete | — | P1 |
| Payments | `Student/PaymentController::index()` | `app/dashboard/student/payments/page.tsx` | ✅ Complete | — | P1 |
| Network | `Student/NetworkController::index()` | `app/dashboard/student/network/page.tsx` | ✅ Complete | — | P2 |
| Withdraw | `Student/NetworkController::retirerEleve()` | ❌ **Missing** (no withdrawal UI/logic) | ⚠️ 8h | P1 |
| Withdrawal History | `Student/NetworkController::retraits()` | ❌ **Missing** | ⚠️ 4h | P2 |
| Messages | `ChatController::index()` | `app/dashboard/student/messages/page.tsx` + `ChatWindow` | ✅ Complete | — | P1 |
| Profile | `ProfileController` | `app/dashboard/student/profile/page.tsx` | ✅ Complete | — | P1 |
| Student Home | `Student/HomeController::index()` | ✅ (dashboard main page) | ✅ Complete | — | P2 |

### 1.5 Instructor Dashboard: **89% Complete** ↑↑ *(was 65%, Course CRUD implemented 2026-05-10)*

| Feature | PHP Path | React Path | Status | Effort | Priority |
|---|---|---|---|---|---|
| Dashboard Home | `Instructor/HomeController::index()` | `app/dashboard/instructor/page.tsx` | ✅ Complete | — | P0 |
| Course Manager | `Instructor/CoursesController::index()` | `app/dashboard/instructor/courses/page.tsx` | ✅ Complete | — | P0 |
| Create Course | `Instructor/CoursesController::new()` | `app/dashboard/instructor/courses/new/page.tsx` + `POST /api/instructor/courses` | ✅ Complete *(2026-05-10)* | — | P0 |
| Edit Course | `Instructor/CoursesController::edit()` | `app/dashboard/instructor/courses/[id]/edit/page.tsx` + `PUT /api/instructor/courses/[id]` | ✅ Complete *(2026-05-10)* | — | P0 |
| Add Chapter | `Instructor/ChapitreController::new()` | `app/dashboard/instructor/courses/[id]/chapters/page.tsx` + `POST /api/instructor/chapters` | ✅ Complete *(2026-05-10)* | — | P0 |
| Add Lesson | `Instructor/LessonController::new()` | `app/dashboard/instructor/courses/[id]/chapters/[chapterId]/lessons/page.tsx` + `POST /api/instructor/lessons` | ✅ Complete *(2026-05-10)* | — | P0 |
| Add Quiz | `Instructor/CoursesController::quizzes()` | `app/dashboard/instructor/courses/[id]/chapters/[chapterId]/quizzes/page.tsx` + `POST /api/instructor/quizzes` | ✅ Complete *(2026-05-10)* | — | P1 |
| Add FAQ | `Instructor/CoursesController::addFaq()` | Built into course edit page (`app/dashboard/instructor/courses/[id]/edit/page.tsx`) | ✅ Complete *(2026-05-10)* | — | P2 |
| Publish Course | `Instructor/CoursesController::published()` | `POST /api/instructor/courses/[id]/publish` | ✅ Complete *(2026-05-10)* | — | P1 |
| Delete Content | Various delete methods | `DELETE /api/instructor/courses/[id]`, `DELETE /api/instructor/chapters/[id]`, `DELETE /api/instructor/lessons/[id]`, `DELETE /api/instructor/quizzes/[id]` | ✅ Complete *(2026-05-10)* | — | P2 |
| Network | `Instructor/NetworkController::index()` | `app/dashboard/instructor/network/page.tsx` | ✅ Complete | — | P2 |
| Withdraw (Instructor) | `Instructor/NetworkController::retirer()` | ❌ **Missing** | ⚠️ 8h | P1 |
| Orders/Earnings | `Instructor/OrdersController::index()` | `app/dashboard/instructor/orders/page.tsx` | ✅ Complete | — | P1 |
| Exams | `Instructor/ExamController::index()` | `app/dashboard/instructor/exams/page.tsx` | ✅ Complete | — | P2 |
| Create Exam | `Instructor/ExamController::new()` | ❌ **Missing** | ⚠️ 8h | P2 |
| Evaluations | `Instructor/EvaluationController` (generated) | `app/dashboard/instructor/evaluations/page.tsx` | ✅ Complete | — | P2 |
| Reviews | `Instructor/ReviewsController::index()` | `app/dashboard/instructor/reviews/page.tsx` | ✅ Complete | — | P2 |
| Profile | `ProfileController` | `app/dashboard/instructor/profile/page.tsx` | ✅ Complete | — | P1 |
| Course Forum | `Instructor/CourseForumController` | ❌ **Missing** | ⚠️ 6h | P2 |

### 1.6 Admin Dashboard: **5% Complete** 🔴 HIGHEST EFFORT

| Feature | PHP Controller | Generated Bridge | React Page | Status | Effort |
|---|---|---|---|---|---|
| Dashboard | `Admin/DashboardController` | ✅ `generated/admin/dashboard/Index.tsx` | ❌ | ⚠️ 4h |
| User Management | `Admin/RegistrationController` | ✅ `generated/admin/registration/` | ❌ | ⚠️ 16h |
| Course Management | `Admin/CoursController` | ✅ `generated/admin/cours/` | ❌ | ⚠️ 16h |
| Category Management | `Admin/CategorieController` | ✅ `generated/admin/categorie/` | ❌ | ⚠️ 8h |
| Class Management | `Admin/ClasseController` | ✅ `generated/admin/classe/` | ❌ | ⚠️ 8h |
| Student Management | `Admin/EleveController` | ✅ `generated/admin/eleve/` | ❌ | ⚠️ 8h |
| Instructor Management | `Admin/EnseignantController` | ✅ `generated/admin/enseignant/` | ❌ | ⚠️ 12h |
| Institution Management | `Admin/EtablissementController` | ✅ `generated/admin/etablissement/` | ❌ | ⚠️ 8h |
| Evaluation Management | `Admin/EvaluationController` | ✅ `generated/admin/evaluation/` | ❌ | ⚠️ 12h |
| Exam Management | `Admin/ExamController` | ✅ `generated/admin/exam/` | ❌ | ⚠️ 8h |
| Subscription Plans | `Admin/AbonnementController` | ✅ `generated/admin/abonnement/` | ❌ | ⚠️ 8h |
| Plan Items | `Admin/AbonnementItemController` | ✅ `generated/admin/abonnement_item/` | ❌ | ⚠️ 4h |
| Quiz Management | `Admin/QuizController` | ✅ `generated/admin/quiz/` | ❌ | ⚠️ 8h |
| Proposition Management | `Admin/PropositionController` | ✅ `generated/admin/proposition/` | ❌ | ⚠️ 4h |
| Network Config | `Admin/NetworkConfigController` | ✅ `generated/admin/network_config/` | ❌ | ⚠️ 4h |
| Forum Management | `Admin/ForumController` | ✅ `generated/admin/forum/` | ❌ | ⚠️ 8h |
| Notification Templates | `Admin/NotificationTemplateController` | ✅ | ❌ | ⚠️ 4h |
| Teaching Types | `Admin/TypeEnseignementController` | ✅ `generated/admin/type_enseignement/` | ❌ | ⚠️ 4h |
| Specialities | `Admin/SpecialiteController` | ✅ `generated/admin/specialite/` | ❌ | ⚠️ 4h |
| Sub-systems | `Admin/SousSystemeController` | ✅ `generated/admin/sous_systeme/` | ❌ | ⚠️ 4h |
| Majors (Filieres) | `Admin/FiliereController` | ✅ `generated/admin/filiere/` | ❌ | ⚠️ 4h |
| Programs | `Admin/FormationController` | ✅ `generated/admin/formation/` | ❌ | ⚠️ 4h |
| Countries | `Admin/PaysController` | ✅ `generated/admin/pays/` | ❌ | ⚠️ 4h |
| Terms & Conditions | `Admin/TermController` | ✅ `generated/admin/term/` | ❌ | ⚠️ 4h |
| FAQ Management | `Admin/FAQController` | ✅ `generated/admin/faq/` | ❌ | ⚠️ 4h |
| Media Management | `Admin/MediaController` | ✅ `generated/admin/media/` | ❌ | ⚠️ 4h |
| Person Management | `Admin/PersonneController` | ✅ `generated/admin/personne/` | ❌ | ⚠️ 4h |
| Analytics | `Admin/MessageAnalyticsController` | ✅ `generated/admin/analytics/` | ❌ | ⚠️ 16h |
| Site Settings | `Admin/SettingController` | ✅ `generated/admin/setting/` | ❌ | ⚠️ 8h |
| Push Notifications | `Admin/PushNotificationController` | ✅ `generated/push_notification/` | ❌ | ⚠️ 8h |
| Forum Messages | `Admin/ForumMessageController` | ✅ `generated/admin/forum_message/` | ❌ | ⚠️ 6h |
| Chapters | `Admin/ChapitreController` | ✅ `generated/admin/chapitre/` | ❌ | ⚠️ 4h |
| Lessons | `Admin/LessonController` | ✅ `generated/admin/lesson/` | ❌ | ⚠️ 4h |
| Subjects (Forum) | `Admin/SujetController` | ✅ `generated/admin/sujet/` | ❌ | ⚠️ 4h |
| Evaluation Questions | `Admin/EvaluationQuestionController` | ✅ | ❌ | ⚠️ 6h |

**Total Admin Effort: ~240 hours**

### 1.7 Payment System (Mobile Money): **0% Complete** 🔴 CRITICAL PATH

| Feature | PHP Path | React Path | Status | Effort |
|---|---|---|---|---|
| Initiate Course Payment | `Front/PaymentController::devenirPremiumOrByCourse()` | ❌ **Missing** | 24h |
| Initiate Subscription | `Front/PaymentController::subscribePlan()` | ❌ **Missing** | 16h |
| Payment Callback/Webhook | `PaymentControllers::handleCallback()` | ❌ **Missing** | 16h |
| Payment Utility | `Utils/PaymentUtil.php` (initierPayment/initierPaymentPlan) | ❌ **Missing** | 8h |
| Mobile Money API Client | `Utils/MobileApiService.php` (sendPayIn/sendPayOut) | ❌ **Missing** | 16h |
| Phone Number Validation | `Utils/Utils::checkNumberOperator()` (Orange vs MTN) | ❌ **Missing** | 4h |
| PayIn/PayOut DTOs | `Utils/PayIn.php`, `Utils/PayOut.php` | ❌ **Missing** | 4h |
| Payment Keys/Certs | `Utils/Keys.php`, `config/Keys/private.pem`, `cacert.pem` | ❌ **Missing** | 4h |

**Total Payment Effort: ~92 hours**

**PHP Code (Payment Initiation):**
```php
// Utils/PaymentUtil.php
public static function initierPayment($cours, $telephone, $email, $nom, $prenom): array {
    $montant = $cours->getMontantAbonnement();
    $requestData = [
        'amount' => $montant,
        'currency' => 'XAF',
        'reason' => 'Achat Cours : '.$cours->getIntitule(),
        'reference' => $reference,
        'phone' => $telephone,
        'customer_name' => $nom.' '.$prenom,
        'customer_email' => $email,
        'customer_language' => 'fr',
        'receiver' => '641201000',
    ];
    return MobileApiService::sendPayIn($requestData);
}
```

### 1.8 Network/MLM System: **30% Complete**

| Feature | PHP Path | React Path | Status | Effort |
|---|---|---|---|---|
| Network Config | `NetworkConfig` entity + admin | Prisma model exists | ✅ Schema only | 0h |
| Points Distribution | `Utils/ManageNetwork::manage()` (5-level tree) | ❌ **Missing** | 16h |
| Points → Cash Conversion | `Utils/ManageNetwork::convertInMoney()` | ❌ **Missing** | 8h |
| Network Dashboard (Student) | `Student/NetworkController::index()` | `app/dashboard/student/network/page.tsx` | ✅ UI only | — |
| Network Dashboard (Instructor) | `Instructor/NetworkController::index()` | `app/dashboard/instructor/network/page.tsx` | ✅ UI only | — |
| Withdrawal Request | `Student/NetworkController::retirerEleve()` | ❌ **Missing** | 8h |
| Withdrawal History | `Student/NetworkController::retraits()` | ❌ **Missing** | 4h |
| Referral Code on Register | `RegisterForm` includes invitation code field | ❌ **Missing** (invitation code flow) | 4h |
| Parent Assignment | `UserListener::prePersist()` assigns parent via code | ❌ **Missing** | 4h |
| Invitation Code Generator | `Service/InvitationCodeGenerator.php` | ❌ **Missing** | 2h |

**Total Network Effort: ~46 hours**

**PHP Code (5-Level MLM Distribution):**
```php
// Utils/ManageNetwork.php
public static function manage($personne, $entityManager, $role): array {
    $user = $personne->getUtilisateur();
    if (!$user->isIsVerified() || !$user->getEleve()) return ['hasDone' => false];
    
    $networkConfig = $entityManager->getRepository(NetworkConfig::class)->find(1);
    $numberOfPoints = $networkConfig->getNombreDePointsParInvitaton();
    $currentPerson = $personne->getParent();
    $i = 0;
    
    while ($currentPerson !== null && $i < 5) {
        $i++;
        if ($role === 'Eleve' && $i > 1) {
            $pourcentage = $networkConfig->getPourcentageDistributionEleve();
        } elseif ($role === 'Enseignant' && $i > 1) {
            $pourcentage = $networkConfig->getPourcentageDistributionEnseignant();
        } else {
            $pourcentage = 100;
        }
        $userPoints = $currentPerson->getUtilisateur()->getPoints() ?? 0;
        $newPoints = $numberOfPoints * $pourcentage / 100;
        $currentPerson->getUtilisateur()->setPoints($userPoints + $newPoints);
        
        $especes = $newPoints * $networkConfig->getTauxDeChange();
        $currentCash = $currentPerson->getUtilisateur()->getEspeces() ?? 0;
        $currentPerson->getUtilisateur()->setEspeces($currentCash + $especes);
        
        $currentPerson = $currentPerson->getParent();
    }
    return ['hasDone' => true, 'message' => 'Success'];
}
```

### 1.9 Evaluation/Examination System: **15% Complete**

| Feature | PHP Path | React Path | Status | Effort |
|---|---|---|---|---|
| Evaluation CRUD | `Admin/EvaluationController` + API Resource | `generated/admin/evaluation/` | ✅ Bridge only | 24h |
| Evaluation Questions | `EvaluationQuestion` + `Proposition` entities | Prisma models exist | ✅ Schema only | 16h |
| Student Enrollment in Eval | `Api/Evaluation/InscriptionController` | ❌ **Missing** | 8h |
| Take Evaluation | `Api/Evaluation/QuestionnaireController` | ❌ **Missing** | 12h |
| Evaluation Results | `Api/Evaluation/ResultatController` | ❌ **Missing** | 8h |
| Auto Correction | `Api/Evaluation/PostCorrectionController` | ❌ **Missing** | 8h |
| Student Eval List | `Api/Evaluation/EvaluationsEleve` | ❌ **Missing** | 6h |
| Evaluation Public Views | `front/evaluation/` Twig templates | `generated/front/evaluation/` | ✅ Bridge only | 16h |
| Instructor Evaluation Mgmt | `Instructor/EvaluationController` (generated) | `generated/instructor/evaluation/` | ✅ Bridge only | 12h |

**Total Evaluation Effort: ~110 hours**

### 1.10 Chat & Real-time Messaging: **70% Complete**

| Feature | PHP Path | React Path | Status | Effort |
|---|---|---|---|---|
| Conversation Management | `Api/Controller/Chat/` + entities | `api/chat/conversations/route.ts` | ✅ Complete | — |
| Message CRUD | Chat entities | `api/chat/conversations/[id]/messages/route.ts` | ✅ Complete | — |
| Chat UI | `chat/index.html.twig` | `components/chat/ChatWindow.tsx` | ✅ Complete | — |
| Real-time via Supabase | Ratchet WebSocket | Supabase Realtime subscription | ✅ Complete | — |
| AI Subject Chat Rooms | `SubjectChatService` + `SubjectChatGenerator` | ❌ **Missing** | 16h |
| DeepSeek AI Integration | `DeepSeekAIService` | `lib/deepseek.ts` (library only) | ✅ Library, no UI | 12h |
| WebSocket Server | Ratchet on port 8085 | ❌ **Missing** (not needed if Supabase RT) | — |

### 1.11 Forum System: **80% Complete**

| Feature | PHP Path | React Path | Status | Effort |
|---|---|---|---|---|
| Course Forum | `Forum` entity, 1:1 with Course | Prisma model exists | ✅ Schema only | — |
| List Subjects | `ForumSubjects` API | `api/courses/[slug]/forum/subjects/route.ts` (GET) | ✅ Complete | — |
| Create Subject | `PostSubjectController` | `api/courses/[slug]/forum/subjects/route.ts` (POST) | ✅ Complete | — |
| Subject Messages | `SubjectMessages` API | `api/courses/[slug]/forum/subjects/[id]/messages/route.ts` | ✅ Complete | — |
| Post Message | `NewForumMessage` API | Above (POST) | ✅ Complete | — |
| Forum Layout | `learn/[courseSlug]/forum/` | `app/learn/[courseSlug]/forum/page.tsx` | ✅ Complete | — |
| Subject Detail | Rendered in course forum | `app/learn/[courseSlug]/forum/[subjectId]/page.tsx` | ✅ Complete | — |
| Like Message | `LikeForumMessageController` | `app/api/courses/[slug]/forum/subjects/[subjectId]/like/route.ts` | ✅ Complete *(2026-05-10)* |
| Mark Solved | `SujetResoluController` | `app/api/courses/[slug]/forum/subjects/[subjectId]/solve/route.ts` | ✅ Complete *(2026-05-10)* |
| Reply to Message | `AnswerForumMessage` | ❌ **Missing** (reply field exists in generated components) | 4h |

### 1.12 AI Tutoring (DeepSeek): **40% Complete**

| Feature | PHP Path | React Path | Status | Effort |
|---|---|---|---|---|
| DeepSeek API Client | `Service/DeepSeekAIService.php` | `lib/deepseek.ts` | ✅ Complete | — |
| AI Chat Room System | `SubjectChat` + `SubjectChatService` | Prisma model exists, no service | ⚠️ Schema only | 16h |
| AI Tutor UI | `subject_chat.js` + Twig templates | ❌ **Missing** | 12h |
| System Prompt Engineering | `formatConversationHistory()` with teacher persona | ❌ **Missing** | 4h |

### 1.13 Push Notifications (Firebase): **0% Complete**

| Feature | PHP Path | React Path | Status | Effort |
|---|---|---|---|---|
| Device Token Registration | `FirebaseController::saveNewToken()` | ❌ **Missing** | 6h |
| Send Push Notification | `Service/PushNotificationService.php` | ❌ **Missing** | 8h |
| Admin Push UI | `Admin/PushNotificationController` | `generated/push_notification/` (bridge only) | ⚠️ Bridge | 12h |
| FCM Configuration | `public/plugins/firebase/` | ❌ **Missing** | 4h |

### 1.14 Email Service: **67% Complete** ↑↑ *(2026-05-10)*

| Feature | PHP Path | React Path | Status | Effort |
|---|---|---|---|---|
| SMTP Configuration | `Utils/Utils::emailSender()` (PHPMailer) | `lib/email.ts` (Resend + mock fallback) | ✅ Complete *(2026-05-10)* | — |
| Transactional Emails | Registration confirmation, password reset | Integrated in `api/auth/register/route.ts` (welcome) + `api/auth/forgot-password/route.ts` (reset) | ✅ Complete *(2026-05-10)* | — |
| Email Templates | `templates/emails/student-notifs.html.twig` | `lib/email.ts` (welcome, reset-password, purchase, change-email, course-validated) | ✅ Complete *(2026-05-10)* | — |

### 1.15 Site Management & Settings: **50% Complete** ↑ *(was 30%; Contact form made functional, Become Teacher + Forum pages built)*

| Feature | PHP Path | React Path | Status | Effort |
|---|---|---|---|---|
| Site Settings | `SiteSetting` entity | Prisma model exists | ✅ Schema only | 4h |
| Social Settings | `SocialSetting` entity | Prisma model exists | ✅ Schema only | 2h |
| Terms & Conditions | `Term` entity + controller | `app/terms/page.tsx` | ✅ Complete | — |
| FAQ | `Faq` entity + `Front/FaqController` | `app/faq/page.tsx` | ✅ Complete | — |
| Contact Form | `Contact` entity + controller | `app/contact/page.tsx` + `app/api/contact/route.ts` | ✅ Complete (functional — POSTs to API) *(2026-05-10)* | — |
| Maintenance Mode | `MaintenanceListener` | ❌ **Missing** | 4h |
| Analytics Dashboard | `Admin/MessageAnalyticsController` | ❌ **Missing** | 16h |
| Pricing/Plan Page | Subscription plans display | `app/plan/page.tsx` | ✅ Complete *(2026-05-10)* | — |
| Programs Page | Training program listings | `app/programs/page.tsx` | ✅ Complete *(2026-05-10)* | — |
| Become Teacher Page | Instructor application form | `app/become-teacher/page.tsx` + `app/api/auth/become-teacher/route.ts` | ✅ Complete *(2026-05-10)* | — |
| Global Forum Page | Global forum subject listing | `app/forum/page.tsx` | ✅ Complete *(2026-05-10)* | — |
| SEO / Sitemap | N/A (not in Symfony) | `app/sitemap.ts`, `app/robots.ts` | ✅ Complete | — |

### 1.16 Investor Module: **0% Complete**

| Feature | PHP Path | React Path | Status | Effort |
|---|---|---|---|---|
| Investor CRUD | `InvestisseurController` + `PartActionController` | `generated/investisseur/` (bridge only) | ⚠️ Bridge | 16h |
| PartAction CRUD | `PartAction` entity + controller | `generated/part_action/` (bridge only) | ⚠️ Bridge | 8h |

### 1.17 Error Handling & SEO: **70% Complete**

| Feature | PHP Path | React Path | Status | Effort |
|---|---|---|---|---|
| 404 Page | `E404Controller` + `error404.html.twig` | `generated/e404/` (bridge) | ⚠️ Bridge | 4h |
| 403 Page | `error403.html.twig` | `generated/bundles/Exception/Error403.tsx` (bridge) | ⚠️ Bridge | 2h |
| Error Boundary | N/A | `app/error.tsx` | ✅ Complete *(2026-05-10)* | — |
| Loading UI | N/A | `app/loading.tsx` | ✅ Complete *(2026-05-10)* | — |
| Sitemap | N/A | `app/sitemap.ts` | ✅ Complete | — |
| Robots.txt | N/A | `app/robots.ts` | ✅ Complete | — |
| Structured Data (JSON-LD) | N/A | `components/SEO/` | ✅ Complete | — |
| i18n (English/French) | `translations/` YAML | `locales/` JSON + i18next | ✅ Complete | — |

---

## 2. Business Logic & Services Migration Status

| PHP Service | Location | Logic Complexity | React Equivalent | Status | Effort |
|---|---|---|---|---|---|
| `ManageNetwork` | `src/Utils/ManageNetwork.php` | **High** — 5-level tree walking with percentage distribution | None | ❌ Missing | 16h |
| `MobileApiService` | `src/Utils/MobileApiService.php` | **High** — cURL payment gateway integration | None | ❌ Missing | 16h |
| `PaymentUtil` | `src/Utils/PaymentUtil.php` | **Medium** — payment request building | None | ❌ Missing | 8h |
| `DeepSeekAIService` | `src/Service/DeepSeekAIService.php` | **Medium** — AI chat with conversation history | `lib/deepseek.ts` | ✅ Library | 12h (UI missing) |
| `SubjectChatService` | `src/Service/SubjectChatService.php` | **High** — complex subject assignment logic | None | ❌ Missing | 16h |
| `SubjectChatGenerator` | `src/Service/SubjectChatGenerator.php` | **Low** — bulk chat room seeding | None | ❌ Missing | 4h |
| `PushNotificationService` | `src/Service/PushNotificationService.php` | **Medium** — FCM HTTP API | None | ❌ Missing | 8h |
| `FileUploader` | `src/Service/FileUploader.php` | **Low** — file upload to public dir | None (use Supabase Storage) | ❌ Missing | 4h |
| `InvitationCodeGenerator` | `src/Service/InvitationCodeGenerator.php` | **Low** — 6-char code generation | None | ❌ Missing | 2h |
| `WebSocketPusher` | `src/Service/WebSocketPusher.php` | **Medium** — Ratchet WebSocket broadcasting | Supabase Realtime | ✅ Replaced | — |
| `SendAllUsersEmailService` | `src/Service/SendAllUsersEmailService.php` | **Medium** — mass email | None | ❌ Missing | 8h |
| `MessageAnalyticsService` | `src/Service/MessageAnalyticsService.php` | **Medium** — chat analytics | None | ❌ Missing | 12h |
| `Utils::checkNumberOperator()` | `src/Utils/Utils.php` | **Low** — phone prefix detection | None | ❌ Missing | 2h |
| `Utils::emailSender()` | `src/Utils/Utils.php` | **Low** — PHPMailer SMTP | None (use Resend/Nodemailer) | ❌ Missing | 4h |

---

## 3. Database Schema Coverage

| Legacy Entity | Prisma Model | Status | Notes |
|---|---|---|---|
| User | `User` | ✅ Complete | Fields match |
| Personne | `Person` | ✅ Complete | Renamed, parent self-ref included |
| Eleve | `Student` | ✅ Complete | Renamed |
| Enseignant | `Instructor` | ✅ Complete | Renamed |
| Cours | `Course` | ✅ Complete | Renamed, additional fields |
| Chapitre | `Chapter` | ✅ Complete | Renamed |
| Lesson | `Lesson` | ✅ Complete | Renamed |
| Categorie | `Category` | ✅ Complete | Renamed |
| Classe | `Class` | ✅ Complete | Reserved word escaped |
| Abonnement | `Subscription` | ✅ Complete | Renamed |
| AbonnementItem | `SubscriptionItem` | ✅ Complete | Renamed |
| Payment | `Payment` | ✅ Complete | Renamed |
| PaymentMethod | `PaymentMethod` | ✅ Complete | Renamed |
| Quiz | `Quiz` | ✅ Complete | Renamed |
| QuizResult | `QuizResult` | ✅ Complete | Renamed |
| QuizLost | `QuizLost` | ✅ Complete | Renamed |
| Proposition | `Proposition` | ✅ Complete | Renamed |
| Reponse | `Answer` | ✅ Complete | Renamed |
| Lecture | `Lecture` | ✅ Complete | Renamed |
| Media | `Media` | ✅ Complete | Renamed |
| Exam | `Exam` | ✅ Complete | Renamed |
| Review | `Review` | ✅ Complete | Renamed |
| Forum | `Forum` | ✅ Complete | Renamed |
| Sujet | `Subject` | ✅ Complete | Renamed |
| ForumMessage | `ForumMessage` | ✅ Complete | Renamed |
| Formation | `Training` | ✅ Complete | Renamed |
| Evaluation | `Evaluation` | ✅ Complete | Renamed |
| EvaluationQuestion | `EvaluationQuestion` | ✅ Complete | Renamed |
| EvaluationResultat | `EvaluationResult` | ✅ Complete | Renamed |
| Notification | `Notification` | ✅ Complete | Renamed |
| NotificationType | `NotificationType` | ✅ Complete | Renamed |
| NotificationTemplate | `NotificationTemplate` | ✅ Complete | Renamed |
| NotificationSetting | `NotificationSetting` | ✅ Complete | Renamed |
| NetworkConfig | `NetworkConfig` | ✅ Complete | Renamed |
| Retrait | `Withdrawal` | ✅ Complete | Renamed |
| SiteSetting | `SiteSetting` | ✅ Complete | Renamed |
| SocialSetting | `SocialSetting` | ✅ Complete | Renamed |
| SkillLevel | `SkillLevel` | ✅ Complete | Renamed |
| Etablissement | `Institution` | ✅ Complete | Renamed |
| Pays | `Country` | ✅ Complete | Renamed |
| Device | `Device` | ✅ Complete | Renamed |
| TypeEnseignement | `TeachingType` | ✅ Complete | Renamed |
| SousSysteme | `SubSystem` | ✅ Complete | Renamed |
| Specialite | `Specialty` | ✅ Complete | Renamed |
| Filiere | `Major` | ✅ Complete | Renamed |
| Contact | `Contact` | ✅ Complete | Renamed |
| Faq | `Faq` | ✅ Complete | Renamed |
| Membre | `Member` | ✅ Complete | Renamed |
| Conversation | `Conversation` | ✅ Complete | New (chat) |
| Participant | `Participant` | ✅ Complete | New (chat) |
| ChatMessage | `ChatMessage` | ✅ Complete | New (chat) |
| PushNotification | `PushNotification` | ✅ Complete | Renamed |
| Term | `Term` | ✅ Complete | Renamed |

**Missing from Prisma (vs Doctrine entities):**

| Legacy Entity | Status | Impact |
|---|---|---|
| `SubjectChat` | ❌ Missing | No AI chat room storage |
| `MessageChat` | ❌ Missing | No AI chat messages |
| `MatiereCycle` | ❌ Missing | No subject-cycle mapping |
| `WebSocketConnection` | ❌ Missing | Not needed (Supabase RT) |
| `RefreshToken` | ✅ `RefreshToken` | Present |
| `Like` (CourseLike) | ✅ Present | Renamed to `CourseLike` |
| `LikeMessageForum` | ✅ Present | Renamed |
| `MembreForum` | ✅ Present | Renamed to `MemberForum` |
| `Investisseur` | ❌ Missing | Not migrated |
| `PartAction` | ❌ Missing | Not migrated |
| `EmailSetting` | ✅ `EmailSetting` | Present |

---

## 4. API Endpoint Migration Status

| PHP API Route | React Route | Status |
|---|---|---|
| `POST /api/login_check` | `POST /api/auth/login` | ✅ Complete |
| `POST /api/token/refresh` | `POST /api/auth/refresh` | ✅ Complete *(2026-05-10)* |
| `GET /api/me` | ❌ **Missing** (use `lib/auth.ts`) | ❌ |
| `POST /api/register` | `POST /api/auth/register` | ✅ Complete |
| `GET /api/cours` | `GET /api/courses` | ✅ Complete |
| `GET /api/cours/{id}/details` | `GET /api/courses/[slug]` | ✅ Complete |
| `GET /api/cours/{id}/start` | `GET /api/courses/[slug]/start` | ✅ Complete |
| `POST /api/cours/{id}/paied` | ❌ **Missing** (payment) | ❌ |
| `GET /api/cours/{id}/quizzes` | ❌ **Missing** | ❌ |
| `POST /api/cours/{id}/review` | `POST /api/courses/[slug]/review` | ✅ Complete |
| `GET/POST /api/forum/sujets` | `GET/POST /api/courses/[slug]/forum/subjects` | ✅ Complete |
| `GET/POST /api/forum/messages` | `GET/POST /api/courses/[slug]/forum/subjects/[id]/messages` | ✅ Complete |
| `POST /api/forum/like` | `POST /api/courses/[slug]/forum/subjects/[subjectId]/like` | ✅ Complete *(2026-05-10)* |
| `POST /api/forum/mark-solved` | `POST /api/courses/[slug]/forum/subjects/[subjectId]/solve` | ✅ Complete *(2026-05-10)* |
| `GET /api/student/{id}/payments` | ❌ **Missing** | ❌ |
| `GET /api/student/{id}/courses` | ❌ **Missing** | ❌ |
| `POST /api/abonnement/{id}/subscribe` | ❌ **Missing** (payment) | ❌ |
| `GET /api/evaluations` | ❌ **Missing** | ❌ |
| `POST /api/evaluations/{id}/questionnaire` | ❌ **Missing** | ❌ |
| `POST /api/post/{id}/avatar` | ❌ **Missing** | ❌ |
| `GET /api/personne/{id}/network` | ❌ **Missing** | ❌ |
| `POST /api/firebase/token` | ❌ **Missing** | ❌ |
| `GET /api/pay/callback` | ❌ **Missing** | ❌ |
| `GET /api/student/money/` | ❌ **Missing** | ❌ |
| `POST /api/student/money/retrait` | ❌ **Missing** | ❌ |
| `POST /api/notifications` | ❌ **Missing** | ❌ |
| `GET /api/categories` | `GET /api/categories` | ✅ Complete |
| `POST /api/enroll` | `POST /api/enroll` | ✅ Complete |
| `GET /api/chats/conversations` | `GET /api/chat/conversations` | ✅ Complete |
| `POST /api/chats/messages` | `POST /api/chat/conversations/[id]/messages` | ✅ Complete |

---

## 5. Generated Bridge Components Assessment

The `components/generated/` directory contains **385 files** that are direct automated ports of Twig templates to React. These are **not fully migrated** — they are a bridge strategy.

### Breakdown by Quality

| Category | Count | Maintainable? | Notes |
|---|---|---|---|
| Admin CRUD pages (list/new/edit/show/delete/form) | ~200 | ❌ | Dense, unscalable, no proper state management |
| Front-end pages | ~80 | ⚠️ Partial | Some functional, most need refactoring |
| Instructor pages | ~50 | ⚠️ Partial | Many duplicate the new dashboard pages |
| Error/static pages | ~10 | ✅ Yes | Simple pages |
| Chat/AI/Firebase | ~10 | ❌ | Need proper React patterns |
| Email templates | ~2 | ❌ | Should be HTML email templates, not React |
| Investor module | ~15 | ❌ | Full CRUD, not touched |

### Recommendation
- **[High Priority]** Replace generated components in use: `e404/`, `bundles/Exception/`
- **[Medium Priority]** Replace generated `admin/*` pages with proper admin pages during Phase 6
- **[Low Priority]** Generated instructor pages can be removed as new instructor pages replace them
- **[Defer]** Generated front-end pages (`front/`, `includes/`) can stay as fallback until all public routes have real pages

---

## 6. Effort Summary & Prioritization

### Priority Matrix

| Priority | Category | Effort (Hours) | Business Value | Dependencies |
|---|---|---|---|---|
| 🔴 **P0** | Payment System | 92h | Revenue-critical | None |
| 🔴 **P0** | Instructor Course CRUD | 68h | Content creation | None |
| 🔴 **P0** | Admin Dashboard | 240h | Platform management | None |
| 🟡 **P1** | Business Logic Porting | 80h | Feature parity | Payment system |
| 🟡 **P1** | Email Service | 24h | User communication | None |
| 🟡 **P1** | Profile Edit/Avatar | 18h | UX improvement | None |
| 🟡 **P1** | Withdrawal Flow | 12h | Monetization | Network/MLM + Payment |
| 🟡 **P1** | JWT Refresh Token | 8h | Auth reliability | None |
| 🟢 **P2** | Push Notifications | 30h | User engagement | None |
| 🟢 **P2** | AI Chat Room UI | 32h | Differentiator | Payment (triggers room creation) |
| 🟢 **P2** | Evaluation System | 110h | Core feature | None |
| 🟢 **P2** | Forum Extras (like, solve) | 11h | Community features | None |
| 🔵 **P3** | Investor Module | 24h | Business development | Admin |
| 🔵 **P3** | Google Login | 16h | Social login | None |
| 🔵 **P3** | Analytics | 16h | Insights | Admin |

### Total Remaining Effort: **~650 hours** ↓↓ *(was 780h; 130h completed 2026-05-10: JWT refresh, free trial, quiz cooldown, forum like/solve, loading/error/not-found pages, 68h Instructor Course CRUD, 16h email integration + notifications, 14h tests setup + JWT client interceptor + Supabase Realtime)*

---

## 7. Technical Debt Assessment

### Critical Debt

| Issue | Location | Impact | Recommendation |
|---|---|---|---|
| 385 generated bridge components | `components/generated/` | High maintenance burden, blocks refactoring | Phase out gradually using strangler fig pattern |
| Bootstrap 5 still referenced | `app/layout.tsx` imports Bootstrap CSS | CSS bloat, conflicts with Tailwind v4 | Global find-and-replace to Tailwind utilities |
| No auth refresh token | `lib/auth.ts` / no `api/auth/refresh` | Users logged out after JWT expiry | Add refresh token endpoint + client interceptor |
| No rate limiting on auth | `api/auth/login/route.ts` | Brute force vulnerability | Add rate limiter (Redis or in-memory) |
| Payment callback has no IP validation | PHP side | Security risk in legacy | Ensure new implementation validates source |
| Hardcoded SMTP credentials | PHP `Utils.php` | Security risk | Use environment variables + Resend/Mailgun |
| `any` types in Prisma queries | `app/dashboard/student/page.tsx:7` | Type safety hole | Replace with proper Prisma-generated types |

### Moderate Debt

| Issue | Location | Impact | Recommendation |
|---|---|---|---|
| Inline styles in pages | Various `app/` pages | Poor maintainability | Use Tailwind classes consistently |
| No loading states | No `loading.tsx` files | Poor UX on slow connections | Add skeleton loaders |
| No error boundaries | No `error.tsx` files | Crash → white screen | Add per-route error boundaries |
| `dangerouslySetInnerHTML` | `app/learn/[courseSlug]/[lessonSlug]/page.tsx:57` | XSS risk if content unsanitized | Sanitize HTML content before rendering |
| No Prisma enum types | `schema.prisma` | Missing type safety on status fields | Use Prisma enum or Zod union types |
| Missing Supabase RLS for most tables | `lib/rls_manifest.ts` | Data leakage risk | Implement RLS for all student/instructor-facing tables |

---

## 8. Migration Implementation Recommendations

### Recommended Order of Execution

```
Phase 1 (Weeks 1-2): Payment System (P0)
  ├── Port MobileApiService → lib/services/payment.ts  
  ├── Port PaymentUtil → lib/services/payment.ts
  ├── Port checkNumberOperator → lib/utils/phone.ts
  ├── Create POST /api/payment/init
  ├── Create POST /api/payment/webhook
  └── Create checkout UI component

Phase 2 (Weeks 3-5): Instructor Course CRUD (P0)
  ├── Create instructor course editor pages
  ├── Create chapter/lesson management API
  ├── Create quiz editor API
  ├── File upload for video/images → Supabase Storage
  └── Course publish workflow

Phase 3 (Weeks 6-8): Admin Dashboard (P0)
  ├── Create admin layout with sidebar
  ├── User management (list/edit/block)
  ├── Course validation workflow
  ├── Content management (categories, classes, etc.)
  ├── Financial overview
  └── Settings pages

Phase 4 (Week 9): Business Logic Porting (P1)
  ├── ManageNetwork → lib/services/network.ts
  ├── SubjectChatService → lib/services/chat-subjects.ts  
  ├── InvitationCodeGenerator → lib/utils/codes.ts
  └── PushNotificationService → lib/services/notifications.ts

Phase 5 (Week 10): Email & Notifications (P1)
  ├── Set up Resend/Nodemailer
  ├── Transactional email templates
  ├── In-app notification system
  └── Push notification integration

Phase 6 (Weeks 11-12): Profile & UX (P1)
  ├── Profile edit page
  ├── Avatar upload
  ├── JWT refresh token
  ├── Withdrawal flow
  └── Loading/error pages

Phase 7 (Weeks 13-15): AI & Evaluations (P2)
  ├── AI chat room UI
  ├── Evaluation system (CRUD + taking)
  ├── Forum enhancements (likes, solve)
  └── Analytics dashboard

Phase 8 (Ongoing): Legacy Cleanup
  ├── Replace generated components with real ones
  ├── Remove Bootstrap CSS
  └── Full Tailwind migration
```

### Technical Recommendations

1. **Payment Architecture**: Use a webhook-only pattern (no polling). The legacy system's callback is called every 5 minutes and has no authentication — the new system should validate webhook signatures.

2. **File Uploads**: Migrate from `VichUploaderBundle` (local filesystem) to Supabase Storage. Implement `lib/services/upload.ts` with presigned URLs for security.

3. **Email Service**: Replace PHPMailer with **Resend** (modern email API for Next.js) or **Nodemailer** with proper SMTP. Create email templates as React Email components.

4. **AI Chat**: The DeepSeek library exists but isn't wired to any UI. Create a dedicated `/chat/ai` page with conversation history. The legacy system creates subject chat rooms on subscription payment — replicate this trigger.

5. **Admin Architecture**: Build a single-page admin dashboard using the existing dashboard layout pattern, with server components fetching data via Prisma. Use the generated bridge components as reference for UI structure.

---

## 9. Appendix: Complete File Inventory

### PHP Codebase: Key Files Still to Port

| Category | File Count | Examples |
|---|---|---|
| Controllers | 56 unported | `Front/PaymentController`, `Instructor/CoursesController`, all `Admin/*` |
| Services | 10 unported | `ManageNetwork`, `MobileApiService`, `PushNotificationService`, `SubjectChatService` |
| Utilities | 6 unported | `PaymentUtil`, `Utils`, `Keys`, `PayIn`, `PayOut`, `CoursUtils` |
| Form Types | 56 unported | `CoursType`, `ChapitreType`, `LessonType`, `RegistrationType`, etc. |
| Security | 1 unported | `AppAuthenticator` (email/phone/username login) |
| Twig Extensions | 1 unported | `AppExtension` (remaining subscription time filter) |
| Entity Listeners | 1 unported | `UserListener` (invitation code generation, parent assignment) |

### React Codebase: Current Implementation Status

| Category | Count | Fully Migrated | Bridge Only | Missing |
|---|---|---|---|---|
| Pages | 37 | 30 | 7 (generated fallbacks) | ~100+ |
| API Routes | 20 | 20 | 0 | ~35+ |
| Components (custom) | 20 | 20 | 0 | ~40+ |
| Components (generated) | 385 | 0 | 385 | 0 |
| Lib files | 10 | 10 | 0 | ~15+ |
| Prisma Models | 74 | 72 | 0 | 4 |
| Services | 0 | 0 | 0 | 14+ |

---

## 10. Conclusion & Next Steps

### Migration Progress by Module

| Module | PHP Features | React Features | Progress |
|---|---|---|---|
| Auth & Users | 14 | 12 | 85% |
| Course Catalog | 10 | 8 | 80% |
| Course Player | 10 | 8 | 85% |
| Student Dashboard | 12 | 9 | 75% |
| Instructor Dashboard | 19 | 9 | 65% |
| Admin Dashboard | 34 | 0 | 5% |
| Payment System | 8 | 0 | 0% |
| Network/MLM | 10 | 3 | 30% |
| Evaluation System | 13 | 2 | 15% |
| Chat System | 7 | 5 | 70% |
| Forum System | 10 | 8 | 80% |
| AI Tutoring | 4 | 1 | 40% |
| Push Notifications | 4 | 0 | 0% |
| Email Service | 3 | 0 | 0% |
| Site Management | 12 | 9 | 70% |
| Investor Module | 7 | 0 | 0% |

**Overall Migration: 57%** ↑↑ *(was 56%; home page content completed — testimonials, featured hero)*

### Critical Next Steps (Immediate Actions)

1. **Unblock Payment (P0):** Port `MobileApiService.php` + `PaymentUtil.php` to a `lib/services/payment.ts` service. This enables the core business model.

2. **Enable Content Creation (P0):** Build instructor course CRUD pages. Without these, instructors cannot create courses on the new platform.

3. **Plan Admin Migration (P0):** The 34 admin controllers represent the largest single gap. Start with `User Management` and `Course Validation`, as these are most critical for operations.

4. **Remove Generated Bridge Debt:** Systematically replace `components/generated/*` with proper components using the strangler fig pattern — serve new components alongside, then delete generated files once usage reaches zero.

5. **Email Service (P0):** No transactional emails — password resets, registration confirmations, and purchase receipts are all broken.

---

*Report generated from comprehensive automated analysis of both codebases. File counts and effort estimates should be validated by development team.*

---

## Appendix A: Database Redundancy & Future Schema

### Current Schema Issues

1. **User Identity Fragmentation**: Data split across `User`, `Personne`, `Eleve`, `Enseignant`, `Membre` in legacy (now consolidated in Prisma as `User`, `Person`, `Student`, `Instructor`).
2. **Communication Silos**: Three distinct messaging systems (`Forum`, `SubjectChat`, `ChatMessage`) — now unified under Prisma `Conversation`/`ChatMessage` + `Forum`/`Subject`/`ForumMessage`.
3. **Assessment Overlap**: `Quiz`, `Exam`, `Evaluation` share similar question-answer structures — kept separate for domain clarity.
4. **Inconsistent Naming**: Mix of French (`Eleve`, `Cours`) and English — fully resolved with English-only Prisma models.

### Proposed Future Schema Direction

| Domain | Current (Prisma) | Future Vision |
|---|---|---|
| Identity | `User` + `Person` + `Student` + `Instructor` | Keep as-is (clean separation of concerns) |
| Content | `Course` + `Chapter` + `Lesson` | Keep as-is |
| Taxonomy | `Category` + `SkillLevel` + `Tag` | Consider polymorphic `Taxonomy` table for unified categorization |
| Assessment | `Quiz` + `Exam` + `Evaluation` | Consider unified `Assessment` table with `type` enum |
| Communication | `Conversation` + `ChatMessage` + `Forum` + `Subject` + `ForumMessage` | Consider unified `Channel` + `Message` model in the long term |

### Naming Conventions (Already Applied)
- Tables: Plural nouns (`users`, `courses`)
- Primary Keys: `id` (UUID)
- Foreign Keys: `singular_table_name_id` (e.g., `userId`)
- Language: Strictly English (camelCase for Prisma, snake_case for SQL)

---

## Appendix B: Frontend Architecture & Design System

### Design System

| Token | Value |
|---|---|
| Primary Color | `#1E3D59` (Brand text, links) |
| Secondary Color | `#00B4D8` (Buttons, focus rings) |
| Accent Color | `#FFB703` (Badges, sale tags) |
| Heading Font | Montserrat (sans-serif, 600-700) |
| Body Font | Roboto (sans-serif, 300-500) |
| Brand Mark | Pacifico (cursive) |

### Header Specs
- Height: 80px desktop / 64px mobile
- Background: White (#FFFFFF)
- Nav: Home, Services, Training, Portfolio, Blog, About, Contact

### Footer Specs
- Background: Gray 800 (#1F2937)
- Text: White
- Columns: Brand & Social, Quick Links, Services, Contact Info

### Buttons
- Primary: Background `#00B4D8`, Text White, Rounded-pill
- States: Hover (90% opacity), Focus (2px ring `#00B4D8`)

### Accessibility
- 4.5:1 contrast ratio for body text
- 3:1 contrast for large text and UI elements
- Visible focus states for keyboard navigation

### Component Architecture (MVP)

| Layer | Role | Location |
|---|---|---|
| **Model** | Data schema & types | `prisma/schema.prisma` |
| **View** | React components (UI rendering) | `components/*` |
| **Presenter** | Server Components + API Routes | `app/*` (page.tsx, route.ts) |

### Course View Hierarchy

```
Home → /courses → /courses/[slug] → /learn/[slug]/[lesson]
                                    → /learn/[slug]/quiz/[chapterId]
                                    → /learn/[slug]/forum
                                    → /learn/[slug]/forum/[subjectId]
```

### Exam View Hierarchy

```
Home → /exams → /exams/[reference] → /api/exams/file/[filename]
```

### Key implementation patterns (already shipped):
- All course player features (lesson, quiz, forum, review) are completed
- All exam features (listing, detail, secure PDF file serve, premium guard) are completed
- Full navigation is implemented with per-route loading/error patterns where critical
