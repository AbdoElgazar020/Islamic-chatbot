import React, { useEffect, useState, useRef } from "react";
import fetchAPI from "../components/api";
import { format } from "date-fns";
import { FaPlus, FaEllipsisV, FaTrash, FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";

const ChatComponent = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [chatName, setChatName] = useState("");
  const [editChatName, setEditChatName] = useState("");
  const [editingChatId, setEditingChatId] = useState(null);

  const chatRef = useRef(null);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await fetchAPI("chat/", "GET", null);
        const filteredChats = data.filter((chat) => chat.type === "type_1");
        setChats(filteredChats);
      } catch (error) {
        console.error("حدث خطأ أثناء تحميل المحادثات:", error);
      }
    };
    loadChats();
  }, []);

  const handleSelectChat = async (chat) => {
    const chatExists = chats.find((c) => c.id === chat.id);
    if (!chatExists) {
      setSelectedChat(null);
      setMessages([]);
      return;
    }

    setSelectedChat(chat);
    setMessages([]);

    try {
      const chatDetails = await fetchAPI(`chat/${chat.id}/`);
      if (chatDetails?.messages?.length) {
        const formattedMessages = chatDetails.messages.flatMap((message) => [
          { text: message.question, sender: "user" },
          { text: message.response, sender: "bot" },
        ]);
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error("حدث خطأ أثناء تحميل الرسائل:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !selectedChat || loading) return;
    setLoading(true);

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");

    try {
      const data = await fetchAPI("message/", "POST", {
        question: input,
        chat: selectedChat.id,
      });

      if (data && data.response) {
        setMessages((prev) => [
          ...prev,
          { text: data.response, sender: "bot" },
        ]);
      }
    } catch (error) {
      console.error("حدث خطأ أثناء إرسال الرسالة:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await fetchAPI(`chat/${chatId}/`, "DELETE");
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
      if (selectedChat?.id === chatId) {
        setSelectedChat(null);
        setMessages([]);
      }
      toast.success("تم حذف المحادثة بنجاح!");
    } catch (error) {
      console.error("حدث خطأ أثناء الحذف:", error);
    }
  };

  const handleAddChat = async () => {
    try {
      const newChat = await fetchAPI("chat/", "POST", {
        name: chatName || "محادثة جديدة",
        type: "type_1",
      });
      setChats((prev) => [newChat, ...prev]);
      setChatName("");
      toast.success("تمت إضافة المحادثة!");
    } catch (error) {
      console.error("خطأ في الإضافة:", error);
    }
  };

  const handleUpdateChat = async (chatId) => {
    if (!editChatName.trim()) {
      toast.error("اسم المحادثة لا يمكن أن يكون فارغًا!");
      return;
    }

    try {
      const updatedChat = await fetchAPI(`chat/${chatId}/`, "PUT", {
        name: editChatName,
        type: "type_1",
      });

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId ? { ...chat, ...updatedChat } : chat
        )
      );
      setEditingChatId(null);
      setEditChatName("");
      toast.success("تم تعديل المحادثة!");
    } catch (error) {
      console.error("خطأ أثناء التعديل:", error);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section
      dir="rtl"
      style={{ fontFamily: "Amiri, 'Scheherazade', serif" }}
      className="h-screen flex flex-col md:flex-row bg-[#f5f0e6] text-[#4b3f2f]"
    >
      <button
        className="md:hidden mt-28 bg-[#8b5e3c] text-white p-5 text-center"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "إغلاق القائمة" : "فتح القائمة"}
      </button>

      <div
        className={`w-full mt-24 md:w-1/4 bg-[#fff8ec] shadow-md p-4 border-r md:static absolute top-0 right-0 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex mt-10 justify-between items-center mb-4">
          <input
            type="text"
            placeholder="اسم المحادثة..."
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            className="border p-2 rounded w-full ml-2 text-right"
          />
          <button
            onClick={handleAddChat}
            className="bg-green-600 text-white p-2 rounded"
          >
            <FaPlus />
          </button>
        </div>

        <ul className="max-h-[400px] overflow-y-auto">
          {chats.length > 0 ? (
            chats.map((chat) => (
              <li
                key={chat.id}
                className={`flex justify-between items-center p-3 cursor-pointer rounded mb-2 ${
                  selectedChat?.id === chat.id
                    ? "bg-[#d9c8af]"
                    : "hover:bg-[#f2e7d5]"
                }`}
                onClick={() => handleSelectChat(chat)}
              >
                <span className="text-right">
                  <strong>{chat.name}</strong>
                  <p className="text-xs text-gray-500">
                    {format(new Date(chat.updated_at), "PPpp")}
                  </p>
                </span>
                <div className="relative">
                  <button
                    onClick={() =>
                      setMenuOpen(menuOpen === chat.id ? null : chat.id)
                    }
                    className="text-gray-600"
                  >
                    <FaEllipsisV />
                  </button>
                  {menuOpen === chat.id && (
                    <div className="absolute left-0 mt-2 w-40 z-40 bg-white shadow-md rounded-md py-1">
                      {editingChatId === chat.id ? (
                        <div className="flex p-2">
                          <input
                            type="text"
                            className="border p-1 rounded w-full text-right"
                            value={editChatName}
                            onChange={(e) => setEditChatName(e.target.value)}
                          />
                          <button
                            onClick={() =>
                              handleUpdateChat(chat.id) && setMenuOpen(false)
                            }
                            className="bg-blue-600 text-white p-1 rounded mr-1"
                          >
                            حفظ
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingChatId(chat.id);
                              setEditChatName(chat.name);
                            }}
                            className="flex items-center gap-2 px-3 py-1 text-blue-600 w-full hover:bg-gray-200"
                          >
                            <FaEdit /> تعديل
                          </button>
                          <button
                            onClick={() => handleDeleteChat(chat.id)}
                            className="flex items-center gap-2 px-3 py-1 text-red-600 w-full hover:bg-gray-200"
                          >
                            <FaTrash /> حذف
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">لا توجد محادثات بعد</p>
          )}
        </ul>
      </div>

      <div className="w-full md:w-3/4 flex flex-col items-center justify-center p-4">
        <div className="mt-24 bg-[#fdf8f1] p-6 w-full">
          <h2 className="text-2xl font-bold mt-10 mb-4 text-center text-[#8b5e3c]">
            {selectedChat ? selectedChat.name : "اختر محادثة"}
          </h2>

          <div
            ref={chatRef}
            className="h-[300px] overflow-y-auto p-3 rounded bg-[#f3efe7] mb-4 w-full"
          >
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-lg max-w-[80%] ${
                    msg.sender === "bot"
                      ? "bg-[#e5d6c3] self-start"
                      : "bg-[#d6e4d3] self-end mr-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">لا توجد رسائل بعد</p>
            )}
          </div>

          <div className="flex gap-2 w-full">
            <input
              type="text"
              className="border rounded p-2 w-full text-right"
              placeholder="اكتب رسالتك هنا..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={loading || !selectedChat}
            />
            <button
              className="bg-[#8b5e3c] text-white px-4 py-2 rounded disabled:opacity-50"
              onClick={handleSendMessage}
              disabled={loading || !selectedChat}
            >
              {loading ? "جارٍ الإرسال..." : "إرسال"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatComponent;
