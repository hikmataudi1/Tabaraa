import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { query, where, collection, getDocs } from "@firebase/firestore";
import { fireStore } from '../firebase';

const DonorsSearch = ({ users, setUsers }) => {
  const ref = collection(fireStore, "donors");

  const handleSearch = async (event) => {
    event.preventDefault();
    const search = document.getElementById("search").value.split(" ").join("").toUpperCase();

    try {
      let searchQuery;

      if (search === "") {
        searchQuery = ref;
      } else if (search === "A") {
        searchQuery = query(ref, where("bloodType", "in", ["A+", "A-", "AB+", "AB-"]));
      } else if (search === "B") {
        searchQuery = query(ref, where("bloodType", "in", ["B+", "B-"]));
      } else if (search === "O") {
        searchQuery = query(ref, where("bloodType", "in", ["O+", "O-"]));
      } else if (search === "AB") {
        searchQuery = query(ref, where("bloodType", "in", ["AB+", "AB-"]));
      } else {
        searchQuery = query(ref, where("bloodType", "==", search));
      }
      
      const querySearchData = await getDocs(searchQuery);
      const searchResults = querySearchData.docs.map((doc) => doc.data());
      setUsers(searchResults);
    } catch (error) {
      console.error("Error fetching search results: ", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-5">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search By BloodType"
            id="search"
            onChange={handleSearch}
          />
        </form>
      </div>
      <div className="container d-flex justify-content-center flex-wrap gap-3">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div key={index} className="card mb-3 forhover" style={{ width: "18rem" }}>
              <img
                className="card-img-top w-75 m-auto"
                src={`assets/${user.bloodType}.jpg`}
                alt={user.bloodType}
              />
              <div className="card-body">
                <h5 className="card-title display-6">{user.name}</h5>
                <p className="card-text fs-3 lead">{user.phone}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-subtitle mb-2 mx-3 rounded border px-3 badge bg-success">
                    {user.sex}
                  </p>
                  <p className="card-subtitle mb-2 rounded border px-3 badge bg-danger">
                    {user.bloodType}
                  </p>
                </div>
                <p className="card-subtitle mb-2 text-muted pb-2">
                  {user.location}
                </p>
                <a
                  className="card-btn btn btn-outline-secondary"
                  href={`https://wa.me/+961${user.phone}`}
                >
                  Contact
                </a>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <a href={`https://wa.me/+96178976841?text=${user.name} - ${user.phone} has already donated ,  هذا المتبرع لم يعد متوفرا للتبرع `}
                 className="btn btn-danger w-100 m-2"
                  >
                  Report to Remove
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No donors found with this blood type.</p>
        )}
      </div>
    </>
  );
};

export default DonorsSearch;
