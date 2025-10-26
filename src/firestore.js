import { db } from './firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// Function to save resume data for a logged-in user
export const saveResumeData = async (userId, resumeData) => {
  try {
    await addDoc(collection(db, 'resumes'), {
      userId,
      ...resumeData,
      createdAt: new Date(),
    });
    console.log('Resume data saved successfully');
  } catch (error) {
    console.error('Error saving resume data: ', error);
  }
};

// Function to get all resumes for a logged-in user
export const getUserResumes = async (userId) => {
  try {
    const q = query(collection(db, 'resumes'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const resumes = [];
    querySnapshot.forEach((doc) => {
      resumes.push({ id: doc.id, ...doc.data() });
    });
    return resumes;
  } catch (error) {
    console.error('Error getting user resumes: ', error);
    return [];
  }
};
