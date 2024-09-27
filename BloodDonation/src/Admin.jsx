import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { fireStore } from "./firebase";
import { addDoc, collection } from "@firebase/firestore";

function Admin() {
  const [hospital, setHospital] = useState("");
  const [region, setRegion] = useState("");
  const [bloodType, setBloodType] = useState("All");
  const [bloodUnits, setBloodUnits] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const hospitals = [
    { name: "مستشفى ابو جودة", phone: "01-718000" },
    { name: "مستشفى الجامعة الاميركية", phone: "01-354911" },
    { name: "مستشفى الأرز", phone: "01-885500" },
    { name: "مستشفى بهمن", phone: "01-558555" },
    { name: "مستشفى بيضون", phone: "01-350993" },
    { name: "مستشفى الحكومي بيروت", phone: "01-850213" },
    { name: "مستشفى الكرنتينا بيروت", phone: "01-442108" },
    { name: "مستشفى بخعازي", phone: "01-360890" },
    { name: "مستشفى بحنس", phone: "04-982772" },
    { name: "مستشفى الام والطفل", phone: "01-818272" },
    { name: "مستشفى العين والاذن الدولي", phone: "04-521130" },
    { name: "مستشفى فؤاد خوري", phone: "01-742140" },
    { name: "مستشفى الجعيتاوي", phone: "01-584030" },
    { name: "مستشفى غريّب", phone: "01-632385" },
    { name: "مستشفى غصن", phone: "05-450769" },
    { name: "مستشفى هارون", phone: "01-897300" },
    { name: "مستشفى الحياة", phone: "01-546200" },
    { name: "مستشفى حيدر", phone: "01-632360" },
    { name: "مستشفى حايك", phone: "01-499143" },
    { name: "مستشفى اوتيل ديو", phone: "01-615400" },
    { name: "مستشفى كرم", phone: "01-325325" },
    { name: "مستشفى خالدي", phone: "01-340247" },
    { name: "مستشفى الكسندر خوري", phone: "01-361055" },
    { name: "مستشفى اللبناني الكندي", phone: "01-511487" },
    { name: "مستشفى معربس", phone: "01-389292" },
    { name: "مستشفى المقاصد", phone: "01-630630" },
    { name: "مستشفى الشرق الاوسط", phone: "01-809555" },
    { name: "مستشفى جبل لبنان", phone: "05-957000" },
    { name: "مستشفى نجار", phone: "01-340626" },
    { name: "مستشفى الدكتور نسيب", phone: "01-631900" },
    { name: "مستشفى الرسول الاعظم", phone: "01-821115" },
    { name: "مستشفى رزق", phone: "01-200800" },
    { name: "Sacre Coeur Hospital", phone: "05-457112" },
    { name: "مستشفى الساحل", phone: "01-820741" },
    { name: "Souaid Saint Antoine Hospital", phone: "01-615020" },
    { name: "Saint Charles Hospital", phone: "05-455131" },
    { name: "Saint Georges Hospital Hadeth", phone: "05-462020" },
    { name: "Saint Georges Hospitat (Roum)", phone: "01-585700" },
    { name: "Saint Joseph Hospital", phone: "01-880750" },
    { name: "Sainte Lourdes", phone: "01-390006" },
    { name: "Sainte Therese Hospital", phone: "05-436100" },
    { name: "مستشفى سرحال", phone: "01-406838" },
    { name: "مستشفى طراد", phone: "01-369494" },
    { name: "مستشفى الوردية", phone: "01-581140" },
    { name: "مستشفى المرأة", phone: "01-657505" },
    { name: "عجلتون Saint Georges", phone: "09-234201" },
    { name: "مستشفى باستور", phone: "09-935602" },
    { name: "Saint Louis Hospital", phone: "09-912970" },
    { name: "مستشفى سيدة لبنان", phone: "09-937401" },
    { name: "مستشفى المعونات(سيدة البحر)", phone: "09-944255" },
    { name: "مستشفى سيدة مارتين", phone: "09-540017" },
    { name: "مستشفى البترون", phone: "06-642017" },
    { name: "مستشفى بيسار", phone: "06-432267" },
    { name: "Center Hospitalier Du Nord", phone: "06-555230" },
    { name: "مستشفى شاهين", phone: "06-625796" },
    { name: "مستشفى دار التوليد", phone: "06-602330" },
    { name: "مستشفى الحنان", phone: "06-200527" },
    { name: "مستشفى هيكل", phone: "06-430600" },
    { name: "مستشفى الحسيني", phone: "06-600005" },
    { name: "مستشفى الخير", phone: "06-460535" },
    { name: "مستشفى مظلوم", phone: "06-431917" },
    { name: "مستشفى المنلا", phone: "06-600112" },
    { name: "مستشفى النيني", phone: "06-432811" },
    { name: "مستشفى السلام", phone: "06-435900" },
    { name: "مستشفى الزهراء", phone: "06-430185" },
    { name: "مستشفى البرجي", phone: "06-950150" },
    { name: "مستشفى الكورة", phone: "06-651350" },
    { name: "مستشفى الرهبان", phone: "06-662871" },
    { name: "مستشفى سيدة زغرتا", phone: "06-661204" },
    { name: "مستشفى عكار", phone: "06-691100" },
    { name: "Maan el Youssef Medical Center", phone: "06-692056" },
    { name: "Notre Dame De La Paix", phone: "06-351670" },
    { name: "مستشفى الخطيب", phone: "08-930570" },
    { name: "Khoury General Hospital", phone: "08-807000" },
    { name: "مستشفى اللبناني الفرنسي", phone: "08-810123" },
    { name: "مستشفى رياق", phone: "08-900754" },
    { name: "مستشفى تل شيحا", phone: "08-803609" },
    { name: "مستشفى البقاع", phone: "08-543150" },
    { name: "مستشفى ميس", phone: "08-542300" },
    { name: "مستشفى الرحمة", phone: "08-543919" },
    { name: "مستشفى الاهلي", phone: "08-371650" },
    { name: "مستشفى دار الحياة", phone: "08-371007" },
    { name: "مستشفى دار الامل", phone: "08-371944" },
    { name: "مستشفى دار الشفاء", phone: "08-370799" },
    { name: "مستشفى الريان", phone: "08-373682" },
    { name: "مستشفى فرحات", phone: "08-660101" },
    { name: "مستشفى بحمد", phone: "08-591108" },
    { name: "Doctors Hospital Manara", phone: "03-333918" },
    { name: "مستشفى الايمان", phone: "05-555970" },
    { name: "National Hospital", phone: "05-554456" },
    { name: "مستشفى جبل فالوغا", phone: "05-530432" },
    { name: "مستشفى حملين", phone: "05-530004" },
    { name: "مستشفى عين وزين", phone: "05-501515" },
    { name: "مستشفى بعقلين", phone: "05-500882" },
    { name: "مستشفى العرفان", phone: "05-501678" },
    { name: "مستشفى منذر الحج", phone: "07-746008" },
    { name: "مستشفى الراعي", phone: "07-222639" },
    { name: "مستشفى دلاعة", phone: "07-723244" },
    { name: "مستشفى حمود", phone: "07-723111" },
    { name: "مستشفى اليا", phone: "07-724333" },
    { name: "مستشفى الجنوب", phone: "07-722555" },
    { name: "مستشفى الجبيلي", phone: "07-724779" },
    { name: "مستشفى قصب", phone: "07-723700" },
    { name: "مستشفى لبيب", phone: "07-720333" },
    { name: "مستشفى النقيب", phone: "07-721200" },
    { name: "مستشفى عسيران", phone: "07-720111" },
    { name: "مستشفى علاء الدين", phone: "07-724923" },
    { name: "Center Hospitalier Du Nord", phone: "07-760151" },
    { name: "مستشفى غندور", phone: "07-761590" },
    { name: "مستشفى الحكومي", phone: "07-766777" },
    { name: "مستشفى النجدة الشعبية", phone: "07-761872" },
    { name: "مستشفى باشور", phone: "07-740132" },
    { name: "مستشفى حيرام", phone: "07-343710" },
    { name: "مستشفى جبل عامل", phone: "07-740743" },
    { name: "مستشفى خروبي", phone: "07-222643" },
    { name: "مستشفى الايطالي", phone: "07-74159" },
  ];

  const [selectedHospital, setSelectedHospital] = useState({
    name: "",
    phone: "",
  });

  const handleCardClick = (hospital) => {
    setSelectedHospital(hospital);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const bloodRequestData = {
      hospital,
      region,
      bloodType,
      bloodUnits: Number(bloodUnits),
      phoneNumber: Number(phoneNumber),
    };

    const ref = collection(fireStore, "posts");

    try {
      await addDoc(ref, bloodRequestData);
      alert("Blood request submitted successfully!");

      setHospital("");
      setRegion("");
      setBloodType("All");
      setBloodUnits("");
      setPhoneNumber("");
    } catch (error) {
      console.error("Error adding blood request: ", error);
      alert("Failed to submit blood request.");
    }

    setLoading(false);
  };

  return (
    <>
      <h1 className="text-center mt-5">Admin Panel</h1>
      <main style={{ marginTop: "20px" }} className="text-center">
        <div className="container d-flex justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="hospital" className="form-label">
                اسم المستشفى
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="hospital"
                value={selectedHospital.name}
                onChange={(e) =>
                  setSelectedHospital({
                    ...selectedHospital,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="region" className="form-label">
                المنطقة
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                رقم الهاتف
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="phone"
                value={selectedHospital.phone}
                onChange={(e) =>
                  setSelectedHospital({
                    ...selectedHospital,
                    phone: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="BloodType" className="form-label">
                فئة الدم
              </label>
              <select
                className="form-select"
                id="BloodType"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                required
              >
                <option value="All">All</option>
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
            <div className="mb-3">
              <label htmlFor="bloodno" className="form-label">
                عدد الوحدات
              </label>
              <input
                type="number"
                className="form-control"
                id="bloodno"
                min="1"
                value={bloodUnits}
                onChange={(e) => setBloodUnits(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </main>
      <div>
        <div className="d-flex justify-content-center flex-wrap align-items-center mt-3">
          {hospitals.map((hospital, index) => (
            <div
              key={index}
              className="card text-center d-flex flex-column align-items-center justify-content-evenly"
              onClick={() => handleCardClick(hospital)}
              style={{
                width: "170px",
                height: "200px",
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px",
                cursor: "pointer",
              }}
            >
              <h3>{hospital.name}</h3>
              <p>{hospital.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Admin;
