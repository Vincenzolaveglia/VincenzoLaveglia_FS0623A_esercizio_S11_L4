import { useEffect, useState } from "react";
import { Container, Nav, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ArticleApi from "../models/Article";

const ArticleList = () => {
    const [articles, setArticles] = useState<ArticleApi[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.spaceflightnewsapi.net/v4/articles");

                if (!response.ok) {
                    throw new Error("Errore nella richiesta API");
                }

                const data = await response.json();
                console.log("Dati API:", data);
                setArticles(data.results);
                setLoading(false);
            } catch (error) {
                console.error("Errore nella richiesta API", error);
                setError("Si è verificato un errore durante il recupero dei dati.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center display-5 mt-5">Caricamento in corso...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Container className="mt-5">
            <Row className="d-flex justify-content-center"> 
                {articles.map((article) => (
                    <Col key={article.id} sm={12} md={4} lg={2} className="mx-2 mb-3 "> 
                        <Card className="h-100">
                            <Card.Img variant="top" src={article?.image_url} alt={article?.title} />
                            <Nav.Link as={Link} to={`/article/${article.id}`} className="nav-link py-3 px-2 fs-5 fw-bolder">
                                {article.title}
                            </Nav.Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ArticleList;