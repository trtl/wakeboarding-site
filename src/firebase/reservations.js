import { doc, getDoc, setDoc, addDoc, collection, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { getAuth } from "firebase/auth";

export const getReservedSlots = async (date) => {
  try {
    const docRef = doc(db, "reservations", date);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().timeInterval || [];
    }
    
    // Don't create document, just return empty array
    return [];
    
  } catch (error) {
    console.error("Error fetching reserved slots:", error);
    return [];
  }
};



export const reserveTimeSlots = async (date, slots, userInfo) => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  try {
    // Create booking document
    const bookingRef = await addDoc(collection(db, "bookings"), {
      ...userInfo,
      date,
      timeInterval: slots,
      userId: userId, // Add user ID to booking
      createdAt: new Date(),
      isAnonymous: userInfo.isAnonymous,
    });

    // Update reservations document
    const reservationRef = doc(db, "reservations", date);
    await setDoc(reservationRef, { 
      timeInterval: slots 
    }, { merge: true });

    // Update user's bookings array
    if (userId) {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        bookings: arrayUnion(bookingRef.id)
      });
    }

    return bookingRef.id;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};