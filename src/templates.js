import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

async function addTemplates() {
  const templatesCollection = collection(db, 'templates');

  const templates = [
    {
      name: 'Formulaire Vos Coordonnées',
      description: 'Un formulaire pour collecter les coordonnées des utilisateurs',
      questions: [
        { type: 'text', label: 'Nom', required: true },
        { type: 'email', label: 'Email', required: true },
        { type: 'text', label: 'Téléphone', required: false }
      ]
    },
    {
      name: 'Feedback Form',
      description: 'Un formulaire pour recueillir des retours d\'utilisateurs',
      questions: [
        { type: 'text', label: 'Nom', required: false },
        { type: 'email', label: 'Email', required: false },
        { type: 'textarea', label: 'Commentaires', required: true }
      ]
    }
  ];

  for (const template of templates) {
    await addDoc(templatesCollection, template);
  }

  console.log('Templates ajoutés avec succès.');
}

addTemplates();
