
// Importar las funciones necesarias de los SDK que se necesiten


import { getFirestore, collection,addDoc,getDocs  } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
 export const separarFechaHora=(entrada)=> {
    var partes = entrada.split(" ");
    var dia = partes[0];
    var mes = partes[2];
    var año = partes[4];
    var hora = partes[5];

    return {
        mes: mes,
        dia: dia,
        año: año,
        hora: hora
    };
}
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDiaTR7vehKdCH3g3qg0A955ISU6Ge3f6Y",
  authDomain: "jovenes-teen-calendar.firebaseapp.com",
  projectId: "jovenes-teen-calendar",
  storageBucket: "jovenes-teen-calendar.appspot.com",
  messagingSenderId: "296381667925",
  appId: "1:296381667925:web:e17b9dc68c6841f42952dc"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Método para guardar datos en una colección
// Método para guardar datos en una colección
export const saveFecha = async (fecha, titulo, descripcion) => {
    try {
      const docRef = await addDoc(collection(db, "fecha"), {
        fecha: fecha,
        titulo: titulo,
        descripcion: descripcion
      });
      console.log("Documento guardado con ID:", docRef.id);
    } catch (error) {
      console.error("Error al guardar el documento:", error);
    }
  };

  export const getAllFechas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "fecha"));
      const fechas = querySnapshot.docs.map((doc) => doc.data());
      return fechas;
    } catch (error) {
      console.error("Error al obtener las fechas:", error);
      throw error;
    }
  };
  




