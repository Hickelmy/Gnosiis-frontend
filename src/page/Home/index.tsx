import React from "react";
import Slide from "../../components/Carousel";
import { BookList } from "../../components/Booklist";

const Home: React.FC = () => {
  return (
    <div>
      <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', maxHeight: '70vh', overflow: 'hidden' }}>
  <Slide />
</div>

      <div style={{ padding: '20px'}}>
      <BookList/>
      </div>
    </div>
  );
};

export default Home;
