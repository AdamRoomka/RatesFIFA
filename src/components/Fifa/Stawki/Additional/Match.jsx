import React from "react";

class Match extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.guess1 !== undefined && this.props.guess2 !== undefined) {
      this.state = { score1: this.props.guess1, score2: this.props.guess2 };
    }
    this.setScore = this.setScore.bind(this);
  }
  setScore(value, type, matchId) {
    if (value === "") return;

    if (type === 1) {
      if (this.state.score1 !== null && this.state.score2 !== null) {
        this.props.passScore(matchId, value, this.state.score2);
      }
      this.setState({ score1: value });
    } else {
      if (this.state.score1 !== null && this.state.score2 !== null) {
        this.props.passScore(matchId, this.state.score1, value);
      }
      this.setState({ score2: value });
    }
  }

  render() {
    return (
      <div className="wyniki">
        <div className="empty"></div>
        <h4 className="flex text1">{this.props.name1}</h4>

        <h3 className="matchTime">{this.props.time}</h3>
        <input
          className="number1 numer"
          type="number"
          id="first"
          placeholder="0"
          min="0"
          onChange={(e) => this.setScore(e.target.value, 1, this.props.matchId)}
          defaultValue={this.props.guess1}
        />
        <h2 className="vs">:</h2>
        <input
          className="number2 numer"
          type="number"
          placeholder="0"
          min="0"
          onChange={(e) => this.setScore(e.target.value, 2, this.props.matchId)}
          defaultValue={this.props.guess2}
        />

        <h6 className="matchData">{this.props.date}</h6>
        <h4 className="flex text2">{this.props.name2}</h4>
      </div>
    );
  }
}

export default Match;
