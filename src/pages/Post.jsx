import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../style/style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";

const Post = ({ FotoID }) => {
  const navigate = useNavigate();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  // const [likePost, setLikePosts] = useState(false);
  // const [savePost, setSavePosts] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };  

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [saved, setSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(0);

  const [comment, setComment] = useState();
  const [commentCount, setCommentCount] = useState(0);



  const [isiKomen, setIsiKomentar] = useState();

  const [usercom, setUserCom] = useState();

  const { id } = useParams();
  const [userId, setUserId] = useState();
  const [commentId, setCommentId] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token") ?? "";

    // menaruh token ke dalam header request
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get("http://localhost:8800/", config) // mengirim token ke server
      .then((res) => {
        if (res.data.status === "success") {
          setUserId(res.data.user.UserID);
        } else {
          // setMessage(res.data.message)
          // console.log(res.data.id)
        }
      });
  };

  useEffect(() => {
    console.log("ini user iddddddddd " + userId);
    if (userId) {
      axios
        .get(`http://localhost:8800/likes/${id}?userId=${userId}`)
        .then((response) => {
          // Update the like count state
          setLikeCount(response.data.likeCount);

          // Check if the current user has liked the photo
          setLiked(response.data.liked);
        })
        .catch((error) => {
          console.error("Error fetching like count:", error);
        });
    }

    if (userId) {
      axios
        .get(`http://localhost:8800/save/${id}?userId=${userId}`)
        .then((response) => {
          // Update the like count state
          setSaveCount(response.data.saveCount);

          // Check if the current user has liked the photo
          setSaved(response.data.saved);
        })
        .catch((error) => {
          console.error("Error fetching like count:", error);
        });
    }

    axios
      .get(`http://localhost:8800/comment/` + id)
      .then((response) => {
        setComment(response.data.comment);
        setCommentCount(response.data.comment.length);
        setUserCom(response.data.user);
        if (
          usercom &&
          Array.isArray(usercom) &&
          usercom.length > 0 &&
          usercom[0].NamaLengkap
        ) {
          console.log(usercom[0].NamaLengkap); // Accessing NamaLengkap
        }
      })
      .catch((error) => {
        console.error("Error fetching like count:", error);
      });
  }, [id, userId]);

  const handleLike = () => {
    const data = { userId: userId };
    axios
      .post(`http://localhost:8800/like/${id}`, data)
      .then((response) => {
        setLiked(!liked); // Toggle liked state
        setLikeCount(response.data.likeCount);
      })
      .catch((error) => {
        console.error("Error toggling like:", error);
      });
  };

  const handleUnLike = () => {
    const data = { userId: userId };
    axios
      .post(`http://localhost:8800/unlike/${id}`, data)
      .then((response) => {
        setLiked(!liked); // Toggle liked state
        setLikeCount(response.data.likeCount);
        // fetchData();
      })
      .catch((error) => {
        console.error("Error toggling like:", error);
      });
  };

  const handleSave = () => {
    const data = { userId: userId };
    axios
      .post(`http://localhost:8800/save/${id}`, data)
      .then((response) => {
        setSaved(!saved); // Toggle liked state
        setSaveCount(response.data.saveCount);
      })
      .catch((error) => {
        console.error("Error toggling like:", error);
      });
  };

  const handleUnSave = () => {
    const data = { userId: userId };
    axios
      .post(`http://localhost:8800/unsave/${id}`, data)
      .then((response) => {
        setSaved(!saved); // Toggle liked state
        setSaveCount(response.data.saveCount);
        // fetchData();
      })
      .catch((error) => {
        console.error("Error toggling like:", error);
      });
  };

  const handleComment = (e) => {
    e.preventDefault();
    const isiKomentar = {
      userId: userId,
      isiKomentar: isiKomen,
    };

    axios
      .post(`http://localhost:8800/comment/${id}`, isiKomentar)
      .then((response) => {
        console.log("Update succeeded");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error toggling like:", error);
      });
  };

  const handleDeleteComment = async (KomentarID) => {
    try {
      await axios
        .delete("http://localhost:8800/comment/delete/" + KomentarID)
        .then(console.log("sukses"), window.location.reload());
    } catch (err) {
      console.log(err);
    }
  };

  // const toggleSave = () => {
  //   setSavePosts(!savePost);
  // };

  const [post, setPost] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/posts/` + id)
      .then((response) => {
        console.log(response);
        setPost(response.data);
        console.log(response.data.UserID);
      })

      .catch((error) => console.error(error));
  }, [id]);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/posts/delete/" + id);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <div className="containers">
        <div className="header-break"></div>

        {post &&
          post.map((post) => (
            <div key={post.id}>
              <div
                className="blur-container post-content"
                style={{ width: "80%", margin: "auto" }}
              >
                <div
                  onClick={() => navigate(-1)}
                  className=""
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                  }}
                >
                  <Icon
                    icon="ic:round-arrow-back"
                    style={{
                      color: "white",
                      fontSize: 20,
                      backgroundColor: "transparent",
                    }}
                  />
                  <h3>{post.NamaLengkap} post</h3>
                </div>
                <div className="" style={{ display: "flex", gap: 30 }}>
                  <div
                    className="left-content"
                    style={{
                      backgroundColor: "transparent",
                      display: "flex",
                      flexDirection: "column",
                      gap: 20,
                    }}
                  >
                    <img
                      src={"http://localhost:8800/images/" + post.LokasiFile}
                      style={{
                        width: 480,
                        height: 480,
                        objectFit: "cover",
                        borderRadius: 30,
                        backgroundColor: "wheat",
                      }}
                      alt=""
                    />
                  </div>
                  <div
                    className="right-content"
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 20,
                    }}
                  >
                    <div className="" style={{ width: "100%" }}>
                      <div
                        className=""
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h3 onClick={() => navigate("/profile/" + post.UserID)}>
                          @{post.Username}
                        </h3>

                        {userId === post.UserID ? (
                          <div>
                            <Icon
                              icon="ic:outline-more-horiz"
                              onClick={toggleDropdown}
                              style={{
                                backgroundColor: "transparent",
                                fontSize: 50,
                                color: "white",
                              }}
                            ></Icon>
                            {dropdownVisible && (
                              <div
                                className="dropdown"
                                style={{
                                  position: "absolute",
                                  top: "32vh",
                                  right: "150px",
                                  backgroundColor: "white",
                                  padding: "0px",
                                  borderRadius: "5px",
                                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                }}
                              >
                                <Link
                                  to=""
                                  style={{
                                    textDecoration: "none",
                                    backgroundColor: "transparent",
                                  }}
                                >
                                  <p
                                    className="delete"
                                    onClick={() => handleDelete(post.FotoID)}
                                    style={{ cursor: "pointer", color: "red" }}
                                  >
                                    Delete Posts
                                  </p>
                                </Link>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className=""></div>
                        )}
                      </div>

                      <h2 style={{ marginBottom: 5 }}>{post.JudulFoto}</h2>
                      <p style={{ textAlign: "start", minHeight: 40 }}>
                        {post.DeskripsiFoto}
                      </p>
                    </div>

                    <div className="" style={{ display: "flex", gap: 20 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                        onClick={liked ? handleUnLike : handleLike}
                      >
                        <Icon
                          style={{
                            color: liked ? "white" : "white",
                            backgroundColor: "transparent",
                            fontSize: 40,
                          }}
                          icon={
                            liked
                              ? "icon-park-solid:like"
                              : "icon-park-outline:like"
                          }
                        />
                        <p
                          style={{
                            color: "white",
                            backgroundColor: "transparent",
                            fontSize: 20,
                          }}
                        >
                          {likeCount}
                        </p>
                      </div>
                      <div
                        className=""
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                        onClick={saved ? handleUnSave : handleSave}
                      >
                         <Icon
                          style={{
                            color: liked ? "white" : "white",
                            backgroundColor: "transparent",
                            fontSize: 40,
                          }}
                          icon={
                            saved
                              ? "material-symbols:bookmark"
                              : "material-symbols:bookmark-outline"
                          }
                        />
                       
                        <p
                          style={{
                            color: "white",
                            backgroundColor: "transparent",
                            fontSize: 20,
                          }}
                        >
                          {saveCount}
                        </p>
                      </div>
                    </div>
                    <div
                      className=""
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      <div className="">
                        <h3 style={{ height: 40 }}>{commentCount} Comments</h3>
                        <div
                          className=""
                          style={{
                            width: "93%",
                            backgroundColor: "#292B39",
                            padding: 25,
                            borderRadius: 20,
                            gap: 10,
                          }}
                        >
                          <div
                            className=""
                            style={{ display: "flex", width: "100%", gap: 10 }}
                          >
                            <input
                              type="text"
                              style={{
                                width: "85%",
                                backgroundColor: "#36394C",
                                color: "white",
                              }}
                              onChange={(e) => {
                                setIsiKomentar(e.target.value);
                              }}
                            />
                            <Icon
                              icon="carbon:send-filled"
                              style={{
                                padding: 10,
                                fontSize: 30,
                                backgroundColor: "#F6B17A",
                                borderRadius: 50,
                                color: "#292B39",
                              }}
                              onClick={handleComment}
                            />
                          </div>

                          {comment &&
                            comment.map((comment) => (
                              <div
                                className="comment-content"
                                style={{
                                  borderRadius: 20,
                                  backgroundColor: "transparent",
                                  display: "flex",
                                  padding: 15,
                                  gap: 15,
                                }}
                              >
                                <img
                                  src=""
                                  style={{
                                    width: 45,
                                    aspectRatio: 1,
                                    borderRadius: 100,
                                    backgroundColor: "wheat",
                                  }}
                                  alt=""
                                />
                                <div
                                  className=""
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                  }}
                                >
                                  <div
                                    className="comment-content-des"
                                    style={{
                                      display: "flex",
                                      backgroundColor: "transparent",
                                      flexDirection: "column",
                                      alignItems: "start",
                                      gap: 0,
                                    }}
                                  >
                                    <p style={{ fontSize: 16 }}>
                                      {" "}
                                      {
                                        usercom.find(
                                          (user) =>
                                            user.UserID === comment.UserID
                                        )?.Username
                                      }
                                    </p>
                                    <p
                                      style={{ fontSize: 14, fontWeight: 400 }}
                                    >
                                      {comment.IsiKomentar}
                                    </p>
                                  </div>
                                  {userId === comment.UserID && ( // Check if user is logged in and is the owner of the comment
                                      <p
                                        style={{
                                          fontSize: 14,
                                          fontWeight: 500,
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleDeleteComment(
                                            comment.KomentarID
                                          )
                                        }
                                      >
                                        delete
                                      </p>
                                    )}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Post;
