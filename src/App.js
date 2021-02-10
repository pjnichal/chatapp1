import "./App.css";
import { useEffect, useState } from "react";
import database from "./firebase";
import firebase from "firebase";

function App() {
  const [input, setIntput] = useState("");
  const [list, setList] = useState([]);
  const [username, setUsername] = useState("Guest");
  useEffect(() => {
    const name = window.prompt("Enter a username");
    if (name == "") {
      alert("Please enter name");
      window.location.reload(false);
    } else {
      setUsername(name);
    }
  }, []);
  useEffect(() => {
    database
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);
  const sendMessage = (event) => {
    event.preventDefault();
    if (input == "") {
      alert("Message is Empty");
    } else {
      const chatMessage = {
        name: username,
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      database.collection("messages").add(chatMessage);

      setIntput("");
      console.log("message");
    }
  };
  console.log(input);

  return (
    <div className="App">
      <div id="chat-title">The Chat Application</div>

      <div id="chats">
        {list.map(({ id, data: { message, timestamp, name } }) => {
          if (name == username) {
            return (
              <div className="message-row you-message">
                <div className="message-text">{message}</div>
                <div className="message-time">{name}</div>
              </div>
            );
          } else {
            return (
              <div className="message-row other-message">
                <div className="message-text">{message}</div>
                <div className="message-time">{name}</div>
              </div>
            );
          }
        })}
      </div>
      <form>
        <div id="chat-form">
          <input
            id="t1"
            type="text"
            placeholder="Message"
            value={input}
            onChange={(event) => setIntput(event.target.value)}
          ></input>
          <button id="b1" onClick={sendMessage} type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
{
  /*{list.map(({ id, data: { message, timestamp, name } }) => (
        <h3 key={id} className="chatMessage">
          {name}:{message}
        </h3>
      ))}
      <form>
        <input
          type="text"
          value={input}
          onChange={(event) => setIntput(event.target.value)}
        ></input>
        <button onClick={sendMessage} type="submit">
          Send Message
        </button>
      </form> */
}
export default App;
