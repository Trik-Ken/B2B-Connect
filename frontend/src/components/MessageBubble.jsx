import { Clock, Check, CheckCheck, Download, FileText, Image as ImageIcon, Video } from 'lucide-react'

const AttachmentDisplay = ({ attachment }) => {
  if (!attachment || !attachment.type) {
    return null
  }

  const isImage = attachment.type.startsWith('image/')
  const isVideo = attachment.type.startsWith('video/')
  const fileUrl = attachment.url || null

  const renderContent = () => {
    if (fileUrl && isImage) {
      return (
        <img
          src={fileUrl}
          alt={attachment.name}
          className="max-w-full h-auto rounded-lg mt-2"
        />
      )
    }
    if (fileUrl && isVideo) {
      return (
        <video controls src={fileUrl} className="max-w-full rounded-lg mt-2">
          Your browser does not support the video tag.
        </video>
      )
    }
    
    return (
      <div className="flex items-center space-x-3 p-3 mt-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
        <FileText className="h-8 w-8 text-gray-600 dark:text-gray-300 flex-shrink-0" />
        <div className="flex-1 overflow-hidden">
          <p className="font-semibold text-sm truncate">{attachment.name}</p>
          {attachment.size &&
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {(attachment.size / 1024).toFixed(2)} KB
            </p>
          }
        </div>
        {fileUrl && (
            <a href={fileUrl} download={attachment.name} className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 flex-shrink-0">
              <Download size={20} />
            </a>
        )}
      </div>
    )
  }

  return renderContent()
}


const MessageBubble = ({ message }) => {
  const isMe = message.sender === 'me'
  const messageDate = new Date(message.timestamp)

  const statusIcon =
    message.status === 'sent' ? (
      <Check size={16} className="text-gray-500" />
    ) : message.status === 'delivered' ? (
      <CheckCheck size={16} className="text-gray-500" />
    ) : message.status === 'read' ? (
      <CheckCheck size={16} className="text-blue-500" />
    ) : (
      <Clock size={16} className="text-gray-500" />
    )

  return (
    <div
      className={`flex items-end space-x-2 my-2 ${
        isMe ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`flex max-w-xs flex-col rounded-lg px-3 py-2 md:max-w-md ${
          isMe
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-200 shadow-sm'
        }`}
      >
        {message.message && <p className="text-sm break-words">{message.message}</p>}
        {message.attachment && <AttachmentDisplay attachment={message.attachment} />}
        <div className="mt-1 flex items-center justify-end space-x-1 self-end">
          <span
            className={`text-xs ${
              isMe
                ? 'text-blue-200'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </span>
          {isMe && statusIcon}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble 