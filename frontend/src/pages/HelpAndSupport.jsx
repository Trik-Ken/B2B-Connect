import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, MessageSquare } from 'lucide-react'
import { companyInfo } from '../data/mockData'

const FaqItem = ({ faq, open, onToggle }) => (
  <div className="border-b border-gray-200 py-4 dark:border-gray-700">
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between text-left"
    >
      <span className="font-semibold text-gray-800 dark:text-white">
        {faq.question}
      </span>
      <ChevronDown
        className={`transform text-gray-500 transition-transform duration-300 ${
          open ? 'rotate-180' : ''
        }`}
      />
    </button>
    <div
      className={`grid transition-all duration-300 ease-in-out ${
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="overflow-hidden">
        <p className="pt-2 text-gray-600 dark:text-gray-400">{faq.answer}</p>
      </div>
    </div>
  </div>
)

const HelpAndSupport = () => {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)
  const [message, setMessage] = useState('')

  const faqs = [
    {
      question: 'How do I update my company profile?',
      answer:
        'You can update your company profile by navigating to Profile > Settings > Manage Company & Products. There you can edit your company details and manage your listed products.',
    },
    {
      question: 'How can I list a new product?',
      answer:
        'To list a new product, go to Profile > Settings > Manage Company & Products and click the "Add New Product" button. This will open a modal where you can fill in all the product details.',
    },
    {
      question: 'What is the return policy for products?',
      answer:
        'Return policies are set by the individual sellers on our platform. Please check the product details page for specific information regarding a product\'s return policy or contact the seller directly through our chat feature.',
    },
    {
      question: 'How does the chat functionality work?',
      answer:
        'The chat functionality allows you to communicate directly with other businesses. You can start a new chat from a product page or view your existing conversations in the Chat tab. You will receive notifications for new messages.',
    },
    {
      question: 'I forgot my password. How can I reset it?',
      answer:
        'To reset your password, go to Profile > Settings > Security & Login. You will find an option to change your password after verifying your current password.',
    },
  ]

  const handleToggleFaq = index => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleSendMessage = e => {
    e.preventDefault()
    // Handle message sending logic here
    console.log('Message sent:', {
      email: companyInfo.email,
      message,
    })
    setMessage('')
    // Optionally, show a success toast
  }

  return (
    <div className="flex h-full flex-col bg-gray-100/50 dark:bg-gray-900">
      <header className="bg-white p-5 shadow-sm dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-blue-500">ConTrad</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* FAQ Section */}
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Find answers to common questions about using ConTrad.
            </p>
            <div className="mt-4">
              {faqs.map((faq, index) => (
                <FaqItem
                  key={index}
                  faq={faq}
                  open={openFaq === index}
                  onToggle={() => handleToggleFaq(index)}
                />
              ))}
            </div>
          </div>

          {/* Contact Support Section */}
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="flex items-start space-x-4">
              <MessageSquare className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Contact Customer Support
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  If you can't find an answer in the FAQs, please send us a
                  message.
                </p>
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Your Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  disabled
                  value={companyInfo.email}
                  className="w-full rounded-md border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  We'll use this email to respond to your inquiry.
                </p>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Please describe your issue or question in detail..."
                  className="w-full rounded-md border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                ></textarea>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-600"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpAndSupport 