"use client";
import { useEffect, useState, useRef, FormEvent } from "react";
import io, { Socket } from "socket.io-client";
import styles from "./Chat.module.css";
import { useUserContext } from "@/components/UserProvider";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Image from "next/image";
import { toast } from "react-toastify";
import { Message, User } from "../../helpers/types";

const LOGINUSER_URL = process.env.NEXT_PUBLIC_API_URL;

const ChatComponent: React.FC = (): React.ReactElement => {
  const { user, setUser } = useUserContext();
  const [chatMessages, setChatMessages] = useState<{
    [roomId: string]: Message[];
  }>({});
  const [users, setUsers] = useState<User[]>([]);
  const [personalSecurity, setPersonalSecurity] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string>("");
  const socketRef = useRef<Socket | null>(null);
  const chatElementRef = useRef<HTMLDivElement>(null);
  const isSocketInitialized = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userConnections, setUserConnections] = useState<{
    [userId: string]: boolean;
  }>({});
  const router = useRouter();

  useEffect(() => {
    const initializeSocket = (storedUser: User, storedToken: string) => {
      if (!storedUser || !storedToken || isSocketInitialized.current) return;

      const socket = io(`${LOGINUSER_URL}`, {
        auth: {
          id: storedUser.id,
          token: storedToken,
          name: storedUser.name,
          lastName: storedUser.lastName,
          date: new Date().toISOString(),
        },
      });

      socketRef.current = socket;
      isSocketInitialized.current = true;
      socket.on("error", (errorMessage: string) => setError(errorMessage));
      socket.on("room-id", (roomId: string) => setRoomId(roomId));
      socket.on("security-personal", (userPs: User[]) =>
        setPersonalSecurity(userPs),
      );
      socket.on("users-list", (usersList: User[]) => setUsers(usersList));
      socket.on("joined-room", (roomId) => setRoomId(roomId));

      if (socketRef.current) {
        socketRef.current.on("on-message", (payload: Message) => {
          setChatMessages((prevChatMessages) => {
            const newMessages = { ...prevChatMessages };
            const roomID = payload.roomIdChat;
            if (roomID)
              newMessages[roomID] = [...(newMessages[roomID] || []), payload];
            return newMessages;
          });
        });

        socketRef.current.on(
          "previous-messages",
          (messagesSaved: Message[]) => {
            setChatMessages((prevChatMessages) => {
              const newMessages = { ...prevChatMessages };
              const roomID =
                messagesSaved.length > 0 ? messagesSaved[0].roomIdChat : null;

              if (roomID) {
                newMessages[roomID] = [
                  ...(newMessages[roomID] || []),
                  ...messagesSaved,
                ];
              }

              return newMessages;
            });
          },
        );

        // alert toast
        socketRef.current.on("message-to", (payload: Message) => {
          if (payload.userIdTo === user?.id) {
            toast.info(`Nuevo mensaje de ${payload.name}: ${payload.message}`, {
              position: "top-right",
              autoClose: 8000,
              theme: "colored",
              onClick: () => {
                handleUserClick({
                  id: payload.userIdFrom,
                  name: payload.name,
                  lastName: payload.lastName,
                  image: payload.imageTo,
                  lastLogin: payload.lastLogin,
                });
              },
            });
          }
          return;
        });
      }

      if (socketRef.current) {
        socketRef.current.on(
          "user-list",
          (userList: { userId: string; isOnline: boolean }[]) => {
            const updatedUserConnections = userList.reduce(
              (acc: { [userId: string]: boolean }, user) => {
                acc[user.userId] = user.isOnline;
                return acc;
              },
              {},
            );
            setUserConnections(updatedUserConnections);
          },
        );

        socketRef.current.on("user-connect", (userId: string) => {
          setUserConnections((prevConnections) => ({
            ...prevConnections,
            [userId]: true, // usuario on
          }));
        });

        socketRef.current.on("user-disconnect", (userId: string) => {
          setUserConnections((prevConnections) => ({
            ...prevConnections,
            [userId]: false, // usuario off
          }));
        });
      }

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
        initializeSocket(storedUser, storedToken);
      } else {
        router.push("/ingreso");
      }
    };

    checkToken();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        isSocketInitialized.current = false;
      }
    };
  }, [setUser, router]);

  const formatDate = (dateToFormat: string) => {
    const date = new Date(dateToFormat);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `a las ${hours}:${minutes < 10 ? "0" : ""}${minutes}`;

    return formattedTime;
  };

  // render user list right
  const renderUserButton = (userData: User) => {
    const userLastLogin = userData.lastLogin;
    let LastLogin = "";
    if (userLastLogin) {
      LastLogin = formatDate(userLastLogin);
    }
    return (
      <button
        key={userData.id}
        className={`${styles.securityPersonal}`}
        onClick={() => handleUserClick(userData)}
      >
        <div className={`${styles.contact} ${styles.bar}`}>
          <div className={`${styles.pic} ${styles.ps}`}>
            <Image
              className="rounded-full border-white max-md:h-[173px] max-md:w-[173px] max-cellphone:h-[100px] max-cellphone:w-[100px]"
              src={userData.image}
              height={260}
              width={260}
              alt="Imagen del usuario"
            ></Image>
          </div>
          <div className={`${styles.name}`}>
            <div className={`${styles.containerHeaderChat}`}>
              <h2>
                {userData.name} {userData.lastName}
              </h2>
              <div
                id={styles.statusOnline}
                className={
                  userConnections[userData.id] ? "" : `${styles.hidden}`
                }
              >
                En linea
              </div>
              <div
                id={styles.statusOffline}
                className={
                  userConnections[userData.id] ? `${styles.hidden}` : ""
                }
              >
                Desconectado
              </div>
            </div>
          </div>

          <div className={`${styles.time}`}>
            {LastLogin ? `Última vez ${LastLogin}` : "Nunca conectado"}
          </div>
        </div>
      </button>
    );
  };

  // ordenando "on" primero - start
  const connectedUsers: User[] = [];
  const disconnectedUsers: User[] = [];
  if (user?.rol === "security") {
    users.forEach((userData) => {
      if (userConnections[userData.id]) {
        connectedUsers.push(userData);
      } else {
        disconnectedUsers.push(userData);
      }
    });
  } else {
    personalSecurity.forEach((userData) => {
      if (userConnections[userData.id]) {
        connectedUsers.push(userData);
      } else {
        disconnectedUsers.push(userData);
      }
    });
  }
  // ordenando on primero - finish

  const renderMessages = (messages: Message[]) => {
    // console.log(messages);

    return messages.map((payload, index) => {
      const { userIdFrom, name, message } = payload;

      return (
        <div
          key={index}
          className={`${styles.message} ${userIdFrom !== user?.id ? `${styles.incoming}` : ""}`}
        >
          <small>{name}</small>
          <p>{message}</p>
        </div>
      );
    });
  };

  const filteredUsers = [...connectedUsers, ...disconnectedUsers].filter(
    (userData) =>
      userData.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // sending messages
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (socketRef.current && message.trim() && roomId) {
      const dataMessage: Message = {
        userIdFrom: user!.id,
        name: user!.name,
        lastName: user!.name,
        message,
        roomIdChat: roomId,
        userIdTo: selectedUser!.id,
        imageTo: user!.image,
        lastLogin: new Date().toISOString(),
      };
      socketRef.current.emit("send-message", { roomId, ...dataMessage });
      setMessage("");
    }
  };

  // select user to talk
  const handleUserClick = (userData: User) => {
    setSelectedUser(userData);
    const newRoomId = createRoomId(user!.id, userData.id);
    setRoomId(newRoomId);
    setIsWelcomeVisible(false);
  };

  const createRoomId = (userId1: string, userId2: string) => {
    return [userId1, userId2].sort().join("_");
  };

  useEffect(() => {
    if (roomId && socketRef.current) {
      socketRef.current.emit("join-room", roomId);
    }
  }, [roomId]);

  useEffect(() => {
    if (chatElementRef.current) {
      chatElementRef.current.scrollTop = chatElementRef.current.scrollHeight;
    }
  }, [roomId, chatMessages]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  }, [error]);

  return (
    <div className={`${styles.container}`}>
      {isWelcomeVisible ? (
        <div className={`${styles.divChat}`}>
          <div className={`${styles.chat}`}>
            <div className="p-5">
              <div className="w-full flex flex-col items-center">
                <h2 className="text-[#384B59] text-4xl font-bold text-center">
                  Bienvenido a{" "}
                  <span className="text-[#FFBD5C] text-[40px] text-left">
                    SIH
                  </span>{" "}
                  CHAT
                </h2>
              </div>
            </div>
            <div
              className={`${styles.messages}`}
              id="chat"
              ref={chatElementRef}
            >
              <div className="w-full flex flex-col  items-center p-10">
                <h2 className="text-[#384B59] text-4xl font-bold text-center p-5">
                  Hola{" "}
                  <span className="text-[#FFBD5C] text-[40px] text-left">
                    {user?.name}
                  </span>{" "}
                  ! ¿en que puedo ayudarte el día de hoy? 👮‍♂️‍✋
                </h2>
                <br />
                <h2 className="text-[#384B59] text-4xl font-bold text-center p-5">
                  Por favor selecciona al personal con quien deseas comunicarte.
                </h2>
                <h2 className="text-[#384B59] text-4xl font-bold text-center p-5">
                  Gracias por contactarte!
                </h2>
              </div>
            </div>
            <form className={`${styles.input}`}>
              <input
                placeholder="Selecciona con quien quieres comunicarte"
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
      ) : (
        <div className={`${styles.divChat}`}>
          <div className={`${styles.chat}`}>
            <div className={`${styles.contact} ${styles.bar}`}>
              <div className={`${styles.pic} ${styles.ps}`}>
                <Image
                  className="rounded-full border-white max-md:h-[13px] max-md:w-[173px] max-cellphone:h-[100px] max-cellphone:w-[100px]"
                  src={selectedUser ? selectedUser.image : ""}
                  height={260}
                  width={260}
                  alt="Icono del chat del usuario"
                ></Image>
              </div>
              <div className={`${styles.name}`}>
                <div className={`${styles.containerHeaderChat}`}>
                  <h2>
                    {selectedUser
                      ? `${selectedUser.name} ${selectedUser.lastName}`
                      : "Personal de Seguridad"}
                  </h2>
                </div>
              </div>

              <div className={`${styles.seen}`}>
                {selectedUser
                  ? selectedUser.lastLogin
                    ? `Hoy ${formatDate(selectedUser.lastLogin)}`
                    : "No conectado"
                  : "No seleccionado"}
              </div>
            </div>
            <div
              className={`${styles.messages}`}
              id="chat"
              ref={chatElementRef}
            >
              {/* <div className={`${styles.time}`}>Hoy a las 17:11</div> */}

              {user?.rol === "owner" ? (
                <div className={`${styles.message} ${styles.incoming}`}>
                  Hola ¡{user?.name}! ¿en que puedo ayudarte el día de hoy?
                  👮‍♂️‍✋
                </div>
              ) : (
                ""
              )}
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
                className={selectedUser ? "" : `${styles.hidden}`}
              >
                Conectado
              </div>
              <div
                id={styles.statusOffline}
                className={selectedUser ? `${styles.hidden}` : ""}
              >
                Desconectado
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
      )}

      <div className="flex flex-col items-center mx-1 my-5">
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-black h-[40px] w-[256px] rounded-[15px] px-2 outline-0 mx-5 border-black bg-white"
        />
        <div
          className="m-4 max-h-[34rem] overflow-y-auto overflow-x-hidden"
          style={{ backgroundColor: "#eee" }}
        >
          <ul>{filteredUsers.map((userData) => renderUserButton(userData))}</ul>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
