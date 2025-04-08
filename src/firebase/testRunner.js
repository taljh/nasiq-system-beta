// اختبار الاتصال بـ Firestore
import { db } from '../firebase/config.js';
import { collection, addDoc, getDocs, query, limit } from 'firebase/firestore';

// استدعاء الدالة الرئيسية عند تنفيذ الملف
async function runTest() {
  try {
    console.log("بدء اختبار الاتصال بـ Firestore...");
    
    // إضافة مستند تجريبي
    const docId = await addTestDocument();
    console.log("تم إنشاء المستند بنجاح، المعرف:", docId);
    
    // قراءة المستندات
    const docs = await getTestDocuments();
    console.log("تم استرجاع المستندات:", docs.length);
    
    console.log("تم اكتمال اختبار الاتصال بـ Firestore بنجاح!");
    return { success: true, docId, docsCount: docs.length };
  } catch (error) {
    console.error("فشل اختبار الاتصال بـ Firestore:", error);
    return { success: false, error: error.message };
  }
}

// دالة لإضافة مستند تجريبي إلى Firestore
async function addTestDocument() {
  try {
    const docRef = await addDoc(collection(db, "test_collection"), {
      name: "مستند تجريبي",
      description: "هذا مستند تجريبي لاختبار الاتصال بـ Firestore",
      timestamp: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("خطأ في إضافة المستند:", error);
    throw error;
  }
}

// دالة لقراءة المستندات من Firestore
async function getTestDocuments() {
  try {
    const q = query(collection(db, "test_collection"), limit(10));
    const querySnapshot = await getDocs(q);
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return documents;
  } catch (error) {
    console.error("خطأ في قراءة المستندات:", error);
    throw error;
  }
}

// تصدير الدوال للاستخدام في أماكن أخرى
export { runTest, addTestDocument, getTestDocuments };

// تنفيذ الاختبار إذا تم استدعاء الملف مباشرة
if (typeof window !== 'undefined') {
  runTest();
}
