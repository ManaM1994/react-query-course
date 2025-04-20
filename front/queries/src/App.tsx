import "./App.css";
import { useQuery } from "@tanstack/react-query";

function App() {
  const result = useQuery({
    queryKey: ["posts"],
    queryFn: async function () {
      const result = await fetch(
        "https://datasets-server.huggingface.co/rows?dataset=divaroffical%2Freal_estate_ads&config=default&split=train&offset=0&length=100"
      );
      if (!result.ok) {
        throw new Error("Network response was not ok");
      }
      return result.json();
    },
  });
  // console.log("data", result.data);
  console.log("rows", result.data?.rows);

  if (result.isLoading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
  if (result.isError) {
    return (
      <>
        <h1>Error: {result.error.message}</h1>
      </>
    );
  }

  return (
    <div className="grid-container">
      {result.data?.rows.map((item: any) => (
        <div className="grid-item" key={item.row_idx}>
          <div className="title">{item.row.title}</div>
          <div className="price">{item.row.price}</div>
          <div className="city">{item.row.city}</div>
          <div className="city-slug">{item.row.city_slug}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
