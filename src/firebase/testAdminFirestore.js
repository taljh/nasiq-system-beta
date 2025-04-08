// اختبار إنشاء مستند تجريبي في Firestore باستخدام Admin SDK
const admin = require('firebase-admin');
const serviceAccount = require('../../firebase-service-account.json');

// تهيئة Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// دالة لإضافة مستند تجريبي إلى Firestore
async function addTestDocument() {
  try {
    const docRef = await db.collection('nasiq_products').add({
      name: "عباية كلاسيكية",
      description: "عباية كلاسيكية بتصميم أنيق مناسبة للمناسبات الرسمية",
      price: 450,
      category: "كلاسيك",
      color: "أسود",
      size: ["S", "M", "L", "XL"],
      inStock: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
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
    const snapshot = await db.collection('nasiq_products').limit(10).get();
    const documents = [];
    snapshot.forEach(doc => {
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
    console.log("بدء اختبار إنشاء مستند تجريبي في Firestore باستخدام Admin SDK...");
    
    // إضافة مستند تجريبي
    const docId = await addTestDocument();
    
    // قراءة المستندات
    const docs = await getTestDocuments();
    
    console.log("تم اكتمال اختبار إنشاء مستند تجريبي في Firestore بنجاح!");
    console.log(`تم إنشاء مستند جديد بالمعرف: ${docId}`);
    console.log(`عدد المستندات المسترجعة: ${docs.length}`);
    
    // طباعة تفاصيل المستندات
    console.log("تفاصيل المستندات:");
    docs.forEach((doc, index) => {
      console.log(`مستند ${index + 1}:`);
      console.log(JSON.stringify(doc, null, 2));
    });
    
    return { success: true, docId, docsCount: docs.length, documents: docs };
  } catch (error) {
    console.error("فشل اختبار إنشاء مستند تجريبي في Firestore:", error);
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
