import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import {collection,addDoc} from "@firebase/firestore";
import { fireStore} from '../firebase';

const DonorForm = ({setLoading}) => {
    const ref = collection(fireStore, "donors");
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const donorData = {
          name: document.getElementById("Name").value,
          phone: document.getElementById("Phone").value,
          location: document.getElementById("location").value,
          bloodType: document.querySelector("select").value,
          sex: document.querySelector('input[name="Sex"]:checked').id, 
        };
    
        try {
          await addDoc(ref, donorData);
          alert("Donor data submitted successfully!");
          setTimeout(()=>{window.location.reload()} , 500)
        } catch (error) {
          console.error("Error adding document: ", error);
        }
        setLoading(false);
      };
    
    return (
        <div className="container d-flex justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                الأسم الثلاثي
              </label>
              <input type="text" className="form-control" id="Name" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="Phone" className="form-label">
                رقم الهاتف
              </label>
              <input type="text" className="form-control" id="Phone" required />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                المنطقة
              </label>
              <input type="text" className="form-control" id="location" required />
            </div>
            <div className="mb-3">
              <label htmlFor="BloodType" className="form-label">
                فئة الدم
              </label>
              <select className="form-select" defaultValue="A+" required>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="mb-3 d-flex justify-content-center align-items-center gap-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Sex"
                  id="Male"
                />
                <label className="form-check-label" htmlFor="Male">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Sex"
                  id="Female"
                  defaultChecked=""
                />
                <label className="form-check-label" htmlFor="Female">
                  Female
                </label>
              </div>
            </div>

            <div className="mb-3">
              <p dir="rtl" className="fs-3 text-center">
                تأكد من تحقق الشروط التالية:
              </p>
              <ul
                className="d-flex flex-column text-end lead fs-6"
                dir="rtl"
              >
                <li>
                  أن يكون المتبرع بصحة جيدة بدون أمراض مزمنة كضغط وسُكر
                </li>
                <li>وزنه اكثر من 50 كيلوغرام</li>
                <li>عمره اكثر من ١٨ سنة وأقل من 65 سنة</li>
                <li>درجة حرارته طبيعية</li>
                <li>نسبة الهيموغلوبين أعلى من 12,5</li>
                <li>دقات قلبه طبيعية من 70-120</li>
                <li>ضغط دمه طبيعي 60/110 | 90/140</li>
                <li>غير متعرض لصدمة</li>
              </ul>
            </div>

            <button type="submit" className="btn btn-primary mb-3">
              تسليم
            </button>
          </form>
        </div>
      )
}

export default DonorForm