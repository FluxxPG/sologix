"use client";
import React, { Component } from "react";
import Cards from "../../components/reat-credit-card";


class Creditcard extends Component {
  timeoutID;
  constructor(props) {
    super(props);

    this.state = {
      cvc: "",
      expiry: "",
      expiryyear: "",
      focus: "",
      name: "",
      number: ""
    };
  }

  setup = () => {
    window.addEventListener("keypress", this.resetTimer);
    window.addEventListener("keyup", this.resetTimer);
    window.addEventListener("scroll", this.resetTimer);
    window.addEventListener("keydown", this.resetTimer);
    window.addEventListener("mousemove", this.resetTimer);
    window.addEventListener("mousewheel", this.resetTimer);
    window.addEventListener("mousedown", this.resetTimer);
    window.addEventListener("touchmove", this.resetTimer);
    window.addEventListener("MSPointerMove", this.resetTimer);
    window.addEventListener("DOMMouseScroll", this.resetTimer);
    window.addEventListener(onscroll, this.resetTimer);
    this.startTimer();
  };

  goInactive() {
    alert("Your Session expired. Please refresh the page.");
    sessionStorage.clear();
  }

  goActive() {
    this.startTimer();
  }

  resetTimer() {
    window.clearTimeout(this.timeoutID);
    this.goActive();
  }

  startTimer() {
    this.timeoutID = window.setTimeout(this.goInactive, 60000 * 30);
  }

  submit = (e) => {
    sessionStorage.setItem("user", JSON.stringify(this.state));
    e.preventDefault();
    this.setState({
      name: "",
      number: "",
      cvc: "",
      expiry: "",
      expiryyear: "",
      focus: ""
    });
  };

  removeSpecial = (e) => {
    const invalidChars = ["-", "+", "e", "E", " ", "."];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  };

  addSpace = (e) => {
    const { value, id } = e.target;
    const ele = document.getElementById(id);
    if (value.length === 4 || value.length === 9 || value.length === 14)
      ele.value = ele.value.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
  };

  componentDidMount() {
    this.setup();
    setInterval(() => {
      const hours = 0.5;
      const now = new Date().getTime();
      const setupTime = sessionStorage.getItem("setupTime");

      if (!setupTime) {
        sessionStorage.setItem("setupTime", now);
      } else if (now - setupTime > hours * 60 * 60 * 1000) {
        sessionStorage.clear();
        sessionStorage.setItem("setupTime", now);
      }
    }, 1000);
  }

  validateInput = (e) => {
    const { name, value, maxLength, id } = e.target;
    let temp, ele;

    if (id === "cvv") {
      if (value.length > maxLength) {
        temp = value.slice(0, maxLength);
        ele = document.getElementById(id);
        ele.value = temp;
        this.setState({ [name]: temp });
      } else {
        this.setState({ [name]: value });
      }
    } else {
      ele = document.getElementById(id);
      ele.value = ele.value.replace(
        /[A-Za-z}"`~_=.\->\]|<?+*/,;\[:{\\!@#\/'$%^&*()]/g,
        ""
      );
      this.setState({ [name]: ele.value });
    }
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value, id } = e.target;

    if (id === "cardHolder") {
      const ele = document.getElementById(id);
      ele.value = ele.value.replace(
        /[}"`~_=.\->\]|<?+*/,\d;\[:{\\!@#\/'$%^&*()]/g,
        ""
      );
      this.setState({ [name]: ele.value });
    } else {
      this.setState({ [name]: value });
    }
  };

  render() {
    return (
      <div className="border-gray-500 w-11/12 m-auto shadow-2xl mt-3">
      <div className="border-gray-500 w-11/12 m-auto">
      <p className="font-bold text-2xl underline tracking-wider text-center">Payment</p>
        <div className="flex justify-center my-4">
          <Cards
            locale={{ valid: "Expires" }}
            placeholders={{ name: "FULL NAME" }}
            cvc={this.state.cvc}
            expiry={this.state.expiry}
            expiryyear={this.state.expiryyear}
            focused={this.state.focus}
            name={this.state.name}
            number={this.state.number}
          />
        </div>
        <div className="max-w-lg mx-auto bg-white p-8 shadow rounded">
        <p className="font-bold text-2xl text-green-400  tracking-widest text-center">UPI</p>
        <button
              type="submit"
              onClick={this.submit}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Continue
            </button>
            <p className="font-bold text-3xl text-red-400  tracking-wider text-center">or</p>

            <br></br>

      
          <form className="space-y-6">
            <div>
            
              <label htmlFor="cardNumber" className="block text-sm font-medium">
                Card Number
              </label>
              <input
                type="text"
                onChange={this.validateInput}
                value={this.state.number}
                onKeyDown={this.removeSpecial}
                onPaste={(e) => e.preventDefault()}
                onKeyPress={this.addSpace}
                onFocus={this.handleInputFocus}
                name="number"
                maxLength="19"
                id="cardNumber"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="cardHolder" className="block text-sm font-medium">
                Card Holder
              </label>
              <input
                type="text"
                name="name"
                spellCheck="false"
                value={this.state.name}
                maxLength="20"
                autoComplete="off"
                onPaste={(e) => e.preventDefault()}
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                id="cardHolder"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cardMonth" className="block text-sm font-medium">
                  Expiration Month
                </label>
                <select
                  id="cardMonth"
                  value={this.state.expiry}
                  name="expiry"
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Month</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                      {String(i + 1).padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="cardYear" className="block text-sm font-medium">
                  Expiration Year
                </label>
                <select
                  id="cardYear"
                  value={this.state.expiryyear}
                  name="expiryyear"
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Year</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={2024 + i}>
                      {2024 + i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium">
                CVV
              </label>
              <input
                type="text"
                onChange={this.validateInput}
                onKeyDown={this.removeSpecial}
                onPaste={(e) => e.preventDefault()}
                onFocus={this.handleInputFocus}
                name="cvc"
                id="cvv"
                value={this.state.cvc}
                maxLength="4"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <button
              type="submit"
              onClick={this.submit}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Continue
            </button>
          </form>
        </div>
        </div>
      </div>
    );
  }
}

export default Creditcard;
