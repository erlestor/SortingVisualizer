import React from "react"

import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ButtonGroup,
  Button,
  Slider,
  Typography,
} from "@material-ui/core"

const Menu = ({
  alg,
  setAlg,
  sortValues,
  scrambleValues,
  numberOfValues,
  setNumberOfValues,
}) => {
  return (
    <Grid
      container
      item
      xs={12}
      align="center"
      justifyContent="center"
      alignItems="center"
      spacing={4}
    >
      <Grid item>
        <FormControl style={{ width: "200px" }}>
          <InputLabel>Pick an Algorithm</InputLabel>
          <Select
            value={alg}
            onChange={(e) => setAlg(e.target.value)}
            style={{ textAlign: "left" }}
          >
            <MenuItem value={"bubble"}>Bubble Sort</MenuItem>
            <MenuItem value={"merge"}>Merge Sort</MenuItem>
            <MenuItem value={"quick"}>Quick Sort</MenuItem>
            <MenuItem value={"heap"}>Heap Sort</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <ButtonGroup variant="contained">
          <Button color="primary" onClick={sortValues}>
            Visualize Algorithm
          </Button>
          <Button color="secondary" onClick={scrambleValues}>
            Scramble data
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <Typography variant="h6">Number of values</Typography>
        <Slider
          value={numberOfValues}
          step={10}
          marks
          min={10}
          max={100}
          valueLabelDisplay="auto"
          onChange={(e, newValue) => setNumberOfValues(newValue)}
        />
      </Grid>
    </Grid>
  )
}

export default Menu
