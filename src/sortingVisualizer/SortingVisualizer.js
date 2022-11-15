import React, { useState, useEffect } from "react"
import "./sortingVisualizer.scss"
import { Grid, Typography } from "@material-ui/core"
import Menu from "./Menu"

import { bubbleSort } from "./algs/bubbleSort"
import { mergeSort } from "./algs/mergeSort"
import { quickSort } from "./algs/quickSort"
import { heapSort } from "./algs/heapSort"

const SortingVisualizer = () => {
  const [alg, setAlg] = useState("bubble")
  const [values, setValues] = useState([])
  const [algActive, setAlgActive] = useState(false)
  const [sorted, setSorted] = useState(false)
  const [numberOfValues, setNumberOfValues] = useState(50)
  const [numberOfSwaps, setNumberOfSwaps] = useState(0)
  const [executionTime, setExecutionTime] = useState(0)

  const canvasWidth = Math.floor(window.innerWidth - 50)
  const canvasHeight = Math.floor(window.innerHeight - 250)
  const cellWidth = Math.floor(canvasWidth / numberOfValues)

  useEffect(() => {
    scrambleValues()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfValues, alg])

  const scrambleValues = () => {
    if (algActive) return

    setNumberOfSwaps(0)
    setExecutionTime(0)

    const newValues = []
    for (let i = 0; i < numberOfValues; i++) {
      // 1 - 100 (inkludert begge)
      const randomInt = Math.floor(Math.random() * 100) + 1
      newValues.push(randomInt)
    }
    setValues(newValues)
    setSorted(false)
  }

  const sortValues = () => {
    if (algActive) return
    if (sorted) return
    setAlgActive(true)

    const pickAlg = {
      bubble: [bubbleSort, 1],
      merge: [mergeSort, 0.4],
      quick: [quickSort, 0.2],
    }

    const result = pickAlg[alg]

    const startTime = performance.now()
    let swaps = result[0](values)
    const endTime = performance.now()
    setExecutionTime(endTime - startTime)
    setNumberOfSwaps(swaps.length)

    let speed_multiplier = result[1]

    const newValues = values.slice()

    const time_per_action = Math.max(
      0.1,
      200 / values.length / speed_multiplier
    )

    for (let n = 0; n < swaps.length; n++) {
      animateSwap(swaps, time_per_action, newValues, n)
    }

    setTimeout(() => {
      setAlgActive(false)
    }, time_per_action * ((swaps.length - 1) * 3 + 3))

    setValues(newValues)
    setSorted(true)
  }

  const changeClass = (indices, className) => {
    for (let n = 0; n < indices.length; n++) {
      document.getElementById(`value-${indices[n]}`).className = className
    }
  }

  const animateSwap = (swaps, time_per_action, newValues, n) => {
    const i1 = swaps[n][0]
    const i2 = swaps[n][1]
    const idx = swaps[n][0]
    const newVal = swaps[n][1]

    setTimeout(() => {
      if (n > 0 && swaps[n - 1].length > 2) {
        const old_pivot_idx = swaps[n - 1][2]
        changeClass([old_pivot_idx], "value")
      }
      if (swaps[n].length > 2) {
        const pivot_idx = swaps[n][2]
        changeClass([pivot_idx], "value pivot")
      }
      alg === "merge"
        ? changeClass([idx], "value switching")
        : changeClass([i1, i2], "value switching")
    }, n * 3 * time_per_action)

    setTimeout(() => {
      alg === "merge" ? setValue(newValues, idx, newVal) : swapValues(i1, i2)
    }, n * 3 * time_per_action + time_per_action)

    setTimeout(() => {
      alg === "merge"
        ? changeClass([idx], "value")
        : changeClass([i1, i2], "value")
    }, n * 3 * time_per_action + 2 * time_per_action)
  }

  const setValue = (values, i, newVal) => {
    // bytter verdi
    values[i] = newVal

    // bytter høyde
    const newHeight = Math.floor((newVal * canvasHeight) / 100)
    document.getElementById(`value-${i}`).style.height = `${newHeight}px`
  }

  const swapValues = (i1, i2) => {
    // bytter verdi
    const oldValue = values[i1]
    values[i1] = values[i2]
    values[i2] = oldValue

    // bytter høyde
    const el1 = document.getElementById(`value-${i1}`)
    const el2 = document.getElementById(`value-${i2}`)
    const h1 = el1.style.height
    el1.style.height = el2.style.height
    el2.style.height = h1
  }

  return (
    <Grid container id="sorting" direction="column" alignItems="center">
      <Typography variant="h4" style={{ textAlign: "center", margin: "10px" }}>
        Sorting visualizer
      </Typography>
      <Menu
        sortValues={sortValues}
        scrambleValues={scrambleValues}
        alg={alg}
        setAlg={setAlg}
        numberOfValues={numberOfValues}
        setNumberOfValues={setNumberOfValues}
      />
      <Grid
        item
        xs={12}
        align="center"
        className="container"
        style={{
          minHeight: `${canvasHeight}px`,
          width: `${canvasWidth}px`,
        }}
      >
        {values.map((val, vidx) => {
          const height = Math.floor((val * canvasHeight) / 100)
          return (
            <div
              key={vidx}
              id={`value-${vidx}`}
              className="value"
              style={{ height: height, width: cellWidth }}
            />
          )
        })}
      </Grid>
      {sorted && (
        <Grid item>
          <Typography
            variant="h5"
            style={{ textAlign: "center", margin: "10px" }}
          >
            Number of swaps: {numberOfSwaps}
          </Typography>
          <Typography
            variant="h5"
            style={{ textAlign: "center", margin: "10px" }}
          >
            Execution time: {executionTime} ms
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default SortingVisualizer
