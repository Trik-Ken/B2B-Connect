import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Phone, Lock } from 'lucide-react'
import { companyInfo } from '../data/mockData'
import Toast from '../components/Toast'

const SecuritySettings = () => {
  const navigate = useNavigate()

  // State for forms
  const [emailData, setEmailData] = useState({
    current: companyInfo.email,
    new: '',
    confirm: '',
  })
  const [phoneData, setPhoneData] = useState({
    current: companyInfo.phone,
    new: '',
  })
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  // State for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // State for toast notifications
  const [toastInfo, setToastInfo] = useState({
    show: false,
    title: '',
    message: '',
  })

  const showToast = (title, message) => {
    setToastInfo({ show: true, title, message })
  }

  const handleUpdateEmail = e => {
    e.preventDefault()
    if (!emailData.new || !emailData.confirm) {
      showToast('Error', 'Please fill in all email fields.')
      return
    }
    if (emailData.new !== emailData.confirm) {
      showToast('Error', 'New emails do not match.')
      return
    }
    companyInfo.email = emailData.new
    setEmailData({ ...emailData, current: emailData.new, new: '', confirm: '' })
    showToast('Success', 'Your email has been updated.')
  }

  const handleUpdatePhone = e => {
    e.preventDefault()
    if (!phoneData.new) {
      showToast('Error', 'Please enter a new phone number.')
      return
    }
    companyInfo.phone = phoneData.new
    setPhoneData({ ...phoneData, current: phoneData.new, new: '' })
    showToast('Success', 'Your phone number has been updated.')
  }

  const handleUpdatePassword = e => {
    e.preventDefault()
    if (
      !passwordData.current ||
      !passwordData.new ||
      !passwordData.confirm
    ) {
      showToast('Error', 'Please fill in all password fields.')
      return
    }
    if (passwordData.current !== companyInfo.password) {
      showToast('Error', 'Current password is incorrect.')
      return
    }
    if (passwordData.new !== passwordData.confirm) {
      showToast('Error', 'New passwords do not match.')
      return
    }
    companyInfo.password = passwordData.new
    setPasswordData({ current: '', new: '', confirm: '' })
    showToast('Success', 'Your password has been updated.')
  }

  return (
    <div className="flex h-full flex-col bg-gray-100/50 dark:bg-gray-900">
      <header className="bg-white p-5 shadow-sm dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-blue-500">ConTrad</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Change Email Card */}
          <form
            onSubmit={handleUpdateEmail}
            className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800"
          >
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Change Email
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Update the email address associated with your account.
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Current Email
                </label>
                <input
                  type="email"
                  disabled
                  value={emailData.current}
                  className="w-full rounded-md border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  New Email
                </label>
                <input
                  type="email"
                  placeholder="your.new.email@example.com"
                  value={emailData.new}
                  onChange={e =>
                    setEmailData({ ...emailData, new: e.target.value })
                  }
                  className="w-full rounded-md border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm New Email
                </label>
                <input
                  type="email"
                  placeholder="confirm.new.email@example.com"
                  value={emailData.confirm}
                  onChange={e =>
                    setEmailData({ ...emailData, confirm: e.target.value })
                  }
                  className="w-full rounded-md border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-600"
              >
                Update Email
              </button>
            </div>
          </form>

          {/* Change Phone Card */}
          <form
            onSubmit={handleUpdatePhone}
            className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800"
          >
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Change Phone Number
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Update the phone number for your account.
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Current Phone Number
                </label>
                <input
                  type="tel"
                  disabled
                  value={phoneData.current}
                  className="w-full rounded-md border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  New Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your new phone number"
                  value={phoneData.new}
                  onChange={e =>
                    setPhoneData({ ...phoneData, new: e.target.value })
                  }
                  className="w-full rounded-md border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-600"
              >
                Update Phone
              </button>
            </div>
          </form>

          {/* Change Password Card */}
          <form
            onSubmit={handleUpdatePassword}
            className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800"
          >
            <div className="flex items-start space-x-4">
              <Lock className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Change Password
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Choose a strong password to protect your account.
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="relative">
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Current Password
                </label>
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={passwordData.current}
                  onChange={e =>
                    setPasswordData({
                      ...passwordData,
                      current: e.target.value,
                    })
                  }
                  className="w-full rounded-md border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-500 dark:text-gray-400"
                >
                  {showCurrentPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              <div className="relative">
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  New Password
                </label>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwordData.new}
                  onChange={e =>
                    setPasswordData({ ...passwordData, new: e.target.value })
                  }
                  className="w-full rounded-md border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-500 dark:text-gray-400"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="relative">
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm New Password
                </label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={passwordData.confirm}
                  onChange={e =>
                    setPasswordData({
                      ...passwordData,
                      confirm: e.target.value,
                    })
                  }
                  className="w-full rounded-md border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-500 dark:text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-600"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
      {toastInfo.show && (
        <Toast
          title={toastInfo.title}
          message={toastInfo.message}
          onClose={() => setToastInfo({ ...toastInfo, show: false })}
        />
      )}
    </div>
  )
}

export default SecuritySettings 