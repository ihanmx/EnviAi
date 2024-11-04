import { db } from '../config/firebase'; 
import { collection, addDoc, setDoc, getDocs, doc, writeBatch } from 'firebase/firestore';
import { productData } from '../productData'; 

// Fetch products from Firestore
export const fetchProducts = async () => {
  const snapshot = await getDocs(collection(db, 'newProducts'));
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return products;
};

// Add or update a product in Firestore
export const updateProduct = async (productId, productData) => {
  await setDoc(doc(db, 'newProducts', productId), productData, { merge: true });
};

// Add a new product
export const addProduct = async (productData) => {
  const docRef = await addDoc(collection(db, 'newProducts'), productData);
  console.log("Product added with ID:", docRef.id); 
  return docRef.id; 
};

//--------------------------------------------------------------------------

export const fetchProductTypes = async () => {
  try {
    const productTypesCollection = collection(db, "ProductType");
    const productSnapshot = await getDocs(productTypesCollection);
    
    console.log("Fetched product types snapshot:", productSnapshot); // Log the snapshot

    const productList = productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Product list:", productList); // Log the product list

    return productList;
  } catch (error) {
    console.error("Error fetching product types:", error);
    return [];
  }
};

// Add a new product type
export const addProductType = async (productTypeData) => {
  const docRef = await addDoc(collection(db, 'ProductType'), productTypeData);
  return docRef.id; // Return the new product type ID
};

// Update a product type in Firestore
export const updateProductType = async (productTypeId, productTypeData) => {
  await setDoc(doc(db, 'ProductType', productTypeId), productTypeData, { merge: true });
};

// Save multiple product types to Firestore
export const saveProductTypes = async (productTypes) => {
  try {
    const batch = writeBatch(db); 
    productTypes.forEach((type) => {
      const docRef = doc(db, 'ProductType', type.id); 
      batch.set(docRef, type); 
    });
    await batch.commit(); 
  } catch (error) {
    console.error('Error saving product types: ', error);
  }
};

export const initialProductTypes = [
  { type: "BagType", title: "Fabric shopping bags", price: "20 SR", imageUrl: "URL_TO_BAG_IMAGE" },
  { type: "TshirtType", title: "Plain T-shirt", price: "25 SR", imageUrl: "URL_TO_TSHIRT_IMAGE" },
  { type: "NoteBookType", title: "Recycled notebooks", price: "15 SR", imageUrl: "URL_TO_NOTEBOOK_IMAGE" },
  { type: "PhoneCaseType", title: "Phone cases", price: "30 SR", imageUrl: "URL_TO_PHONECASE_IMAGE" },
  { type: "CupsType", title: "Heat preservation mugs", price: "10 SR", imageUrl: "URL_TO_CUP_IMAGE" },
  { type: "FoodBoxType", title: "Lunch boxes", price: "15 SR", imageUrl: "URL_TO_FOODBOX_IMAGE" },
];

export async function initializeProductTypes() {
  const productCollectionRef = collection(db, "ProductType");

  try {
    // Check if any documents already exist in "ProductType" collection
    const existingDocs = await getDocs(productCollectionRef);
    if (existingDocs.size === 0) {
      // Add initial products only if collection is empty
      for (const product of initialProductTypes) {
        await addDoc(productCollectionRef, product);
        console.log(`Added ${product.type} to Firestore`);
      }
    } else {
      console.log("Product types already initialized in Firestore");
    }
  } catch (error) {
    console.error("Error initializing product types:", error);
  }
}
//-----------------------------------


// Function to initialize product types in Firestore
export const initializeProducts = async () => {
  // Define the products to add here
  const productsToAdd = [
    { type: "BagType", price: "20 SR" },
    { type: "TshirtType", price: "25 SR" },
    { type: "NoteBookType", price: "15 SR" },
    { type: "PhoneCaseType", price: "30 SR" },
    { type: "CupsType", price: "10 SR" },
    { type: "FoodBoxType", price: "15 SR" },
  ];

  // Reference to the Firestore collection
  const productCollectionRef = collection(db, "products");

  // Loop through the productsToAdd array and add each product to Firestore
  for (const product of productsToAdd) {
    try {
      await addDoc(productCollectionRef, product);
      console.log(`Added ${product.type} to Firestore`);
    } catch (error) {
      console.error("Error adding product to Firestore: ", error);
    }
  }
};

// Function to add a product and retrieve output from newProducts collection
const addProducts = async (productId) => {
  const productDocRef = doc(db, "newProducts", productId); // Reference to document in newProducts
  console.log("Fetching product:", productId); // Log the product ID

  try {
    const productDoc = await getDocs(productDocRef); // Fetch the document from newProducts

    if (productDoc.exists()) {
      const productData = productDoc.data(); // Get data from the fetched document
      const newProductDocRef = doc(db, "products", productId); // Reference to where the product should be added

      await setDoc(newProductDocRef, productData); // Set document in the products collection
      console.log(`Product added to products: ${productData.type}`);
    } else {
      console.log("No such product in newProducts");
    }
  } catch (error) {
    console.error("Error adding product: ", error);
  }
};
