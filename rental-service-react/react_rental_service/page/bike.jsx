import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Navbar from "../components/homepage/navbar/Navbar";
import Footer from "../components/homepage/footer/Footer";
import { useCookies } from "react-cookie";
import { MdDelete } from "react-icons/md";

const IndividualBike = () => {
  const { id } = useParams();
  const url = `http://localhost:5000/bikes/bike/${id}`;

  const [bike, setBike] = useState({});
  const [comments, setComments] = useState([]);
  const [cookies, setCookies] = useCookies(["jwt"]);
  const [comment, setComment] = useState({
    comment__description: "",
    user_id: cookies.id,
    bike_id: id,
  });
  const user_id = parseInt(cookies.id);

  const [success, setSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function createCommentRequest(event) {
    event.preventDefault();
    if (comment.comment__description && comment.user_id && comment.bike_id) {
      axios
        .post("http://localhost:5000/comments", {
          comment__description: comment.comment__description,
          user_id: comment.user_id,
          bike_id: comment.bike_id,
        })
        .then((res) => {
          if (res.data.error == false) {
            setSuccess(true);
            setMessage(res.data.message);

            setTimeout(() => {
              setSuccess(false);
            });
          }
        })
        .catch((error) => {
          setHasError(true);
          setMessage("Some internal error occured");

          setTimeout(() => {
            setHasError(false);
          }, 1500);
        });
    }

    setComment({ ...comment, comment__description: "" });
  }

  function deleteCommentRequest(comment_id) {
    const url = `http://localhost:5000/comments/${comment_id}`;

    axios
      .delete(url)
      .then((res) => {
        if (res.data.error == false) {
          setSuccess(true);
          setMessage(res.data.message);

          setTimeout(() => {
            setSuccess(false);
          }, 1500);

          console.log(url);
        }
      })
      .catch((error) => {
        setHasError(true);
        setMessage("Some internal error occurred !");

        setTimeout(() => {
          setHasError(false);
        }, 1500);
      });
  }

  useEffect(() => {
    if (!cookies.jwt) {
      navigate("/login");
    }

    axios
      .get(url)
      .then((res) => {
        if (res.status == "200") {
          if (res.data.error == "success") {
            setBike(res.data.bike);
            setComments(res.data.comments);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [success]);

  return (
    <>
      <Navbar />

      {success && (
        <div className="alert__message success__message register__message">
          {message}.
        </div>
      )}

      {hasError && (
        <div className="alert__message error__message field__message">
          {message}
        </div>
      )}

      <div className="individual__bike__container__section">
        <div className="breadcrumb__container">
          <ul class="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li>Bikes</li>
          </ul>
        </div>

        <div className="individual__bike__container">
          <div className="image__section">
            <img src="/not_available.png" alt="" />
          </div>
          <div className="bike__information__section">
            <h1>{bike.bike_name}</h1>
            <div className="rating__section">
              {[1, 2, 3, 4, 5].map((el, index) => {
                if (el == 4 || el == 5) {
                  return (
                    <p key={index}>
                      <AiOutlineStar />
                    </p>
                  );
                }
                return (
                  <p key={index}>
                    <AiFillStar />
                  </p>
                );
              })}
            </div>
            <h3>Price : {bike.bike_price} / hr</h3>
            <p>{bike.bike_description}</p>
            <button className="btn primary-btn book__bike__btn">
              Book Now
            </button>
          </div>
        </div>
      </div>

      <div className="comments__container__section">
        {!cookies.jwt ? (
          <p className="login__action__para">
            <Link to={"/login"}>Sign in</Link> or{" "}
            <Link to={"/register"}>Sign up</Link> to add comments on this
            article.
          </p>
        ) : (
          <></>
        )}
        {comments.map((comment, index) => {
          const { comment_id, comment__description, username, id } = comment;

          return (
            <div key={index} className="comments__container">
              <div className="comment__info">
                <p className="comment__header">{comment__description}</p>
                <div>
                  <div>
                    <img src="/demo-avatar.png" alt="" />
                    <p>{username}</p>
                  </div>

                  <div>
                    {user_id === id ? (
                      <>
                        <button
                          onClick={() => {
                            deleteCommentRequest(comment_id);
                          }}
                          className="btn"
                          style={{
                            color: "red",
                            fontSize: "1rem",
                            cursor: "pointer",
                          }}
                        >
                          <MdDelete />
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="add__comments__container">
        <form onSubmit={createCommentRequest}>
          <p className="add__comments__heading">
            Add your comments here for this service bike...
          </p>
          <input
            type="text"
            className="user"
            value={comment.comment__description}
            onChange={(event) =>
              setComment({
                ...comment,
                comment__description: event.target.value,
              })
            }
          />
          <button className="btn comment__btn" type="submit">
            Submit
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default IndividualBike;
