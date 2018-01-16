import React, { Component } from 'react';
import Grid from './Grid'

class Game extends Component {
  constructor(props) {
    super(props)

    const grid = []
    for (let i = 0; i < 20; i++) {
      grid.push(new Array(30).fill('lightblue'))
    }

    const bird = {
      height: 10,
      position: 2,
    }

    const towers = [
      { position: 3, height: 5, upright: true },
      { position: 7, height: 8, upright: false },
      { position: 10, height: 7, upright: true },
      { position: 14, height: 6, upright: false },
      { position: 18, height: 7, upright: true },
      { position: 22, height: 3, upright: false },
      { position: 26, height: 8, upright: true },
      { position: 29, height: 2, upright: false },
    ]

    grid[bird.height][bird.position] = 'yellow'

    this.state = { grid, bird, towers, crashed: false, score: 0, highscore: 0 }

    this.timerId = setInterval(() => {
      if (this.state.crashed) {
        return;
      }
      const gridCopy = []

      const towersCopy = this.state.towers.slice()

      for (let i = 0; i < 20; i++) {
        gridCopy.push(new Array(30).fill('lightblue'));
      }

      for (let i = 0; i < towersCopy.length; i++) {
        towersCopy[i].position--;

        if (towersCopy[i].position < 0) {
          towersCopy[i].position = 29
          towersCopy[i].height = Math.floor(Math.random() * 7 + 3);
        }
      }

      for (let i = 0; i < towersCopy.length; i++) {
        for (let j = 0; j < towersCopy[i].height; j++) {
          if (towersCopy[i].upright) {
            gridCopy[19 - j][towersCopy[i].position] = 'green'
          } else {
            gridCopy[j][towersCopy[i].position] = 'green'
          }
        }
      }

      const birdCopy = this.state.bird;
      birdCopy.height++
      let crashed = false
      if (birdCopy.height > 19 || birdCopy.height < 0) {
        birdCopy.height = 10
        this.updateHighscore(this.state.score)
        crashed = true
      }

      for (let i = 0; i < 20; i++) {
        if (gridCopy[i][2] === 'green' && birdCopy.height === i) {
          birdCopy.height = 10
          this.updateHighscore(this.state.score)
          crashed = true
        }
      }
      if (crashed === true) {
        this.setState({ crashed })
      }
      gridCopy[birdCopy.height][birdCopy.position] = 'yellow'

      this.setState({
        grid: gridCopy,
        bird: birdCopy,
        towers: towersCopy,
        score: this.state.score + 1,
      });
    }, 200);
  }

  handleClick() {
    if (!this.state.crashed) {
      const birdCopy = this.state.bird
      birdCopy.height -= 3;
      this.setState({ bird: birdCopy })
    }
  }

  updateHighscore(score) {
    console.log(score);
    if (score > this.state.highscore) {
      this.setState({ highscore: score })
    }
  }

  restart() {
    this.setState({ crashed: false, score: 0 })
  }

  render() {
    return (
      <div onClick={this.handleClick.bind(this)}>
        <Grid grid={this.state.grid} />
        {
          this.state.crashed ?
          <button onClick={this.restart.bind(this)}>Restart</button> :
          <p>Score: {this.state.score}</p>
        }
        <p>Highscore: {this.state.highscore}</p>
      </div>
    )
  }
}

export default Game;
