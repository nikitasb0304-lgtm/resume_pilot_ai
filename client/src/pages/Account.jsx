import React from 'react'
import { useAuth } from '../hooks/useAuth'

const Account = () => {
  const { user } = useAuth()

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Account Settings</h2>
      <p className="mt-2 text-gray-600">Manage account & subscription</p>
      <div className="mt-4 border p-4 rounded">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>
    </div>
  )
}

export default Account