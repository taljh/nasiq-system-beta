// اختبار الاتصال بـ Firestore
import { db } from './config';
import { collection, addDoc, getDocs, query, limit } from 'firebase/firestore';

// دالة لإضافة مستند تجريبي إلى Firestore
export const addTestDocument = async () => {
  try {
    const docRef = await addDoc(collection(db, "test_collection"), {
      name: "مستند تجريبي",
      description: "هذا مستند تجريبي لاختبار الاتصال بـ Firestore",
      timestamp: new Date()
    });
    console.log("تم إضافة المستند بنجاح بالمعرف:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("خطأ في إضافة المستند:", error);
    throw error;
  }
};

// دالة لقراءة المستندات من Firestore
export const getTestDocuments = async () => {
  try {
    const q = query(collection(db, "test_collection"), limit(10));
    const querySnapshot = await getDocs(q);
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    console.log("تم استرجاع المستندات بنجاح:", documents);
    return documents;
  } catch (error) {
    console.error("خطأ في قراءة المستندات:", error);
    throw error;
  }
};
