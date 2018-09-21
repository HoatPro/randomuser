import React from "react";
import image from "../images/user-avatars-pack_23-2147502629.svg";
import Collapsible from "./Collapsible";
import { Bar, Pie } from "react-chartjs-2";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      users: [],
      chartData: {},
      chartNat: {
        labels: [
          "AU",
          "BR",
          "CA",
          "CH",
          "DE",
          "DK",
          "ES",
          "FI",
          "FR",
          "GB",
          "IE",
          "IR",
          "NO",
          "NL",
          "NZ",
          "TR",
          "US"
        ],
        datasets: [
          {
            label: "Ratio Count",
            data: [7, 5, 9, 4, 3, 5, 12, 5, 5, 1, 6, 2, 13, 7, 5, 2, 2],
            backgroundColor: [
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)"
            ]
          }
        ]
      }
    };
  }

  getChartData(countFemale,countMale) {
    return({
      chartData: {
        labels: ["Male", "Female"],
        datasets: [
          {
            label: "Population",
            data: [countFemale, countMale],
            backgroundColor: [
              "rgba(255,99,132,0.6)",
              "rgba(54,162,235,0.6)"
            ]
          }
        ]
      }
    });
  }

  fetchData() {
    this.setState({
      isLoading: true,
    });

    fetch(
      "https://randomuser.me/api/?results=100"
    )
      .then(response => response.json())
      .then(parsedJSON =>
        parsedJSON.results.map(user => ({
          name: `${user.name.first} ${user.name.last}`,
          images: `${user.picture.medium}`,
          username: `${user.login.username}`,
          email: `${user.email}`,
          phone: `${user.phone}`,
          location: `${user.location.street}, ${user.location.city}`,
          national: `${user.nat}`,
          gender: `${user.gender}`,

        }))
      )
      .then(users =>{
        const countFemale =users.filter(user => user.gender === "female").length;
        const countMale =users.filter(user => user.gender === "male").length;

        this.setState({
          users,
          isLoading: false,
          chartData: getChartData(countFemale,countMale)
        })
      })
      .catch(error => console.log("parsing failed", error));
  }

  render() {
    const { isLoading, users } = this.state;
    return (
      <div>
        <header>
          <img src={image} />
          <h1>
            Random Users Data{" "}
            <button
              className="btn btn-sm btn-danger"
              onClick={e => {
                this.fetchData();
              }}
            >
              Refresh Data
            </button>
          </h1>
        </header>
        <div className={`content ${isLoading ? "is-loading" : ""}`}>
          <div className="panel-group">
            {!isLoading && users.length > 0
              ? users.map(user => {
                const { username, images, name, email,location,phone,national,gender
                } = user;




                var countAU = users.filter(user => user.national === "AU")
                  .length;
                var countBR = users.filter(user => user.national === "BR")
                  .length;
                var countCA = users.filter(user => user.national === "CA")
                  .length;
                var countCH = users.filter(user => user.national === "CH")
                  .length;
                var countDE = users.filter(user => user.national === "DE")
                  .length;
                var countDK = users.filter(user => user.national === "DK")
                  .length;
                var countES = users.filter(user => user.national === "ES")
                  .length;
                var countFI = users.filter(user => user.national === "FI")
                  .length;
                var countFR = users.filter(user => user.national === "FR")
                  .length;
                var countGB = users.filter(user => user.national === "GB")
                  .length;
                var countIE = users.filter(user => user.national === "IE")
                  .length;
                var countIR = users.filter(user => user.national === "IR")
                  .length;
                var countNO = users.filter(user => user.national === "NO")
                  .length;
                var countTR = users.filter(user => user.national === "TR")
                  .length;
                var countNZ = users.filter(user => user.national === "NZ")
                  .length;
                var countUS = users.filter(user => user.national === "US")
                  .length;

                return (
                  <Collapsible key={username} title={name}>
                    <p>
                      <img src={images} />
                      <br />
                      Email: {email}
                      <br />
                      PhoneNumber : {phone}
                      <br />
                      {location}
                      <br />
                      National :{national}
                      <br />
                      Gender :{gender}
                    </p>
                  </Collapsible>
                );
              })
              : null}
          </div>
          <div className="loader">
            <div className="icon" />
          </div>
        </div>
        <div className="chart">
          <Pie
            data={this.state.chartData}
            options={{
              title: {
                display: true,
                text: "Rate Male and Famale in 100 users",
                fontSize: 25
              },
              legend: {
                display: true,
                position: "bottom"
              },
              maintainAspecRatio: false
            }}
          />
          <Bar
            data={this.state.chartNat}
            options={{
              title: {
                display: true,
                text: "Rate Male and Famale of National in 100 users",
                fontSize: 25
              },
              legend: {
                display: true,
                position: "bottom"
              },
              maintainAspecRatio: false
            }}
          />
        </div>
      </div>
    );
  }
}
export default Home;
