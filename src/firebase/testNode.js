// اختبار الاتصال بـ Firestore باستخدام Node.js
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, query, limit } = require('firebase/firestore');

// تكوين Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB_-bwvuPyZv_3T6BLeLWhikH7tF8IVfNE",
  authDomain: "nasiq-system-beta.firebaseapp.com",
  projectId: "nasiq-system-beta",
  storageBucket: "nasiq-system-beta.firebasestorage.app",
  messagingSenderId: "657435092392",
  appId: "1:657435092392:web:526bfe992e4e70ee53a99d",
  measurementId: "G-GM5CEP0HRM"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// دالة لإضافة مستند تجريبي إلى Firestore
async function addTestDocument() {
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
    console.log("تم استرجاع المستندات بنجاح:", documents);
    return documents;
  } catch (error) {
    console.error("خطأ في قراءة المستندات:", error);
    throw error;
  }
}

// تنفيذ الاختبار
async function runTest() {
  try {
    console.log("بدء اختبار الاتصال بـ Firestore...");
    
    // إضافة مستند تجريبي
    const docId = await addTestDocument();
    
    // قراءة المستندات
    const docs = await getTestDocuments();
    
    console.log("تم اكتمال اختبار الاتصال بـ Firestore بنجاح!");
    console.log(`تم إنشاء مستند جديد بالمعرف: ${docId}`);
    console.log(`عدد المستندات المسترجعة: ${docs.length}`);
    
    return { success: true, docId, docsCount: docs.length };
  } catch (error) {
    console.error("فشل اختبار الاتصال بـ Firestore:", error);
    return { success: false, error: error.message };
  }
}

// تنفيذ الاختبار
runTest()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("حدث خطأ أثناء تنفيذ الاختبار:", error);
    process.exit(1);
  });
