import React from "react";
import Display from "./components/display";

const keyToDrumSet = {
  Q: "crash-cymbal",
  W: "tom-1",
  E: "tom-2",
  A: "hi-hat",
  S: "snare-drum",
  D: "long-ride-cymbal",
  Z: "floor-tom",
  X: "bass-drum",
  C: "crash-cymbal-2"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioClip: "Press the key to play"
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.removeActiveClass = this.removeActiveClass.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.clickHandler);
    document.addEventListener("keyup", this.removeActiveClass);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.clickHandler);
    document.removeEventListener("keyup", this.removeActiveClass);
  }

  playSound(key) {
    const audioElement = document.getElementById(key);
    if (audioElement) {
      audioElement.currentTime = 0; // Reset for rapid replay
      audioElement.play();
    }
  }

  clickHandler(event) {
    const keyType = event.key.toUpperCase();
    const buttonType = document.getElementById(`audio-${keyType}`);

    if (buttonType) {
      buttonType.classList.add("active");
      this.playSound(keyType); // Play sound from the correct <audio>
    }
  }

  removeActiveClass(event) {
    const keyType = event.key.toUpperCase();
    const buttonType = document.getElementById(`audio-${keyType}`);

    if (buttonType) {
      buttonType.classList.remove("active");
    }
  }

  render() {
    return (
        <div id="drum-machine">
          <div id="pads-container">
            {Object.keys(keyToDrumSet).map((key) => (
                <button
                    key={key}
                    id={`audio-${key}`}
                    className="drum-pad"
                    onClick={() => {
                      this.setState({
                        audioClip: keyToDrumSet[key]
                      });
                      this.playSound(key)
                    }
                }
                >
                  {key}
                  <audio
                      id={key}
                      className="clip"
                      src={`/audio-clips/${keyToDrumSet[key]}.mp3`}
                  ></audio>
                </button>
            ))}
          </div>
          <div id="dashboard">
            <Display audioClip={this.state.audioClip} />
          </div>
        </div>
    );
  }
}

export default App;
