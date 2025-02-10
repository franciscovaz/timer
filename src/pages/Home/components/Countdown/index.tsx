import { differenceInSeconds } from 'date-fns'
import { useState, useEffect } from 'react'
import { CountdownContainer, Separator } from './styles'

interface CountdownProps {
  activeCycle: any
  setCycles: any
}

export function Countdown({ activeCycle, setCycles }: CountdownProps) {
  const [passedSecondsAmount, setPassedSecondsAmount] = useState(0)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      const secondsDifference = differenceInSeconds(
        new Date(),
        activeCycle.startDate,
      )
      interval = setInterval(() => {
        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )
          setPassedSecondsAmount(totalSeconds)
          clearInterval(interval)
        } else {
          setPassedSecondsAmount(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>

      <Separator>:</Separator>

      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
