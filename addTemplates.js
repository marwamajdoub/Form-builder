// src/addTemplates.js
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const templates = [
  {
    title: "Formulaire Vos Coordonnées",
    description: "Un formulaire pour recueillir les coordonnées des utilisateurs.",
    questions: [
      { type: "text", label: "Nom" },
      { type: "text", label: "Prénom" },
      { type: "email", label: "Email" }
    ]
  },
  {
    title: "Feedback Form",
    description: "Un formulaire pour recueillir les retours des utilisateurs.",
    questions: [
      { type: "rating", label: "Notez votre expérience" },
      { type: "text", label: "Commentaires" }
    ]
  }
];

const addTemplatesToFirestore = async () => {
  try {
    const templatesRef = collection(db, 'templates');
    for (const template of templates) {
      await addDoc(templatesRef, template);
    }
    console.log('Templates added successfully');
  } catch (error) {
    console.error('Error adding templates: ', error);
  }
};

addTemplatesToFirestore();
