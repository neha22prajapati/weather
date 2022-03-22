import { connect } from "react-redux";
import { Alert, Card } from "react-bootstrap";
import { clearData } from "../actions";
import React, { useEffect } from "react";
import "../styles/index.css";

const Weather = (props) => {
  let { weather } = props;
  useEffect(() => {
    return () => {
      props.clearData();
    };
  }, []);

  return (
    <React.Fragment>
      {weather.title && (
        <Alert className="mt-3">Showing weather of {weather.title}</Alert>
      )}
      {weather.consolidated_weather &&
        weather.consolidated_weather.map((w, i) => {
          return (
            <Card key={i} className="weather-card">
              <Card.Body>
                <Card.Img
                  variant="top"
                  src={`https://www.metaweather.com/static/img/weather/${w.weather_state_abbr}.svg`}
                ></Card.Img>
                <Card.Title>{w.applicable_date}</Card.Title>
                <Card.Text>{w.weather_state_name}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      {weather.error && (
        <Alert variant="danger" className="mt-3">
          <Alert.Heading>Ohh snap! you got an Error</Alert.Heading>
          Unable to fetch details due to the incorrect entry, or the location
          you have entered is not present in our database.
        </Alert>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    weather: state,
  };
};

export default connect(mapStateToProps, { clearData })(Weather);
