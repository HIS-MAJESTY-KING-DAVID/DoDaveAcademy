import enCommon from '../locales/en/common.json';
import frCommon from '../locales/fr/common.json';
import runtimeFrench from '../locales/fr/runtime.json';

function flattenStrings(value: unknown, output: Record<string, string> = {}) {
  if (!value || typeof value !== 'object') return output;
  for (const [key, child] of Object.entries(value)) {
    if (typeof child === 'string') output[key] = child;
    else flattenStrings(child, output);
  }
  return output;
}

const englishByKey = flattenStrings(enCommon);
const frenchByKey = flattenStrings(frCommon);

export const localeTextMap: Record<string, string> = Object.entries(englishByKey).reduce((map, [key, english]) => {
  const french = frenchByKey[key];
  if (french && french !== english) map[english] = french;
  return map;
}, {} as Record<string, string>);

Object.assign(localeTextMap, runtimeFrench);

export const frenchToEnglish: Record<string, string> = Object.entries(localeTextMap).reduce((map, [english, french]) => { map[french] = english; return map; }, {} as Record<string, string>);

Object.assign(localeTextMap, {
  'Something went wrong': 'Une erreur est survenue',
  'Try Again': 'Réessayer',
  'Skip to main content': 'Passer au contenu principal',
  'Loading...': 'Chargement...',
  'Loading DoDave Academy...': 'Chargement de DoDave Academy...',
  'Page Not Found': 'Page introuvable',
  'The page you are looking for does not exist or has been moved.': 'La page que vous recherchez n’existe pas ou a été déplacée.',
  'Back to Home': 'Retour à l’accueil',
  'Our Goal:': 'Notre objectif :',
  'Admin Panel': 'Panneau d’administration',
  'Back to Dashboard': 'Retour au tableau de bord',
  'Search course': 'Rechercher un cours',
  'No courses found matching your criteria.': 'Aucun cours ne correspond à vos critères.',
  'Clear Filters': 'Effacer les filtres',
  'No exams found with the selected filters.': 'Aucun examen ne correspond aux filtres sélectionnés.',
  'No FAQs available yet. Check back soon!': 'Aucune FAQ disponible pour le moment. Revenez bientôt !',
  'No discussions yet. Be the first to start a conversation!': 'Aucune discussion pour le moment. Soyez le premier à lancer une conversation !',
  'Browse Courses': 'Parcourir les cours',
  'No subscription plans available yet. Check back soon!': 'Aucun abonnement disponible pour le moment. Revenez bientôt !',
  'No programs available yet. Check back soon!': 'Aucun programme disponible pour le moment. Revenez bientôt !',
  'Community Forum': 'Forum communautaire',
  'Join the discussion with other students and instructors': 'Échangez avec d’autres étudiants et enseignants',
  'Frequently Asked Questions': 'Foire aux questions',
  'Subscription Plans': 'Formules d’abonnement',
  'Choose the best plan for your learning journey': 'Choisissez la meilleure formule pour votre parcours d’apprentissage',
  'Programs': 'Programmes',
  'Explore our comprehensive learning programs': 'Découvrez nos programmes de formation complets',
  'Complete enrollment to start learning at DoDave Academy.': 'Finalisez votre inscription pour commencer à apprendre à DoDave Academy.',
  'Information we collect': 'Informations que nous collectons',
  'How we use information': 'Comment nous utilisons vos informations',
  'Your choices': 'Vos choix',
  'Updates': 'Mises à jour',
  'Contact page': 'page de contact',
  'Contact us': 'Contactez-nous',
  'We\'re here to help!': 'Nous sommes là pour vous aider !',
  'Let\'s talk': 'Parlons-en',
  'Message sent successfully!': 'Message envoyé avec succès !',
  'Failed to send message. Please try again.': 'Échec de l’envoi du message. Veuillez réessayer.',
  'Welcome Back': 'Bon retour',
  'New here?': 'Nouveau ici ?',
  'Create an account': 'Créer un compte',
  'Email Address': 'Adresse e-mail',
  'Password': 'Mot de passe',
  'Remember me': 'Se souvenir de moi',
  'Forgot Password?': 'Mot de passe oublié ?',
  'Or sign in with': 'Ou connectez-vous avec',
  'My Learning': 'Mon apprentissage',
  'My Courses': 'Mes cours',
  'My Network': 'Mon réseau',
  'My Evaluations': 'Mes évaluations',
  'My Payments': 'Mes paiements',
  'Notifications': 'Notifications',
  'Profile': 'Profil',
  'Sign Out': 'Se déconnecter',
  'No notifications yet.': 'Aucune notification pour le moment.',
  'No reviews yet.': 'Aucun avis pour le moment.',
  'No orders yet.': 'Aucune commande pour le moment.',
  'No questions in this quiz.': 'Aucune question dans ce quiz.',
  'Discussion Forum': 'Forum de discussion',
  'Quiz': 'Quiz',
  'Description': 'Description',
  'Course content': 'Contenu du cours',
  'Course Description': 'Description du cours',
  'Curriculum': 'Programme',
  'Reviews': 'Avis',
  'Enroll Now': 'S’inscrire maintenant',
  'Add to Cart': 'Ajouter au panier',
  'Free': 'Gratuit',
  'Paid': 'Payant',
  'Lessons': 'Leçons',
  'Duration': 'Durée',
  'Language': 'Langue',
  'Category': 'Catégorie',
  'Level': 'Niveau',
  'Save': 'Enregistrer',
  'Cancel': 'Annuler',
  'Delete': 'Supprimer',
  'Edit': 'Modifier',
  'Back': 'Retour',
  'Submit': 'Soumettre',
  'Continue': 'Continuer',
  'Next': 'Suivant',
  'Previous': 'Précédent',
  'Search': 'Rechercher',
  'Apply Filters': 'Appliquer les filtres',
  'Reset': 'Réinitialiser',
  'Open Exam': 'Ouvrir l’examen',
  'Exam not found.': 'Examen introuvable.',
  'Premium access is required to view this exam.': 'Un abonnement Premium est requis pour consulter cet examen.',
  'Upgrade your plan': 'Mettre à niveau votre formule',
});

Object.entries(localeTextMap).forEach(([english, french]) => { frenchToEnglish[french] = english; });

Object.assign(frenchToEnglish, {
  'S\'ABONNER': 'Subscribe',
  'Voir tous nos cours': 'View all courses',
  'Mes subscriptions': 'My subscriptions',
  'Mes cours': 'My courses',
  'Mes paiements': 'My payments',
  'Mes évaluations': 'My evaluations',
  'Mon réseau': 'My network',
  'Mon profile': 'My profile',
  'Discuter avec nos profs': 'Chat with our teachers',
  'Se déconnecter': 'Sign out',
});
