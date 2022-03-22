import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { getWeather, getError } from "../actions";
import { Form, Button } from "react-bootstrap";
import Loader from "./loader";
import Weather from "./weather";

const SearchLocation = (props) => {
  const [loader, setLoader] = useState(false);
  const locationName = useRef();

  useEffect(() => {
    if (loader) {
      setLoader(false);
    }
  }, []);

  const search = () => {
    setLoader(true);
    const location = locationName.current.value;
    fetch(`https://www.metaweather.com/api/location/search/?query=${location}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.length === 0) {
          props.getError({ error: "error" });
        } else {
          props.getWeather(res[0].woeid);
        }
        setLoader(false);
      });
  };

  return (
    <React.Fragment>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Enter Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Mumbai"
            ref={locationName}
          ></Form.Control>
          <Form.Text className="text-muted">
            Search for nearby metro city
          </Form.Text>
        </Form.Group>
        <Button variant="primary" onClick={search}>
          Search
        </Button>
      </Form>
      {loader ? <Loader /> : <Weather />}
    </React.Fragment>
  );
};

export default connect(null, { getWeather, getError })(SearchLocation);
