export const Pizza = (props) => {
  return (
    <div className="pizza">
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <img src={props.image ?? "https://placehold.co/300"} alt={props.name} />
    </div>
  );
};
