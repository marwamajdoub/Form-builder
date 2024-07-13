import { db } from '@/firebase';  
import { collection, addDoc } from "firebase/firestore";

export const saveForm = async (form) => {
    try {
        const docRef = await addDoc(collection(db, "forms"), form);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
};
