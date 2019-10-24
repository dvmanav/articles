import React from 'react';
import Calendar from 'react-calendar';
import Article from './components/article';

class MyApp extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
      articles_fetched: false,
      error: null,
      articles: [],
      fetch_type: "Today"
    };

    this.fetchArticles("Date", new Date());
  }

  fetchArticles(type, date) {

    this.setState({
      fetch_type: type
    });

    var url = process.env.REACT_APP_API_BASE_URL + '/v' + process.env.REACT_APP_API_VERSION;

    switch (type) {
      case "Date": url =  url + process.env.REACT_APP_ARTICLES_BY_DATE;
      break;

      case "Month": url =  url + process.env.REACT_APP_ARTICLES_BY_MONTH;
      break;

      case "Year": url =  url + process.env.REACT_APP_ARTICLES_BY_YEAR;
      break;
    }

    fetch(url, {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin' : '*',
       'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
       'Access-Control-Allow-Headers': '*'
     },
      body: JSON.stringify({
        'date': date,
        'month': date,
        'year': date
      })
    }).then(response => response.json()).then(
      (response) => {
        if(response.status === 200){
          this.setState({
            articles:[],
            articles_fetched: true,
            error: null,
            articles: response.data
          })
        } else if (response.status !== 200) {
          this.setState({
            articles_fetched: false,
            error: response.message,
            articles: []
          })
        }
      },
      (error) => {
        this.setState({
          articles_fetched: false,
          error: error.message,
          articles: []
        })
      }
    );
  }

  DateChanged = date => {
    this.setState({date: date});

    this.fetchArticles("Date", date);
  }

  MonthChanged = date => {
    this.setState({date: date});

    this.fetchArticles("Month", date);
  }

  YearChanged = date => {
    this.setState({date: date});

    this.fetchArticles("Year", date);
  }

  ActiveDateChanged = date => {
    this.setState({date: date.activeStartDate});

    this.fetchArticles("Month", date.activeStartDate);
  }

  render(){
    const {articles_fetched, error, date, articles, fetch_type } = this.state;
    var number_of_articles = articles.length;
    return (

      <div>
      <div style={{'display': 'inline-block', 'float' : 'left'}}>
      <Calendar value={date} activeStartDate= {new Date()} maxDate={new Date()} onClickDay={ this.DateChanged } onClickMonth={this.MonthChanged} onClickYear={this.YearChanged} onActiveDateChange={this.ActiveDateChanged} />
      <br/><br/>
      <button onClick={(e) => {this.setState( { date: new Date() } ) } }> Go to Today </button>
      </div>
      <div style={{'display': 'inline-block', 'marginLeft': '30px', 'float': 'center'}}>
      {
        !articles_fetched && error===null ?
        <h3>Loading....</h3> : null
      }
      {
        !articles_fetched && error!==null ?
        <div> <h3>Error while fetching articles: </h3> <h3>{error}</h3> </div>: null
      }
      {
        articles_fetched && error===null && number_of_articles !==0 ?

        articles.map(article => <Article id={article.id} title={article.title} body={article.body} person_id={article.person_id} created_at={article.created_at} updated_at={article.updated_at}/>)  : <h3>No articles published on this date</h3>
      }
      </div>
      </div>
    );
  }
}

export default MyApp;
