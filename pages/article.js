import {withRouter} from 'next/router'
import fetch from "isomorphic-unfetch";

const apiKey = "1221cec2942d47008e680bf5ed04757a";

const defaultNewsSource = "the-irish-times";

async function getNews(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() { 
    let id = 0;
    let article = this.props.articles[id];

    return (
      <div>
        <h3>{defaultNewsSource.split("-").join(" ")}</h3>
        <div>
          <section>
          <h3>{article.title}</h3>
          <p>{article.content}</p>
          </section>
          ))}
        </div>

        <style jsx>{`
          section {
            border: 1px solid gray;
            background-color: rgb(240, 248, 255);

          }

          .author {
            font-style: italic;
            font-size: 0.8em;
          }
          .img-article {
            max-width: 50%;
          }
        `}</style>
      </div>
    );
  }

  static async getInitialProps(res) {
    
    const defaultUrl = `https://newsapi.org/v2/top-headlines?sources=${defaultNewsSource}&apiKey=${apiKey}`;

    const data = await getNews(defaultUrl);

    if (Array.isArray(data.articles)) {
      return {
        articles: data.articles
      };
    }
    else {
      console.error(data);
      if (res) {
        res.statusCode = 400;
        res.end(data.message);
      }
    }
  }
} 
export default withRouter(Article)
