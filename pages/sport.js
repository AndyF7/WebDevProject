import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import SearchForm from '../components/SearchForm';

const apiKey = '1221cec2942d47008e680bf5ed04757a';

const defaultNewsSource = 'the-sport-bible';

async function getNews(url) {

  try {
    const res = await fetch(url);
    const data = await res.json();
    return (data);
  } catch (error) {
    return (error);
  }
}

export default class News extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      newsSource: "",
      url: "",
      articles: []
    }
  }
  setNewsSource = (input) => {
    this.setState({
      newsSource: input,
      url: `https://newsapi.org/v2/top-headlines?sources=the-sport-bible&apiKey=1221cec2942d47008e680bf5ed04757a`
      
    })
  }

  searchNewsAPI = (event) => {
    this.setState({
      newsSource: `${event.target.innerText}`,
      url: `https://newsapi.org/v2/top-headlines?sources=the-sport-bible&apiKey=1221cec2942d47008e680bf5ed04757a`
    })
    console.log(this.state.url);
  }

  render() {
    if (this.state.articles.length == 0) {
      this.state.articles = this.props.articles;
    }
    return (
      <div>
        <SearchForm setNewsSource={this.setNewsSource} />
        <div>
          {this.state.articles.map((article, index) => (
            <section key={index}>
              <h3>{article.title}</h3>
              <p className="author">{article.author} {article.publishedAt}</p>
              <img src={article.urlToImage} alt="article image" className="img-article"></img>
              <p>{article.description}</p>
              <p>{article.content}</p>
              <p><Link as={`/article/${index}`} href={`/article?id=${index}`}><a>Read More</a></Link></p>
            </section>
          ))}
        </div>

        <style jsx>{`
              /* CSS for this page */
              section {
                border: 1px solid gray;
                background-color: rgb(240, 248, 255);
                padding: 1em;
                margin: 1em;
              }

            .author {
                font-style: italic;
                font-size: 0.8em;
              }
            .img-article {
                max-width: 100%;
              }
          `}</style>
      </div>
    );
  }

  static async getInitialProps(response) {
    const defaultUrl = `https://newsapi.org/v2/top-headlines?sources=the-sport-bible&apiKey=1221cec2942d47008e680bf5ed04757a`;
    const data = await getNews(defaultUrl);

    if (Array.isArray(data.articles)) {
      return {
        articles: data.articles
      }
    }
    else {
      console.error(data)
      if (response) {
        response.statusCode = 400
        response.end(data.message);
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.url !== prevState.url) {
      const data = await getNews(this.state.url);
      if (Array.isArray(data.articles)) {
        this.state.articles = data.articles;
        this.setState(this.state);
      }
      else {
        console.error(data)
        if (response) {
          response.statusCode = 400
          response.end(data.message);
        }
      }
    }
  } 
} 
