import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenLayout } from '../components/ScreenLayout'
import { PrimaryButton } from '../components/PrimaryButton'
import { track } from '../lib/analytics'
import './StartScreen.css'

export const StartScreen: React.FC = () => {
  const navigate = useNavigate()
  const hasTrackedView = useRef(false)

  useEffect(() => {
    if (!hasTrackedView.current) {
      track('view_start_screen')
      hasTrackedView.current = true
    }
  }, [])

  const handleContinue = () => {
    track('clicked_continue')
    navigate('/quiz0')
  }

  return (
    <ScreenLayout>
      <div className="start-screen">
        <h1 className="start-screen__title">
          Improve your <span className="start-screen__highlight">sexual experience</span>
        </h1>
        <div className="start-screen__topics">
          <div className="start-screen__topic">poses</div>
          <div className="start-screen__topic">intimate massage</div>
          <div className="start-screen__topic">NLP methods</div>
          <div className="start-screen__topic">practical tips</div>
          <div className="start-screen__topic">seduction techniques</div>
        </div>
        <PrimaryButton onClick={handleContinue}>CONTINUE &gt;&gt;</PrimaryButton>
      </div>
    </ScreenLayout>
  )
}

