import App, { Container } from 'next/app';
import Page from '../components/Page';
import React from 'react';
import Select from 'react-select';

/*
const options = [
    { value: 'source1', label: 'Irish Times' },
    { value: 'soruce2', label: 'Sport Bible' },
    { value: 'source3', label: ' ' }
  ];
  */

class MyApp extends App {

    render() {
        const {Component, pageProps} = this.props;

        return (
            <Container>
                <Page>
                    <Component {...pageProps} />
                </Page>            
            </Container>
        );
    }
}

export default MyApp;

/*
class App extends React.Component {
    state = {
      selectedOption: null,
    }
    handleChange = (selectedOption) => {
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption);
    }
    render() {
      const { selectedOption } = this.state;
  
      return (
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
      );
    }
  }
  */