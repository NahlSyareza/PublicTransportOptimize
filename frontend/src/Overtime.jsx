export default function Overtime({ name, desc }) {
  return (
    <>
      <div className="font-montserrat">
        <p>{name === undefined ? "Name" : name}</p>
        <p>{desc === undefined ? "Desc" : desc}</p>
      </div>
    </>
  );
}
