import { useState, useEffect } from "react";
import axios from "axios";


function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios("http://localhost:8000/api/products")
      //.then((res) => console.log(res))
      .then(res=>setProducts(res.data.response))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="flex felx-wrap justify-evenly p-3 m-3 bg-black-200">
     {products.map(each=> <article className="p-3 bg-grey-500" key={each._id}>
      <h3>{each.title}</h3>
      <img src={each.image} alt={each.title} className="w-[360px]" />
     </article>)}
    </section>
  );
}

export default App;
