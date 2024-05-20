"use client";
import { useEffect, useState, useRef, FormEvent } from "react";
import io, { Socket } from "socket.io-client";
import styles from "./Chat.module.css";
import { useUserContext } from "@/components/UserProvider";
import { useRouter } from "next/navigation";
import { Url } from "next/dist/shared/lib/router/router";

interface Message {
  userId: string;
  name: string;
  message: string;
}

interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  document: number;
  phone: number;
  cellphone: number;
  rol: string;
  image: Url;
  lastLogin: string;
}

interface PersonalSecurity {
  id: string;
  name: string;
}

const LOGINUSER_URL = process.env.NEXT_PUBLIC_API_URL;

const ChatComponent: React.FC = (): React.ReactElement => {
  const { user, setUser, token, setToken } = useUserContext();
  const [chatMessages, setChatMessages] = useState<{
    [roomId: string]: Message[];
  }>({});
  const [users, setUsers] = useState<User[]>([]);
  const [personalSecurity, setPersonalSecurity] = useState<PersonalSecurity[]>(
    [],
  );
  const [selectedUser, setSelectedUser] = useState<PersonalSecurity | null>(
    null,
  );
  const [message, setMessage] = useState<string>("");
  const [messageWelcome, setMessageWelcome] = useState<string>("");
  const socketRef = useRef<Socket | null>(null);
  const chatElementRef = useRef<HTMLDivElement>(null);
  const [isOnline, setIsOnline] = useState(false);
  const isSocketInitialized = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initializeSocket = (storedUser: User, storedToken: string) => {
      if (!storedUser || !storedToken || isSocketInitialized.current) return;

      // const socket = io("https://sih-back.onrender.com", {
      const socket = io(`${LOGINUSER_URL}`, {
        auth: {
          id: storedUser.id,
          token: storedToken,
          name: storedUser.name,
          date: new Date().toISOString(),
        },
      });

      socketRef.current = socket;
      isSocketInitialized.current = true;

      socket.on("connect", () => {
        setIsOnline(true);
        console.log("Conectado");
      });

      socket.on("disconnect", () => {
        setIsOnline(false);
        console.log("Desconectado");
      });

      socket.on("welcome-message", (data: string) => {
        setMessageWelcome(data);
        console.log(messageWelcome);
      });

      socket.on("on-message", (payload: Message) => {
        console.log(payload);

        // nuevos mensajes de la db con los de chatMessages
        setChatMessages((prevChatMessages) => {
          const newMessages = { ...prevChatMessages };
          if (roomId) {
            newMessages[roomId] = [...(newMessages[roomId] || []), payload];
          }
          return newMessages;
        });
      });

      socket.on("error", (errorMessage: string) => {
        setError(errorMessage);
        console.error(error);
      });

      socket.on("room-id", (roomId: string) => {
        setRoomId(roomId);
        console.log(`Conectado a la sala ${roomId}`);
      });

      //usuarios conectados util?
      socket.on("on-clients-changed", (usersList: User[]) => {
        setUsers(usersList);
        console.log(users);
      });
      //PS conectados
      socket.on("security-personal", (userPs: PersonalSecurity[]) => {
        setPersonalSecurity(userPs);
      });

      return () => {
        socket.disconnect();
        isSocketInitialized.current = false;
      };
    };

    const checkToken = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedUser.name && storedToken) {
        setUser(storedUser);
        setToken(storedToken);
        if (user && token) {
          initializeSocket(user, token);
        }
      } else {
        router.push("/ingreso"); // pal loby
      }
    };

    checkToken();

    // Limpiar el socket cuando el componente se desmonta
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        isSocketInitialized.current = false;
      }
    };
  }, [setUser, setToken, router]);

  const renderUsersPs = (usersPs: PersonalSecurity[]) => {
    return usersPs.map((userPs) => (
      <button
        key={userPs.id}
        className={`${styles.securityPersonal}`}
        onClick={() => handleUserClick(userPs)}
      >
        <div className={`${styles.contact} ${styles.bar}`}>
          <div className={`${styles.pic} ${styles.ps}`}></div>
          <div className={`${styles.name}`}>
            <div className={`${styles.containerHeaderChat}`}>
              <h2>{userPs.name}</h2>
              <div
                id={styles.statusOnline}
                className={isOnline ? "" : `${styles.hidden}`}
              >
                Online
              </div>
              <div
                id={styles.statusOffline}
                className={isOnline ? `${styles.hidden}` : ""}
              >
                Offline
              </div>
            </div>
          </div>
          <div className={`${styles.time}`}>Hoy a las 11:41</div>
        </div>
      </button>
    ));
  };

  const renderMessages = (messages: Message[]) => {
    return messages.map((payload, index) => {
      const { userId, name, message } = payload;

      return (
        <div
          key={index}
          className={`${styles.message} ${userId !== user?.id ? `${styles.incoming}` : ""}`} // match user db con el del local store
        >
          <small>{name}</small>
          <p>{message}</p>
        </div>
      );
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // verifica que el mensaje no esté vacío antes de enviarlo
    if (socketRef.current && message.trim() && roomId) {
      const dataMessage: Message = {
        userId: user!.id,
        name: user!.name,
        message,
      };
      socketRef.current.emit("send-message", { roomId, ...dataMessage });
      //messages previos
      setChatMessages((prevChatMessages) => {
        const newMessages = { ...prevChatMessages };
        if (roomId) {
          newMessages[roomId] = [...(newMessages[roomId] || []), dataMessage];
        }
        return newMessages;
      });
      setMessage("");
    }
  };

  const handleUserClick = (userPs: PersonalSecurity) => {
    setSelectedUser(userPs);
    const newRoomId = `room_${userPs.id}`;
    setRoomId(newRoomId);
    socketRef.current?.emit("join-room", newRoomId);
    console.log(`Abriendo chat con el PS ${userPs.name}`);
  };

  useEffect(() => {
    if (chatElementRef.current) {
      chatElementRef.current.scrollTop = chatElementRef.current.scrollHeight;
    }
  }, [roomId]);

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.divChat}`}>
        <div className={`${styles.chat}`}>
          <div className={`${styles.contact} ${styles.bar}`}>
            <div className={`${styles.pic} ${styles.ps}`}></div>
            <div className={`${styles.name}`}>
              <div className={`${styles.containerHeaderChat}`}>
                <h2>
                  {selectedUser ? selectedUser.name : "Personal de Seguridad"}
                </h2>
                <div
                  id={styles.statusOnline}
                  className={isOnline ? "" : `${styles.hidden}`}
                >
                  Online
                </div>
                <div
                  id={styles.statusOffline}
                  className={isOnline ? `${styles.hidden}` : ""}
                >
                  Offline
                </div>
              </div>
            </div>

            <div className={`${styles.seen}`}>Hoy a las 12:56</div>
          </div>
          <div className={`${styles.messages}`} id="chat" ref={chatElementRef}>
            <div className={`${styles.time}`}>Hoy a las 11:41</div>

            <div className={`${styles.message} ${styles.incoming}`}>
              Hola {user?.name}! ¿en que puedo ayudarte el día de hoy? 👮‍♂️‍✋
            </div>

            {/* <div className={`${styles.message}`}>
              Es para corregir un dato mal cargado en la autorizacion que hice.
            </div> */}

            {roomId && renderMessages(chatMessages[roomId] || [])}
            <div className={`${styles.message} ${styles.incoming}`}>
              <div className={`${styles.typing} ${styles.typing1}`}></div>
              <div className={`${styles.typing} ${styles.typing2}`}></div>
              <div className={`${styles.typing} ${styles.typing3}`}></div>
            </div>
          </div>

          <div className={styles.status}>
            <div
              id={styles.statusOnline}
              className={isOnline ? "" : `${styles.hidden}`}
            >
              Online
            </div>
            <div
              id={styles.statusOffline}
              className={isOnline ? `${styles.hidden}` : ""}
            >
              Offline
            </div>
          </div>
          <form onSubmit={handleSubmit} className={`${styles.input}`}>
            <input
              placeholder="Escribe tu mensaje aquí"
              value={message}
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              disabled={!selectedUser}
            />
            <button
              className="icon-button"
              type="submit"
              disabled={!selectedUser}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
      <div className={`${styles.securityStatus}`}>
        <ul>{renderUsersPs(personalSecurity)}</ul>
      </div>
    </div>
  );
};

export default ChatComponent;
