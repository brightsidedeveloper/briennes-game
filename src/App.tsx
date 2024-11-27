import { useEffect, useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const [autoTaps, setAutoTaps] = useState(0)

  const [nextMutliCost, setNextMutliCost] = useState(10)
  const [nextAutoCost, setNextAutoCost] = useState(50)

  const buyTapMulti = () => {
    if (count >= nextMutliCost) {
      setCount((curr) => curr - nextMutliCost)
      setMultiplier((curr) => curr + 0.5) // Smooth multiplier growth
      setNextMutliCost((curr) => Math.ceil(curr * 1.5)) // Gradual scaling
    }
  }

  const buyAutoTaps = () => {
    if (count >= nextAutoCost) {
      setCount((curr) => curr - nextAutoCost)
      setAutoTaps((curr) => curr + 1)
      setNextAutoCost((curr) => Math.ceil(curr * 1.75)) // Slightly faster scaling
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((curr) => curr + autoTaps * multiplier) // Factor in multiplier
    }, 500)

    return () => clearInterval(interval)
  }, [autoTaps, multiplier])

  return (
    <div className="flex flex-col gap-4 items-center p-4 h-dvh">
      <h1 className="text-4xl font-bold text-red-500">Welcome to DCTR</h1>
      <p className="text-lg text-center text-blue-500">
        <span className="font-bold underline text-green-500">Brienne's</span> personal daily cat tap routine!
      </p>

      <span>
        <span className="font-bold text-base">Score:</span> {count}
      </span>

      <div className="w-full">
        <p>Multiplier: {multiplier}</p>
        <p>Auto Taps: {autoTaps}</p>
      </div>

      <button className="hover:scale-105 " onClick={() => setCount((curr) => curr + 1 * multiplier)}>
        <img src="/cat.jpg" alt="logo" className="rounded-2xl shadow-2xl w-44" />
      </button>

      <div className="w-full mt-auto">
        <h3 className="text-md font-semibold">Upgrades:</h3>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={buyTapMulti}>
            Tap Multiplier <br /> Cost: {nextMutliCost}
          </button>
          <button onClick={buyAutoTaps}>
            Auto Taps
            <br /> Cost: {nextAutoCost}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
