"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { MessageCircle, X, Send, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Xin chào! Tôi là trợ lý ảo của CineMax. Tôi có thể giúp gì cho bạn?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const quickReplies = ["Phim đang chiếu", "Giá vé", "Địa chỉ rạp", "Khuyến mãi"]

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("phim") || lowerInput.includes("chiếu")) {
      return "Hiện tại chúng tôi đang chiếu các phim: Avengers: Endgame, The Batman, Spider-Man: No Way Home và nhiều phim khác. Bạn có thể xem danh sách đầy đủ tại trang Phim."
    }
    if (lowerInput.includes("giá") || lowerInput.includes("vé")) {
      return "Giá vé của chúng tôi: Ghế thường 100.000đ, Ghế VIP 150.000đ. Có nhiều chương trình khuyến mãi hấp dẫn!"
    }
    if (lowerInput.includes("địa chỉ") || lowerInput.includes("rạp")) {
      return "CineMax có nhiều cụm rạp tại Hà Nội, TP.HCM và các tỉnh thành. Vui lòng cho biết bạn muốn tìm rạp ở đâu?"
    }
    if (lowerInput.includes("khuyến mãi") || lowerInput.includes("giảm giá")) {
      return "Hiện tại chúng tôi có chương trình giảm 20% cho vé đặt online vào thứ 3 và thứ 4 hàng tuần!"
    }

    return "Cảm ơn bạn đã liên hệ! Tôi sẽ chuyển câu hỏi của bạn đến bộ phận hỗ trợ. Bạn có thể gọi hotline 1900 1234 để được hỗ trợ nhanh hơn."
  }

  const handleQuickReply = (reply: string) => {
    setInputValue(reply)
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg shadow-primary/20 transition-transform hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-[380px] border-border shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border bg-primary/5 pb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">Trợ lý CineMax</CardTitle>
                <p className="text-xs text-muted-foreground">Luôn sẵn sàng hỗ trợ</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-[400px] space-y-4 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                    )}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="border-t border-border p-4">
                <p className="mb-2 text-xs text-muted-foreground">Câu hỏi thường gặp:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <Button
                      key={reply}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(reply)}
                      className="bg-transparent text-xs"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Nhập tin nhắn..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button size="icon" onClick={handleSendMessage} disabled={!inputValue.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
