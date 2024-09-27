import React, { useState, useEffect } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { fireStore } from "../firebase";
import { useNavigate } from "react-router-dom"; 


function Posts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); 

  
  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(fireStore, "posts");
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsList);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1 className="text-center mt-5">طلبات وحدات الدم</h1>
      <h3 className="text-center mt-3 mb-2 mx-5 lead">
        لاضافة طلب وحدات دم اضغط هنا <br/>
         to request blood donations press here.
      </h3>
      <div className="d-flex justify-content-center align-items-center ">
                <a href={`https://wa.me/+96178976841?text=الرجاء تحديد:  اسم المستشفى/ رقم الهاتف / فئة  الدم/ عدد الوحدات.  ليتم عرض طلبك على الفور`}
                 className="btn btn-danger w-50 m-2"
                  >
                  Request blood
                </a>
      </div>
      <div className="container text-center mt-5">
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          العودة إلى الصفحة الرئيسية
        </button>
      </div>
      <div className="container d-flex justify-content-center flex-wrap gap-3 pt-5">
        {posts.map((post) => (
          <div key={post.id} className="card mb-3 forhover" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title text-center display-6">{post.hospital}</h5>
              <h6 className="m-0 p-0 text-center lead fs-6">{post.region}</h6>
              <p className="card-text fs-3 lead text-center fw-bold">{post.phoneNumber}</p>
              <div className="d-flex justify-content-evenly align-items-center">
                <p className="card-subtitle mb-2 rounded border px-3 badge fs-5 bg-danger">
                  {post.bloodType}
                </p>
                <p className="card-subtitle mb-2 rounded border px-3 badge fs-5 text-dark">
                  {post.bloodUnits} وحدات
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
