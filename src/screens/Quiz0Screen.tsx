import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenLayout } from '../components/ScreenLayout'
import { PrimaryButton } from '../components/PrimaryButton'
import { track } from '../lib/analytics'
import './Quiz0Screen.css'

export const Quiz0Screen: React.FC = () => {
  const navigate = useNavigate()
  const hasTrackedView = useRef(false)

  useEffect(() => {
    if (!hasTrackedView.current) {
      track('view_quiz')
      hasTrackedView.current = true
    }
  }, [])

  const handleStartQuiz = () => {
    track('clicked_start_quiz')
    navigate('/quiz1')
  }

  return (
    <ScreenLayout>
      <div className="quiz0-screen">
        <p className="quiz0-screen__text">
          For best experience,<br />
          we <span className="quiz0-screen__highlight">personalize the<br />
          course</span> to suit you<br />
          and your partner's<br />
          preferences
        </p>
        <PrimaryButton onClick={handleStartQuiz}>Start a Short Quiz</PrimaryButton>
      </div>
    </ScreenLayout>
  )
}

