import { useState ,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { fireStore } from './firebase';
import {collection, getDocs } from "@firebase/firestore";
import  DonorForm from './components/DonorForm'
import DonorsSearch from './components/DonorsSearch'
import Footer from './components/Footer'
import Loading from './components/Loading'
import Header from "./components/Header";
function App() {
  const [activeTab, setActiveTab] = useState("Tab1");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const ref = collection(fireStore, "donors");
  useEffect(() => {
    const fetchAllDonors = async () => {
      try {
        setLoading(true)
        const querySnapshot = await getDocs(ref);
        const allDonors = querySnapshot.docs.map((doc) => doc.data());
        setUsers(allDonors);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching all donors: ", error);
      }
    };
    fetchAllDonors(); 
  }, [])
 
  return(
    <>
    <h1 className="text-center mt-5">Tabaraa | تبرّع</h1>
    <p className="text-center mt-3 mb-5 mx-5 lead">
      منصة تبرّع للتبرع بالدم لخدمة المستشفيات والجرحى بشكل منظّم
    </p><hr className="w-50 mx-auto"/>
    <main style={{ marginTop: "20px" }} className="text-center">  
      <Header activeTab={activeTab} setActiveTab={setActiveTab}/>   
      {Loading===true?<Loading/>:activeTab === "Tab1"?<DonorForm setLoading={setLoading}/>:<DonorsSearch users={users} setUsers={setUsers} />}
      <Footer/>
    </main>
    </>
  )
}

export default App;
