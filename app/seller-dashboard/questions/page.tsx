"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { formatDistanceToNow } from "date-fns"
import { useToast } from "@/hooks/use-toast"

// Sample data
const initialQuestions = [
  {
    id: 1,
    customer: { name: "Sarah Wilson", initials: "SW" },
    product: "Chocolate Fudge Cake",
    question: "Is this cake suitable for someone with a nut allergy?",
    date: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    status: "Unanswered",
  },
  {
    id: 2,
    customer: { name: "Michael Brown", initials: "MB" },
    product: "Assorted Macarons",
    question: "How long do these macarons stay fresh?",
    date: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    status: "Unanswered",
  },
  {
    id: 3,
    customer: { name: "Emily Davis", initials: "ED" },
    product: "Strawberry Cheesecake",
    question: "Can I order this in a smaller size?",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: "Answered",
    answer: "Yes, we offer a mini version (4-inch) of our cheesecakes. You can select the size option when ordering.",
    answerDate: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
  },
  {
    id: 4,
    customer: { name: "James Wilson", initials: "JW" },
    product: "Vegan Chocolate Cookies",
    question: "Are these cookies made in a facility that also processes dairy?",
    date: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
    status: "Answered",
    answer:
      "Our vegan cookies are made in a separate area of our kitchen, but our facility does handle dairy products. We take precautions to avoid cross-contamination, but cannot guarantee they are 100% free from traces.",
    answerDate: new Date(Date.now() - 1000 * 60 * 60 * 30), // 30 hours ago
  },
  {
    id: 5,
    customer: { name: "Olivia Johnson", initials: "OJ" },
    product: "Tiramisu Cup",
    question: "What kind of coffee do you use in your tiramisu?",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    status: "Answered",
    answer: "We use a premium Italian espresso in our tiramisu for an authentic flavor profile.",
    answerDate: new Date(Date.now() - 1000 * 60 * 60 * 45), // 45 hours ago
  },
]

export default function QuestionsPage() {
  const { toast } = useToast()
  const [questions, setQuestions] = useState(initialQuestions)
  const [answerText, setAnswerText] = useState("")
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  const handleAnswer = (questionId) => {
    if (!answerText.trim()) return

    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              status: "Answered",
              answer: answerText,
              answerDate: new Date(),
            }
          : q,
      ),
    )

    setAnswerText("")
    setSelectedQuestion(null)

    toast({
      title: "Answer submitted",
      description: "Your answer has been sent to the customer.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Customer Questions</h2>
        <p className="text-muted-foreground">Answer customer questions about your products</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-end justify-between">
        <div className="grid gap-2 w-full sm:max-w-[360px]">
          <Input placeholder="Search questions by product or customer..." />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:flex">
          <TabsTrigger value="all" className="flex-1 sm:flex-auto">
            All Questions
          </TabsTrigger>
          <TabsTrigger value="unanswered" className="flex-1 sm:flex-auto">
            Unanswered
          </TabsTrigger>
          <TabsTrigger value="answered" className="flex-1 sm:flex-auto">
            Answered
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-4">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onAnswer={() => setSelectedQuestion(question)}
              selectedQuestion={selectedQuestion}
              answerText={answerText}
              setAnswerText={setAnswerText}
              handleAnswer={handleAnswer}
            />
          ))}
        </TabsContent>

        <TabsContent value="unanswered" className="mt-4 space-y-4">
          {questions
            .filter((q) => q.status === "Unanswered")
            .map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onAnswer={() => setSelectedQuestion(question)}
                selectedQuestion={selectedQuestion}
                answerText={answerText}
                setAnswerText={setAnswerText}
                handleAnswer={handleAnswer}
              />
            ))}
        </TabsContent>

        <TabsContent value="answered" className="mt-4 space-y-4">
          {questions
            .filter((q) => q.status === "Answered")
            .map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onAnswer={() => setSelectedQuestion(question)}
                selectedQuestion={selectedQuestion}
                answerText={answerText}
                setAnswerText={setAnswerText}
                handleAnswer={handleAnswer}
              />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function QuestionCard({ question, onAnswer, selectedQuestion, answerText, setAnswerText, handleAnswer }) {
  const isSelected = selectedQuestion && selectedQuestion.id === question.id

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={`/placeholder.svg?text=${question.customer.initials}`} alt={question.customer.name} />
              <AvatarFallback>{question.customer.initials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{question.customer.name}</CardTitle>
              <div className="text-sm text-muted-foreground">
                {formatDistanceToNow(question.date, { addSuffix: true })}
              </div>
            </div>
          </div>
          <Badge variant={question.status === "Unanswered" ? "outline" : "default"}>{question.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Product: {question.product}</h4>
          <div className="border rounded-lg p-3 bg-muted/50">
            <p className="text-sm">{question.question}</p>
          </div>
        </div>

        {question.status === "Answered" && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Your Answer:</h4>
            <div className="border rounded-lg p-3">
              <p className="text-sm">{question.answer}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Answered {formatDistanceToNow(question.answerDate, { addSuffix: true })}
              </p>
            </div>
          </div>
        )}

        {question.status === "Unanswered" && !isSelected && (
          <Button size="sm" onClick={onAnswer}>
            Answer Question
          </Button>
        )}

        {isSelected && (
          <div className="space-y-3">
            <Textarea
              placeholder="Type your answer here..."
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleAnswer(question.id)}>
                Submit Answer
              </Button>
              <Button variant="outline" size="sm" onClick={() => setAnswerText("")}>
                Clear
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

