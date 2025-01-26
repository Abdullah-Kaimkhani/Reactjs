import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css"; // Importing the updated CSS module

export default function ProductCard({ name, imgSrc, desc, id }) {
  const Navigate = useNavigate();
  return (
    <Card className={styles.cardContainer}>
      <CardMedia
        className={styles.cardMedia}
        image={imgSrc}
        title="Product Image"
      />
      <CardContent className={styles.cardContent}>
        <Typography className={styles.cardTitle} gutterBottom variant="h5" component="div">
          {name.slice(0, 27)}...
        </Typography>
        <Typography className={styles.cardDesc} variant="body2">
          {desc.slice(0, 70)}...
        </Typography>
      </CardContent>
      <CardActions className={styles.cardActions}>
        <Button
          className={styles.cardButton}
          onClick={() => {
            Navigate(`/CardDeatail/${id}`);
          }}
          size="small"
        >
          View More
        </Button>
      </CardActions>
    </Card>
  );
}
