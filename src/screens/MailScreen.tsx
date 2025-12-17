import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenLayout } from '../components/ScreenLayout'
import { PrimaryButton } from '../components/PrimaryButton'
import { track } from '../lib/analytics'
import { useFunnelStore } from '../store/funnelStore'
import './MailScreen.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const MailScreen: React.FC = () => {
  const navigate = useNavigate()
  const hasTrackedView = useRef(false)
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false)
  const setEmailStore = useFunnelStore((state) => state.setEmail)

  useEffect(() => {
    if (!hasTrackedView.current) {
      track('view_mail')
      hasTrackedView.current = true
    }
  }, [])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setIsValid(EMAIL_REGEX.test(value))
  }

  const handleEmailFocus = () => {
    track('mail_input_click')
  }

  const handleSubmit = () => {
    if (isValid) {
      setEmailStore(email)
      track('clicked_mail_complete', { email })
      navigate('/price-standart')
    } else {
      setHasTriedSubmit(true)
    }
  }

  return (
    <ScreenLayout>
      <div className="mail-screen">
        <h2 className="mail-screen__title">
          Enter email<br />
          <span className="mail-screen__highlight">to access</span> your plan:
        </h2>
        <input
          type="email"
          className={`mail-screen__input ${!isValid && hasTriedSubmit ? 'mail-screen__input--error' : ''}`}
          placeholder="Your email"
          value={email}
          onChange={handleEmailChange}
          onFocus={handleEmailFocus}
        />
        <PrimaryButton onClick={handleSubmit} disabled={!isValid}>
          Get my plan
        </PrimaryButton>
      </div>
    </ScreenLayout>
  )
}

