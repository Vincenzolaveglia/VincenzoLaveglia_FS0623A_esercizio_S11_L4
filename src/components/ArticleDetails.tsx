import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ArticleApi from "../models/Article";
import { Container, Card, Button } from "react-bootstrap";

const ArticleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<ArticleApi | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/${id}`);

        if (!response.ok) {
          throw new Error("Errore nella richiesta API");
        }

        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error("Errore nella richiesta API", error);
      }
    };

    fetchData();
  }, [id]);

  if (!article) {
    return <div className="text-center display-5 mt-5">Caricamento in corso...</div>;
  }

  return (
    <Container>
      <h1 className="text-center mb-3">Dettagli articolo</h1>
      <Card className="mb-3">
        <Card.Body>
            <Card.Img src={article.image_url} />
          <Card.Title className="display-4 ">{article.title}</Card.Title>
          <Card.Text className="mb-5">
            <span className="fw-bold">Data di pubblicazione:</span> {article.updated_at.slice(0, 10)}
          </Card.Text>
          <Card.Text>{article.summary}</Card.Text>
          <Card.Text className="fw-bold">{article.news_site}</Card.Text>

          <Link to="/">
            <Button variant="dark">Torna alla home</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ArticleDetails;