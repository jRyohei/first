import { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

const IndexPage: NextPage = () => {
  // ❶ useStateを使って状態を定義する
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  // ❷ マウント時に画像を読み込む宣言
  useEffect(() => {
    fetchImage().then((newImage) => {
      setImageUrl(newImage.url); // 画像URLの状態を更新する
      setLoading(false); // ローディング状態を更新する
    });
  }, []);
  const handleClick = async() => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  };
  // ❸ ローディング中でなければ、画像を表示する
  return (
    <div className={styles.page}>
    <button onClick={handleClick}>aaaaaaaa</button>
    <div className={styles.page}>{loading || <img src={imageUrl} />}</div>
    </div>
  );
}; 
export default IndexPage;

type Image = {
  url: string;
};
const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};