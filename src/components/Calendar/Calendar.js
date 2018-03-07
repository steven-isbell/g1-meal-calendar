import React, { Component } from "react";
import axios from "axios";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }
  async componentDidMount() {
    try {
      const res = await axios("/api/getEvents");
      console.log(res);
      this.setState({ events: res.data });
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    return (
      <div>
        {this.state.events[0] && <div>{this.state.events[0].meal_desc}</div>}
      </div>
    );
  }
}

export default Calendar;
