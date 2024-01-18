import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ArticleApi from "../models/Article";

import { Card, Container, Row, Col, Button } from "react-bootstrap";

const Article = () => {
    const { id } = useParams<{ id: string }>()
    const [article, setArticle] = useState<ArticleApi | null>(null)

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
                console.log("Errore: ", error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <Container>
            <Row className="text-center mt-3">
                <Col sm={12} md={9} lg={6} className="mx-auto">
                    <Card>
                        <Card.Img variant="top" src={article?.image_url} alt={article?.title} />
                        <Card.Body>
                            <Card.Title>{article?.title}</Card.Title>
                            <Card.Text className="mt-3">
                                <span className="fw-bold">Data di pubblicazione:</span>
                                <br />
                                {article?.updated_at.slice(0, 10)}
                            </Card.Text>
                            <Link to={`/article/${article?.id}/details`}>
                                <Button variant="dark">Scopri di più</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Article;