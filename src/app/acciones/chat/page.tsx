import ChatComponent from "@/components/chat/ChatComponent";
import BackLink from "@/components/backButton/BackLink";
const ChatPage = () => {
  return (
    <main className="flex flex-col">
      <div className="flex items-center justify-between px-[200px] mt-[20px]">
        <BackLink href="/acciones" />
      </div>
      <ChatComponent />
    </main>
  );
};

export default ChatPage;
