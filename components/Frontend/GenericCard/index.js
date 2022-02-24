import "./styles.scss";

const GenericCard = () => {
  const data = {
    imgLocation:
      "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3132&q=80",
  };
  return (
    <>
      <div className="generic-card-container">
        <div className="img-wrapper" style={{backgroundImage: `url(${data.imgLocation})`}}/>
        <div className="title">Lorem Ipsum Title Testing</div>
        <div className="excerpt">
          So how did the classical Latin become so incoherent? According to
          McClintock, a 15th century typesetter likely scrambled part of
          Cicero's De Finibus in order to provide placeholder text to mockup
          various fonts for a type specimen book.
        </div>
      </div>
    </>
  );
};

export default GenericCard;
